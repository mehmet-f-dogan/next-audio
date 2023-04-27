import React from "react";
import { TbTrash } from "react-icons/tb";
import Link from "next/link";
import { displayMoney } from "@/helpers/utils";
import QuantityBox from "@/components/common/QuantityBox";
import { removeItem } from "@/states/CartState";


const CartItem = (props) => {
  const { id, images, title, info, price, quantity } = props;

  const displayPrice = displayMoney(price);

  return (
    <>
      <div className="cart_item">
        <figure className="cart_item_img">
          <Link href={`/product-details/${id}`}>
            <img src={images[0]} alt="product-img" />
          </Link>
        </figure>
        <div className="cart_item_info">
          <div className="cart_item_head">
            <h4 className="cart_item_title">
              <Link href={`/product-details/${id}`}>
                {title} {info}
              </Link>
            </h4>
            <div className="cart_item_del">
              <span onClick={() => removeItem(id)}>
                <TbTrash />
              </span>
              <div className="tooltip">Remove Item</div>
            </div>
          </div>

          <h2 className="cart_item_price">{displayPrice}</h2>

          <QuantityBox itemId={id} itemQuantity={quantity} />
        </div>
      </div>
    </>
  );
};

export default CartItem;
