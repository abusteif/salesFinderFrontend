import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import "../styles/components/BottomPanel.css";
import { relativeTimeComparator } from "../helpers";

const capitaliseCategory = (value) => value.toUpperCase();

const columns = [
  {
    field: "item",
    headerName: "Item",
    flex: 4,
    renderCell: (e) => {
      return (
        <a href={e.row.url} target="_blank" rel="noopener noreferrer">
          {e.row.item}
        </a>
      );
    },
  },
  { field: "price", headerName: "Price", type: "number", flex: 1 },
  { field: "discount", headerName: "Discount %", type: "number", flex: 1 },
  {
    field: "date",
    headerName: "Date",
    type: "text",
    flex: 1,
    sortComparator: relativeTimeComparator,
  },
  {
    field: "category",
    headerName: "Category",
    type: "text",
    flex: 1,
    valueGetter: capitaliseCategory,
  },
];

const paginationModel = { page: 0, pageSize: 20 };

export default function ItemsTable(params) {
  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={params.items}
        columns={columns}
        initialState={{
          pagination: { paginationModel },
          sorting: {
            sortModel: [{ field: "date", sort: "asc" }],
          },
        }}
        autoPageSize={true}
        sx={{ border: 0 }}
        page={2}
        disableColumnFilter={true}
        disableColumnMenu={true}
      />
    </Paper>
  );
}
