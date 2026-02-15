import React from 'react'
import Loader from './components/Loader'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OfferLinkHandler from './pages/employee/OfferLinkHandler'
import Login from './pages/employee/Login'
import Congratulations from './pages/employee/Congratulations'
import ViewOffer from './pages/employee/ViewOffer'
import { Navigate } from 'react-router-dom'
//Admin
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import UploadOffer from "./pages/admin/UploadOffer";
import OfferDetails from "./pages/admin/OfferDetails";
import NotFound from './pages/NotFound';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          {/* Default */}
          <Route path="/" element={<Navigate to="/admin/login" />} />
          {/* Loader */}
          <Route path="/loader" element={<Loader />} />
          {/* Employee */}
          <Route path="/employee/offer/:token" element={<OfferLinkHandler />} />
          <Route path="/employee/login/:token" element={<Login />} />
          <Route path="/employee/congratulations" element={<Congratulations />} />
          <Route
            path="/employee/offer-view/:token"
            element={<ViewOffer />}
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/upload-offer" element={<UploadOffer />} />
          <Route path="/admin/offer/:id" element={<OfferDetails />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App