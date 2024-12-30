import { useState } from "react";
import "./App.css";
import DragDropImageUploader from "./DragDropImageUploader";

function App() {
  const [file, setFile] = useState<any>();
  function handleChange(e: any) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return <DragDropImageUploader />;
}

export default App;
