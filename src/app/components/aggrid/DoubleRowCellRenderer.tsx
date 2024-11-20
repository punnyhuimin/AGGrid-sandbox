import { styled } from "@mui/material";
import { ICellRendererParams } from "ag-grid-community";
import { MouseEvent, useRef, useState } from "react";
import CustomContextMenu from "../contextMenu/CustomContextMenu";

export const ContextMenu = styled("div")({
  position: "absolute",
  width: "200px",
  backgroundColor: "#383838",
  borderRadius: "5px",
  boxSizing: "border-box",
});

export interface CustomButtonItem {
  text: string;
  icon: string;
  onClick: () => void;
  isSpacer: boolean;
}

export const DoubleRowCellRenderer = (params: ICellRendererParams) => {
  const { node, value } = params;

  const contextMenuRef = useRef<HTMLMenuElement | null>(null);

  console.log("contextMenuRef", contextMenuRef);
  document.addEventListener("click", (e) => {
    if (e.target) {
      const clickedEle = e.target as HTMLElement;
      if (
        clickedEle.id === `${node.rowIndex}-1` ||
        clickedEle.id === `${node.rowIndex}-2`
      ) {
        const ele = document.getElementById(`${clickedEle.id}-textfield`);
        ele?.focus();
      }
    }
  });

  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    toggled: false,
  });

  // const [openContext, setOpenContext] = useState(false);
  // const defaultXY = { x: 0, y: 0 };
  // type typeXY = {
  //   x: number;
  //   y: number;
  // };
  // const [xy, setXY] = useState<typeXY>(defaultXY);
  const handleContextMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contextMenuAttr = contextMenuRef.current?.getBoundingClientRect();
    console.log("handle context menu", contextMenuAttr);
    const isLeft = e.clientX < window.innerWidth / 2;

    let x;
    let y = e.clientY;
    if (isLeft) {
      x = e.clientX;
    } else {
      x = e.clientX - (contextMenuAttr?.width || 0);
    }

    const newContextMenu = {
      position: { x: x, y: y },
      toggled: true,
    };
    console.log("newContextMenu", newContextMenu);
    setContextMenu(newContextMenu);
  };

  return (
    <div
      id={`${node.rowIndex}-cell`}
      style={{ display: "flex", width: "100%", flexDirection: "column" }}
    >
      <button
        id={`${node.rowIndex}-1`}
        style={{
          width: "100%",
          backgroundColor: "green",
          height: "40px",
        }}
        onContextMenu={handleContextMenu}
      />
      <button
        id={`${node.rowIndex}-2`}
        style={{
          width: "100%",
          backgroundColor: "red",
          height: "40px",
        }}
        onContextMenu={handleContextMenu}
      />
      <CustomContextMenu
        contextMenuRef={contextMenuRef}
        isToggled={contextMenu.toggled}
        positionX={contextMenu.position.x}
        positionY={contextMenu.position.y}
        buttons={[
          {
            text: "Do something",
            icon: ":)",
            onClick: () => alert("hello"),
            isSpacer: false,
          },
          {
            text: "Do something else",
            icon: ":|",
            onClick: () => alert("hello else"),
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
  );
};
