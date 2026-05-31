import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/interview`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile
}) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);
  return API.post("/", formData);
};

export const getInterviewReport = async (id) => {
  return API.get(`/${id}`);
};

export const getAllInterviewReports = async () => {
  return API.get("/");
};

export const generateResumePdf = async (interviewReportId) => {
  return API.post(`/resume/pdf/${interviewReportId}`, null, {
    responseType: "blob"
  });
}; 