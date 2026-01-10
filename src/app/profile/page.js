"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditingGeneral, setIsEditingGeneral] = useState(false);
  const [isEditingProfessional, setIsEditingProfessional] = useState(false);
  const [isEditingLinks, setIsEditingLinks] = useState(false);
  const [isEditingCredentials, setIsEditingCredentials] = useState(false);
  const [isEditingNotifications, setIsEditingNotifications] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // CV Upload State
  const [uploadedCV, setUploadedCV] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [useForApplications, setUseForApplications] = useState(false);
  
  // Profile State
  const [profileData, setProfileData] = useState({
    firstName: "Rastko",
    lastName: "Petrovic",
    currentRole: "Senior Game Designer",
    about: "Passionate game designer with expertise in mobile game design, player engagement systems, and live operations.",
    mainSkills: ["Unity", "Game Design", "C#", "Mobile Gaming", "UI/UX"],
    languages: [
      { language: "English", level: "C1" },
      { language: "Serbian", level: "Native" }
    ],
    jobSearchStatus: "actively-looking",
    
    totalYearsOfExperience: "10",
    yearsInCurrentField: "8",
    previousPositions: ["Game Designer", "Junior Game Designer"],
    industryExperience: ["Gaming", "iGaming"],
    desiredPositions: ["Lead Game Designer", "Product Manager", "Creative Director"],
    preferredWorkType: ["Full-time", "Contract / B2B"],
    
    linkedinUrl: "https://linkedin.com/in/rastkopetrovic",
    githubUrl: "",
    portfolioUrl: "https://artstation.com/rastko",
    otherUrl: "",
    
    // Account Settings
    email: "rastko.petrovic@example.com",
    password: "••••••••",
    country: "Serbia",
    phoneNumber: "+381 64 123 4567",
    notificationsEnabled: true,
    notificationChannel: "Email"
  });

  const [editForm, setEditForm] = useState(profileData);
  
  // Input states
  const [skillInput, setSkillInput] = useState("");
  const [langSearchInput, setLangSearchInput] = useState("");
  const [selectedLang, setSelectedLang] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [prevPosInput, setPrevPosInput] = useState("");
  const [desiredPosInput, setDesiredPosInput] = useState("");

  const languageOptions = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", 
    "Russian", "Chinese", "Japanese", "Korean", "Arabic", "Hindi",
    "Dutch", "Swedish", "Norwegian", "Danish", "Finnish", "Polish",
    "Turkish", "Greek", "Hebrew", "Thai", "Vietnamese", "Indonesian",
    "Serbian", "Croatian", "Czech", "Hungarian", "Romanian", "Bulgarian"
  ];

  const languageLevels = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"];

  const filteredLanguages = languageOptions.filter(lang => 
    lang.toLowerCase().includes(langSearchInput.toLowerCase())
  );

  // Redirect if not logged in
  if (!user) {
    router.push('/login');
    return null;
  }

  // Handler functions
  const handleEditGeneral = () => {
    setEditForm(profileData);
    setIsEditingGeneral(true);
  };

  const handleSaveGeneral = () => {
    if (!editForm.firstName.trim() || !editForm.lastName.trim()) {
      alert("First Name and Last Name are required");
      return;
    }
    setProfileData(editForm);
    setIsEditingGeneral(false);
  };

  const handleCancelGeneral = () => {
    setEditForm(profileData);
    setIsEditingGeneral(false);
  };

  const handleEditProfessional = () => {
    setEditForm(profileData);
    setIsEditingProfessional(true);
  };

  const handleSaveProfessional = () => {
    setProfileData(editForm);
    setIsEditingProfessional(false);
  };

  const handleCancelProfessional = () => {
    setEditForm(profileData);
    setIsEditingProfessional(false);
  };

  const handleEditLinks = () => {
    setEditForm(profileData);
    setIsEditingLinks(true);
  };

  const handleSaveLinks = () => {
    setProfileData(editForm);
    setIsEditingLinks(false);
  };

  const handleCancelLinks = () => {
    setEditForm(profileData);
    setIsEditingLinks(false);
  };

  // CV Upload Handlers
  const handleFileUpload = (file) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (validTypes.includes(file.type)) {
      setUploadedCV({ name: file.name, size: file.size });
    } else {
      alert('Please upload a PDF, DOC, or DOCX file');
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleRemoveCV = () => {
    setUploadedCV(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // Skills
  const addSkill = () => {
    if (skillInput.trim() && editForm.mainSkills.length < 5 && !editForm.mainSkills.includes(skillInput.trim())) {
      setEditForm({ ...editForm, mainSkills: [...editForm.mainSkills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setEditForm({ ...editForm, mainSkills: editForm.mainSkills.filter(s => s !== skill) });
  };

  // Languages
  const handleSelectLanguage = (lang) => {
    setSelectedLang(lang);
    setLangSearchInput(lang);
    setShowLangDropdown(false);
    setShowLevelDropdown(true);
  };

  const handleSelectLevel = (level) => {
    setSelectedLevel(level);
    setShowLevelDropdown(false);
    
    if (selectedLang) {
      const newLang = { language: selectedLang, level: level };
      const exists = editForm.languages.some(l => l.language === newLang.language);
      if (!exists) {
        setEditForm({ ...editForm, languages: [...editForm.languages, newLang] });
      }
      setLangSearchInput("");
      setSelectedLang("");
      setSelectedLevel("");
    }
  };

  const removeLanguage = (language) => {
    setEditForm({ ...editForm, languages: editForm.languages.filter(l => l.language !== language) });
  };

  // Previous Positions
  const addPrevPosition = () => {
    if (prevPosInput.trim() && editForm.previousPositions.length < 2 && !editForm.previousPositions.includes(prevPosInput.trim())) {
      setEditForm({ ...editForm, previousPositions: [...editForm.previousPositions, prevPosInput.trim()] });
      setPrevPosInput("");
    }
  };

  const removePrevPosition = (position) => {
    setEditForm({ ...editForm, previousPositions: editForm.previousPositions.filter(p => p !== position) });
  };

  // Desired Positions
  const addDesiredPosition = () => {
    if (desiredPosInput.trim() && editForm.desiredPositions.length < 3 && !editForm.desiredPositions.includes(desiredPosInput.trim())) {
      setEditForm({ ...editForm, desiredPositions: [...editForm.desiredPositions, desiredPosInput.trim()] });
      setDesiredPosInput("");
    }
  };

  const removeDesiredPosition = (position) => {
    setEditForm({ ...editForm, desiredPositions: editForm.desiredPositions.filter(p => p !== position) });
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          {/* Header */}
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Candidate Profile</h1>
            <p className={styles.pageSubtitle}>
              Manage your profile information and job application preferences
            </p>
          </div>

        {/* Mobile Dropdown Selector */}
        <div className={styles.mobileTabSelector}>
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className={styles.mobileSelect}
          >
            <option value="profile">Profile</option>
            <option value="applications">Applications</option>
            <option value="saved">Saved Jobs</option>
            <option value="settings">Account Settings</option>
          </select>
        </div>

        {/* Desktop Horizontal Tabs */}
        <div className={styles.desktopTabs}>
          <button
            onClick={() => setActiveTab("profile")}
            className={`${styles.tab} ${activeTab === "profile" ? styles.tabActive : ""}`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`${styles.tab} ${activeTab === "applications" ? styles.tabActive : ""}`}
          >
            Applications
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`${styles.tab} ${activeTab === "saved" ? styles.tabActive : ""}`}
          >
            Saved Jobs
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`${styles.tab} ${activeTab === "settings" ? styles.tabActive : ""}`}
          >
            Account Settings
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div className={styles.tabContent}>
            {/* Metrics */}
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <h3 className={styles.metricLabel}>Total Applications</h3>
                  <svg className={styles.metricIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FE0032" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <p className={styles.metricValue}>4</p>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <h3 className={styles.metricLabel}>Saved Jobs</h3>
                  <svg className={styles.metricIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FE0032" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <p className={styles.metricValue}>8</p>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricHeader}>
                  <h3 className={styles.metricLabel}>Project Applications</h3>
                  <svg className={styles.metricIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FE0032" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <p className={styles.metricValue}>0</p>
              </div>
            </div>

            {/* SECTION 1 - GENERAL PROFILE */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>General Profile</h2>
                {!isEditingGeneral ? (
                  <button onClick={handleEditGeneral} className={styles.editBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                ) : (
                  <div className={styles.editActions}>
                    <button onClick={handleCancelGeneral} className={styles.cancelBtn}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      Cancel
                    </button>
                    <button onClick={handleSaveGeneral} className={styles.saveBtn}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                        <polyline points="7 3 7 8 15 8"></polyline>
                      </svg>
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.twoColumnGrid}>
                {/* LEFT COLUMN */}
                <div className={styles.formColumn}>
                  {/* First Name & Last Name Row */}
                  <div className={styles.formRow}>
                    <div className={styles.formField}>
                      <label className={styles.label}>First Name *</label>
                      <input
                        type="text"
                        value={isEditingGeneral ? editForm.firstName : profileData.firstName}
                        onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                        readOnly={!isEditingGeneral}
                        className={`${styles.input} ${!isEditingGeneral ? styles.inputReadonly : ""}`}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div className={styles.formField}>
                      <label className={styles.label}>Last Name *</label>
                      <input
                        type="text"
                        value={isEditingGeneral ? editForm.lastName : profileData.lastName}
                        onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                        readOnly={!isEditingGeneral}
                        className={`${styles.input} ${!isEditingGeneral ? styles.inputReadonly : ""}`}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  {/* Current Role */}
                  <div className={styles.formField}>
                    <label className={styles.label}>Current Role / Job Title</label>
                    <input
                      type="text"
                      value={isEditingGeneral ? editForm.currentRole : profileData.currentRole}
                      onChange={(e) => setEditForm({ ...editForm, currentRole: e.target.value })}
                      readOnly={!isEditingGeneral}
                      className={`${styles.input} ${!isEditingGeneral ? styles.inputReadonly : ""}`}
                      placeholder="e.g., Senior Game Designer"
                    />
                  </div>

                  {/* About */}
                  <div className={styles.formField}>
                    <label className={styles.label}>
                      About {isEditingGeneral && `(${editForm.about.length}/300)`}
                    </label>
                    <textarea
                      value={isEditingGeneral ? editForm.about : profileData.about}
                      onChange={(e) => setEditForm({ ...editForm, about: e.target.value.slice(0, 300) })}
                      readOnly={!isEditingGeneral}
                      className={`${styles.textarea} ${!isEditingGeneral ? styles.inputReadonly : ""}`}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className={styles.formColumn}>
                  {/* Languages */}
                  <div className={styles.formField}>
                    <label className={styles.label}>Languages</label>
                    {isEditingGeneral ? (
                      <div>
                        <div className={styles.languageInputWrapper}>
                          <input
                            type="text"
                            value={langSearchInput}
                            onChange={(e) => {
                              setLangSearchInput(e.target.value);
                              setShowLangDropdown(true);
                              setShowLevelDropdown(false);
                            }}
                            onFocus={() => setShowLangDropdown(true)}
                            className={styles.input}
                            placeholder="Search for a language..."
                          />
                          
                          {showLangDropdown && !selectedLang && langSearchInput && (
                            <div className={styles.dropdown}>
                              {filteredLanguages.map((lang) => (
                                <div
                                  key={lang}
                                  onClick={() => handleSelectLanguage(lang)}
                                  className={styles.dropdownItem}
                                >
                                  {lang}
                                </div>
                              ))}
                            </div>
                          )}

                          {showLevelDropdown && selectedLang && (
                            <div className={styles.dropdown}>
                              {languageLevels.map((level) => (
                                <div
                                  key={level}
                                  onClick={() => handleSelectLevel(level)}
                                  className={styles.dropdownItem}
                                >
                                  {level}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {editForm.languages.length > 0 && (
                          <div className={styles.tagList}>
                            {editForm.languages.map((lang, idx) => (
                              <span key={idx} className={styles.tag}>
                                {lang.language} — {lang.level}
                                <button
                                  onClick={() => removeLanguage(lang.language)}
                                  className={styles.tagRemove}
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                  </svg>
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        {profileData.languages.length > 0 ? (
                          <div className={styles.tagList}>
                            {profileData.languages.map((lang, idx) => (
                              <span key={idx} className={styles.tag}>
                                {lang.language} — {lang.level}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className={styles.placeholder}>Select language and level</span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Main Skills */}
                  <div className={styles.formField}>
                    <label className={styles.label}>Main Skills (max 5)</label>
                    {isEditingGeneral ? (
                      <div>
                        <div className={styles.skillInputWrapper}>
                          <input
                            type="text"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                            className={styles.input}
                            placeholder="Add skills (max 5)"
                            disabled={editForm.mainSkills.length >= 5}
                          />
                        </div>
                        {editForm.mainSkills.length > 0 && (
                          <div className={styles.tagList}>
                            {editForm.mainSkills.map((skill, idx) => (
                              <span key={idx} className={styles.tag}>
                                {skill}
                                <button
                                  onClick={() => removeSkill(skill)}
                                  className={styles.tagRemove}
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                  </svg>
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        {profileData.mainSkills.length > 0 ? (
                          <div className={styles.tagList}>
                            {profileData.mainSkills.map((skill, idx) => (
                              <span key={idx} className={styles.tag}>
                                {skill}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className={styles.placeholder}>Add up to 5 skills</span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Job Search Status */}
                  <div className={styles.formField}>
                    <label className={styles.label}>Job Search Status</label>
                    {isEditingGeneral ? (
                      <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="jobSearchStatus"
                            value="actively-looking"
                            checked={editForm.jobSearchStatus === "actively-looking"}
                            onChange={(e) => setEditForm({ ...editForm, jobSearchStatus: e.target.value })}
                            className={styles.radio}
                          />
                          <span>Actively looking</span>
                        </label>
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="jobSearchStatus"
                            value="open-to-opportunities"
                            checked={editForm.jobSearchStatus === "open-to-opportunities"}
                            onChange={(e) => setEditForm({ ...editForm, jobSearchStatus: e.target.value })}
                            className={styles.radio}
                          />
                          <span>Open to opportunities</span>
                        </label>
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="jobSearchStatus"
                            value="side-hustle"
                            checked={editForm.jobSearchStatus === "side-hustle"}
                            onChange={(e) => setEditForm({ ...editForm, jobSearchStatus: e.target.value })}
                            className={styles.radio}
                          />
                          <span>Only looking for side hustle</span>
                        </label>
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            name="jobSearchStatus"
                            value="not-looking"
                            checked={editForm.jobSearchStatus === "not-looking"}
                            onChange={(e) => setEditForm({ ...editForm, jobSearchStatus: e.target.value })}
                            className={styles.radio}
                          />
                          <span>Not looking</span>
                        </label>
                      </div>
                    ) : (
                      <div className={styles.displayBox}>
                        <span className={styles.displayText}>
                          {profileData.jobSearchStatus === "actively-looking" && "Actively looking"}
                          {profileData.jobSearchStatus === "open-to-opportunities" && "Open to opportunities"}
                          {profileData.jobSearchStatus === "side-hustle" && "Only looking for side hustle"}
                          {profileData.jobSearchStatus === "not-looking" && "Not looking"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2 - PROFESSIONAL BACKGROUND */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Professional Background</h2>
                {!isEditingProfessional ? (
                  <button onClick={handleEditProfessional} className={styles.editBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                ) : (
                  <div className={styles.editActions}>
                    <button onClick={handleCancelProfessional} className={styles.cancelBtn}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      Cancel
                    </button>
                    <button onClick={handleSaveProfessional} className={styles.saveBtn}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                        <polyline points="7 3 7 8 15 8"></polyline>
                      </svg>
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.twoColumnGrid}>
                {/* LEFT COLUMN */}
                <div className={styles.formColumn}>
                  <div className={styles.formField}>
                    <label className={styles.label}>Total Years of Experience</label>
                    <input
                      type="number"
                      value={isEditingProfessional ? editForm.totalYearsOfExperience : profileData.totalYearsOfExperience}
                      onChange={(e) => setEditForm({ ...editForm, totalYearsOfExperience: e.target.value })}
                      readOnly={!isEditingProfessional}
                      className={`${styles.input} ${!isEditingProfessional ? styles.inputReadonly : ""}`}
                      placeholder="Enter years"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.label}>Years of Experience in Current Field</label>
                    <input
                      type="number"
                      value={isEditingProfessional ? editForm.yearsInCurrentField : profileData.yearsInCurrentField}
                      onChange={(e) => setEditForm({ ...editForm, yearsInCurrentField: e.target.value })}
                      readOnly={!isEditingProfessional}
                      className={`${styles.input} ${!isEditingProfessional ? styles.inputReadonly : ""}`}
                      placeholder="Enter years"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.label}>Previous Positions (max 2)</label>
                    {isEditingProfessional ? (
                      <div>
                        <input
                          type="text"
                          value={prevPosInput}
                          onChange={(e) => setPrevPosInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addPrevPosition())}
                          className={styles.input}
                          placeholder="Select previous roles"
                          disabled={editForm.previousPositions.length >= 2}
                        />
                        {editForm.previousPositions.length > 0 && (
                          <div className={styles.tagList}>
                            {editForm.previousPositions.map((position, idx) => (
                              <span key={idx} className={styles.tag}>
                                {position}
                                <button
                                  onClick={() => removePrevPosition(position)}
                                  className={styles.tagRemove}
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                  </svg>
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        {profileData.previousPositions.length > 0 ? (
                          <div className={styles.tagList}>
                            {profileData.previousPositions.map((position, idx) => (
                              <span key={idx} className={styles.tag}>
                                {position}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className={styles.placeholder}>Select previous roles</span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className={styles.formColumn}>
                  <div className={styles.formField}>
                    <label className={styles.label}>Industry Experience</label>
                    {isEditingProfessional ? (
                      <div className={styles.checkboxGroup}>
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={editForm.industryExperience.includes("Gaming")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEditForm({ ...editForm, industryExperience: [...editForm.industryExperience, "Gaming"] });
                              } else {
                                setEditForm({ ...editForm, industryExperience: editForm.industryExperience.filter(i => i !== "Gaming") });
                              }
                            }}
                            className={styles.checkbox}
                          />
                          <span>Gaming</span>
                        </label>
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={editForm.industryExperience.includes("iGaming")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEditForm({ ...editForm, industryExperience: [...editForm.industryExperience, "iGaming"] });
                              } else {
                                setEditForm({ ...editForm, industryExperience: editForm.industryExperience.filter(i => i !== "iGaming") });
                              }
                            }}
                            className={styles.checkbox}
                          />
                          <span>iGaming</span>
                        </label>
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={editForm.industryExperience.includes("Blockchain Gaming")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEditForm({ ...editForm, industryExperience: [...editForm.industryExperience, "Blockchain Gaming"] });
                              } else {
                                setEditForm({ ...editForm, industryExperience: editForm.industryExperience.filter(i => i !== "Blockchain Gaming") });
                              }
                            }}
                            className={styles.checkbox}
                          />
                          <span>Blockchain Gaming</span>
                        </label>
                      </div>
                    ) : (
                      <>
                        {profileData.industryExperience.length > 0 ? (
                          <div className={styles.tagList}>
                            {profileData.industryExperience.map((industry, idx) => (
                              <span key={idx} className={styles.tag}>
                                {industry}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className={styles.placeholder}>Select industries</span>
                        )}
                      </>
                    )}
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.label}>Desired Positions (max 3)</label>
                    {isEditingProfessional ? (
                      <div>
                        <input
                          type="text"
                          value={desiredPosInput}
                          onChange={(e) => setDesiredPosInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDesiredPosition())}
                          className={styles.input}
                          placeholder="Select desired positions"
                          disabled={editForm.desiredPositions.length >= 3}
                        />
                        {editForm.desiredPositions.length > 0 && (
                          <div className={styles.tagList}>
                            {editForm.desiredPositions.map((position, idx) => (
                              <span key={idx} className={styles.tag}>
                                {position}
                                <button
                                  onClick={() => removeDesiredPosition(position)}
                                  className={styles.tagRemove}
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                  </svg>
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        {profileData.desiredPositions.length > 0 ? (
                          <div className={styles.tagList}>
                            {profileData.desiredPositions.map((position, idx) => (
                              <span key={idx} className={styles.tag}>
                                {position}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className={styles.placeholder}>Select desired positions</span>
                        )}
                      </>
                    )}
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.label}>Preferred Work Type</label>
                    {isEditingProfessional ? (
                      <div className={styles.checkboxGroup}>
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={editForm.preferredWorkType.includes("Full-time")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEditForm({ ...editForm, preferredWorkType: [...editForm.preferredWorkType, "Full-time"] });
                              } else {
                                setEditForm({ ...editForm, preferredWorkType: editForm.preferredWorkType.filter(t => t !== "Full-time") });
                              }
                            }}
                            className={styles.checkbox}
                          />
                          <span>Full-time</span>
                        </label>
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={editForm.preferredWorkType.includes("Contract / B2B")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEditForm({ ...editForm, preferredWorkType: [...editForm.preferredWorkType, "Contract / B2B"] });
                              } else {
                                setEditForm({ ...editForm, preferredWorkType: editForm.preferredWorkType.filter(t => t !== "Contract / B2B") });
                              }
                            }}
                            className={styles.checkbox}
                          />
                          <span>Contract / B2B</span>
                        </label>
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={editForm.preferredWorkType.includes("Freelance")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEditForm({ ...editForm, preferredWorkType: [...editForm.preferredWorkType, "Freelance"] });
                              } else {
                                setEditForm({ ...editForm, preferredWorkType: editForm.preferredWorkType.filter(t => t !== "Freelance") });
                              }
                            }}
                            className={styles.checkbox}
                          />
                          <span>Freelance</span>
                        </label>
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={editForm.preferredWorkType.includes("Project-based")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setEditForm({ ...editForm, preferredWorkType: [...editForm.preferredWorkType, "Project-based"] });
                              } else {
                                setEditForm({ ...editForm, preferredWorkType: editForm.preferredWorkType.filter(t => t !== "Project-based") });
                              }
                            }}
                            className={styles.checkbox}
                          />
                          <span>Project-based</span>
                        </label>
                      </div>
                    ) : (
                      <>
                        {profileData.preferredWorkType.length > 0 ? (
                          <div className={styles.tagList}>
                            {profileData.preferredWorkType.map((type, idx) => (
                              <span key={idx} className={styles.tag}>
                                {type}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className={styles.placeholder}>Select work types</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3 - CV / RESUME */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>CV / Resume</h2>
              </div>

              {!uploadedCV ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`${styles.uploadZone} ${isDragging ? styles.uploadZoneDragging : ""}`}
                >
                  <svg className={styles.uploadIcon} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <p className={styles.uploadText}>Upload your CV (PDF, DOC, DOCX)</p>
                  <p className={styles.uploadSubtext}>Drag and drop your file here</p>
                  <label className={styles.browseBtn}>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileInput}
                      className={styles.fileInput}
                    />
                    Browse file
                  </label>
                </div>
              ) : (
                <>
                  <div className={styles.uploadedFile}>
                    <div className={styles.fileInfo}>
                      <svg className={styles.fileIcon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FE0032" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      <div className={styles.fileDetails}>
                        <p className={styles.fileName}>{uploadedCV.name}</p>
                        <p className={styles.fileSize}>{formatFileSize(uploadedCV.size)}</p>
                      </div>
                    </div>
                    <div className={styles.fileActions}>
                      <label className={styles.replaceBtn}>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileInput}
                          className={styles.fileInput}
                        />
                        Replace
                      </label>
                      <button onClick={handleRemoveCV} className={styles.removeBtn}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className={styles.cvCheckbox}>
                    <label className={styles.cvCheckboxLabel}>
                      <input
                        type="checkbox"
                        checked={useForApplications}
                        onChange={(e) => setUseForApplications(e.target.checked)}
                        className={styles.checkbox}
                      />
                      <div>
                        <span className={styles.cvCheckboxText}>Use this CV for job applications</span>
                        <p className={styles.cvCheckboxSubtext}>
                          When enabled, this CV will be automatically attached to your job applications
                        </p>
                      </div>
                    </label>
                  </div>
                </>
              )}
            </div>

            {/* SECTION 4 - LINKS */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Links</h2>
                {!isEditingLinks ? (
                  <button onClick={handleEditLinks} className={styles.editBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                ) : (
                  <div className={styles.editActions}>
                    <button onClick={handleCancelLinks} className={styles.cancelBtn}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      Cancel
                    </button>
                    <button onClick={handleSaveLinks} className={styles.saveBtn}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                        <polyline points="7 3 7 8 15 8"></polyline>
                      </svg>
                      Save
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.linksGrid}>
                <div className={styles.formField}>
                  <label className={styles.label}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}>
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    LinkedIn Profile (URL)
                  </label>
                  <input
                    type="url"
                    value={isEditingLinks ? editForm.linkedinUrl : profileData.linkedinUrl}
                    onChange={(e) => setEditForm({ ...editForm, linkedinUrl: e.target.value })}
                    readOnly={!isEditingLinks}
                    className={`${styles.input} ${!isEditingLinks ? styles.inputReadonly : ""}`}
                    placeholder="https://"
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.label}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}>
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    GitHub Profile (URL)
                  </label>
                  <input
                    type="url"
                    value={isEditingLinks ? editForm.githubUrl : profileData.githubUrl}
                    onChange={(e) => setEditForm({ ...editForm, githubUrl: e.target.value })}
                    readOnly={!isEditingLinks}
                    className={`${styles.input} ${!isEditingLinks ? styles.inputReadonly : ""}`}
                    placeholder="https://"
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.label}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}>
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    Portfolio Website (URL)
                  </label>
                  <input
                    type="url"
                    value={isEditingLinks ? editForm.portfolioUrl : profileData.portfolioUrl}
                    onChange={(e) => setEditForm({ ...editForm, portfolioUrl: e.target.value })}
                    readOnly={!isEditingLinks}
                    className={`${styles.input} ${!isEditingLinks ? styles.inputReadonly : ""}`}
                    placeholder="https://"
                  />
                </div>

                <div className={styles.formField}>
                  <label className={styles.label}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px'}}>
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                    Other Link (URL)
                  </label>
                  <input
                    type="url"
                    value={isEditingLinks ? editForm.otherUrl : profileData.otherUrl}
                    onChange={(e) => setEditForm({ ...editForm, otherUrl: e.target.value })}
                    readOnly={!isEditingLinks}
                    className={`${styles.input} ${!isEditingLinks ? styles.inputReadonly : ""}`}
                    placeholder="https://"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className={styles.tabContent}>
            <div className={styles.emptyState}>
              <svg className={styles.emptyIcon} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <p className={styles.emptyText}>No applications yet</p>
              <p className={styles.emptySubtext}>Start applying to jobs to see them here</p>
            </div>
          </div>
        )}

        {/* Saved Jobs Tab */}
        {activeTab === "saved" && (
          <div className={styles.tabContent}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Saved Jobs</h2>
              
              <div className={styles.emptyState}>
                <svg className={styles.emptyIcon} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                <p className={styles.emptyText}>No saved jobs yet</p>
                <p className={styles.emptySubtext}>Save jobs to easily find them later</p>
              </div>
            </div>
          </div>
        )}

        {/* Account Settings Tab */}
        {activeTab === "settings" && (
          <div className={styles.tabContent}>
            {/* Credentials & Contact */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Credentials & Contact</h2>
                {!isEditingCredentials ? (
                  <button
                    onClick={() => {
                      setEditForm(profileData);
                      setIsEditingCredentials(true);
                    }}
                    className={styles.settingsEditButton}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className={styles.settingsEditActions}>
                    <button
                      onClick={() => {
                        setProfileData(editForm);
                        setIsEditingCredentials(false);
                      }}
                      className={styles.settingsPrimaryButton}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                        <polyline points="7 3 7 8 15 8"></polyline>
                      </svg>
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditForm(profileData);
                        setIsEditingCredentials(false);
                      }}
                      className={styles.settingsSecondaryButton}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.settingsGrid}>
                <div className={styles.settingsField}>
                  <span className={styles.settingsFieldLabel}>Email</span>
                  {isEditingCredentials ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className={styles.input}
                      placeholder="your.email@example.com"
                    />
                  ) : (
                    <div className={styles.settingsValue}>{profileData.email || "Not specified"}</div>
                  )}
                </div>

                <div className={styles.settingsField}>
                  <span className={styles.settingsFieldLabel}>Password</span>
                  {isEditingCredentials ? (
                    <input
                      type="password"
                      value={editForm.password}
                      onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                      className={styles.input}
                      placeholder="Enter new password"
                    />
                  ) : (
                    <div className={styles.settingsValue}>{profileData.password}</div>
                  )}
                </div>

                <div className={styles.settingsField}>
                  <span className={styles.settingsFieldLabel}>Country</span>
                  {isEditingCredentials ? (
                    <input
                      type="text"
                      value={editForm.country}
                      onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                      className={styles.input}
                      placeholder="Country"
                    />
                  ) : (
                    <div className={styles.settingsValue}>{profileData.country || "Not specified"}</div>
                  )}
                </div>

                <div className={styles.settingsField}>
                  <span className={styles.settingsFieldLabel}>Phone Number</span>
                  {isEditingCredentials ? (
                    <input
                      type="tel"
                      value={editForm.phoneNumber}
                      onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                      className={styles.input}
                      placeholder="+381 64 123 4567"
                    />
                  ) : (
                    <div className={styles.settingsValue}>{profileData.phoneNumber || "Not specified"}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Notifications</h2>
                {!isEditingNotifications ? (
                  <button
                    onClick={() => {
                      setEditForm(profileData);
                      setIsEditingNotifications(true);
                    }}
                    className={styles.settingsEditButton}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className={styles.settingsEditActions}>
                    <button
                      onClick={() => {
                        setProfileData(editForm);
                        setIsEditingNotifications(false);
                      }}
                      className={styles.settingsPrimaryButton}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                        <polyline points="7 3 7 8 15 8"></polyline>
                      </svg>
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditForm(profileData);
                        setIsEditingNotifications(false);
                      }}
                      className={styles.settingsSecondaryButton}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.settingsNotifications}>
                <label className={styles.settingsCheckboxRow}>
                  <input
                    type="checkbox"
                    checked={isEditingNotifications ? editForm.notificationsEnabled : profileData.notificationsEnabled}
                    onChange={(e) => {
                      if (isEditingNotifications) {
                        setEditForm({ ...editForm, notificationsEnabled: e.target.checked });
                      }
                    }}
                    className={styles.settingsCheckbox}
                    disabled={!isEditingNotifications}
                  />
                  <span className={styles.settingsCheckboxLabel}>Receive job notifications based on my preferences</span>
                </label>

                <div className={styles.settingsField}>
                  <span className={styles.settingsFieldLabel}>Preferred Notification Channel</span>
                  {isEditingNotifications ? (
                    <div className={styles.settingsSelectWrapper}>
                      <select
                        value={editForm.notificationChannel}
                        onChange={(e) => setEditForm({ ...editForm, notificationChannel: e.target.value })}
                        className={styles.settingsSelect}
                      >
                        <option value="Email">Email</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Telegram">Telegram</option>
                        <option value="Viber">Viber</option>
                      </select>
                      <svg className={styles.settingsSelectChevron} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  ) : (
                    <div className={styles.settingsValue}>{profileData.notificationChannel}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Delete Account */}
            <div className={`${styles.section} ${styles.deleteSection}`}>
              <h3 className={styles.deleteTitle}>Delete Account</h3>
              <p className={styles.deleteText}>
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>

              {showDeleteConfirm ? (
                <div className={styles.deleteConfirmBox}>
                  <p className={styles.deleteConfirmText}>
                    Are you sure you want to delete your account? This will permanently remove all your data.
                  </p>
                  <div className={styles.deleteButtons}>
                    <button
                      onClick={() => {
                        console.log("Account deleted");
                        setShowDeleteConfirm(false);
                      }}
                      className={styles.deleteConfirmButton}
                    >
                      Yes, Delete My Account
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className={styles.deleteCancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className={styles.deleteTriggerButton}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Delete Account
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
    <Footer />
    </>
  );
}
