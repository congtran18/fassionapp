
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const REMOVE_ALL = "REMOVE_ALL";

// export const addToCart = (product) => {
//   Alert.alert("Are you sure?", "Do you really want to delete this item?", [
//     {
//       text: "No",
//       style: "default",
//     },
//     {
//       text: "Yes",
//       style: "destructive",
//       onPress: () => {
//         return { type: ADD_TO_CART, product: product };
//       },
//     },
//   ]);
// };

export const addToCart = (product) => {
  return { type: ADD_TO_CART, product: product };
};

export const removeAll = (cartItems) => {
  return { type: REMOVE_ALL, product: cartItems };
};

export const removeFromCart = (productId) => {
  return { type: REMOVE_FROM_CART, pid: productId };
};
