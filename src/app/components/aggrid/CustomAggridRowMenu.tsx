import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useColorScheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  ColGroupDef,
  ColDef,
  ValueGetterParams,
  GetContextMenuItemsParams,
} from "ag-grid-community";
import DoubleRowCellEditor from "./DoubleRowCellEditor";

import {
  ClipboardModule,
  LicenseManager,
  MenuModule,
} from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { DoubleRowTextCellRenderer } from "./DoubleRowTextCellRenderer";
LicenseManager.setLicenseKey("KEY HERE");

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ClipboardModule,
  MenuModule,
]);

export interface IRowData {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}

export const CustomAggridRowMenu = () => {
  const { mode, systemMode } = useColorScheme();

  const rowData = useMemo<IRowData[]>(
    () => [
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
      { make: "Mercedes", model: "EQA", price: 48890, electric: true },
      { make: "Fiat", model: "500", price: 15774, electric: false },
      { make: "Nissan", model: "Juke", price: 20675, electric: false },
    ],
    []
  );

  const columnDefs = useMemo<(ColDef<any, any> | ColGroupDef<any>)[]>(() => {
    return [
      {
        headerName: "Make & Model",
        valueGetter: (p: ValueGetterParams) => p.data.make + " " + p.data.model,
        flex: 2,
      },
      {
        field: "price",
        // valueFormatter: (p) => "£" + Math.floor(p.value).toLocaleString(),
        // cellRenderer: DurationPickerCellRenderer,
        flex: 1,
      },
      { field: "electric", flex: 1 },
      {
        field: "button",
        cellRenderer: DoubleRowTextCellRenderer,
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

  const getContextMenuItems = (params: GetContextMenuItemsParams) => {
    return [
      {
        name: "Duplicate values",
        action: () => alert(`"duplicate!", ${params.value}`),
      },
      {
        name: "Duplicate again!",
        action: () =>
          alert(`"duplicate!", ${JSON.stringify(params.node?.data)}`),
      },
    ];
  };

  const popupParent = useMemo<HTMLElement | null>(() => {
    return document.querySelector("body");
  }, []);

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
          popupParent={popupParent}
          getContextMenuItems={getContextMenuItems}
        />
      </div>
    </div>
  );
};
