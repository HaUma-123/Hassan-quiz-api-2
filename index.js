const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

app.get('/trivia', async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
    const triviaQuestion = response.data.results[0];

    const question = triviaQuestion.question;
    const correctAnswer = triviaQuestion.correct_answer;
    const incorrectAnswers = triviaQuestion.incorrect_answers;
    const allAnswers = [...incorrectAnswers, correctAnswer];

    // Shuffle the answers
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

    const trivia = {
      question: question,
      answers: shuffledAnswers,
      correctAnswer: correctAnswer
    };

    res.json(trivia);
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while fetching the trivia question.'
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
