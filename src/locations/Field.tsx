import { useEffect, useState } from "react";
import { Stack } from "@contentful/f36-components";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import { useSDK } from "@contentful/react-apps-toolkit";
import { HslColorPicker } from "react-colorful";
import ColorValueControl from "../components/ColorValueControl";
import { JsonEditor } from "@contentful/field-editor-json";

const Field = () => {
  const sdk = useSDK<FieldExtensionSDK>();
  // Either set hslValues state to the field value,
  // or set each value to 0 when not set (so as to not break the color picker).
  // This uses "lazy initialization" so as to not run the ternary on each render.
  const [hslValues, setHslValues] = useState(() =>
    sdk.field.getValue() ? sdk.field.getValue() : { h: 0, s: 0, l: 0 }
  );

  useEffect(() => {
    // Update CF field value when color value changes.
    sdk.field.setValue({
      ...hslValues,
    });
  }, [hslValues, sdk.field]);

  useEffect(() => {
    sdk.window.startAutoResizer();
  }, [sdk.window]);

  return (
    <>
      <Stack alignItems="start" flexDirection="row" spacing={"spacingXl"}>
        <HslColorPicker color={hslValues} onChange={setHslValues} />
        <Stack flexDirection="column" spacing={"spacing2Xs"}>
          <ColorValueControl
            name="Hue"
            index="h"
            min="0"
            max="360"
            hslValues={hslValues}
            updateParentState={setHslValues}
          />
          <ColorValueControl
            name="Saturation"
            index="s"
            min="0"
            max="100"
            hslValues={hslValues}
            updateParentState={setHslValues}
          />
          <ColorValueControl
            name="Lightness"
            index="l"
            min="0"
            max="100"
            hslValues={hslValues}
            updateParentState={setHslValues}
          />
        </Stack>
      </Stack>
      <JsonEditor field={sdk.field} isInitiallyDisabled={true} />
    </>
  );
};

export default Field;
