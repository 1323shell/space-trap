const express = require('express');
const mongoose = require("mongoose");
//const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const pug = require('pug');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Schema = mongoose.Schema;
const leaderboardScheme = new Schema({
    score: Number,
    name: String,
    email: String
}, {versionKey: false});
const Leaderboard = mongoose.model('Leaderboard', leaderboardScheme);

mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true }, (err) => {
    if(err) return console.log(err);
    app.listen(port, () => console.log(`Listening on port ${port}`));
});

// API calls
app.post('/api/score', (req, res) => {
    const { score, email } = req.body;

    Leaderboard.create(req.body, (err, doc) => {
        if(err) return console.log(err);
        const id = doc._id.toString();

        Leaderboard.find({}, (err, scoreArr) => {
            if(err) return console.log(err);

            scoreArr.sort( (a, b) => b.score - a.score );

            main(scoreArr, email, id).catch(console.error);
        });
    });

    res.send(
        `Your score: ${score}`,
    );
});

const main = async (scoreArr, userEmail, id) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'noreply.13shell@gmail.com',
            pass: '1323shell1323'
        }
    });

    let mailOptions = {
        from: '"Space Trap" noreply.13shell@gmail.com', // sender address
        to: userEmail, // list of receivers
        subject: "Your score in Space Trap", // Subject line
        html: pug.renderFile('Leaderboard.pug', {scoreArr: scoreArr, id: id})
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent ID: ", info.messageId);
    console.log('Письмо отправлено!!!!');
};

//heroku
/*if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}*/
