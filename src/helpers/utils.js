export const displayMoney = (n) => {
  const numFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return numFormat.format(n).split(".", 1);
};

// Calculate Total Amount
export const calculateTotal = (arr) => {
  const total = arr.reduce((accum, val) => accum + val, 0);

  return total;
};
