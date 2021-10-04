import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: { items: [], restaurantName: "" },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setAddItemToCart: (state, action) => {
      let newState = { ...state };

      // Add item to cart
      if (action.payload.checkboxValue) {
        console.log("ADD TO CART");

        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName,
        };
      } else {
        // Remove item from cart
        console.log("REMOVE FROM CART");
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.title !== action.payload.title
            ),
          ],
          restaurantName: action.payload.restaurantName,
        };
      }
      console.log(newState, "👉");
      return newState;
    },
  },
});

export const { setAddItemToCart } = cartSlice.actions;

export const selectItems = (state) => state.cart.selectedItems.items;
export const selectRestaurantName = (state) =>
  state.cart.selectedItems.restaurantName;

export default cartSlice.reducer;
