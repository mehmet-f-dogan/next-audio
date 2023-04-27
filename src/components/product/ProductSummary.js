import React from "react";

const ProductSummary = (props) => {
  const { brand, title, category, type, connectivity } = props;

  return (
    <>
      <section id="product_summary" className="section">
        <div className="container">
          {/*===== Product-Summary-Tabs =====*/}
          <div className="prod_summary_tabs">
            <ul className="tabs">
              <li className={`tabs_item`}>Specifications</li>
            </ul>
          </div>

          {/*===== Product-Summary-Details =====*/}
          <div className="prod_summary_details">
            <div className="prod_specs">
              <ul>
                <li>
                  <span>Brand</span>
                  <span>{brand}</span>
                </li>
                <li>
                  <span>Model</span>
                  <span>{title}</span>
                </li>
                <li>
                  <span>Generic Name</span>
                  <span>{category}</span>
                </li>
                <li>
                  <span>Headphone Type</span>
                  <span>{type}</span>
                </li>
                <li>
                  <span>Connectivity</span>
                  <span>{connectivity}</span>
                </li>
                <li>
                  <span>Microphone</span>
                  <span>Yes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSummary;
