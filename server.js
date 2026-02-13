
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 4444;

app.use(cors({
    origin: "*", // React app
    credentials: true,
    exposedHeaders: ["Content-Type", "Content-Disposition"],
}));
app.use(express.json());


mongoose.connect("mongodb+srv://0598ashok:0598ashok@cluster0.mkzrh9f.mongodb.net/offerDownload?appName=Cluster0")
    .then(() => console.log('DB Connected'))
    .catch((error) => console.log(error));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const adminRoutes = require("./routes/admin.routes");
app.use("/api/admin", adminRoutes);

const offerRoutes = require("./routes/offer.routes");
app.use("/api/offer", offerRoutes);

// ✅ Email Preview Route
const offerEmailTemplate = require("./templates/offerEmailTemplate");

app.get("/preview-email", (req, res) => {
    const html = offerEmailTemplate({
        name: "Ashok Kumar",
        link: "https://example.com/offer/abc123",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 mins later
    });

    res.send(html);
});

app.listen(port,
    () => console.log(`Server Running at ${port}`));


