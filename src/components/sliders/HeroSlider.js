import React, { useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper";
import { displayMoney } from "@/helpers/utils";
import { searchProducts } from "@/helpers/api";

const HeroSlider = () => {
  const [heroProducts, setHeroProducts] = React.useState([]);

  useEffect(() => {
    searchProducts({ tags: ["hero"] }).then((data) => {
      setHeroProducts(data);
    });
  }, []);

  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay]}
      loop={true}
      speed={400}
      spaceBetween={100}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      {heroProducts.map((item, i) => {
        const { id, title, tagline, heroImage, price, path } = item;
        const displayPrice = displayMoney(price);

        return (
          <SwiperSlide
            key={id}
            className={`wrapper hero_wrapper hero_slide-${i}`}
          >
            <div className="hero_item_txt">
              <h3>{title}</h3>
              <h1>{tagline}</h1>
              <h2 className="hero_price">{displayPrice}</h2>
              <Link href={`/product-details/${id}`} className="btn">
                Buy Now
              </Link>
            </div>
            <figure className="hero_item_img">
              <img src={heroImage} alt="product-img" />
            </figure>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSlider;
