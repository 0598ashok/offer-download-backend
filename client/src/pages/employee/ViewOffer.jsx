import React from "react";
import { useParams } from "react-router-dom";
import { SERVER } from "../../api/apiList";
import "./ViewOffer.css";

const ViewOffer = () => {
    const { token } = useParams();

    const pdfUrl = `${SERVER}/api/offer/download/${token}`;
    const downloadUrl = `${SERVER}/api/offer/download-file/${token}`;

    return (
        <div className="container-fluid viewOfferWrapper">
            <div className="row justify-content-center">
                <div className="col-xl-10">

                    {/* Header */}
                    <div className="viewOfferHeader">
                        <h2 className="viewOfferTitle">📄 Offer Letter</h2>
                        <p className="viewOfferSub">
                            Please review your offer letter carefully and download it for
                            future reference.
                        </p>
                    </div>

                    <div className="row g-4">
                        {/* LEFT – OFFER PREVIEW (6 columns) */}
                        <div className="col-lg-6 ">
                            <div className="offerPreviewCard">
                                <h5 className="sectionTitle">Offer Letter Preview</h5>

                                <div className="offerPdfViewer">
                                    <object
                                        data={pdfUrl}
                                        type="application/pdf"
                                        width="100%"
                                        height="520px"
                                    >
                                        <p>
                                            PDF cannot be displayed.
                                            <a href={downloadUrl}> Download instead</a>
                                        </p>
                                    </object>
                                </div>

                                <a
                                    href={downloadUrl}
                                    className="offerDownloadBtn"
                                >
                                    ⬇ Download Offer Letter
                                </a>
                            </div>
                        </div>

                        {/* RIGHT – INFO / CONTENT (6 columns) */}
                        <div className="col-lg-6">
                            <div className="offerInfoCard">
                                <h5 className="sectionTitle">Important Information</h5>

                                <p className="infoText">
                                    Congratulations on your selection! This offer letter contains
                                    important details regarding your role, compensation structure,
                                    joining date, and applicable company policies. We request you to
                                    review all information carefully.
                                </p>

                                <ul className="infoList" style={{ listStyleType: "none" }}>
                                    <li>✔ Please review all terms and conditions carefully</li>
                                    <li>✔ Download and save a copy of the offer letter for future reference</li>
                                    <li>✔ This offer link is secure and uniquely generated for you</li>
                                    <li>✔ Do not share this offer link with others</li>
                                    <li>✔ The offer letter is subject to company policies and guidelines</li>
                                </ul>

                                <div className="infoNote">
                                    If you have any questions, doubts, or require further clarification
                                    regarding this offer letter or the onboarding process, please feel
                                    free to reach out to our HR team at
                                    <strong>  <a href="mailto:hr@quantumworks.in" style={{ color: "#2287c5" }}>hr@quantumworks.in</a></strong>.
                                </div>
                            </div>

                            <div className="offerSupportCard">
                                <h6>Need Help?</h6>
                                <p>
                                    Our HR team is always available to assist you with any queries
                                    related to your offer letter, onboarding process, or next steps.
                                </p>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewOffer;
