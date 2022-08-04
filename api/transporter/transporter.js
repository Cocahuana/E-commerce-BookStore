const nodemailer = require("nodemailer");
require('dotenv').config();
const {
    MAIL_USER, MAIL_PASS,
  } = process.env;
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: MAIL_USER,
        pass: MAIL_PASS
    },
});

module.exports = { transporter }