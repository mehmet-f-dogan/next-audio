import { entity, persistence } from "simpler-state";
import { checkout } from "@/helpers/api";

export const cartState = entity([], [persistence("cartItems")]);

export const addItem = (item) => {
  cartState.set((state) => {
    const newItemId = item.id;
    const itemExists = state.some((item) => item.id === newItemId);

    let updatedCartItems = null;

    if (itemExists) {
      updatedCartItems = state.map((item) => {
        if (item.id === newItemId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    } else {
      updatedCartItems = [...state, { id: item.id, quantity: 1 }];
    }

    return updatedCartItems;
  });
};

export const removeItem = (itemId) => {
  cartState.set((state) => {
    return state.filter((item) => item.id !== itemId);
  });
};

export const incrementItem = (itemId) => {
  cartState.set((state) => {
    return state.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
  });
};

export const decrementItem = (itemId) => {
  cartState.set((state) => {
    return state
      .map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity !== 0);
  });
};

export const completeOrder = () => {
  checkout({
    orders: cartState.get(),
  });
  cartState.set([]);
};
