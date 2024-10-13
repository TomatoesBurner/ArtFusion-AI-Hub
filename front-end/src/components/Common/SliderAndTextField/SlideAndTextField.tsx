import {
  Slider,
  SliderValueLabelProps,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";

function ValueLabelComponent(props: SliderValueLabelProps) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

export type SlideAndTextFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

const SlideAndTextField = ({
  label,
  value,
  min,
  max,
  onChange,
}: SlideAndTextFieldProps) => {
  const [fieldValue, setFieldValue] = useState(min || 0);

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const handleSliderChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    //   onChange(value as number);
    setFieldValue(value as number);
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFieldValue(parseInt(event.target.value, 10) || 0);
  };

  const handleSliderBlurChange = () => {
    if (onChange) {
      onChange(fieldValue);
    }
  };

  const handleTextFieldBlurChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (onChange) {
      let newValue = parseInt(event.target.value, 10) || value;

      onChange(Math.max(Math.min(newValue, max), min));
    }
  };

  return (
    <>
      <Typography variant="body2">{label}</Typography>
      <Stack direction={"row"} gap={4}>
        <Slider
          value={fieldValue}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderBlurChange}
          min={min}
          max={max}
          valueLabelDisplay="auto"
        />
        <TextField
          size="small"
          type="number"
          value={fieldValue || ""}
          onChange={handleTextFieldChange}
          onBlur={handleTextFieldBlurChange}
          inputProps={{ min: 0 }}
        />
      </Stack>
    </>
  );
};

export default memo(SlideAndTextField);
