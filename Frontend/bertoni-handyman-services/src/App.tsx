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
import Signin from "./pages/Signin";
import ContactPage from "./pages/ContactPage";
import ThankYou from "./pages/ThankYou";
import Chat from "./pages/Chat";
import QuoteLogin from "./pages/QuoteLogin";
import CreateAccount from './pages/CreateAccount';
import CreateAccountSuccess from './pages/CreateAccountSuccess'
import AdminPage from "./pages/AdminPage";


/*Root component*/

function App() {
  return (
    <NextUIProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/get-a-quote" element={<GetAQuote />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/ThankYou" element={<ThankYou />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/QuoteLogin" element={<QuoteLogin />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/create-account-success" element={<CreateAccountSuccess />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </NextUIProvider>
  );
}

export default App;
