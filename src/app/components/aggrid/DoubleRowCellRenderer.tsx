import { ICellRendererParams } from "ag-grid-community";
import { SyntheticEvent } from "react";

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

export const DoubleRowCellRenderer = (params: ICellRendererParams) => {
  const { node } = params;

  const handleClick = (e: SyntheticEvent) => {
    // Getting triggered irregardless of click or right click. Not sure how to differentiate the two events
    console.log(e.eventPhase, e.nativeEvent);
    const clickedEle = e.target as HTMLDivElement;
    if (
      clickedEle.id === `${node.rowIndex}-1` ||
      clickedEle.id === `${node.rowIndex}-2`
    ) {
      waitForElement(`${clickedEle.id}-textfield`, 1000)
        .then((ele) => {
          const element = ele as HTMLElement;
          if (typeof element.focus === "function") {
            element.focus();
          }
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div
      id={`${node.rowIndex}-cell`}
      style={{ display: "flex", width: "100%", flexDirection: "column" }}
    >
      <div
        id={`${node.rowIndex}-1`}
        style={{
          width: "100%",
          backgroundColor: "green",
          height: "40px",
        }}
        onMouseDown={handleClick} // can't use onClick as the button is destroyed before the function can run
      />
      <div
        id={`${node.rowIndex}-2`}
        style={{
          width: "100%",
          backgroundColor: "red",
          height: "40px",
        }}
        onMouseDown={handleClick}
      />
    </div>
  );
};
