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

const sendEmail = async ({ to, subject, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        await transporter.sendMail({
            from: `"Quantum Works HR" <${process.env.SMTP_USERNAME}>`,
            to,
            subject,
            html,
        });

        console.log("✅ Email sent successfully!");
    } catch (err) {
        console.log("❌ Send email error:", err);
        throw err;
    }
};

module.exports = sendEmail;
