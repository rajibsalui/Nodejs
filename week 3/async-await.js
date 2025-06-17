
// using callbacks for file operations

const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Read error:', err);
    return;
  }

  fs.writeFile('output.txt', data, (err) => {
    if (err) {
      console.error('Write error:', err);
      return;
    }
    console.log('File written successfully');
  });
});




// using async/await with promises

const fs = require('fs').promises;

async function copyFile() {
  try {
    const data = await fs.readFile('input.txt', 'utf8');
    await fs.writeFile('output.txt', data);
    console.log('File written successfully');
  } catch (err) {
    console.error('Error:', err);
  }
}

copyFile();
