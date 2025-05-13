import { ICellRendererParams } from "ag-grid-community";
import { ReactNode } from "react";
import { DoubleRowCellRenderer } from "./DoubleRowCellRenderer";

interface DoubleRowTextCellRendererProps extends ICellRendererParams {
  firstComponent: ReactNode;
  secondComponent: ReactNode;
}

const defaultComponent: ReactNode = (
  <div
    id="component1"
    style={{
      width: "100%",
      height: "40px",
      background: "green",
    }}
  ></div>
);

const defaultComponentTwo: ReactNode = (
  <div
    id="component2"
    style={{
      width: "100%",
      height: "40px",
      background: "red",
    }}
  >
    hello
  </div>
);

export const DoubleRowTextCellRenderer = (
  params: DoubleRowTextCellRendererProps
) => {
  const { firstComponent, secondComponent, ...rest } = params;

  return (
    <DoubleRowCellRenderer
      {...rest}
      firstComponent={defaultComponent}
      secondComponent={defaultComponentTwo}
    />
  );
};
