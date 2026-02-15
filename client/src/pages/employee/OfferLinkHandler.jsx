import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { validateOfferLinkApi } from "../../api/apiList";

const OfferLinkHandler = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current === false) {
            validateLink();
            return () => {
                effectRan.current = true;
            };
        }
    }, []);

    const validateLink = async () => {
        try {
            const res = await validateOfferLinkApi(token);

            if (res.data.success) {
                toast.success("Link verified ✅");
                // 👉 Go to employee login
                navigate(`/employee/login/${token}`);
            }
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Offer link expired or invalid ❌"
            );
            // Optional: redirect to error page later
        }
    };

    return <Loader text="Verifying offer link..." />;
};

export default OfferLinkHandler;
