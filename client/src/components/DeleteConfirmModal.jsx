import React from "react";
import "./DeleteConfirmModal.css";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, employeeName }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h3 className="modal-title">Confirm Deletion</h3>

                <p className="modal-text">
                    Are you sure you want to delete the offer for
                    <strong> {employeeName}</strong>?
                </p>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>

                    <button className="delete-btn" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
