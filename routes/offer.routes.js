const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const {
    uploadOffer,
    getAllOffers,
    generateOfferLink,
    validateOfferLink,
    downloadOffer,
    deleteOffer,
    verifyEmployeeEmail,
    downloadOfferFile,
    getOfferById
} = require("../controllers/offer.controller");

router.post(
    "/upload-offer",
    upload.single("offerFile"),
    uploadOffer
);

router.get("/list", getAllOffers);

router.post("/generate-link/:id", generateOfferLink);

router.get("/validate/:token", validateOfferLink);

// 📥 Download offer
router.get("/download/:token", downloadOffer);

// 🗑️ Delete offer
router.delete("/delete/:id", deleteOffer);

router.post("/verify-email/:token", verifyEmployeeEmail);

router.get("/download-file/:token", downloadOfferFile);

router.get("/offer/:id", getOfferById);



module.exports = router;
