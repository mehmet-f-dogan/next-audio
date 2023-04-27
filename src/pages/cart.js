import React, { useState, useEffect } from "react";
import { BsCartX } from "react-icons/bs";
import { displayMoney } from "@/helpers/utils";
import CartItem from "@/components/cart/CartItem";
import EmptyView from "@/components/common/EmptyView";
import { getProduct } from "@/helpers/api";
import { cartState } from "@/states/CartState";
import { useRouter } from "next/router";


const Cart = () => {

  const cartItems = cartState.use();

  const [itemDetails, setItemDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const router = useRouter();

  const cartQuantity = cartItems.length;

  useEffect(() => {
    const getCartItems = async () => {
      const items = await Promise.all(
        cartItems.map(async (item) => {
          const product = await getProduct(item.id);
          return { ...product, quantity: item.quantity };
        })
      );
      setItemDetails(items);
      setTotalPrice(
        items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      );
    };
    getCartItems();
  }, [cartItems]);

  return (
    <>
      <section id="cart" className="section">
        <div className="container">
          {cartQuantity === 0 ? (
            <EmptyView
              icon={<BsCartX />}
              msg="Your Cart is Empty"
              link="/all-products"
              btnText="Start Shopping"
            />
          ) : (
            <div className="wrapper cart_wrapper">
              <div className="cart_left_col">
                {itemDetails.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>

              <div className="cart_right_col">
                <div className="order_summary">
                  <h3>
                    Order Summary &nbsp; ( {cartQuantity}{" "}
                    {cartQuantity > 1 ? "items" : "item"} )
                  </h3>
                  <div className="order_summary_details">
                    <div className="total_price">
                      <b>
                        <small>Total Price</small>
                      </b>
                      <b>
                        <small>{displayMoney(totalPrice)}</small>
                      </b>
                    </div>
                  </div>
                  <button type="button" className="btn checkout_btn" onClick={
                    () => {
                      router.push("/checkout");
                    }
                  }>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
