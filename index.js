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

// Com4_2.1be — TODO1: GET /jokebook/categories
app.get('/jokebook/categories', (req, res) => {
  //TODO1
});

// Com4_2.1be — TODO2: GET /jokebook/joke/:category (losowy żart)
app.get('/jokebook/joke/:category', (req, res) => {
  //TODO2
});

// Com4_2.1be — TODO3: własny endpoint
//TODO3

// Com4_2.2be — TODO4: POST /jokebook/joke/:category
app.post('/jokebook/joke/:category', (req, res) => {
  //TODO4
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
