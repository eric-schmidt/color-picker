import { ChangeEventHandler, useEffect, useState } from "react";
import { FormControl, Stack, TextInput } from "@contentful/f36-components";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { HslColorPicker } from "react-colorful";
// import { JsonEditor } from "@contentful/field-editor-json";

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  const [color, setColor] = useState(sdk.field.getValue());

  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    // Get the name and value from the TextInput component.
    const { name, value } = e.target;
    // Set updated color values.
    setColor({ ...color, [name]: Number(value) });
  };

  useEffect(() => {
    // Update CF field value when color value changes.
    sdk.field.setValue({
      ...color,
    });
  }, [color, sdk.field]);

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, [sdk.window]);

  return (
    <>
      <Stack alignItems="start" flexDirection="row" spacing={"spacingXl"}>
        <HslColorPicker color={color} onChange={setColor} />
        <Stack flexDirection="column" spacing={"spacing2Xs"}>
          <FormControl
            isRequired
            isInvalid={!color.h}
            style={{ width: "100%" }}
          >
            <FormControl.Label>Hue</FormControl.Label>
            <TextInput
              value={color.h}
              type="number"
              min="1"
              max="360"
              name="h"
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            {!color.h && (
              <FormControl.ValidationMessage>
                Hue value not provided
              </FormControl.ValidationMessage>
            )}
          </FormControl>

          <FormControl
            isRequired
            isInvalid={!color.s}
            style={{ width: "100%" }}
          >
            <FormControl.Label>Saturation</FormControl.Label>
            <TextInput
              value={color.s}
              type="number"
              min="1"
              max="100"
              name="s"
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            {!color.s && (
              <FormControl.ValidationMessage>
                Saturation value not provided
              </FormControl.ValidationMessage>
            )}
          </FormControl>

          <FormControl
            isRequired
            isInvalid={!color.l}
            style={{ width: "100%" }}
          >
            <FormControl.Label>Lightness</FormControl.Label>
            <TextInput
              value={color.l}
              type="number"
              min="1"
              max="100"
              name="l"
              onChange={(e) => {
                handleInputChange(e);
              }}
            />
            {!color.l && (
              <FormControl.ValidationMessage>
                Lightness value not provided
              </FormControl.ValidationMessage>
            )}
          </FormControl>
        </Stack>
      </Stack>
      {/* <JsonEditor field={sdk.field} isInitiallyDisabled={true} /> */}
    </>
  );
};

export default Field;
