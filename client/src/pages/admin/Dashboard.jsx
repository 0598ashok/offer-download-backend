import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import {
    getAllOffersApi,
    deleteOfferApi,
} from "../../api/apiList";
import AdminNavbar from "../../components/AdminNavbar";
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();

    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedOfferId, setSelectedOfferId] = useState(null);


    // 📄 Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    // 🔹 Fetch offers
    const fetchOffers = async () => {
        try {
            setLoading(true);
            const res = await getAllOffersApi();
            setOffers(res.data.data || []);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                toast.error("Session expired. Please login again 🔒");
                localStorage.removeItem("adminToken");
                navigate("/admin/login");
            } else {
                toast.error("Failed to load offers ❌");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    // 🔄 Reset page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    // 🗑️ Delete offer
    // const handleDelete = async (id) => {
    //     const confirm = window.confirm(
    //         "Are you sure you want to delete this offer?"
    //     );
    //     if (!confirm) return;

    //     try {
    //         await deleteOfferApi(id);
    //         toast.success("Offer deleted successfully 🗑️");
    //         fetchOffers();
    //     } catch (err) {
    //         toast.error("Failed to delete offer ❌");
    //     }
    // };

    const openDeleteModal = (id) => {
        setSelectedOfferId(id);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setSelectedOfferId(null);
        setShowDeleteModal(false);
    };

    const confirmDelete = async () => {
        try {
            await deleteOfferApi(selectedOfferId);
            toast.success("Offer deleted successfully 🗑️");
            fetchOffers();
        } catch (err) {
            toast.error("Failed to delete offer ❌");
        } finally {
            closeDeleteModal();
        }
    };



    // 🔍 Search filter
    const filteredOffers = offers.filter((offer) => {
        const value = search.toLowerCase();

        const nameMatch = offer.employeeName
            ?.toLowerCase()
            .includes(value);

        const emailMatch = offer.employeeEmail
            ?.toLowerCase()
            .includes(value);

        const dateMatch = new Date(offer.createdAt)
            .toLocaleDateString()
            .toLowerCase()
            .includes(value);

        return nameMatch || emailMatch || dateMatch;
    });

    // 📄 Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentOffers = filteredOffers.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);

    if (loading) {
        return <Loader text="Loading offers..." />;
    }

    return (
        <div className="container-fluid">

            <div className="admin-dashboard">
                <AdminNavbar />
                {/* HEADER */}
                <div className="dashboard-header">

                    <div>
                        <h2>Offer Upload List</h2>
                        <p className="dashboard-subtext">
                            View, search and manage uploaded offer letters
                        </p>
                    </div>

                    <button
                        className="upload-btn"
                        onClick={() => navigate("/admin/upload-offer")}
                    >
                        + Upload New Offer
                    </button>
                </div>

                {/* SEARCH */}
                <div className="row mb-3">
                    <div className="col-md-4 ml-auto">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Search by name, email or date..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* TABLE */}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Uploaded On</th>
                            <th>Downloads</th>
                            <th style={{ textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentOffers.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    No matching offers found
                                </td>
                            </tr>
                        ) : (
                            currentOffers.map((offer, index) => (
                                <tr key={offer._id}>
                                    <td>{index + 1}</td>
                                    <td style={{ textTransform: "capitalize" }}>{offer.employeeName}</td>
                                    <td style={{ textTransform: "lowercase" }}>{offer.employeeEmail}</td>
                                    <td >
                                        {new Date(offer.createdAt).toLocaleDateString("en-GB")}

                                    </td>
                                    <td>{offer.downloadCount}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <button
                                            className="view-btn"
                                            onClick={() =>
                                                navigate(`/admin/offer/${offer._id}`)
                                            }
                                        >
                                            View
                                        </button>

                                        <button
                                            className="delete-btn ml-2"
                                            onClick={() => openDeleteModal(offer._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <nav>
                        <ul className="pagination justify-content-end">

                            <li
                                className={`page-item ${currentPage === 1 ? "disabled" : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage(currentPage - 1)
                                    }
                                >
                                    Previous
                                </button>
                            </li>

                            {[...Array(totalPages)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1
                                        ? "active"
                                        : ""
                                        }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() =>
                                            setCurrentPage(index + 1)
                                        }
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}

                            <li
                                className={`page-item ${currentPage === totalPages
                                    ? "disabled"
                                    : ""
                                    }`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                >
                                    Next
                                </button>
                            </li>

                        </ul>
                    </nav>
                )}

                {/* // Delete Modal */}
                {showDeleteModal && (
                    <div className="deleteModalOverlay">
                        <div className="deleteModalBox">

                            <h3 className="deleteModalTitle">Delete Offer</h3>
                            <p className="deleteModalText">
                                Are you sure you want to delete this offer letter?
                                {/* <br />This action cannot be undone. */}
                            </p>

                            <div className="deleteModalActions">
                                <button
                                    className="deleteConfirmBtn"
                                    onClick={confirmDelete}
                                >
                                    Yes, Delete
                                </button>

                                <button
                                    className="deleteCancelBtn"
                                    onClick={closeDeleteModal}
                                >
                                    Cancel
                                </button>
                            </div>

                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default Dashboard;
