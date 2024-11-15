import { TextField } from "@mui/material";
import { ICellRendererParams } from "ag-grid-community";

export const DoubleRowCellRenderer = (params: ICellRendererParams) => {
  const { node, value } = params;

  document.addEventListener("click", (e: Event) => {
    if (e.target) {
      const clickedEle = e.target as HTMLInputElement;
      const eleId = clickedEle.id;
      // const ele = window.document.getElementById(context);
      const ele = document.getElementById(`${eleId}-textfield`);
      if (ele) {
        ele.focus();
      }
    }
  });

  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <div id={`${node.rowIndex}-1`}>
        <TextField
          id={`${node.rowIndex}-1-textfield`}
          value={value || ""}
          style={{ width: "100%" }}
          onClick={() => window.alert("clicked")}
        />
      </div>
      <div id={`${node.rowIndex}-1`}>
        <TextField
          id={`${node.rowIndex}-2-textfield`}
          value={value || ""}
          style={{ width: "100%" }}
          onClick={() => window.alert("clicked")}
        />
      </div>
    </div>
  );
};
