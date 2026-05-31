import { useNavigate } from "react-router-dom";
import { useState } from "react";

import FileUpload from "../ui/FileUpload";
import FormNote from "../ui/FormNote";
import Button from "../ui/Button";
import PageFooter from "../ui/PageFooter";

import { useInterview } from "../hooks/useInterview";

import "../style/home.scss";

export default function Home() {

  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const { loading, generateReport, reports } = useInterview();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobDescription || (!selfDescription && !resumeFile)) {
      alert("Please fill required fields");
      return;
    }

    const report = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });

    console.log("REPORT IN HOME:", report);
    console.log("REPORT ID:", report?._id);

    if (report && report._id) {
      navigate(`/interview/${report._id}`);
    } else {
      alert("Report generation failed");
    }
  };

  return (
    <div className="home">
      <div className="home-container">

        <div className="page-header">
          <h1>
            Create Your Custom{" "}
            <span className="highlight">Interview Plan</span>
          </h1>
          <p className="subtitle">
            Let our AI analyze the job requirements and your
            unique profile to build a winning strategy.
          </p>
        </div>

        <div className="main-card">
          <form onSubmit={handleSubmit}>
            <div className="form-wrapper">

              <div className="form-column left-column">
                <div className="textarea-header">
                  <label>🎯 Target Job Description</label>
                  <span className="badge">REQUIRED</span>
                </div>
                <div className="textarea-wrapper">
                  <textarea
                    className="textarea-plain"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste job description..."
                    maxLength={5000}
                  />
                  <div className="char-counter">
                    {jobDescription.length} / 5000 chars
                  </div>
                </div>
              </div>

              <div className="form-column right-column">
                <div className="file-header">
                  <label>👤 Your Profile</label>
                </div>

                <div className="form-group">
                  <div className="input-header">
                    <label>Upload Resume</label>
                    <span className="badge">BEST RESULTS</span>
                  </div>
                  <FileUpload
                    id="resume"
                    onFileSelect={(file) => {
                      console.log("Selected File =>", file);
                      setResumeFile(file);
                    }}
                  />
                  {resumeFile && (
                    <p style={{ marginTop: "10px", fontSize: "0.8rem", color: "#7d8590" }}>
                      Selected: {resumeFile.name}
                    </p>
                  )}
                </div>

                <div className="or-divider">
                  <span>OR</span>
                </div>

                <div className="form-group">
                  <label className="section-label">
                    Quick Self-Description
                  </label>
                  <textarea
                    className="textarea-group"
                    value={selfDescription}
                    onChange={(e) => setSelfDescription(e.target.value)}
                    placeholder="Write about yourself..."
                  />
                </div>

                <FormNote type="validation">
                  Either a Resume or a Self Description
                  is required to generate a personalized plan.
                </FormNote>
              </div>

            </div>

            <div className="cta-section">
              <p className="cta-text">
                AI-Powered Strategy Generation • Approx 30s
              </p>
              <Button type="submit" disabled={loading}>
                {loading ? "Generating..." : "Generate My Interview Strategy"}
              </Button>
            </div>

          </form>
        </div>

        {/* Recent Interview Plans */}
        {reports.length > 0 && (
          <section className="recent-reports">
            <h2>My Recent Interview Plans</h2>
            <ul className="reports-list">
              {reports.map((r) => (
                <li
  key={r._id}
  className="report-item"
  onClick={() => navigate(`/interview/${r._id}`)}
>
  <h3>{r.title || "Untitled Position"}</h3>
  <p className="report-meta">
    Generated on {new Date(r.createdAt).toLocaleDateString()}
  </p>
  <p className={`match-score ${
    r.matchScore >= 80 ? "score--high" :
    r.matchScore >= 60 ? "score--mid" : "score--low"
  }`}>
    Match Score: {r.matchScore}%
  </p>
</li>
              ))}
            </ul>
          </section>
        )}

        <PageFooter />
      </div>
    </div>
  );
}