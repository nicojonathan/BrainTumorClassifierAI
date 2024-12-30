import { useState } from "react";
import Nav from "./Nav.jsx";
import "./styles/Interpret.css";
import * as tf from "@tensorflow/tfjs";

function Interpret() {
  const [image, setImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

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
    setPredictionResult(null);
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

                const maxPrediction = Math.max(...predictionsArray[0]);
                const predictedClassIndex = predictionsArray[0].indexOf(maxPrediction);

                console.log(predictionResult);
                console.log("Predicted class probability:", maxPrediction);

                setPredictionResult(predictedClassIndex.toString());
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
        <section className="result-container">
          {predictionResult && (
            <div>
              <h3>Radiology Report</h3>
              <div className="findings">
                <div>
                  <strong>Tumor type:</strong>
                </div>
                <div>{predictionResult === "0" ? "Glioma" : predictionResult === "1" ? "Pituitary" : predictionResult === "2" ? "Meningioma" : ""}</div>
                <div>
                  <strong>Key features (general):</strong>
                </div>
                <div>
                  {predictionResult === "0" ? (
                    <ul>
                      <li>Enhancement Patterns: High-grade gliomas often exhibit ring or heterogeneous enhancement; low-grade gliomas may show no or faint enhancement.</li>
                      <li>Edema: High-grade gliomas are associated with significant peritumoral edema.</li>
                      <li>Necrosis: Central necrosis is common in glioblastomas (Grade IV).</li>
                      <li>Margins: High-grade gliomas often have poorly defined, infiltrative margins.</li>
                    </ul>
                  ) : predictionResult === "1" ? (
                    <ul>
                      <li>Size: Tumors &lt; 10 mm are microadenomas, while those &gt; 10 mm are macroadenomas.</li>
                      <li>Mass Effect: Potential optic chiasm compression (causing bitemporal hemianopia) or lateral invasion into the cavernous sinus.</li>
                      <li>Enhancement: Tumor tissue enhances less than normal pituitary gland; cystic or necrotic components may be present in larger tumors.</li>
                    </ul>
                  ) : predictionResult === "2" ? (
                    <ul>
                      <li>Enhancement: Homogeneous and intense enhancement; a dural tail is a hallmark.</li>
                      <li>Margins: Typically well-defined but may become irregular in atypical or malignant cases.</li>
                      <li>Bone Changes: Calcification or hyperostosis may be present.</li>
                      <li>Edema: Associated brain edema can vary with tumor aggressiveness.</li>
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <strong>Recommendations:</strong>
                </div>
                <div>
                  {predictionResult === "0" ? (
                    <ul>
                      <li>Suggest advanced imaging (e.g., spectroscopy, perfusion) for assessing tumor grade and treatment planning.</li>
                      <li>Highlight the need to evaluate for mass effect or midline shift.</li>
                    </ul>
                  ) : predictionResult === "1" ? (
                    <ul>
                      <li>Suggest correlating with clinical symptoms to rule out functional adenomas.</li>
                      <li>Advise checking for cavernous sinus involvement or optic chiasm compression for surgical planning.</li>
                    </ul>
                  ) : predictionResult === "2" ? (
                    <ul>
                      <li>Suggest noting proximity to venous sinuses and critical neurovascular structures.</li>
                      <li>Highlight atypical features (e.g., irregular borders, heterogeneous enhancement).</li>
                    </ul>
                  ) : (
                    "ERROR"
                  )}
                </div>
                <div>
                  <strong>Differential diagnoses:</strong>
                </div>
                <div>
                  {predictionResult === "0" ? (
                    <ul>
                      <li>Brain metastases, abscess, or demyelinating lesions.</li>
                    </ul>
                  ) : predictionResult === "1" ? (
                    <ul>
                      <li>Rathke&apos;s cleft cyst, craniopharyngioma.</li>
                    </ul>
                  ) : predictionResult === "2" ? (
                    <ul>
                      <li>Dural metastases, hemangiopericytoma.</li>
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default Interpret;
