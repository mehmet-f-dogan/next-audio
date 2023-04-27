import React, { useState, useEffect } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import FilterBar from "@/components/filters/Filter";
import ProductCard from "@/components/product/ProductCard";
import EmptyView from "@/components/common/EmptyView";
import { filtersState } from "@/states/FiltersState";
import { useDebounce } from "use-debounce";
import { searchProducts } from "@/helpers/api";

const AllProducts = () => {

  const [allProducts, setAllProducts] = useState([]);

  const [filter] = useDebounce(filtersState.use(), 700);

  useEffect(() => {
    searchProducts(filter).then((data) => {
      setAllProducts(data);
    });
  }, [filter]);

  return (
    <>
      <section id="all_products" className="section">
        <FilterBar />
        <div className="container">
          {allProducts.length ? (
            <div className="wrapper products_wrapper">
              {allProducts.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <EmptyView icon={<BsExclamationCircle />} msg="No Results Found" />
          )}
        </div>
      </section>
    </>
  );
};

export default AllProducts;
