'use strict';

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'data.json');

function loadData() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

function saveData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/jokebook/categories', (req, res) => {
  const data = loadData();
  res.json(data.categories);
});

app.get('/jokebook/joke/:category', (req, res) => {
  const { category } = req.params;
  const data = loadData();

  if (!data.categories.includes(category) || !Array.isArray(data[category])) {
    return res.status(400).json({ error: `no jokes for category ${category}` });
  }

  const jokes = data[category];
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  res.json(joke);
});

app.get('/jokebook/count/:category', (req, res) => {
  const { category } = req.params;
  const data = loadData();

  if (!data.categories.includes(category) || !Array.isArray(data[category])) {
    return res.status(400).json({ error: `no jokes for category ${category}` });
  }

  res.json({ category, count: data[category].length });
});

// Com4_2.2be — dodawanie żartu
app.post('/jokebook/joke/:category', (req, res) => {
  const { category } = req.params;
  const { joke, response } = req.body || {};
  const data = loadData();

  if (!data.categories.includes(category) || !Array.isArray(data[category])) {
    return res.status(400).json({ error: `no jokes for category ${category}` });
  }

  if (typeof joke !== 'string' || !joke.trim() || typeof response !== 'string' || !response.trim()) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const entry = { joke: joke.trim(), response: response.trim() };
  data[category].push(entry);
  saveData(data);

  res.status(201).json({ message: 'Joke added', joke: entry, category });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
