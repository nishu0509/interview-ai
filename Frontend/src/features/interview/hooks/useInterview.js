import { useState, useEffect } from "react";
import { generateInterviewReport, getInterviewReport, getAllInterviewReports } from "../services/interview.api";

export const useInterview = () => {

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getAllInterviewReports();
        setReports(response.data.interviewReports);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReports();
  }, []);

  const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true);
    let interviewReport = null;
    try {
      const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
      interviewReport = response.data.interviewReport;
      setReport(interviewReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return interviewReport;
  };

  const getReportById = async (id) => {
    setLoading(true);
    let interviewReport = null;
    try {
      const response = await getInterviewReport(id);
      interviewReport = response.data.interviewReport;
      setReport(interviewReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return interviewReport;
  };

  const getResumePdf = (id) => {
    console.log("Download PDF for:", id);
  };

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getResumePdf,
  };
};