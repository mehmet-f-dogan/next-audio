import React, { useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, A11y, Autoplay } from "swiper";
import { displayMoney } from "@/helpers/utils";
import { searchProducts } from "@/helpers/api";

const FeaturedSlider = () => {
  const [featuredProducts, setFeaturedProducts] = React.useState([]);

  useEffect(() => {
    searchProducts({ tags: ["featured"] }).then((data) => {
      setFeaturedProducts(data);
    });
  }, []);

  return (
    <Swiper
      modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
      loop={true}
      speed={400}
      spaceBetween={100}
      slidesPerView={"auto"}
      pagination={{ clickable: true }}
      effect={"coverflow"}
      centeredSlides={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 70,
        modifier: 3,
        slideShadows: false,
      }}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 200,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 250,
        },
      }}
      className="featured_swiper"
    >
      {featuredProducts.map((item) => {
        const { id, images, title, price } = item;
        const displayPrice = displayMoney(price);

        return (
          <SwiperSlide key={id} className="featured_slides">
            <div className="featured_title">{title}</div>
            <figure className="featured_img">
              <Link href={`/product-details/${id}`}>
                <img src={images[0]} alt="" />
              </Link>
            </figure>
            <h2 className="products_price">{displayPrice}</h2>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default FeaturedSlider;
