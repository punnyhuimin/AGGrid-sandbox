import { useRef, MouseEvent, useState } from "react";
import CustomContextMenu from "./CustomContextMenu";

const TestContextMenu = () => {
  const [people, setPeople] = useState([
    { id: 1, name: "john", selected: false },
    { id: 2, name: "john2", selected: false },
    { id: 3, name: "john3", selected: false },
    { id: 4, name: "john4", selected: false },
  ]);

  const [contextMenu, setContextMenu] = useState({
    position: {
      x: 0,
      y: 0,
    },
    toggled: false,
  });
  const contextMenuRef = useRef<HTMLMenuElement | null>(null);

  const handleContextMenu = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const contextMenuAttr = e.currentTarget.getBoundingClientRect();
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
    <div>
      <ul>
        {people.map((person, index) => {
          return (
            <li key={index} onContextMenu={handleContextMenu}>
              {person.name}
            </li>
          );
        })}
      </ul>
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

export default TestContextMenu;
