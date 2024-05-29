import "./DragDropImageUploader.css";
import { useState, useRef } from "react";

import axios from "axios";

function DragDropImageUploader() {
  const url = "http://your-upload-endpoint";
  const [images, setImages] = useState<any>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function selectFiles() {
    fileInputRef.current?.click();
  }

  async function handleUpload() {
    // Check if any images are selected before proceeding
    if (images.length === 0) {
      console.error("No images selected for upload");
      return;
    }

    const formData = new FormData();

    // Loop through each selected image
    for (let i = 0; i < images.length; i++) {
      const imageFile = images[i];

      // Append image file to the FormData object
      formData.append("images", imageFile);
    }

    try {
      // Replace 'http://your-upload-endpoint' with your actual upload endpoint URL
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload successful:", response.data);

      // Handle the upload response based on your backend logic
      // You can potentially display a success message or perform further actions
    } catch (error) {
      console.error("Upload failed:", error);

      // Handle upload errors by displaying an error message or taking corrective actions
    }
  }

  function deleteImage(index: number) {
    setImages((prevImage: any) => {
      return prevImage.filter((_: any, i: number) => i != index);
    });
  }

  function onFileSelect(event: any) {
    const files = event?.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") {
        console.log("file is not an image");
        continue;
      }
      if (!images.some((e: any) => e.name === files[i].name)) {
        setImages((prevImages: any) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  return (
    <div className="mainContainer">
      <div className="card">
        <div className="top">
          <p>Cat or Dog ?</p>
        </div>
        <div className="drag-area">
          {isDragging ? (
            <span className="select">Drop images here</span>
          ) : (
            <>
              Drop an image here or
              <span onClick={selectFiles} role="button" className="select">
                Browse
              </span>
            </>
          )}

          <input
            onChange={onFileSelect}
            ref={fileInputRef}
            type="file"
            name="file"
            className="file"
            multiple={true}
          />
        </div>
        <div>
          <button onClick={handleUpload} type="button">
            Predict !
          </button>
        </div>
      </div>

      <div className="result-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
            color: "#581c1c",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: 40,
            }}
          >
            Results
          </p>
        </div>

        <div
          style={{
            flex: 1,
            height: "100%",
            // padding: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",

            alignItems: "center",
            overflow: "vertical",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              height: "250px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              overflowY: "scroll",
              scrollbarWidth: "none",
              gap: "10px",

              // backgroundColor: "yellow",
            }}
            className="container"
          >
            {images?.map(
              (images: any, index: number) => (
                console.log(images, typeof images),
                (
                  <div key={index} className="image">
                    <div className="imageContainer">
                      <img
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: "5px",
                        }}
                        src={images.url}
                        alt={images.name}
                      />
                      <span
                        onClick={() => {
                          deleteImage(index);
                        }}
                        className="delete"
                      >
                        &times;
                      </span>
                      <span
                        style={{
                          marginLeft: 10,
                          textDecoration: "underline",
                          color: "white",
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                          textAlign: "center",
                        }}
                      >
                        Cat
                      </span>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DragDropImageUploader;

/** 
function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    // Prevent default behavior
    event.preventDefault();

    const files = event.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();

    // Loop through selected files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check if file is an image
      if (file.type.split("/")[0] !== "image") {
        console.log("file is not an image");
        continue;
      }

      // Check if image already exists using filename comparison
      if (!images.some((e: any) => e.name === file.name)) {
        formData.append("images", file); // Append image file to FormData

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
          // Update state for image preview (optional)
          setImages((prevImages: any) => [
            ...prevImages,
            {
              name: file.name,
              url: e.target?.result, // Data URL for preview
            },
          ]);
        };
      } else {
        console.log(`${file.name} already exists.`);
      }
    }

    // Send images to server using Axios
    axios
      .post("url", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for image uploads
        },
      })
      .then((response) => {
        console.log("Images uploaded successfully:", response.data);
        // Handle successful upload (e.g., clear state, display success message)
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        // Handle upload error (e.g., display error message)
      });
  } 
*/
