import { useState } from "react";
import Nav from "./Nav.jsx";
import "./styles/Interpret.css";

function Interpret() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image as base64 string or as needed
      };
      reader.readAsDataURL(file); // Read file as base64
    }
  };

  const handleSelectAnotherImage = () => {
    setImage(null);
  };

  // Handle form submission (image to ML model)
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (image) {
      console.log("Image successfully uploaded! Sending to ML model...");
      // Here, you can pass the image to your ML model (e.g., via API or directly in code)
      // For demonstration, logging the image data
    } else {
      console.log("No image uploaded yet!");
    }
  };

  return (
    <>
      <Nav />
      <div className="container-hero">
        <section className="msg-cta interpret-cta">
          <h1>Get Instant Interpretation for Your Brain MRI Images</h1>
        </section>
        <section className="upload-img">
          {image && (
            <div className="img-preview">
              <img src={image} alt="Uploaded" style={{ maxWidth: "300px", maxHeight: "300px" }} />
              <a className="close-btn" onClick={handleSelectAnotherImage}>
                x
              </a>
            </div>
          )}

          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} id="image-upload-input" />

          {!image && (
            <label htmlFor="image-upload-input">
              <a className="btn upload-img-btn">Upload Image</a>
            </label>
          )}

          {image && (
            <a className="btn submit-btn" onClick={handleSubmit}>
              Start scanning!
            </a>
          )}
        </section>
      </div>
    </>
  );
}

export default Interpret;
