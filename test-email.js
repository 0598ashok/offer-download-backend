require("dotenv").config();
const nodemailer = require("nodemailer");

async function checkEmail() {
    console.log("Checking Email Configuration (Gmail)...");
    console.log("User:", process.env.MAIL_USER);
    console.log("Pass (exists?):", !!process.env.MAIL_PASS);

    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
        console.error("❌ Missing required .env variables for Gmail");
        return;
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // Verify connection configuration
        await transporter.verify();
        console.log("✅ Server is ready to take our messages");

        // Attempt to send
        const info = await transporter.sendMail({
            from: `"Test Worker" <${process.env.MAIL_USER}>`,
            to: process.env.MAIL_USER, // Send to self
            subject: "Test Email from Backend (Gmail)",
            text: "If you see this, Gmail is working!",
        });

        console.log("✅ Message sent: %s", info.messageId);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
}

checkEmail();
