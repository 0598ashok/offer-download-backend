import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { adminLoginApi } from "../../api/apiList";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await adminLoginApi({ email, password });

            if (res.status === 200 && res.data.success === true) {
                localStorage.setItem("adminToken", res.data.token); // 💾 Save token
                toast.success("Login successful ✅");
                navigate("/admin/dashboard");
            }
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Invalid email or password ❌"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader text="Signing you in..." />;
    }

    return (
        <div className="container-fluid admin-login-container">
            {/* <form className="admin-login-card" onSubmit={handleSubmit}>
                <h2 className="admin-login-title">Admin Login</h2>

                <input
                    type="email"
                    className="admin-login-input"
                    placeholder="Admin Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    className="admin-login-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="admin-login-button">
                    Login
                </button>
            </form> */}

            <div className="row">

                <div className="col-12">

                    <div className="admin-login-form">
                        <div className="admin-login-image">
                            <img src="https://res.cloudinary.com/dprcylred/image/upload/v1741844880/ouqiqnp42ej1phq62eho.png" alt="logo" className="img-fluid admin-login-image" />
                        </div>

                        <form onSubmit={handleSubmit} >
                            <h3 className="admin-login-heading">Offer Management System</h3>
                            <p className="admin-login-subtext">
                                Securely upload offer letters, send unique links to employees,
                                and track downloads.
                            </p>
                            <div className="form-group">
                                <label for="username">Enter Email</label>
                                <input type="text" className="form-control" id="username" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                            </div>
                            <div className="form-group password-wrapper">
                                <label htmlFor="password">Enter Password</label>

                                <div className="password-input">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                    <span
                                        className="eye-icon"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {/* {showPassword ? "🙈" : "👁️"} */}
                                        {showPassword ? <i class="ri-eye-off-line"></i> : <i class="ri-eye-fill"></i>}
                                    </span>
                                </div>
                            </div>
                            <button type="submit" className="admin-login-button">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
