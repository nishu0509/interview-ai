const InterviewReport = require("../models/interviewReport.model");
const pdfParse = require("pdf-parse");
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service");

const generateInterviewReportController = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { jobDescription, selfDescription } = req.body;

    let resumeText = "";

    if (req.file) {
      const pdfData = await pdfParse(req.file.buffer);
      resumeText = pdfData.text;
      console.log("RESUME TEXT:", resumeText);
    }

    const aiReport = await generateInterviewReport({
      resume: resumeText,
      selfDescription,
      jobDescription,
    });

    console.log("AI REPORT:", aiReport);

    const interviewReport = await InterviewReport.create({
      user: req.user._id,
      title: aiReport.title || "Interview Plan",
      jobDescription,
      selfDescription,
      resumeText,
      matchScore: aiReport.matchScore,
      technicalQuestions: aiReport.technicalQuestions,
      behavioralQuestions: aiReport.behavioralQuestions,
      skillGaps: aiReport.skillGaps,
      preparationPlan: aiReport.preparationPlan,
    });

    console.log("SAVED REPORT:", interviewReport);
    console.log("SAVED REPORT ID:", interviewReport._id);

    return res.status(201).json({
      success: true,
      interviewReport,
    });

  } catch (error) {
    console.log("ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getInterviewReportController = async (req, res) => {
  try {
    const interviewReport = await InterviewReport.findById(req.params.id);

    if (!interviewReport) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    return res.status(200).json({
      success: true,
      interviewReport,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllInterviewReportsController = async (req, res) => {
  try {
    const reports = await InterviewReport.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title matchScore createdAt");

    return res.status(200).json({
      success: true,
      interviewReports: reports,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const generateResumePdfController = async (req, res) => {
  try {
    const interviewReport = await InterviewReport.findById(req.params.interviewReportId);

    if (!interviewReport) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    const { resumeText, jobDescription, selfDescription } = interviewReport;

    const pdfBuffer = await generateResumePdf({
      resume: resumeText,
      jobDescription,
      selfDescription,
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${req.params.interviewReportId}.pdf`,
    });

    res.send(pdfBuffer);

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateInterviewReportController,
  getInterviewReportController,
  getAllInterviewReportsController,
  generateResumePdfController,
};