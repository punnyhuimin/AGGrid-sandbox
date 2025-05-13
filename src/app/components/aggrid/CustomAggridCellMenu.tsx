import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useColorScheme } from "@mui/material";
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  ColGroupDef,
  ColDef,
  ValueGetterParams,
  CellContextMenuEvent,
} from "ag-grid-community";
import DoubleRowCellEditor from "./DoubleRowCellEditor";

import {
  ClipboardModule,
  LicenseManager,
  MenuModule,
} from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import CustomContextMenu from "../contextMenu/CustomContextMenu";
import { IRowData } from "./CustomAggridRowMenu";
import { DoubleRowCellHoverRenderer } from "./DoubleRowCellHoverRenderer";
LicenseManager.setLicenseKey("KEY HERE");

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ClipboardModule,
  MenuModule,
]);

/**
 *
 * @returns table with custom context menu
 */
export const CustomAggridCellMenu = () => {
  const { mode, systemMode } = useColorScheme();

  const rowData = useMemo<IRowData[]>(
    () => [
      {
        make: "Tesla",
        model: "Model Y",
        price: 64950,
        electric: true,
        button: { val1: "hi1", val2: "hi2" },
      },
      {
        make: "Ford",
        model: "F-Series",
        price: 33850,
        electric: false,
        button: { val1: "hi2", val2: "hi3" },
      },
      {
        make: "Toyota",
        model: "Corolla",
        price: 29600,
        electric: false,
        button: { val1: "toyota", val2: "corolla" },
      },
      {
        make: "Mercedes",
        model: "EQA",
        price: 48890,
        electric: true,
        button: { val1: "flop", val2: "flip" },
      },
      {
        make: "Fiat",
        model: "500",
        price: 15774,
        electric: false,
        button: { val1: "fiat", val2: "400" },
      },
      {
        make: "Nissan",
        model: "Juke",
        price: 20675,
        electric: false,
        button: { val1: "help", val2: "100" },
      },
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
        valueFormatter: (p) => "£" + Math.floor(p.value).toLocaleString(),
        flex: 1,
      },
      {
        field: "electric",
        flex: 1,
        editable: true,
        singleClickEdit: true,
        cellRenderer: DoubleRowCellHoverRenderer,
        suppressClickEdit: true,
      },
      {
        field: "button",
        cellRenderer: DoubleRowCellHoverRenderer,
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

  const contextMenuRef = useRef<HTMLMenuElement | null>(null);

  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    toggled: false,
  });

  const closeContextMenu = () => {
    setContextMenu({ toggled: false, position: { x: 0, y: 0 } });
  };

  const [selectedData, setSelectedData] = useState();
  const [selectedRow, setSelectedRow] = useState();

  const handleCellContextMenu = (e: CellContextMenuEvent) => {
    // check if this column is button
    if (e.colDef.field === "button" && contextMenuRef.current) {
      setSelectedRow(e.data);
      setSelectedData(e.value);
      const contextMenuAttr = contextMenuRef.current.getBoundingClientRect();
      if (e.event) {
        const event = e.event as PointerEvent;
        const isLeft = event.clientX < window.innerWidth / 2;

        let x;
        let y = event.clientY;
        if (isLeft) {
          x = event.clientX;
        } else {
          x = event.clientX - (contextMenuAttr?.width || 0);
        }

        const newContextMenu = {
          position: { x: x, y: y },
          toggled: true,
        };
        setContextMenu(newContextMenu);
      }
    }
  };

  function resetContextMenu() {
    setContextMenu({
      position: {
        x: 0,
        y: 0,
      },
      toggled: false,
    });
  }

  useEffect(() => {
    function handler() {
      if (contextMenuRef.current) {
        resetContextMenu();
      }
    }

    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  });

  const popupParent = useMemo<HTMLElement | null>(() => {
    return document.querySelector("body");
  }, []);

  return (
    <div
      style={{ width: "100%", height: "400px" }}
      onClick={closeContextMenu} // Close context menu when clicking outside.
    >
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
          suppressContextMenu
          preventDefaultOnContextMenu
          onCellContextMenu={handleCellContextMenu}
          popupParent={popupParent} // Need to do this to ensure that the popup falls outside of the table
        />
        <CustomContextMenu
          contextMenuRef={contextMenuRef}
          isToggled={contextMenu.toggled}
          positionX={contextMenu.position.x}
          positionY={contextMenu.position.y}
          buttons={[
            {
              text: "See selected value",
              icon: ":)",
              onClick: () =>
                alert(`Selected value: ${JSON.stringify(selectedData)}`), // TODO: Try to pass in the current params
              isSpacer: false,
            },
            {
              text: "See selected row",
              icon: ":|",
              onClick: () =>
                alert(`Selected row: ${JSON.stringify(selectedRow)}`), // TODO: Try to pass in the current params
              isSpacer: false,
            },
            {
              text: "",
              icon: "",
              onClick: () => null,
              isSpacer: true,
            },
          ]}
        />
      </div>
    </div>
  );
};
