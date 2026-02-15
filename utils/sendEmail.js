// const nodemailer = require("nodemailer");

// const sendEmail = async ({ to, subject, html }) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: process.env.MAIL_HOST, // smtp.office365.com
//             port: process.env.MAIL_PORT, // 587
//             secure: false, // 587 ki false
//             auth: {
//                 user: process.env.MAIL_USER, // hr@quantumworks.in
//                 pass: process.env.MAIL_PASS, // your Outlook password
//             },
//         });

//         await transporter.sendMail({
//             from: `"Quantum Works HR" <${process.env.MAIL_USER}>`,
//             to,
//             subject,
//             html,
//         });

//         console.log("✅ Email sent successfully!");
//     } catch (err) {
//         console.log("❌ Send email error:", err);
//         throw err;
//     }
// };

// module.exports = sendEmail;



const nodemailer = require("nodemailer");
require("dotenv").config(); // 🔥 VERY IMPORTANT

console.log("SMTP_USER =", process.env.SMTP_USER);
console.log("SMTP_PASS =", process.env.SMTP_PASS);
console.log("SMTP_PORT =", process.env.SMTP_PORT);
console.log("SMTP_HOST =", process.env.SMTP_HOST);

const sendEmail = async ({ to, subject, html }) => {

    try {
        // Support both new `SMTP_*` and legacy `MAIL_*` env var names
        const host = process.env.SMTP_HOST || process.env.MAIL_HOST;
        const port = parseInt(process.env.SMTP_PORT || process.env.MAIL_PORT || "587", 10);
        const user = process.env.SMTP_USER || process.env.MAIL_USER;
        const rawPassword = process.env.SMTP_PASS || process.env.MAIL_PASS || process.env.MAIL_PASSWORD;

        if (!host || !user || !rawPassword) {
            console.error("❌ SMTP/Mail environment variables not configured!");
            console.error("Available env vars:", {
                SMTP_HOST: process.env.SMTP_HOST ? "✅" : "❌",
                SMTP_PORT: process.env.SMTP_PORT ? "✅" : "❌",
                SMTP_USER: process.env.SMTP_USER ? "✅" : "❌",
                SMTP_PASS: process.env.SMTP_PASS ? "✅" : "❌",
                MAIL_HOST: process.env.MAIL_HOST ? "✅" : "❌",
                MAIL_PORT: process.env.MAIL_PORT ? "✅" : "❌",
                MAIL_USER: process.env.MAIL_USER ? "✅" : "❌",
                MAIL_PASS: process.env.MAIL_PASS ? "✅" : "❌",
            });
            throw new Error("SMTP configuration missing. Set environment variables on the server.");
        }

        console.log("📧 Using mail config:", { host, port, user: user ? '✅' : '❌' });

        // Remove quotes from password if present
        const password = rawPassword?.replace(/^\"|\"$/g, "");

        const secure = false; // true for 465, false for other ports (e.g., 587)

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: {
                user,
                pass: password,
            },
        });

        // Test connection
        console.log("🔍 Testing SMTP connection...");
        await transporter.verify();
        console.log("✅ SMTP connection verified");

        const mailOptions = {
            from: `"Quantum Works HR" <${user}>`,
            to: Array.isArray(to) ? to.join(", ") : to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully! Message ID:", info.messageId);
        return info;
    } catch (err) {
        console.error("❌ Send email error:", err.message || err);
        console.error("Full error:", err);
        throw err;
    }

};

module.exports = sendEmail;


// const sendEmail = async ({ to, subject, html }) => {
//     try {
//         // Check if SMTP environment variables are set
//         if (!process.env.SMTP_HOST || !process.env.SMTP_USERNAME || !process.env.SMTP_PASSWORD) {
//             console.error("❌ SMTP environment variables not configured!");
//             console.error("Available env vars:", {
//                 SMTP_HOST: process.env.SMTP_HOST ? "✅" : "❌",
//                 SMTP_PORT: process.env.SMTP_PORT ? "✅" : "❌",
//                 SMTP_USERNAME: process.env.SMTP_USERNAME ? "✅" : "❌",
//                 SMTP_PASSWORD: process.env.SMTP_PASSWORD ? "✅ (hidden)" : "❌",
//             });
//             throw new Error("SMTP configuration missing. Set environment variables on Render.");
//         }

//         console.log("📧 SMTP Config:", {
//             host: process.env.SMTP_HOST,
//             port: process.env.SMTP_PORT,
//             username: process.env.SMTP_USERNAME,
//         });

//         // Remove quotes from password if present
//         const password = process.env.SMTP_PASSWORD?.replace(/^\"|\"$/g, '');

//         const transporter = nodemailer.createTransport({
//             host: process.env.SMTP_HOST,
//             port: parseInt(process.env.SMTP_PORT || 465),
//             secure: true,
//             auth: {
//                 user: process.env.SMTP_USERNAME,
//                 pass: password,
//             },
//             tls: {
//                 rejectUnauthorized: false,
//             },
//         });

//         // Test connection
//         console.log("🔍 Testing SMTP connection...");
//         await transporter.verify();
//         console.log("✅ SMTP connection verified");

//         const mailOptions = {
//             from: `"Quantum Works HR" <${process.env.SMTP_USERNAME}>`,
//             to: Array.isArray(to) ? to.join(", ") : to,
//             subject,
//             html,
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log("✅ Email sent successfully! Message ID:", info.messageId);
//         return info;
//     } catch (err) {
//         console.error("❌ Send email error:", err.message);
//         console.error("Full error:", err);
//         throw err;
//     }
// };

