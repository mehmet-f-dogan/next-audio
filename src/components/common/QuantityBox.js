import React, { useContext } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { incrementItem, decrementItem } from "@/states/CartState";

const QuantityBox = (props) => {
  const { itemId, itemQuantity } = props;

  return (
    <>
      <div className="quantity_box">
        <button type="button" onClick={() => decrementItem(itemId)}>
          <FaMinus />
        </button>
        <span className="quantity_count">{itemQuantity}</span>
        <button
          type="button"
          onClick={() => incrementItem(itemId)}
        >
          <FaPlus />
        </button>
      </div>
    </>
  );
};

export default QuantityBox;
