import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Congratulations.css";

const Congratulations = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { token, email } = location.state || {};

    const [waiting, setWaiting] = useState(false);
    const [seconds, setSeconds] = useState(5);

    const handleViewOffer = () => {
        setWaiting(true);
        setSeconds(5);
    };

    // ✅ Hook always runs (no conditional)
    useEffect(() => {
        if (!waiting) return;

        if (seconds === 0) {
            navigate(`/employee/offer-view/${token}`);
            return;
        }

        const timer = setTimeout(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [waiting, seconds, navigate, token]);

    // ✅ Conditional UI rendering (NOT hook)
    if (!token) {
        return (
            <div className="congratsWrapper">
                <div className="congratsCard">
                    <h2 className="invalidTitle">Invalid Access ❌</h2>
                    <p className="invalidText">
                        Please use the secure offer link sent to your email.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="congratsWrapper">
            <div className="congratsCard">

                <h1 className="congratsTitle">🎉 Congratulations!</h1>

                <p className="congratsText">
                    Welcome aboard
                    <br /> <strong>{email}</strong>
                </p>

                <p className="congratsSubText">
                    We are excited to have you join our team.
                    Your offer letter is now ready for review.
                </p>

                <button
                    className="congratsButton"
                    onClick={handleViewOffer}
                    disabled={waiting}
                >
                    View Offer Letter
                </button>

                {/* ⏳ WAIT MESSAGE + LOADER */}
                {waiting && (
                    <div className="waitSection">
                        {/* <div className="loader"></div> */}
                        <div className="loader"></div>
                        <p className="waitText">
                            Please wait <strong>0{seconds}</strong> seconds…
                        </p>
                    </div>
                )}

                <p className="congratsFooter">
                    This is a secure page. Please do not share your access link.
                </p>

            </div>
        </div>
    );
};

export default Congratulations;
