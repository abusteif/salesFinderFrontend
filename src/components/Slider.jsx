import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function RangeSlider(params) {


  return (
    <div style={{ display: "flex", paddingLeft: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{params.title}</span>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <span style={{ paddingRight: "20px" }}>{params.value[0]}</span>
          <Box sx={{ width: 200 }}>
            <Slider
              getAriaLabel={() => "Discount Range"}
              value={params.value}
              onChange={(event, newValue) => {
                params.onChange(newValue);
              }}
              valueLabelDisplay="off"
              max={params.max}
              min={params.min}
              disabled={params.disabled}
            />
          </Box>
          <span style={{ paddingLeft: "20px" }}>{params.value[1]}</span>
        </div>
      </div>
    </div>
  );
}
