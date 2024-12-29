import "./styles/App.css";
import Nav from "./Nav.jsx";
import checkMark from "./assets/img/check-mark.png";
import feature1 from "./assets/img/mri-scanner.png";
import feature2 from "./assets/img/doctor.png";
import feature3 from "./assets/img/patients.png";

import step1 from "./assets/img/cloud-computing.png";
import step2 from "./assets/img/medical-checkup.png";

import igsocmedicon from "./assets/img/instagram.png";

function App() {
  return (
    <>
      <Nav />
      <div className="container-hero">
        <section className="msg-cta">
          <h1>Enhance Diagnostic Accuracy with AI-Powered Brain Tumor Detection</h1>
          <p>Save time and improve efficiency with cutting-edge AI tools tailored for healthcare professionals. Make faster, more accurate diagnoses to support better outcomes in brain tumor detection and treatment planning.</p>
          <a href="/interpret" className="btn">
            Start scanning!
          </a>
        </section>
        <section className="benefits">
          <ul>
            <li>
              <img src={checkMark} />
              <span>
                <strong>Accurate tumor detection:</strong> Leverage AI to achieve higher precision in diagnosing brain tumors.
              </span>
            </li>
            <li>
              <img src={checkMark} />
              <span>
                <strong>Save valuable time:</strong> Minimize waiting times with instant, AI-powered diagnoses.
              </span>
            </li>
            <li>
              <img src={checkMark} />
              <span>
                <strong>Streamline your workflow:</strong> Reduce manual effort and improve diagnostic efficiency.
              </span>
            </li>
            <li>
              <img src={checkMark} />
              <span>
                <strong>Accessible and reliable:</strong> Ensure consistent and dependable results for every scan.
              </span>
            </li>
          </ul>
        </section>
      </div>
      <div className="container-feature-highlight">
        <section className="feature-highlight">
          <div>
            <h2>Comprehensive Care for Brain Health</h2>
            <p>Empowering healthcare professionals with advanced AI to revolutionize brain tumor detection and treatment, ensuring accurate, timely care for every patient.</p>
          </div>

          <div className="features">
            <div className="feature">
              <img src={feature1} alt="" />
              <h3>Confidence in Every Diagnosis</h3>
              <p>Achieve unmatched precision with AI-powered tools designed for brain tumor detection. Support accurate and reliable diagnoses to ensure the best possible care.</p>
            </div>
            <div className="feature">
              <img src={feature2} alt="" />
              <h3>Empowering Medical Professionals</h3>
              <p>Enhance your expertise with state-of-the-art AI insights for brain tumor detection and treatment planning. Save time while making informed decisions with advanced technology.</p>
            </div>
            <div className="feature">
              <img src={feature3} alt="" />
              <h3>Healthcare for Your Patients</h3>
              <p>Deliver fast, accurate diagnoses tailored for brain tumor cases. Improve outcomes and provide personalized care for every patient’s unique needs.</p>
            </div>
          </div>
        </section>
      </div>
      <div className="container-how-it-works">
        <section className="how-it-works">
          <div>
            <h2>Simple & Straightforward</h2>
            <p>Quickly gain access to AI-driven insights, including tumor type predictions and expert guidance. Simplify your workflow and enhance diagnostic accuracy with minimal effort.</p>
          </div>

          <div className="steps">
            <div className="step">
              <img src={step1} alt="" />
              <h3>1. Upload your brain MRI image</h3>
              <p>Easily and securely upload brain MRI scans to our platform. Leverage AI-powered precision for accurate analysis and reliable diagnostic support.</p>
            </div>
            <div className="step">
              <img src={step2} alt="" />
              <h3>2. Get easy-to-understand report</h3>
              <p>Receive a report with predictions about the tumor type and actionable tips for healthcare professionals. Make informed decisions and optimize treatment planning with advanced AI insights.</p>
            </div>
          </div>

          <a href="/interpret" className="btn">
            Upload your first image now!
          </a>
        </section>
      </div>
      <footer>
        <div className="copyright">
          <div className="logo">
            <h2>
              BrainTumorClassifier<span>AI</span>
            </h2>
            <span>Copyright {"\u00A9"} 2024 - BrainTumorClassifierAI</span>
          </div>
        </div>
        <div className="social-media">
          <h3>Follow us on social media:</h3>
          <a href="https://www.instagram.com/braintumorclassifier.ai">
            <img src={igsocmedicon} alt="" />
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
