import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MriReport from "./MriReport.jsx";
import { db } from "./firebase-config.js";
import { doc, getDoc } from "firebase/firestore";
import Nav from "./Nav.jsx";
import "./styles/MriDetailPage.css";

function MriDetailPage() {
  const [MriReport_, setMriReport] = useState(new MriReport());
  const { id } = useParams();

  const getMriReportById = async () => {
    try {
      // console.log("ID: ", id);
      const reportRef = doc(db, "radiology_reports", id);
      const report = await getDoc(reportRef);

      const fetchedReport = new MriReport(report.id, report.data().timestamp, report.data().tumor_type, report.data().image_url, report.data().key_features, report.data().recommendations, report.data().differential_diagnoses);

      setMriReport(fetchedReport);
    } catch (error) {
      console.error("Error retrieving documents:", error);
    }
  };

  useEffect(() => {
    getMriReportById();
  });

  return (
    <>
      <Nav />
      <div className="container-hero">
        <section className="result-container">
          {MriReport_ && (
            <div>
              <h3>Radiology Report</h3>
              <img src={MriReport_.imageUrl} alt="" />
              <div className="findings">
                <div>
                  <strong>Tumor type:</strong>
                </div>
                <div id="tumor-type-content">{MriReport_.tumorType}</div>
                <div>
                  <strong>Key features (general):</strong>
                </div>
                <div id="key-features-content">
                  {MriReport_.keyFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </div>
                <div>
                  <strong>Recommendations:</strong>
                </div>
                <div id="recommendations-content">
                  {MriReport_.recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </div>
                <div>
                  <strong>Differential diagnoses:</strong>
                </div>
                <div id="differential-diagnoses-content">
                  {MriReport_.differentialDiagnoses.map((differentialDiagnosis, index) => (
                    <li key={index}>{differentialDiagnosis}</li>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default MriDetailPage;
