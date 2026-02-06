require("dotenv").config();
const nodemailer = require("nodemailer");

async function checkEmail() {
    console.log("Checking Email Configuration (Hostinger)...");
    console.log("SMTP User:", process.env.SMTP_USERNAME);
    console.log("SMTP Pass (exists?):", !!process.env.SMTP_PASSWORD);

    if (!process.env.SMTP_USERNAME || !process.env.SMTP_PASSWORD) {
        console.error("❌ Missing required .env variables for SMTP");
        return;
    }

    try {
        const password = process.env.SMTP_PASSWORD?.replace(/^\"|\"$/g, '');

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || 465),
            secure: true,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: password,
            },
        });

        // Verify connection configuration
        await transporter.verify();
        console.log("✅ Server is ready to take our messages");

        // Attempt to send
        const info = await transporter.sendMail({
            from: `"Test Worker" <${process.env.SMTP_USERNAME}>`,
            to: process.env.SMTP_USERNAME, // Send to self
            subject: "Test Email from Backend (Hostinger)",
            text: "If you see this, Hostinger SMTP is working!",
        });

        console.log("✅ Message sent: %s", info.messageId);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
}

checkEmail();
