import { createSlice } from "@reduxjs/toolkit";
import { getRelativeTime } from "../helpers";
const initialState = {
  items: [],
  filteredItems: [],
  store: "",
  category: "",
  discountRange: [0, 100],
  priceRange: [0, 1000],
  maxPriceRange: [0, 1000],
  maxDiscountRange: [0, 100],
  searchText: "",
};

const getPriceRange = (items) => {
  let min = items.reduce(
    (min, item) => (item.price < min ? item.price : min),
    Infinity
  );
  let max = items.reduce(
    (max, item) => (item.price > max ? item.price : max),
    -Infinity
  );
  return [min, max];
};

const getDiscountRange = (items) => {
  let min = items.reduce(
    (min, item) => (item.discount < min ? item.discount : min),
    Infinity
  );
  let max = items.reduce(
    (max, item) => (item.discount > max ? item.discount : max),
    -Infinity
  );
  return [min, max];
};

const handleDateTime = (items) => {
  return items.map((item) => {
    return { ...item, date: getRelativeTime(item.date) };
  });
};

const updateRangeHelper = (currentRange, newRange) => {
  // let updatedRange = [];
  // if (currentRange[0] < newRange[0] || currentRange[0] > newRange[1])
  //   updatedRange[0] = newRange[0];
  // else updatedRange[0] = currentRange[0];

  // if (currentRange[1] > newRange[1] || currentRange[1] < newRange[0])
  //   updatedRange[1] = newRange[1];
  // else updatedRange[1] = currentRange[1];

  // return updatedRange;
  return [...currentRange]
};

const isWithinRange = (num, range) => {
  return num >= range[0] && num <= range[1];
};

export const selectionSlice = createSlice({
  name: "selections",
  initialState,
  reducers: {
    setStore: (state, action) => {
      state.store = action.payload;
    },
    setItems: (state, action) => {
      state.items = handleDateTime(action.payload);
      state.filteredItems = handleDateTime(action.payload);
    },

    setCategory: (state, action) => {
      state.category = action.payload;
      state.searchText = "";
      let filteredItems = [...state.items];
      if (action.payload.toLowerCase() !== "all") {
        filteredItems = state.items.filter((item) => {
          return item.category.toLowerCase() === action.payload.toLowerCase();
        });
      // state.filteredItems = filteredItems;
      }

      let discountRange = getDiscountRange(filteredItems);
      let priceRange = getPriceRange(filteredItems);

      // state.maxDiscountRange = discountRange;
      // state.maxPriceRange = priceRange;

      let updatedDiscountRange = updateRangeHelper(
        state.discountRange,
        discountRange
      );
      let updatedPriceRange = updateRangeHelper(state.priceRange, priceRange);

      state.discountRange = updatedDiscountRange;
      state.priceRange = updatedPriceRange;

      state.filteredItems =  filteredItems.filter((item) => {
        return isWithinRange(item.price, updatedPriceRange) && isWithinRange(item.discount, updatedDiscountRange)


      })
    },

    updateItems: (state, action) => {
      state.filteredItems = state.items.filter((item) => {
        let result = true;
        if (state.category !== "ALL")
          result =
            result &&
            item.category.toLowerCase() === state.category.toLowerCase();
        if (action.payload.priceRange) {
          result =
            result && isWithinRange(item.price, action.payload.priceRange);
          state.priceRange = [
            action.payload.priceRange[0],
            action.payload.priceRange[1],
          ];
        } else {
          result = result && isWithinRange(item.price, state.priceRange);
        }
        if (action.payload.discountRange) {
          result =
            result &&
            isWithinRange(item.discount, action.payload.discountRange);
          state.discountRange = [
            action.payload.discountRange[0],
            action.payload.discountRange[1],
          ];
        } else {
          result = result && isWithinRange(item.discount, state.discountRange);
        }
        if ("searchText" in action.payload) {
          result =
            result &&
            item.item
              .toLowerCase()
              .includes(action.payload.searchText.toLowerCase());
          state.searchText = action.payload.searchText;
        } else {
          result = result && item.item.toLowerCase().includes(state.searchText);
        }
        return result;
      });
    },
  },
});

export const { setStore, setCategory, setItems, updateItems } =
  selectionSlice.actions;
export default selectionSlice.reducer;
