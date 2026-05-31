const express = require("express");
const router = express.Router();
const multer = require("multer");
const { authUser } = require("../middlewares/auth.middleware");
const {
  generateInterviewReportController,
  getInterviewReportController,
  getAllInterviewReportsController,
  generateResumePdfController,
} = require("../controllers/interview.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", authUser, upload.single("resume"), generateInterviewReportController);
router.get("/", authUser, getAllInterviewReportsController);
router.get("/:id", authUser, getInterviewReportController);
router.post("/resume/pdf/:interviewReportId", authUser, generateResumePdfController);

module.exports = router;