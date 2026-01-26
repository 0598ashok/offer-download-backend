const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
    {
        employeeName: String,
        employeeEmail: String,
        filePath: String,

        token: String,
        expiresAt: Date,

        downloadCount: {
            type: Number,
            default: 0,
        },

        // 👇 NEW
        downloadHistory: [
            {
                email: String,
                downloadedAt: {
                    type: Date,
                    default: Date.now,
                },
                ip: String,
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
