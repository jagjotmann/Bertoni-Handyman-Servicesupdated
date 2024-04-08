import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PageLayout from "./layouts/PageLayout";
import { ReactNode } from 'react';
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import GetAQuote from "./pages/GetAQuote";
import Login from "./pages/Login";
import ContactPage from "./pages/ContactPage";
import ThankYou from "./pages/ThankYou";
import Chat from "./pages/Chat";
import QuoteLogin from "./pages/QuoteLogin";
import CreateAccount from "./pages/CreateAccount";
import CreateAccountSuccess from "./pages/CreateAccountSuccess";
import AdminPage from "./pages/AdminPage";
import AdminClientProfile from "./pages/AdminClientProfile";
import ClientProfileAlternateView from "./pages/ClientProfileAlternateView";
import CreateQuote from "./pages/CreateQuote";
import QuoteForm from "./pages/CreateQuote";
import AddTestimonial from "./pages/AddTestimonial";
import QuoteStatus from "./pages/QuoteStatus";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NavbarWrapper from "./components/NavbarWrapper";
import QuoteRequests from "./pages/QuoteRequests";
import ScheduleAppointment from "./components/ScheduleAppointment";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import PageNotFound from "./pages/PageNotFound";
/*Root component*/

function App() {

// Define a type for the props expected by ProtectedRoute
type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check for token in localStorage
  const token = localStorage.getItem('token');
  
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the children components
  return <>{children}</>;
};

  return (
    <NextUIProvider>
      <Router>
        <div>
          <NavbarWrapper />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/get-a-quote" element={<GetAQuote />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/login" element={<Login />} />
            <Route path="/quoteStatus" element={<QuoteStatus />} />
            <Route path="/schedule" element={<ScheduleAppointment />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/quote-login/:quoteid" element={<QuoteLogin />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/Reset-Password" element={<ResetPassword />} />
            <Route
              path="/create-account-success"
              element={<CreateAccountSuccess />}
            />
            {/* <Route path="/admin" element={<AdminPage />} /> */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route path="/quote-requests" element={<QuoteRequests />} />
            <Route
              path="/admin-client-profile"
              element={<AdminClientProfile />}
            />
            <Route
              path="/client-profile-Alternate-View"
              element={<ClientProfileAlternateView />}
            />
            <Route path="/create-a-quote/:quoteId" element={<CreateQuote />} />
            <Route path="/add-testimonial" element={<AddTestimonial />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </NextUIProvider>
  );
}

export default App;