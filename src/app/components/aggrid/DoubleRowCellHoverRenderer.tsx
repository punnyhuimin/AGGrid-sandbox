import { Lightbulb, YouTube } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { ICellRendererParams } from "ag-grid-community";
import { MouseEvent, SyntheticEvent, useState } from "react";

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

export const DoubleRowCellHoverRenderer = (params: ICellRendererParams) => {
  const { node } = params;

  const handleClick = (e: SyntheticEvent) => {
    // TODO: Getting triggered irregardless of click or right click. Not sure how to differentiate the two events
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

  const [showHoverIcon, setShowHoverIcon] = useState<boolean>(false);
  const handleMouseEnter = (e: MouseEvent) => {
    setShowHoverIcon(true);
  };
  const handleMouseLeave = () => {
    setShowHoverIcon(false);
  };

  const [showFirstHoverIcon, setFirstShowHoverIcon] = useState<boolean>(false);
  const handleFirstMouseEnter = (e: MouseEvent) => {
    setFirstShowHoverIcon(true);
  };
  const handleFirstMouseLeave = () => {
    setFirstShowHoverIcon(false);
  };

  const [openYoutube, setOpenYoutube] = useState(false);

  const handleClose = () => {
    setOpenYoutube(false);
  };

  const handleYoutubeClick = (e: MouseEvent) => {
    e.preventDefault();
    // params.api.
    e.stopPropagation();
    console.log("clicked youtube");
    setOpenYoutube(true);
  };

  return (
    <div
      id={`${node.rowIndex}-cell`}
      style={{ display: "flex", width: "100%", flexDirection: "column" }}
    >
      <div
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "green",
          display: "flex",
        }}
        onMouseEnter={handleFirstMouseEnter}
        onMouseLeave={handleFirstMouseLeave}
      >
        {showFirstHoverIcon ? (
          <IconButton
            style={{
              width: "30%",
              height: "40px",
            }}
            onMouseDown={handleYoutubeClick}
          >
            <YouTube />
          </IconButton>
        ) : (
          <></>
        )}
        <div
          id={`${node.rowIndex}-1`}
          style={{
            width: "70%",
            backgroundColor: "green",
            height: "40px",
          }}
          onMouseDown={handleClick}
        />
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "red",
          height: "40px",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showHoverIcon ? (
          <IconButton
            style={{
              width: "30%",
            }}
            onMouseDown={handleYoutubeClick}
          >
            <Lightbulb />
          </IconButton>
        ) : (
          <></>
        )}
        <div
          id={`${node.rowIndex}-2`}
          style={{
            width: "70%",
            backgroundColor: "red",
            height: "40px",
          }}
          onMouseDown={handleClick}
        />
      </div>

      <Dialog
        open={openYoutube}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
