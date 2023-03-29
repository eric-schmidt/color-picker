import { ChangeEventHandler } from "react";
import { FormControl, TextInput } from "@contentful/f36-components";

const ColorValueControl = ({
  name,
  index,
  min,
  max,
  hslValues,
  updateParentState,
}: {
  name: string;
  index: string;
  min: string;
  max: string;
  hslValues: { [index: string]: string };
  updateParentState: (values: {}) => void;
}) => {
  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    // Get the value from the TextInput component.
    const { value } = e.target;
    // Set updated color values, bubbled up to parent component.
    updateParentState({ ...hslValues, [index]: Number(value) });
  };

  return (
    <FormControl
      isRequired
      isInvalid={!hslValues[index]}
      style={{ width: "100%" }}
    >
      <FormControl.Label>{name}</FormControl.Label>
      <TextInput
        value={hslValues[index]}
        type="number"
        min={min}
        max={max}
        name={name}
        onChange={(e) => {
          handleInputChange(e);
        }}
      />
      {!hslValues[index] && (
        <FormControl.ValidationMessage>
          {name} not provided
        </FormControl.ValidationMessage>
      )}
    </FormControl>
  );
};

export default ColorValueControl;
