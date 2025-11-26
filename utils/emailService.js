const { SENDER_EMAIL, BREVO_API_KEY, SENDER_NAME } = require("../utils/config");
const axios = require("axios");

// create a sendEmail function to send OTP via email
const sendEmail = async (to, subject, text) => {
    try {

        const response = await axios.post("https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: SENDER_NAME,
                    email: SENDER_EMAIL
                },
                to: [
                    {
                        email: to
                    }
                ],
                subject: subject,
                textContent: text
            },
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "api-key": BREVO_API_KEY
                }
            }
        );

        console.log("Email sent : ", response.data);
    }
    catch (error) {
        console.error("Error sending email", error.response ? error.response.data : error.message);
    }
}

module.exports = { sendEmail };