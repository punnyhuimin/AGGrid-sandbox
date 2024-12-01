import { SvgIconComponent } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, {
  MouseEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export const useHover = (): [RefObject<HTMLDivElement>, boolean] => {
  const cellRef = useRef<HTMLDivElement>(null);
  const [showHoverIcon, setShowHoverIcon] = useState(false);
  const handleMouseEnter = useCallback((e: MouseEvent) => {
    setShowHoverIcon(true);
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    setShowHoverIcon(false);
  }, []);

  useEffect(() => {
    if (cellRef && cellRef.current) {
      cellRef.current.addEventListener("mouseenter", handleMouseEnter);
      cellRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (!cellRef.current) return;
      cellRef.current.removeEventListener("mouseenter", handleMouseEnter);
      cellRef.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cellRef]);

  return [cellRef, showHoverIcon];
};

interface HoverIconButtonProps {
  isHover: boolean;
  Icon: SvgIconComponent;
  onClick: MouseEventHandler<any>;
}

export const HoverIconButton: React.FC<HoverIconButtonProps> = ({
  isHover,
  Icon,
  onClick,
}) => {
  if (!isHover) return null;

  return (
    <IconButton
      style={{
        width: "30%",
        height: "40px",
      }}
      onMouseDown={onClick}
    >
      <Icon />
    </IconButton>
  );
};
