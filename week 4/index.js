import path from 'path';
import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import { fileURLToPath } from 'url';

// Derive __filename and __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set Pug as the view engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// In-memory store for users
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// Middleware: simple request logger
app.use((req, res, next) => {
  const now = new Date();
  console.log(`${now.toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Middleware: parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route: GET / - Render the Pug template with current users
app.get('/', (req, res) => {
  res.render('index', { users });
});

// Route: POST /users - Add a new user and redirect back
app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Name is required');
  }
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.redirect('/');
});


// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
