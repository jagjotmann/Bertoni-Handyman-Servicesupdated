import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PageLayout from "./layouts/PageLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import NavbarWrapper from "./components/NavbarWrapper";
import QuoteRequests from "./pages/QuoteRequests";

/*Root component*/

function App() {
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
            <Route path="/chat" element={<Chat />} />
            <Route path="/quote-login/:quoteid" element={<QuoteLogin />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/create-account-success"
              element={<CreateAccountSuccess />}
            />
            <Route path="/admin" element={<AdminPage />} />
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
          </Routes>
          <Footer />
        </div>
      </Router>
    </NextUIProvider>
  );
}

export default App;
