import { useState } from "react";
import "./App.css";
import DragDropImageUploader from "./DragDropImageUploader";
import { HexColorPicker } from "react-colorful";

function App() {
  const [colorAttributes, setColorAttributes] = useState({
    color: "#212122",
    colorPickerVisible: false,
    buttonText: "Select Color",
  });
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: colorAttributes.color,
      }}
    >
      <div>
        <button
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            padding: 10,
            backgroundColor: "gray",
            borderRadius: 5,
            color: "white",
            border: "none",
            fontSize: 16,
            fontWeight: "bold",
          }}
          onClick={() => {
            setColorAttributes({
              ...colorAttributes,
              colorPickerVisible: !colorAttributes.colorPickerVisible,
              buttonText: colorAttributes.colorPickerVisible
                ? "Select Color"
                : "Close Color Picker",
            });
          }}
        >
          {colorAttributes.buttonText}
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 10,
          display: colorAttributes.colorPickerVisible ? "block" : "none",
        }}
      >
        <HexColorPicker
          color={colorAttributes.color}
          onChange={(newColor) => {
            setColorAttributes({
              ...colorAttributes,
              color: newColor,
              // colorPickerVisible: false,
            });
          }}
          onAbort={() => {
            setColorAttributes({
              ...colorAttributes,
              colorPickerVisible: false,
            });
          }}
        />
      </div>

      <a
        href="https://docs.google.com/document/d/19XVQS1TXBv1Mj4BN4qkQTTz1W5ao8FwfgUUwO2X_6cs/edit?usp=sharing"
        target="_blank"
        rel="noreferrer"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            backgroundColor: "rgba(255, 255, 255, 0.5)",
            position: "absolute",
            bottom: 10,
            right: 10,
            zIndex: 100,
            padding: 10,
            cursor: "pointer",
            borderRadius: 50,
          }}
        >
          <p>Get the literature review document here</p>
        </div>
      </a>

      <DragDropImageUploader />
    </div>
  );
}

export default App;
