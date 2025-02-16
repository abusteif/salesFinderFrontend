import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, IconButton } from "@mui/material";

import DropdownSelector from "./DropdownSelector";
import RangeSlider from "./Slider";
import { SearchForm } from "./SearchForm";
import "../styles/components/BottomPanel.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setStore,
  setItems,
  updateItems,
  setCategory,
} from "../slicers/selectionsSlice";

import { getStoreItems, getCategories, getStores } from "../api/items/items";

function TopPanel() {
  const [categories, setCategories] = useState([""]);
  const [stores, setStores] = useState([]);

  // const localState = useSelector((state) => state);
  // console.log(localState);
  const dispatch = useDispatch();

  const store = useSelector((state) => state.selections.store);
  const category = useSelector((state) => state.selections.category);
  const priceRange = useSelector((state) => state.selections.priceRange);
  const discountRange = useSelector((state) => state.selections.discountRange);
  const maxDiscountRange = useSelector(
    (state) => state.selections.maxDiscountRange
  );
  const maxPriceRange = useSelector((state) => state.selections.maxPriceRange);
  const searchText = useSelector((state) => state.selections.searchText);

  const updateCategoryHandler = (category) => {
    dispatch(setCategory(category));
  };

  const updateStoreHandler = async (store) => {
    dispatch(setStore(store));
    const items = await getStoreItems(store);
    dispatch(setItems(items));

    let localCategories = await getCategories(store);

    if (!localCategories.includes("ALL"))
      localCategories = ["ALL", ...localCategories];
    setCategories(localCategories);
    dispatch(setCategory("ALL"));
  };

  const updateDiscountRangeHandler = (lowerLimit, upperLimit) => {
    dispatch(updateItems({ discountRange: [lowerLimit, upperLimit] }));
  };

  const updatePriceRangeHandler = (lowerLimit, upperLimit) => {
    dispatch(updateItems({ priceRange: [lowerLimit, upperLimit] }));
  };

  const onStoreSelect = (e) => {
    updateStoreHandler(e);
  };
  const onCategorySelect = (e) => {
    updateCategoryHandler(e);
  };

  const onDiscountSliderChange = (e) => {
    // console.log(e);
    updateDiscountRangeHandler(e[0], e[1]);
  };

  const onPriceSliderChange = (e) => {
    updatePriceRangeHandler(e[0], e[1]);
  };

  const onSearchTextChange = (e) => {
    dispatch(updateItems({ searchText: e }));
  };

  useEffect(() => {
    const getStoresLocal = async () => {
      setStores(await getStores());
    };
    getStoresLocal();
  }, []);

  useEffect(() => {
    if (stores.length > 0) {
      updateStoreHandler(stores[0]);
    }
  }, [stores]);
  // console.log(searchText)

  return (
    <div className="top-panel">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <DropdownSelector
          itemList={stores}
          itemType="Store"
          onSelect={onStoreSelect}
          selectedOption={store}
        />
        <DropdownSelector
          itemList={categories}
          itemType="Category"
          onSelect={onCategorySelect}
          selectedOption={category}
          // extraOption="ALL"
          disabled={store === ""}
        />
      </div>

      <RangeSlider
        title="Price Range"
        min={maxPriceRange[0]}
        max={maxPriceRange[1]}
        value={priceRange}
        onChange={onPriceSliderChange}
        disabled={store === "" || maxPriceRange[0] === Infinity}
      />
      <RangeSlider
        title="Discount Range"
        min={maxDiscountRange[0]}
        max={maxDiscountRange[1]}
        value={discountRange}
        onChange={onDiscountSliderChange}
        disabled={store === "" || maxDiscountRange[0] === Infinity}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "20px",
          height: "20px",
        }}
      >
        <SearchForm handleValueChange={onSearchTextChange} value={searchText} />
        <IconButton color="primary" onClick={() => {onStoreSelect(store)}}>
          <RefreshIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default TopPanel;
