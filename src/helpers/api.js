const api_url = process.env.NEXT_PUBLIC_API_URL;

export async function searchProducts(params) {
  console.log(params);
  try {
    const response = await fetch(`${api_url}/product/search`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(params),
    });
    return await response.json();
  } catch (ignored) {
    console.log(ignored);
    return [];
  }
}

export async function getProduct(id) {
  try {
    const response = await fetch(`${api_url}/product/${id}`, {
      method: "get",
      headers: {
        Accept: "application/json",
      },
    });
    const product = await response.json();
    return product;
  } catch (ignored) {
    return {};
  }
}

export async function checkout(items) {
  try {
    await fetch(`${api_url}/cart/complete`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });
  } catch (ignored) {}
}
