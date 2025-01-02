import { useEffect, useState } from "react";
import MriReport from "./MriReport.jsx";
import { db } from "./firebase-config.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import Nav from "./Nav.jsx";
import "./styles/MyMriPage.css";

// eslint-disable-next-line react/prop-types
function MyMriPage({ user }) {
  const [MriReports, setMriReports] = useState([]);

  const getAllMriReports = async () => {
    try {
      const reportsRef = collection(db, "radiology_reports");
      // eslint-disable-next-line react/prop-types
      const reportsQuery = query(reportsRef, where("user_id", "==", user.uid));

      const reports = await getDocs(reportsQuery);

      const fetchedReports = [];
      reports.forEach((report) => {
        fetchedReports.push(new MriReport(report.id, report.data().timestamp, report.data().tumor_type, report.data().image_url));
      });

      setMriReports(fetchedReports);
    } catch (error) {
      console.error("Error retrieving documents:", error);
    }
  };

  useEffect(() => {
    getAllMriReports();
  });

  return (
    <>
      <Nav />
      <div className="container-report">
        {MriReports.length > 0 ? (
          MriReports.map((report, index) => (
            <div key={index} className="report">
              <div>
                <img src={report.imageUrl} alt="" />
              </div>
              <div className="metadata">
                <p className="report-title">
                  <strong>
                    {report.tumorType}
                    {"_"}
                    {report.timestamp}
                  </strong>
                </p>
              </div>
              <div>
                <a href={`/my/mri/${report.id}`} className="btn btn-view-report">
                  View
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>You have not uploaded any MRI yet!</p>
        )}
      </div>
    </>
  );
}

export default MyMriPage;
