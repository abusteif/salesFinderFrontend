// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
//   filteredItems: [],
// };

// export const itemsSlice = createSlice({
//   name: "saleItems",
//   initialState,
//   reducers: {
//     setItems: (state, action) => {
//       state.items = [...action.payload];
//       state.filteredItems = [...action.payload];
//     },

//     updateItems: (state) => {
//       console.log(state.selections)
//       state.filteredItems = state.items.filter((item) => {
//         return (
//           item.price >= state.selections.discountRange[0] &&
//           item.price <= state.selections.discountRange[1] &&
//           item.discount >= state.selections.pricetRange &&
//           item.discount <= state.selections.pricetRange &&
//           item.category === state.selections.category
//         )
//       })
//     },

//     updateItemsForNewPriceRange: (state, action) => {
//       state.filteredItems = state.filteredItems.filter(
//         (item) =>
//           item.price >= action.payload.lowerLimit &&
//           item.price <= action.payload.upperLimit
//       );
//     },
//     updateItemsForNewDiscountRange: (state, action) => {
//       state.filteredItems = state.filteredItems.filter(
//         (item) =>
//           item.discount >= action.payload.lowerLimit &&
//           item.discount <= action.payload.upperLimit
//       );
//     },
//     updateItemsForNewCategory: (state, action) => {
//       state.filteredItems = state.items.filter(
//         (item) => item.category === action.payload
//       );
//     },
//   },
// });

// export const {
//   setItems,
//   updateItemsForNewPriceRange,
//   updateItemsForNewDiscountRange,
//   updateItemsForNewCategory,
//   updateItems,
// } = itemsSlice.actions;
// export default itemsSlice.reducer;
