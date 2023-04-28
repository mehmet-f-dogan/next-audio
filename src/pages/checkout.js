import React from "react";
import EmptyView from "@/components/common/EmptyView";
import { GiConfirmed } from "react-icons/gi";
import { completeOrder } from "@/states/CartState";

const CheckoutPage = () => {
  completeOrder();
  return (
    <section id="cart" className="section">
      <div className="container">
        <EmptyView
          icon={<GiConfirmed />}
          msg="Order(s) Received!"
          link="/all-products"
          btnText="Continue Shopping"
        />
      </div>
    </section>
  );
};

export default CheckoutPage;
