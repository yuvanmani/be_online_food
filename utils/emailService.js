const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS } = require("../utils/config");

// create a sendEmail function to trigger email service
const sendEmail = async (to, subject, text) => {
    try {
        // create a transporter object to send email
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        })

        // setup mail data
        const mailOptions = {
            from: EMAIL_USER,
            to: to,
            subject: subject,
            text : text
        }

        // send the email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent : %s", info.messageId);
    }
    catch (error) {
        console.log("Error sending email", error);
    }
}

module.exports = { sendEmail };