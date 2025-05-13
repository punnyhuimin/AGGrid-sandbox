import { ICellRendererParams } from "ag-grid-community";
import { ReactNode, SyntheticEvent } from "react";

interface DoubleRowCellRendererProps extends ICellRendererParams {
  firstComponent: ReactNode;
  secondComponent: ReactNode;
}
export interface CustomButtonItem {
  text: string;
  icon: string;
  onClick: () => void;
  isSpacer: boolean;
}

function waitForElement(id: string, timeout = 1000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const checkElement = () => {
      const element = document.getElementById(id);
      if (element) {
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        reject(
          new Error(`Element with ID "${id}" not found within ${timeout}ms`)
        );
      } else {
        requestAnimationFrame(checkElement); // Try again on the next animation frame.
      }
    };

    checkElement();
  });
}
export const DoubleRowCellRenderer = (props: DoubleRowCellRendererProps) => {
  const { node, column, firstComponent, secondComponent } = props;

  const handleClick = (e: SyntheticEvent) => {
    const clickedEle = e.currentTarget as HTMLDivElement;
    if (
      clickedEle.id === `${column?.getColId()}-${node.rowIndex}-1` ||
      clickedEle.id === `${column?.getColId()}-${node.rowIndex}-2`
    ) {
      waitForElement(`${clickedEle.id}-textfield`, 1000).then((ele) => {
        const element = ele as HTMLElement;
        if (typeof element.focus === "function") {
          const textFieldId = `${clickedEle.id}-textfield`;
          const element = document.getElementById(textFieldId);
          if (element && typeof element.focus === "function") {
            element.focus();
          }
        }
      });
    }
  };

  return (
    <div
      id={`${node.rowIndex}-cell`}
      style={{ display: "flex", width: "100%", flexDirection: "column" }}
    >
      <div
        id={`${column?.getColId()}-${node.rowIndex}-1`}
        style={{ width: "100%", height: "40px" }}
        onMouseDown={handleClick}
      >
        {firstComponent}
      </div>
      <div
        id={`${column?.getColId()}-${node.rowIndex}-2`}
        style={{ width: "100%", height: "40px" }}
        onMouseDown={handleClick}
      >
        {secondComponent}
      </div>
    </div>
  );
};
