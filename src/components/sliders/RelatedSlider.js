import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper";
import ProductCard from "@/components/product/ProductCard";
import { searchProducts } from "@/helpers/api";

const RelatedSlider = (props) => {
  const { category } = props;

  const [relatedProducts, setRelatedProducts] = React.useState([]);

  useEffect(() => {
    searchProducts({ categories: [category] }).then((data) => {
      setRelatedProducts(data);
    });
  }, []);

  return (
    <Swiper
      modules={[Pagination, A11y]}
      spaceBetween={10}
      slidesPerView={"auto"}
      pagination={{ clickable: true }}
      breakpoints={{
        480: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 4,
        },
      }}
      className="related_swiper"
    >
      {relatedProducts.map((item) => (
        <SwiperSlide key={item.id}>
          <ProductCard {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RelatedSlider;
