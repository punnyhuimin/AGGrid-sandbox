import { ICellEditor } from "@ag-grid-community/core";
import { CustomCellEditorProps } from "@ag-grid-community/react";
import { TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";

export interface MySimpleInterface extends ICellEditor {
  myCustomFunction(): { rowIndex: number; colId: string };
}

export default ({
  value,
  onValueChange,
  eventKey,
  rowIndex,
}: CustomCellEditorProps) => {
  const updateValue = (val: string) => {
    onValueChange(val === "" ? null : val);
  };

  useEffect(() => {
    let startValue;

    if (eventKey === "Backspace") {
      startValue = "";
    } else if (eventKey && eventKey.length === 1) {
      startValue = eventKey;
    } else {
      startValue = value;
    }
    if (startValue == null) {
      startValue = "";
    }

    updateValue(startValue);

    refInput.current?.focus();
  }, []);

  const refInput = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        paddingLeft: "15px",
        paddingRight: "15px",
      }}
    >
      <TextField
        id={`${rowIndex}-1-textfield`}
        value={value || ""}
        ref={refInput}
        style={{ width: "100%" }}
        onChange={(event) => updateValue(event.target.value)}
      />
      <TextField
        id={`${rowIndex}-2-textfield`}
        value={value || ""}
        ref={refInput}
        style={{ width: "100%" }}
        onChange={(event) => updateValue(event.target.value)}
      />
    </div>
  );
};
