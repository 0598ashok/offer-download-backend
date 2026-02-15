import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyEmployeeEmailApi } from "../../api/apiList";
import "./Login.css";

const Login = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email ❌");
            return;
        }

        setLoading(true);

        try {
            const res = await verifyEmployeeEmailApi(token, email);

            if (res.data.success) {
                toast.success("Email verified successfully 🎉");
                navigate("/employee/congratulations", {
                    state: { token, email },
                });
            }
        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                "Email does not match this offer ❌"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="employeeLoginWrapper">
            <div className="employeeLoginCard">

                {/* Logo */}
                <div className="loginLogoBox">
                    <img
                        src="https://res.cloudinary.com/dprcylred/image/upload/v1741844880/ouqiqnp42ej1phq62eho.png"
                        alt="Company Logo"
                    />
                </div>

                {/* Content */}
                <h2 className="loginTitle">Employee Verification</h2>
                <p className="loginSubtitle">
                    Please verify your email address to securely access
                    your offer letter.
                </p>

                <form onSubmit={handleSubmit} className="employeeLoginForm">
                    <label className="loginLabel">Email Address</label>

                    <input
                        type="email"
                        className="loginInput"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="loginSubmitBtn"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Continue"}
                    </button>
                </form>

                <p className="loginFooterText">
                    This link is secure and intended only for the recipient of the
                    offer letter.
                </p>
            </div>
        </div>
    );
};

export default Login;
