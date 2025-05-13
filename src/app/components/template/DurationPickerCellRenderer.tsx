// components/DurationPicker.jsx
import React, { ReactNode, useState } from "react";
import { TextField, Box } from "@mui/material";
import InputMask, { Props as InputMaskProps } from "react-input-mask";

type TInputMaskCorrect = Omit<InputMaskProps, "children"> & {
  children?: (inputProps: any) => JSX.Element;
};
const InputMaskCorrect: React.FC<TInputMaskCorrect> = ({
  children,
  ...props
}) => {
  const child = children as ReactNode;
  return <InputMask {...props}>{children}</InputMask>;
};

const DurationPicker = () => {
  const [duration, setDuration] = useState("00:00:00");

  const handleChange = (e) => {
    let value = e.target.value.replace(/[^0-9:]/g, "");
    setDuration(value);
  };

  return (
    <Box>
      <TextField
        label="Duration (HH:MM:SS)"
        variant="outlined"
        value={duration}
        onChange={handleChange}
        placeholder="00:00:00"
        inputProps={{ maxLength: 8, style: { textAlign: "center" } }}
        fullWidth
      />
    </Box>
  );
};

export default DurationPicker;
