import { MouseEvent, MutableRefObject } from "react";
import { CustomButtonItem } from "../aggrid/DoubleRowCellRenderer";
import "./ContextMenu.css";

interface CustomContextMenuProps {
  //   rightClickItem: any;
  positionX: number;
  positionY: number;
  isToggled: boolean;
  buttons: CustomButtonItem[];
  contextMenuRef: MutableRefObject<HTMLMenuElement | null>;
}

const CustomContextMenu = (props: CustomContextMenuProps) => {
  console.log("triggered menu");
  const {
    // rightClickItem,
    positionX,
    positionY,
    isToggled,
    buttons,
    contextMenuRef,
  } = props;
  if (!buttons) return null;
  return (
    <menu
      // style={{ top: "200px", left: "300px" }}
      style={{ top: positionX + "px", left: positionY + "px" }}
      className={`context-menu ${isToggled ? "active" : ""}`}
      ref={contextMenuRef}
    >
      {buttons.map((button: CustomButtonItem, index: number) => {
        function handleClick(e: MouseEvent<HTMLButtonElement>) {
          e.stopPropagation();
          //   button.onClick(e, rightClickItem);
        }

        if (button.isSpacer) {
          return <hr key={index}></hr>;
        }
        return (
          <button
            onClick={handleClick}
            key={index}
            className="context-menu-button"
          >
            <span>{button.text}</span>
            <span className="icon">{button.icon}</span>
          </button>
        );
      })}
    </menu>
  );
};

export default CustomContextMenu;
