import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PageLayout from "./layouts/PageLayout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import GetAQuote from "./pages/GetAQuote";

/*Root component*/

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-a-quote" element={<GetAQuote />} />
          <Route path="/contact" element={<h1>Contact page</h1>} />
          <Route path="/signin" element={<h1>Sign in page</h1>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
