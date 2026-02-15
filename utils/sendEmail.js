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
require("dotenv").config();

const sendEmail = async ({ to, subject, html }) => {
    try {
        const host = process.env.SMTP_HOST || process.env.MAIL_HOST;
        const port = parseInt(
            process.env.SMTP_PORT || process.env.MAIL_PORT || "587",
            10
        );
        const user = process.env.SMTP_USER || process.env.MAIL_USER;
        const rawPassword =
            process.env.SMTP_PASS ||
            process.env.MAIL_PASS ||
            process.env.MAIL_PASSWORD;

        if (!host || !user || !rawPassword) {
            throw new Error("SMTP environment variables missing");
        }

        // 🔥 IMPORTANT LOG
        console.log("📧 Using mail config:", {
            host,
            port,
            user: "✅",
            secure: port === 465,
        });

        const password = rawPassword.replace(/^"|"$/g, "");

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: port === 465,   // ✅ AUTO FIX
            auth: {
                user,
                pass: password,
            },
            tls: {
                rejectUnauthorized: false, // ✅ helps on Render
            },
        });

        console.log("🔍 Testing SMTP connection...");
        await transporter.verify();
        console.log("✅ SMTP connection verified");

        const info = await transporter.sendMail({
            from: `"Quantum Works HR" <${user}>`,
            to: Array.isArray(to) ? to.join(",") : to,
            subject,
            html,
        });

        console.log("✅ Email sent:", info.messageId);
        return info;
    } catch (err) {
        console.error("❌ Send email error:", err.message);
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

