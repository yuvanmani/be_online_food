const { EMAIL_USER, SENDGRID_API_KEY } = require("../utils/config");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(SENDGRID_API_KEY);

// create a sendEmail function to send OTP via email
const sendEmail = async (to, subject, text) => {
    try {

        // setup mail data
        const msg = {
            from: EMAIL_USER,
            to: to,
            subject: subject,
            text: text
        }

        // send the email
        const info = await sgMail.send(msg);
        console.log("Email sent : ", info[0].statusCode);
    }
    catch (error) {
        console.log("Error sending email", error);
    }
}

module.exports = { sendEmail };