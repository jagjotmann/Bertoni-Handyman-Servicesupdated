import React from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import PageLayout from "../layouts/PageLayout";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Contact from "../components/Contact";
import InfoCards from "../components/InfoCards";

const Home = () => {
  //Makes sure that if we click services or testimonials while not on the home page, it goes to home page and scrolls to that section
  window.onload = function () {
    if (window.location.hash) {
      var hash = window.location.hash.substring(1);
      var element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView();
      }
    }
  };

  return (
    <PageLayout>
      <Hero />
      <InfoCards />
      <Services />
      <Testimonials />
      <CTA />
      <Contact />
    </PageLayout>
  );
};

export default Home;
