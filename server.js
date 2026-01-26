
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 4444;

app.use(cors({
    origin: "http://localhost:3000", // React app
    credentials: true,
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



app.listen(port,
    () => console.log(`Server Running at ${port}`));
