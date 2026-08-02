const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { name: null });
});

app.post('/submit', (req, res) => {
  const userName = req.body.name;
  res.render('index', { name: userName });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});