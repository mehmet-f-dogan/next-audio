import React, { useEffect, useState } from "react";
import { IoMdStar, IoMdCheckmark } from "react-icons/io";
import { displayMoney } from "@/helpers/utils";
import useActive from "@/hooks/useActive";
import { addItem } from "@/states/CartState";

import SectionsHead from "@/components/common/SectionsHead";
import RelatedSlider from "@/components/sliders/RelatedSlider";
import ProductSummary from "@/components/product/ProductSummary";

const ProductDetails = (props) => {
  const { handleActive, activeClass } = useActive(0);

  const product = props.product;

  const { images, title, info, category, price, rating, orders } = product;

  const [previewImg, setPreviewImg] = useState(images[0]);

  // handling Add-to-cart
  const handleAddItem = () => {
    addItem(product);
  };

  // setting the very-first image on re-render
  useEffect(() => {
    setPreviewImg(images[0]);
    handleActive(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  // handling Preview image
  const handlePreviewImg = (i) => {
    setPreviewImg(images[i]);
    handleActive(i);
  };

  // calculating Prices
  const displayPrice = displayMoney(price);

  return (
    <>
      <section id="product_details" className="section">
        <div className="container">
          <div className="wrapper prod_details_wrapper">
            {/*=== Product Details Left-content ===*/}
            <div className="prod_details_left_col">
              <div className="prod_details_tabs">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className={`tabs_item ${activeClass(i)}`}
                    onClick={() => handlePreviewImg(i)}
                  >
                    <img src={img} alt="product-img" />
                  </div>
                ))}
              </div>
              <figure className="prod_details_img">
                <img src={previewImg} alt="product-img" />
              </figure>
            </div>

            {/*=== Product Details Right-content ===*/}
            <div className="prod_details_right_col">
              <h1 className="prod_details_title">{title}</h1>
              <h4 className="prod_details_info">
                {info + ` - ${orders} Order(s)`}
              </h4>
              <div className="prod_details_ratings">
                <span className="rating_star">
                  {[...Array(rating)].map((_, i) => (
                    <IoMdStar key={i} />
                  ))}
                </span>
              </div>

              <div className="separator"></div>

              <div className="prod_details_price">
                <div className="price_box">
                  <h2 className="price">{displayPrice}</h2>
                </div>

                <div className="badge">
                  <span>
                    <IoMdCheckmark /> In Stock
                  </span>
                </div>
              </div>

              <div className="separator"></div>

              <div className="prod_details_buy_btn">
                <button type="button" className="btn" onClick={handleAddItem}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductSummary {...product} />

      <section id="related_products" className="section">
        <div className="container">
          <SectionsHead heading="Related Products" />
          <RelatedSlider category={category} />
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  const { productId } = context.params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`
  );
  const product = await res.json();
  return {
    props: {
      product,
    },
  };
}

export default ProductDetails;
