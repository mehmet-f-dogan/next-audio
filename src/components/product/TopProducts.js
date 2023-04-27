import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import useActive from "@/hooks/useActive";
import { searchProducts } from "@/helpers/api";
import { categoryMenu } from "@/data/filterData";

import ProductCard from "@/components/product/ProductCard";

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const { activeClass, handleActive } = useActive(0);

  // making a unique set of product's category
  const productsCategory = [
    "All",
    ...new Set(categoryMenu.map((item) => item.label)),
  ];

  // handling product's filtering
  const handleProducts = async (category, i) => {
    handleActive(i);
    if (category === "All") {
      setProducts(await searchProducts({}));
      return;
    }
    setProducts(await searchProducts({ categories: [category] }));
  };

  useEffect(() => {
    handleProducts("All", 0);
  }, []);

  return (
    <>
      <div className="products_filter_tabs">
        <ul className="tabs">
          {productsCategory.map((item, i) => (
            <li
              key={i}
              className={`tabs_item ${activeClass(i)}`}
              onClick={() => handleProducts(item, i)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="wrapper products_wrapper">
        {products.slice(0, 11).map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
        <div className="card products_card browse_card">
          <Link href="/all-products">
            Browse All <br /> Products <BsArrowRight />
          </Link>
        </div>
      </div>
    </>
  );
};

export default TopProducts;
