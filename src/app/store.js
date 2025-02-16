import { configureStore } from "@reduxjs/toolkit";
import selectionsReducer from "../slicers/selectionsSlice"
import itemsReducer from "../slicers/itemsSlice"

export const store = configureStore( {
    reducer: {
        selections: selectionsReducer,
        items: itemsReducer
    }
})