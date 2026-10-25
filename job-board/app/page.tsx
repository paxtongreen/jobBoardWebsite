
"use client";

import { useRef, useState } from "react";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleResumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const extension = file.name
      .toLowerCase()
      .slice(file.name.lastIndexOf("."));

    if (!allowedExtensions.includes(extension)) {
      setError("Please select a PDF, DOC, or DOCX file.");
      setResume(null);
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Your resume must be smaller than 5 MB.");
      setResume(null);
      event.target.value = "";
      return;
    }

    setResume(file);
    setError("");
  };

  return (
    <main className="homepage">
      <nav className="navbar">
        <h2 className="logo">JobBoard</h2>

        <div className="nav-links">
          <a href="#">Find Jobs</a>
          <a href="#">For Employers</a>
        </div>
      </nav>

      <section className="hero">
        <h1>Find Your Next Opportunity</h1>

        <p className="hero-description">
          Upload your resume to get started.
          Discover opportunities that match
          your skills, experience, and career goals.
        </p>

        <div className="resume-upload">
          <h2>Start With Your Resume</h2>

          <p className="upload-description">
            Your next opportunity starts here.
          </p>

          <div className="upload-box">
            <div className="upload-icon" aria-hidden="true">
              ↑
            </div>

            <h3>Upload Your Resume</h3>

            <p>PDF, DOC, or DOCX (Max 5 MB)</p>

            <input
              ref={fileInputRef}
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="file-input"
              aria-label="Select your resume"
            />

            <button
              type="button"
              className="upload-button"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose Resume
            </button>

            {resume && (
              <p className="upload-success" role="status">
                Selected: {resume.name}
              </p>
            )}

            {error && (
              <p className="upload-error" role="alert">
                {error}
              </p>
            )}
          </div>

          <p className="privacy-note">
            Your resume is only selected locally for now.
            It is not uploaded or stored.
          </p>
        </div>
      </section>
    </main>
  );
}
