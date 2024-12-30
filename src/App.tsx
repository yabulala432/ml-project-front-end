import { useState } from "react";
import "./App.css";
import DragDropImageUploader from "./DragDropImageUploader";
import { HexColorPicker } from "react-colorful";

function App() {
  
  return (
    <div
      style={{*
        height: "100vh",
        width: "100vw",
        backgroundColor: colorAttributes.color,
      }}
    >
      

      <a
        href="https://docs.google.com/document/d/1jI0nQjLVyCToN0LXL9mc0-T-1XN3bIjFwfUEKG_kJmE/edit?usp=sharing"
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
