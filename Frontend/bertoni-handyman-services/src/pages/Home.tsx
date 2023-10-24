import React from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import PageLayout from "../layouts/PageLayout";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <PageLayout>
      <Hero />
      <Services />
      <Testimonials />
      <CTA />
      <Contact />
    </PageLayout>
  );
};

export default Home;
