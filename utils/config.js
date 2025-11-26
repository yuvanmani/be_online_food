require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_NAME = process.env.SENDER_NAME;
const SENDER_EMAIL = process.env.SENDER_EMAIL;

module.exports = {
    MONGODB_URI,
    JWT_SECRET,
    EMAIL_USER,
    EMAIL_PASS,
    SENDGRID_API_KEY,
    BREVO_API_KEY,
    SENDER_NAME,
    SENDER_EMAIL
}
