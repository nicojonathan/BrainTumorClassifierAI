import "./assets/styles/App.css";
import Nav from "./Nav.jsx";

function App() {
  return (
    <>
      <Nav />
      <div>
        <section className="hero">
          <h1>Enhance Diagnostic Accuracy with AI-Powered Brain Tumor Detection</h1>
          <p>Save time and improve efficiency with cutting-edge AI tools tailored for healthcare professionals. Make faster, more accurate diagnoses to support better outcomes in brain tumor detection and treatment planning.</p>
          <a href="/interpret" className="cta-btn">
            Start scanning!
          </a>
        </section>
      </div>
    </>
  );
}

export default App;
