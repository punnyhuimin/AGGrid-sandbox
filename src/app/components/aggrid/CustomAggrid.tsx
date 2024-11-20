import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  ColGroupDef,
  ModuleRegistry,
  ValueGetterParams,
} from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { useColorScheme } from "@mui/material";
import React, { useState, MouseEvent, useMemo } from "react";
import { DoubleRowCellRenderer } from "./DoubleRowCellRenderer";
import { CellClickedEvent, GridApi, GridReadyEvent } from "ag-grid-community";
import DoubleRowCellEditor from "./DoubleRowCellEditor";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export const CustomAggrid = () => {
  const { mode, systemMode, setMode } = useColorScheme();

  const [rowData, setRowData] = useState<any[]>([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]);

  const columnDefs = useMemo<(ColDef<any, any> | ColGroupDef<any>)[]>(() => {
    return [
      {
        headerName: "Make & Model",
        valueGetter: (p: ValueGetterParams) => p.data.make + " " + p.data.model,
        flex: 2,
      },
      {
        field: "price",
        valueFormatter: (p) => "£" + Math.floor(p.value).toLocaleString(),
        flex: 1,
      },
      { field: "electric", flex: 1 },
      {
        field: "button",
        cellRenderer: DoubleRowCellRenderer,
        cellEditor: DoubleRowCellEditor,
        editable: true,
        singleClickEdit: true,
        flex: 1,
        minWidth: 100,
        width: 120,
      },
    ];
  }, []);
  const resolvedMode = (systemMode || mode) as "light" | "dark";

  const onCellClicked = (event: CellClickedEvent) => {
    const currNode = event.node;
    const div = document.getElementById(`${currNode.rowIndex}-2`);
    if (div !== null) {
      div.addEventListener("click", (e: Event) => {
        if (e.target) {
          const clickedEle = e.target as HTMLInputElement;
          const eleId = clickedEle.id;
          const ele = document.getElementById(`${eleId}-textfield`);
          if (ele) {
            ele.focus();
          }
        }
      });
    }
    // if (event.column.getColId() !== "price.value") return;
    // if (priorRowIndex > -1) {
    //   const priorNode = event.api.getModel().rowsToDisplay[priorRowIndex];
    //   priorNode.setDataValue("price.flag", false);
    // }
    // // event.api.forEachNode((node) => node.setDataValue("price.flag", false));
    // event.node.setDataValue("price.flag", true);
    // priorRowIndex = event.rowIndex;
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <div
        style={{ width: "100%", height: "100%" }}
        className={
          resolvedMode === "light" ? "ag-theme-quartz" : "ag-theme-quartz-dark"
        }
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowHeight={80}
          // context={selectedCellId}
        />
      </div>
    </div>
  );
};
