import axios from "axios";

// export const SERVER = "http://localhost:4444";
export const SERVER = "http://13.62.57.188:10000";
// 🔗 Backend base URL
// export const SERVER = "https://offer-download-backend-gaxm.onrender.com";
const API = axios.create({
  baseURL: SERVER,
});

// 🔐 Attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ================= ADMIN APIs =================

export const adminLoginApi = (data) => API.post("/api/admin/login", data);

// ================= OFFER APIs =================

// Upload offer
export const uploadOfferApi = (formData) =>
  API.post("/api/offer/upload-offer", formData);

// Get all offers
export const getAllOffersApi = () => API.get("/api/offer/list");

// Get offer details
export const getOfferDetailsApi = (id) => API.get(`/api/offer/details/${id}`);

// Generate offer link
export const generateOfferLinkApi = (offerId) =>
  API.post(`/api/offer/generate-link/${offerId}`);

// Delete offer
export const deleteOfferApi = (offerId) =>
  API.delete(`/api/offer/delete/${offerId}`);

// ================= EMPLOYEE APIs =================

// Validate offer link
export const validateOfferLinkApi = (token) =>
  API.get(`/api/offer/validate/${token}`);

// Verify employee email
export const verifyEmployeeEmailApi = (token, email) =>
  API.post(`/api/offer/verify-email/${token}`, { email });

// Inline view + history
export const downloadOfferApi = (token) =>
  API.get(`/api/offer/download/${token}`, {
    responseType: "blob",
  });

// Force download
export const downloadOfferFileApi = (token) =>
  API.get(`/api/offer/download-file/${token}`, {
    responseType: "blob",
  });
