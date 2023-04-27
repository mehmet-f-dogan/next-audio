import React from "react";
import HeroSlider from "@/components/sliders/HeroSlider";
import FeaturedSlider from "@/components/sliders/FeaturedSlider";
import SectionsHead from "@/components/common/SectionsHead";
import TopProducts from "@/components/product/TopProducts";

const Home = () => {
  return (
    <main>
      <section id="hero">
        <HeroSlider />
      </section>

      <section id="featured" className="section">
        <div className="container">
          <SectionsHead heading="Featured Products" />
          <FeaturedSlider />
        </div>
      </section>

      <section id="products" className="section">
        <div className="container">
          <SectionsHead heading="Top Products" />
          <TopProducts />
        </div>
      </section>
    </main>
  );
};

export default Home;
