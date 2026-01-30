const Offer = require("../models/Offer.model");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const sendEmail = require("../utils/sendEmail");
const offerEmailTemplate = require("../utils/offerEmailTemplate");


exports.uploadOffer = async (req, res) => {
    try {
        const { employeeName, employeeEmail } = req.body;

        if (!employeeName || !employeeEmail || !req.file) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 🔍 CHECK DUPLICATE EMAIL
        const existingOffer = await Offer.findOne({ employeeEmail });
        if (existingOffer) {
            return res.status(409).json({
                success: false,
                message: "Offer for this email already exists!",
            });
        }

        const offer = await Offer.create({
            employeeName,
            employeeEmail,
            filePath: req.file.path,
            originalFileName: req.file.originalname,
        });

        res.status(201).json({
            success: true,
            message: "Offer uploaded successfully",
            data: offer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Upload failed",
        });
    }
};


exports.getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: offers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch offers",
        });
    }
};




/**
 * VALIDATE OFFER LINK (Employee)
 */
exports.validateOfferLink = async (req, res) => {
    try {
        const { token } = req.params;

        const offer = await Offer.findOne({ token });

        if (!offer) {
            return res.status(404).json({
                success: false,
                valid: false,
                message: "Invalid link",
            });
        }

        // check expiry
        if (offer.expiresAt && new Date() > offer.expiresAt) {
            return res.status(410).json({
                success: false,
                valid: false,
                message: "Link expired",
            });
        }

        res.status(200).json({
            success: true,
            valid: true,
            message: "Link is valid",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            valid: false,
            message: "Server error",
        });
    }
};


/**
 * DOWNLOAD OFFER (Employee)
 */
// exports.downloadOffer = async (req, res) => {
//     try {
//         const { token } = req.params;

//         const offer = await Offer.findOne({ token });
//         if (!offer) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Invalid link",
//             });
//         }

//         // check expiry
//         if (offer.expiresAt && new Date() > offer.expiresAt) {
//             return res.status(410).json({
//                 success: false,
//                 message: "Link expired",
//             });
//         }

//         const filePath = path.resolve(offer.filePath);

//         if (!fs.existsSync(filePath)) {
//             return res.status(404).json({
//                 success: false,
//                 message: "File not found",
//             });
//         }

//         // increment download count
//         offer.downloadCount += 1;
//         await offer.save();

//         // download file
//         res.download(filePath, offer.originalFileName);
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Download failed",
//         });
//     }
// };


/**
 * DELETE OFFER (Admin)
 */
exports.deleteOffer = async (req, res) => {
    try {
        const { id } = req.params;

        const offer = await Offer.findById(id);
        if (!offer) {
            return res.status(404).json({
                success: false,
                message: "Offer not found",
            });
        }

        const fs = require("fs");
        const path = require("path");

        if (offer.filePath) {
            const filePath = path.resolve(offer.filePath);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await Offer.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Offer deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Delete failed",
        });
    }
};



// verify employeeEmail

exports.verifyEmployeeEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const { email } = req.body;

        const offer = await Offer.findOne({ token });

        if (!offer) {
            return res.status(404).json({
                success: false,
                message: "Invalid or expired link",
            });
        }

        if (offer.employeeEmail !== email) {
            return res.status(401).json({
                success: false,
                message: "Email does not match offer records",
            });
        }

        res.json({
            success: true,
            message: "Email verified",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


/* ===========================
   DOWNLOAD OFFER (INLINE PDF)
=========================== */
// exports.downloadOffer = async (req, res) => {
//     try {
//         const { token } = req.params;

//         const offer = await Offer.findOne({ token });
//         if (!offer) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Invalid or expired link",
//             });
//         }

//         // increment download count
//         offer.downloadCount += 1;
//         await offer.save();

//         const filePath = path.resolve(offer.filePath);

//         // 🔥 IMPORTANT HEADERS
//         res.setHeader("Content-Type", "application/pdf");
//         res.setHeader(
//             "Content-Disposition",
//             "inline; filename=offer-letter.pdf"
//         );

//         res.sendFile(filePath);
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to load offer",
//         });
//     }
// };


exports.downloadOffer = async (req, res) => {
    try {
        const { token } = req.params;

        const offer = await Offer.findOne({ token });
        if (!offer) {
            return res.status(404).json({
                success: false,
                message: "Invalid or expired link",
            });
        }

        // 👇 Increment count
        offer.downloadCount += 1;

        // 👇 Push history
        offer.downloadHistory.push({
            email: offer.employeeEmail,
            ip: req.ip,
        });

        await offer.save();

        const filePath = path.resolve(offer.filePath);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            "inline; filename=offer-letter.pdf"
        );

        res.sendFile(filePath);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to load offer",
        });
    }
};


/**
 * DOWNLOAD OFFER (FORCE DOWNLOAD)
 */
exports.downloadOfferFile = async (req, res) => {
    try {
        const { token } = req.params;

        const offer = await Offer.findOne({ token });
        if (!offer) {
            return res.status(404).json({
                success: false,
                message: "Invalid or expired link",
            });
        }

        const filePath = path.resolve(offer.filePath);

        // 🔥 FORCE DOWNLOAD
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=offer-letter.pdf"
        );

        res.sendFile(filePath);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Download failed",
        });
    }
};



// GET OFFER BY ID

exports.getOfferById = async (req, res) => {
    try {
        const { id } = req.params;

        const offer = await Offer.findById(id);
        if (!offer) {
            return res.status(404).json({
                success: false,
                message: "Offer not found",
            });
        }

        res.json({
            success: true,
            data: offer,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch offer",
        });
    }
};


exports.generateOfferLink = async (req, res) => {
    try {
        const { id } = req.params;

        const offer = await Offer.findById(id);
        if (!offer) {
            return res.status(404).json({
                success: false,
                message: "Offer not found",
            });
        }

        const token = crypto.randomBytes(32).toString("hex");

        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 48);
        // expiresAt.setMinutes(expiresAt.getMinutes() + 5);


        offer.token = token;
        offer.expiresAt = expiresAt;
        await offer.save();

        const offerLink = `http://localhost:3000/employee/offer/${token}`;

        // ✅ SEND EMAIL (To Employee & Admin)
        try {
            await sendEmail({
                to: [offer.employeeEmail, process.env.MAIL_USER], // Send to both
                subject: "Your Offer Letter – Quantum Works",
                html: offerEmailTemplate({
                    name: offer.employeeName,
                    link: offerLink,
                    expiresAt,
                }),
            });
            console.log("Email sent successfully to:", offer.employeeEmail);
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
            // Don't fail the whole request, but maybe warn?
            // Actually, we should probably return success but with a warning.
            return res.status(200).json({
                success: true,
                link: offerLink,
                expiresAt,
                message: "Offer link generated, but email failed to send. Please check server logs.",
            });
        }

        res.status(200).json({
            success: true,
            link: offerLink,
            expiresAt,
            message: "Offer link generated & email sent",
        });
    } catch (error) {
        console.error("Generate Link Critical Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to generate offer link (Server Error)",
        });
    }
};
