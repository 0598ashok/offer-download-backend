import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AdminNavbar.css';

const AdminNavbar = () => {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem("adminToken");
        toast.success("Logged out successfully 👋");
        navigate("/admin/login");
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    return (
        <>
            <div className="admin-navbar">
                <div className="navbar-logo">
                    <img src="https://res.cloudinary.com/dprcylred/image/upload/v1741844880/ouqiqnp42ej1phq62eho.png" alt="Offer Management System" />
                </div>
                <button className="logout-btn" onClick={handleLogoutClick}>
                    Logout <i className="ri-logout-box-r-line"></i>
                </button>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="logoutModalOverlay">
                    <div className="logoutModalBox">
                        <h3 className="logoutModalTitle">Confirm Logout</h3>
                        <p className="logoutModalText">
                            Are you sure you want to logout? 🔒
                        </p>
                        <div className="logoutModalActions">
                            <button className="logoutConfirmBtn" onClick={confirmLogout}>
                                Yes, Logout
                            </button>
                            <button className="logoutCancelBtn" onClick={cancelLogout}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminNavbar;
