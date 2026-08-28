const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

let users = [];
let nextId = 1;

app.get('/', (req, res) => {
  res.render('index', { name: null, errors: [] });
});

app.post('/submit', (req, res) => {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || name.trim() === '') errors.push('Name is required.');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) errors.push('A valid email is required.');

  if (!password || password.length < 6) errors.push('Password must be at least 6 characters.');

  if (errors.length > 0) {
    return res.json({ errors: errors });
  }

  const newUser = { id: nextId++, name, email };
  users.push(newUser);

  res.json({ name: name, errors: [] });
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});