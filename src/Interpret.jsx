import { useState } from "react";
import Nav from "./Nav.jsx";
import "./styles/Interpret.css";
import * as tf from "@tensorflow/tfjs";

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

  const preprocessImage = (base64String, targetSize) => {
    return new Promise((resolve) => {
      // Creating a new Promise
      const image = new Image();
      image.src = base64String;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = targetSize[0];
        canvas.height = targetSize[1];
        ctx.drawImage(image, 0, 0, targetSize[0], targetSize[1]);

        const imageData = ctx.getImageData(0, 0, targetSize[0], targetSize[1]);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const gray = 0.2989 * r + 0.587 * g + 0.114 * b;
          data[i] = data[i + 1] = data[i + 2] = gray;
        }

        const normalizedData = new Float32Array(targetSize[0] * targetSize[1]);
        for (let i = 0, j = 0; i < data.length; i += 4, j++) {
          normalizedData[j] = data[i] / 255.0;
        }

        const tensor = tf.tensor(normalizedData, [1, targetSize[0], targetSize[1], 1]);
        resolve(tensor);
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (image) {
      const model = await tf.loadLayersModel("/model/model.json");
      preprocessImage(image, [256, 256])
        .then((tensor) => {
          if (tensor && tensor.shape) {
            console.log("Preprocessed tensor shape:", tensor.shape);

            const predictions = model.predict(tensor);

            predictions
              .array()
              .then((predictionsArray) => {
                console.log(predictionsArray);
                // Find the index of the maximum value
                const maxPrediction = Math.max(...predictionsArray[0]);
                const predictedClassIndex = predictionsArray[0].indexOf(maxPrediction);

                console.log("Predicted class index:", predictedClassIndex);
                console.log("Predicted class probability:", maxPrediction);
              })
              .catch((error) => {
                console.error("Error converting predictions to array:", error);
              });
          } else {
            console.error("No tensor was returned.");
          }
        })
        .catch((error) => {
          console.error("Error preprocessing image:", error);
        });
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
