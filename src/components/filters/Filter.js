import React, { useState, useEffect } from "react";
import { BiSort, BiFilterAlt } from "react-icons/bi";
import { sortMenu, brandsMenu, categoryMenu } from "@/data/filterData";
import { displayMoney } from "@/helpers/utils";
import { filtersState } from "@/states/FiltersState";

const FilterBar = () => {
  const [mobileSortVisible, setMobileSortVisible] = useState(true);
  const [mobileFilterVisible, setMobileFilterVisible] = useState(true);

  const minPrice = 0;
  const maxPrice = 20000;

  const [selectedSortType, setSelectedSortType] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(maxPrice);

  const [filters, setFilters] = useState({
    selectedSortType,
    selectedBrands,
    selectedCategories,
    selectedPrice,
  });

  useEffect(() => {
    let newFilters = {};

    newFilters.maxPrice = Number(selectedPrice);

    if (selectedBrands.length) {
      newFilters.brands = selectedBrands;
    }

    if (selectedCategories.length) {
      newFilters.categories = selectedCategories;
    }

    if (selectedSortType) {
      newFilters.order = selectedSortType;
    }

    filtersState.set(newFilters);
  }, [filters]);

  const toggleBrand = (brand) => {
    const newSelectedBrands = [...selectedBrands];
    const index = selectedBrands.indexOf(brand);

    if (index >= 0) {
      newSelectedBrands.splice(index, 1);
    } else {
      newSelectedBrands.push(brand);
    }
    setSelectedBrands(newSelectedBrands);
    setFilters({ ...filters, selectedBrands: newSelectedBrands });
  };

  const toggleCategory = (category) => {
    const newSelectedCategories = [...selectedCategories];
    const index = selectedCategories.indexOf(category);

    if (index >= 0) {
      newSelectedCategories.splice(index, 1);
    } else {
      newSelectedCategories.push(category);
    }
    setSelectedCategories(newSelectedCategories);
    setFilters({ ...filters, selectedCategories: newSelectedCategories });
  };

  const setPrice = (price) => {
    setSelectedPrice(price);
    setFilters({ ...filters, selectedPrice: price });
  };

  const resetFilters = () => {
    setSelectedSortType(null);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedPrice(maxPrice);
    setFilters({
      selectedSortType: null,
      selectedBrands: [],
      selectedCategories: [],
      selectedPrice: maxPrice,
    });
  };

  const displayPrice = displayMoney(selectedPrice);

  const FilterBarOptions = (
    <>
      {/*===== Clear-Filters btn =====*/}
      {selectedSortType && (
        <div className="clear_filter_btn">
          <button type="button" className="btn" onClick={() => resetFilters()}>
            Clear Filters
          </button>
        </div>
      )}

      {/*===== Sort-menu =====*/}
      <div className={`sort_options ${mobileSortVisible ? "show" : ""}`}>
        <div className="sort_head">
          <h3 className="title">Sort By</h3>
          <button
            type="button"
            className="close_btn"
            onClick={() => setMobileSortVisible(false)}
          >
            &times;
          </button>
        </div>

        <div className="separator"></div>

        <ul className="sort_menu">
          {sortMenu.map((item) => {
            const { id, title } = item;
            return (
              <li
                key={id}
                className={selectedSortType === title ? "active" : ""}
                onClick={() => {
                  setSelectedSortType(title),
                    setFilters({ ...filters, selectedSortType: title });
                }}
              >
                {title}
              </li>
            );
          })}
        </ul>
      </div>

      {/*===== Filter-menu =====*/}
      <div className={`filter_options ${mobileFilterVisible ? "show" : ""}`}>
        <div className="filter_head">
          <h3 className="title">Filter By</h3>
          <button
            type="button"
            className="close_btn"
            onClick={() => setMobileFilterVisible(false)}
          >
            &times;
          </button>
        </div>

        <div className="separator"></div>

        {/* Filter by Brands */}
        <div className="filter_block">
          <h4>Brands</h4>
          <ul className="filter_menu">
            {brandsMenu.map((item) => {
              const { id, label } = item;
              return (
                <li key={id} className="filter_btn">
                  <input
                    type="checkbox"
                    id={label}
                    value={label}
                    checked={selectedBrands.indexOf(label) >= 0 ? true : false}
                    onChange={() => toggleBrand(label)}
                  />
                  <label htmlFor={label}>{label}</label>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Filter by Category */}
        <div className="filter_block">
          <h4>Category</h4>
          <ul className="filter_menu">
            {categoryMenu.map((item) => {
              const { id, label } = item;
              return (
                <li key={id} className="filter_btn">
                  <input
                    type="checkbox"
                    id={label}
                    value={label}
                    checked={
                      selectedCategories.indexOf(label) >= 0 ? true : false
                    }
                    onChange={() => toggleCategory(label)}
                  />
                  <label htmlFor={label}>{label}</label>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Filter by Price */}
        <div className="filter_block">
          <h4>Max Price</h4>
          <div className="price_filter">
            <p>{displayPrice}</p>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={selectedPrice}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/*===== Filterbar-default =====*/}
      <aside id="filterbar">
        <div className="filterbar_wrapper">{FilterBarOptions}</div>
      </aside>

      {/*===== Filterbar-mobile =====*/}
      <div id="filterbar_mob">
        <div className="filterbar_mob_wrapper">
          <h3 className="title" onClick={() => setMobileSortVisible(true)}>
            <BiSort />
            <span>Sort</span>
          </h3>
          <span>|</span>
          <h3 className="title" onClick={() => setMobileFilterVisible(true)}>
            <BiFilterAlt />
            <span>Filter</span>
          </h3>
        </div>
        {FilterBarOptions}
      </div>
    </>
  );
};

export default FilterBar;
