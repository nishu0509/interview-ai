import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getInterviewReport } from "../services/interview.api";

export default function InterviewUIPage() {

  const { interviewId: id } = useParams(); // ✅ Fixed

  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchReport = async () => {

      try {

        const response = await getInterviewReport(id);

        console.log("INTERVIEW DATA =>", response.data);

        setReport(response.data.interviewReport);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchReport();

  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0d1117",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "40px",
          fontWeight: "bold"
        }}
      >
        Loading...
      </div>
    );
  }

  if (!report) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0d1117",
          color: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        Report Not Found
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d1117",
        color: "white",
        padding: "40px"
      }}
    >
      <h1>{report.title}</h1>

      <br />

      <h2>Job Description</h2>
      <p>{report.jobDescription}</p>

      <br />

      <h2>Self Description</h2>
      <p>{report.selfDescription}</p>

      <br />

      <h2>Resume Text</h2>
      <p>{report.resumeText}</p>

    </div>
  );
}