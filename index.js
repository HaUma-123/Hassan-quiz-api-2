const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/trivia', async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
    const triviaData = response.data.results[0];
    res.json(triviaData);
  } catch (error) {
    console.error('Error fetching trivia:', error);
    res.status(500).json({ error: 'Failed to fetch trivia' });
  }
});

app.listen(port, () => {
  console.log(`Trivia API listening at http://localhost:${port}`);
});
