const mongoose = require("mongoose");

const interviewReportSchema = new mongoose.Schema({

user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: false  // ✅ required hata do
},

  title: {
    type: String,
    required: [true, "Job title is required"]
  },

  jobDescription: {
    type: String,
    required: [true, "Job description is required"]
  },

  selfDescription: {
    type: String
  },

  resumeText: {
    type: String
  },

  resumeName: {
    type: String
  },

  matchScore: {
    type: Number,
    default: 0
  },

  technicalQuestions: [
    {
      question: { type: String },
      intention: { type: String },
      answer: { type: String }
    }
  ],

  behavioralQuestions: [
    {
      question: { type: String },
      intention: { type: String },
      answer: { type: String }
    }
  ],

  skillGaps: [
    {
      skill: { type: String },
      severity: { type: String, enum: ["low", "medium", "high"] }
    }
  ],

  preparationPlan: [
    {
      day: { type: Number },
      focus: [{ type: String }],
      tasks: [{ type: String }]
    }
  ]

}, {
  timestamps: true
});

const InterviewReport = mongoose.model(
  "InterviewReport",
  interviewReportSchema
);

module.exports = InterviewReport;