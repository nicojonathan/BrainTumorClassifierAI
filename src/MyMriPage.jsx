import { useEffect, useState } from "react";
import MriRecord from "./MriRecord";
import { db } from "./firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import Nav from "./Nav.jsx";
import "./styles/MyMriPage.css";

function MyMriPage() {
  const [MriRecords, setMriRecords] = useState([]);

  const getAllRadiologyReports = async () => {
    try {
      const reportsRef = collection(db, "radiology_reports");
      const querySnapshot = await getDocs(reportsRef);

      const fetchedRecords = [];
      querySnapshot.forEach((doc) => {
        fetchedRecords.push(new MriRecord(doc.id, doc.data().timestamp, doc.data().tumor_type, doc.data().image_url));
      });

      setMriRecords(fetchedRecords);
    } catch (error) {
      console.error("Error retrieving documents:", error);
    }
  };

  useEffect(() => {
    getAllRadiologyReports();
  });

  return (
    <>
      <Nav />
      <div className="container-record">
        {MriRecords.map((record, index) => (
          <div key={index} className="record">
            <div>
              <img src={record.imageUrl} alt="" />
            </div>
            <div className="metadata">
              <p className="report-title">
                <strong>
                  {record.tumorType}
                  {"_"}
                  {record.timestamp}
                </strong>
              </p>
            </div>
            <div>
              <a href={`/my/mri/${record.id}`} className="btn btn-view-report">
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyMriPage;
