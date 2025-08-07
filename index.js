const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the main page
app.get('/', (req, res) => {
  fs.readFile('games.json', 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading games.json:", err);
      return res.status(500).send('Error reading game data.');
    }
    try {
      const games = JSON.parse(data);
      res.render('index', { title: 'Nintendo Switch 2 Game Prices', games: games });
    } catch (parseErr) {
      console.error("Error parsing games.json:", parseErr);
      return res.status(500).send('Error parsing game data.');
    }
  });
});

app.listen(port, () => {
  console.log(`Game price tracker app listening at http://localhost:${port}`);
});
