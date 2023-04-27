import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDebounce } from "use-debounce";
import algoliasearch from "algoliasearch";

const SearchForm = ({ setVisible }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryDebounced] = useDebounce(searchQuery, 700);

  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
  );
  const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME);

  useEffect(() => {
    if (!searchQueryDebounced) {
      setSearchResults([]);
      return;
    }
    index.search(searchQueryDebounced).then(({ hits }) => {
      setSearchResults(hits.slice(0, 5));
    });
  }, [searchQueryDebounced]);

  const closeSearch = () => {
    setVisible(false);
    setSearchResults([]);
  };

  // handling Search
  const handleSearching = (e) => {
    const searchedTerm = e.target.value.toLowerCase().trim();
    setSearchQuery(searchedTerm);
  };

  return (
    <>
      <div id="searchbar" className="backdrop">
        <div className="searchbar_content">
          <div className="close_search" onClick={closeSearch}>
            <button className="btn">Close</button>
          </div>

          <div className="search_box">
            <input
              type="search"
              className="input_field"
              placeholder="Search for a product..."
              onChange={handleSearching}
            />
          </div>
          {searchResults.length !== 0 && (
            <div className="search_results">
              {searchResults.map((item) => {
                const { id, title } = item;
                return (
                  <Link
                    href={`/product-details/${id}`}
                    onClick={closeSearch}
                    key={id}
                  >
                    {title}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchForm;
