import React from "react";
import logo from "./logo.svg";
import "./App.css";
import PageLayout from "./layouts/PageLayout";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/*Root component*/

function App() {
  return (
    <>
      <PageLayout>
        <Navbar />
        <Hero />
        <Services />
        <Testimonials />
        <CTA />
        <Contact />
        <Footer />
      </PageLayout>
    </>
  );
}

export default App;
