const nodemailer = require("nodemailer");

const { VERIFY_MAIL_PASSWORD, VERIFY_MAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 2525,
  secure: true,
  auth: {
    user: VERIFY_MAIL,
    pass: VERIFY_MAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const mail = { ...data, from: VERIFY_MAIL };
  await transport.sendMail(mail);
  return true;
};

module.exports = sendEmail;
