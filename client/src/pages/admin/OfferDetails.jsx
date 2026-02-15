import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import {
    getAllOffersApi,
    generateOfferLinkApi,
    SERVER,
} from "../../api/apiList";
import AdminNavbar from "../../components/AdminNavbar";
import "./OfferDetails.css";

const OfferDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [offer, setOffer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [linkData, setLinkData] = useState(null);

    const fetchOffer = async () => {
        try {
            setLoading(true);
            const res = await getAllOffersApi();
            const found = res.data.data.find((o) => o._id === id);
            if (!found) {
                toast.error("Offer not found ❌");
                navigate("/admin/dashboard");
                return;
            }
            setOffer(found);
        } catch (err) {
            toast.error("Failed to load offer ❌");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffer();
    }, [id]);

    const [generating, setGenerating] = useState(false);

    const handleGenerateLink = async () => {
        try {
            setGenerating(true);
            const res = await generateOfferLinkApi(id);
            setLinkData(res.data);
            toast.success("Secure offer link generated 🔗");
        } catch (err) {
            toast.error("Failed to generate link ❌");
        } finally {
            setGenerating(false);
        }
    };

    const handleCopy = () => {
        if (!linkData?.link) return;
        navigator.clipboard.writeText(linkData.link);
        toast.success("Link copied 📋");
    };

    if (loading) {
        return <Loader text="Loading offer details..." />;
    }

    const pdfUrl = `${SERVER}/${offer.filePath}`;


    const handleDownload = async () => {
        try {
            const response = await fetch(pdfUrl);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${offer.employeeName}_Offer_Letter.pdf`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            toast.error("Failed to download file ❌");
        }
    };


    return (
        <div className="p-3">
            <div className="container-fluid offerPageWrapper">
                {/* Header */}
                <AdminNavbar />
                <div className="row offerPageHeader">
                    <div className="col-lg-6">
                        <h2 className="offerPageTitle">Offer Letter Details</h2>
                        <p className="offerPageSub">
                            Review the uploaded offer letter, employee details and sharing options
                        </p>
                    </div>
                    <div className="col-lg-6" style={{ textAlign: "right" }}>
                        <button className="offerBackBtn" onClick={() => navigate(-1)}>
                            ← Back to Dashboard
                        </button>
                    </div>
                </div>

                <div className="row">
                    {/* LEFT – PDF PREVIEW (6 columns) */}
                    <div className="col-lg-7">
                        <div className="offerPdfCard">
                            <h5 className="sectionTitle">Offer Letter Preview</h5>

                            <div className="pdfFrameWrapper">
                                <iframe
                                    src={pdfUrl}
                                    title="Offer PDF"
                                    width="100%"
                                    height="520px"
                                />
                            </div>

                            {/* <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="offerDownloadBtn"
                            >
                                ⬇ Download Offer PDF
                            </a> */}
                            <button
                                className="offerDownloadBtn"
                                onClick={handleDownload}
                            >
                                ⬇ Download Offer PDF
                            </button>

                        </div>
                    </div>

                    {/* RIGHT – DETAILS + ACTIONS (6 columns) */}
                    <div className="col-lg-5">
                        {/* Employee Details */}
                        <div className="infoCard">
                            <h5 className="sectionTitle">Employee Information</h5>

                            <div className="infoRow">
                                <span>Name</span>
                                <strong>{offer.employeeName}</strong>
                            </div>

                            <div className="infoRow">
                                <span>Email</span>
                                <strong>{offer.employeeEmail}</strong>
                            </div>

                            <div className="infoRow">
                                <span>Uploaded On</span>
                                <strong>
                                    {new Date(offer.createdAt).toLocaleDateString("en-GB")}
                                </strong>
                            </div>

                            <div className="infoRow">
                                <span>Download Count</span>
                                <strong>{offer.downloadCount}</strong>
                            </div>
                        </div>

                        {/* Offer Link Section */}
                        <div className="linkCard">
                            <h5 className="sectionTitle">Share Offer Securely</h5>
                            <p className="linkInfoText">
                                Generate a time-limited secure link to share this offer letter
                                with the employee.
                            </p>

                            <button
                                className="generateLinkBtn"
                                onClick={handleGenerateLink}
                                disabled={generating}
                                style={{ opacity: generating ? 0.7 : 1, cursor: generating ? "not-allowed" : "pointer" }}
                            >
                                {generating ? "Generating..." : "Generate Secure Link"}
                            </button>

                            {linkData && (
                                <div className="generatedLinkBox">
                                    <p className="generatedLink">{linkData.link}</p>

                                    <button
                                        className="copyLinkBtn"
                                        onClick={handleCopy}
                                    >
                                        Copy Link
                                    </button>

                                    <p className="linkExpiry">
                                        Expires on:{" "}
                                        {new Date(linkData.expiresAt).toLocaleString("en-IN")}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* DOWNLOAD HISTORY */}
                        <div className="historyCard">
                            <h5 className="sectionTitle">Download History</h5>

                            {offer.downloadHistory.length === 0 ? (
                                <p className="noHistoryText">No downloads yet</p>
                            ) : (
                                <table className="table table-sm table-bordered historyTable">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Email</th>
                                            <th>Date & Time</th>
                                            {/* <th>IP</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {offer.downloadHistory.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.email}</td>
                                                <td>
                                                    {new Date(item.downloadedAt).toLocaleString("en-IN")}
                                                </td>
                                                {/* <td>{item.ip || "—"}</td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferDetails;
