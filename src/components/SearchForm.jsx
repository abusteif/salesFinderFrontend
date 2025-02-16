import { useState } from "react";

export const SearchForm = (props) => {

  const handleValueChange = (e) => {
    props.handleValueChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      props.handleValueChange(e.target.value);
      e.target.blur();
    }
  };

  return (
    <form>
      <input
      style={{marginRight:"10px"}}
        type="text"
        value={props.value}
        onChange={handleValueChange}
        placeholder="Search for item"
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};
