const nodemailer = require('nodemailer');
const pug = require('pug');

const sendScore = async (scoreArr, userEmail, id) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const mailOptions = {
    from: `"Space Trap" ${testAccount.user}`, // sender address
    to: userEmail, // list of receivers
    subject: 'Your score in Space Trap', // Subject line
    html: pug.renderFile('Leaderboard.pug', { scoreArr: scoreArr, id: id }),
  };

  const emailUrl = await transporter
    .sendMail(mailOptions)
    .then((res) => nodemailer.getTestMessageUrl(res));
  console.log(`The email has been sent to: ${emailUrl}`);
};

module.exports = sendScore;
