// file-manager.js
const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const { URL } = require('url');

const HOSTNAME = '127.0.0.1';
const PORT = 3000;
// Base directory where files will be managed:
const BASE_DIR = path.resolve(__dirname, 'files');

// Ensure BASE_DIR exists
fs.mkdir(BASE_DIR, { recursive: true }).catch(err => {
  console.error('Error creating base directory:', err);
  process.exit(1);
});


function resolveSafePath(filename) {
 
  if (!filename) {
    throw new Error('Filename not provided');
  }
  
  const safePath = path.resolve(BASE_DIR, filename);
  if (!safePath.startsWith(BASE_DIR + path.sep)) {
    throw new Error('Invalid filename');
  }
  return safePath;
}

const server = http.createServer(async (req, res) => {
  // Parse URL and query params
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const filename = parsedUrl.searchParams.get('filename');

  // Route: /file
  if (pathname === '/file') {
    try {
      const filePath = resolveSafePath(filename);

      if (req.method === 'GET') {
        // Read file
        try {
          const data = await fs.readFile(filePath, 'utf8');
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end(data);
        } catch (err) {
          if (err.code === 'ENOENT') {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'File not found' }));
          } else {
            throw err;
          }
        }

      } else if (req.method === 'POST') {
        // Create or overwrite file: read request body
        let body = '';
        req.setEncoding('utf8');
        req.on('data', chunk => {
          body += chunk;
          // Optionally: enforce size limit
          if (body.length > 1e6) { // ~1MB limit
            req.destroy();
          }
        });
        req.on('end', async () => {
          try {
            // Ensure directory exists (in case subdirectories are allowed)
            await fs.mkdir(path.dirname(filePath), { recursive: true });
            await fs.writeFile(filePath, body, 'utf8');
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'File created/overwritten' }));
          } catch (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Write failed' }));
          }
        });

      } else if (req.method === 'DELETE') {
        // Delete file
        try {
          await fs.unlink(filePath);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'File deleted' }));
        } catch (err) {
          if (err.code === 'ENOENT') {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'File not found' }));
          } else {
            throw err;
          }
        }

      } else {
        // Method not allowed
        res.writeHead(405, { 'Allow': 'GET, POST, DELETE', 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      }

    } catch (err) {
      // e.g., invalid filename or other error
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }

  } else {
    // Not found
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`File management server running at http://${HOSTNAME}:${PORT}/`);
  console.log('Endpoints:');
  console.log('  GET    /file?filename=<name>    → read file');
  console.log('  POST   /file?filename=<name>    → create/overwrite file (body = file content)');
  console.log('  DELETE /file?filename=<name>    → delete file');
});
