import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { uploadOfferApi } from "../../api/apiList";
import AdminNavbar from "../../components/AdminNavbar";
import "./UploadOffer.css";

const UploadOffer = () => {
    const navigate = useNavigate();

    const [employeeName, setEmployeeName] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [offerFile, setOfferFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!employeeName || !employeeEmail || !offerFile) {
            toast.error("Please fill all fields ❌");
            return;
        }

        const formData = new FormData();
        formData.append("employeeName", employeeName);
        formData.append("employeeEmail", employeeEmail);
        formData.append("offerFile", offerFile);

        try {
            setLoading(true);
            await uploadOfferApi(formData);
            toast.success("Offer uploaded successfully 🎉");
            navigate("/admin/dashboard");
        } catch (err) {
            toast.error("Upload failed ❌");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader text="Uploading offer..." />;
    }

    return (
        <div className="upload-page-container">
            <div className="container-fluid" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
                <AdminNavbar />
            </div>
            <div className="offerUploadWrapper">
                <div className="offerUploadCard">

                    <h2 className="offerUploadTitle">Upload Offer Letter</h2>
                    <p className="offerUploadSubtitle">
                        Enter employee details and upload the offer letter (PDF format)
                    </p>

                    <form onSubmit={handleSubmit} className="offerUploadForm">

                        <div className="offerFieldBlock">
                            <label className="offerFieldLabel">Employee Name</label>
                            <input
                                type="text"
                                className="offerTextInput"
                                placeholder="Employee full name"
                                value={employeeName}
                                onChange={(e) => setEmployeeName(e.target.value)}
                            />
                        </div>

                        <div className="offerFieldBlock">
                            <label className="offerFieldLabel">Employee Email</label>
                            <input
                                type="email"
                                className="offerTextInput"
                                placeholder="Employee email address"
                                value={employeeEmail}
                                onChange={(e) => setEmployeeEmail(e.target.value)}
                            />
                        </div>

                        <div className="offerFieldBlock">
                            <label className="offerFieldLabel">Offer Letter (PDF)</label>
                            <input
                                type="file"
                                className="offerFileInput"
                                accept="application/pdf"
                                onChange={(e) => setOfferFile(e.target.files[0])}
                            />
                            <span className="offerFileNote">
                                Only PDF files are allowed
                            </span>
                        </div>

                        <div className="offerActionRow">
                            <button type="submit" className="offerSubmitBtn">
                                Upload Offer
                            </button>

                            <button
                                type="button"
                                className="offerCancelBtn"
                                onClick={() => navigate("/admin/dashboard")}
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadOffer;
