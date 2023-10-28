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
import QuoteLogin from "./pages/QuoteLogin";

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
            <Route path="/QuoteLogin" element={<QuoteLogin />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </NextUIProvider>
  );
}

export default App;
