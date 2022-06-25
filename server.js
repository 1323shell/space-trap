const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const sendScore = require('./services/mail');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Schema = mongoose.Schema;
const leaderboardScheme = new Schema(
  {
    score: Number,
    name: String,
    email: String,
  },
  { versionKey: false },
);
const Leaderboard = mongoose.model('Leaderboard', leaderboardScheme);

mongoose.connect(
  'mongodb://localhost:27017/usersdb',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log(err);
    app.listen(port, () => console.log(`Listening on port ${port}`));
  },
);

// API calls
app.post('/api/score', (req, res) => {
  const { score, email } = req.body;

  Leaderboard.create(req.body, (err, doc) => {
    if (err) return console.log(err);
    const id = doc._id.toString();

    Leaderboard.find({}, (err, scoreArr) => {
      if (err) return console.log(err);

      scoreArr.sort((a, b) => b.score - a.score);

      sendScore(scoreArr, email, id).catch(console.error);
    });
  });

  res.send(`Your score: ${score}`);
});
