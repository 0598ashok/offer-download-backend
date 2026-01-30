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

        // 🔥 IMPORTANT FIX
        downloadHistory: {
            type: [
                {
                    email: String,
                    downloadedAt: {
                        type: Date,
                        default: Date.now,
                    },
                    ip: String,
                },
            ],
            default: [], // 👈 THIS LINE SAVES YOU
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema);
