"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./signup.module.css";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    if (!agreedToTerms) {
      setError("Please agree to the Terms and Conditions");
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await signup(email, password, firstName, lastName);
      
      if (result.success) {
        router.push("/");
      } else {
        setError(result.error || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google signup");
  };

  const handleLinkedInSignup = () => {
    console.log("LinkedIn signup");
  };

  const handleGoBack = () => {
    router.push("/");
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <div className={styles.signupContainer}>
      {/* Top Bar */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image
            src="/images/logo_tribal.png"
            alt="Tribal Jobs"
            width={45}
            height={45}
          />
        </div>

        <button onClick={handleGoBack} className={styles.backButton}>
          Go back to website
        </button>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.content}>
          {/* Signup Form Card */}
          <div className={styles.formCard}>
            <h1 className={styles.title}>Sign up</h1>

            {/* Error Message */}
            {error && (
              <div className={styles.errorMessage}>{error}</div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* First Name and Last Name Row */}
              <div className={styles.nameRow}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className={styles.inputGroupFull}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>

              {/* Password Input */}
              <div className={styles.inputGroupFull}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`${styles.input} ${styles.passwordInput}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.showPasswordBtn}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className={styles.inputGroupFull}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`${styles.input} ${styles.passwordInput}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={styles.showPasswordBtn}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className={styles.termsRow}>
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  required
                  className={styles.checkbox}
                />
                <label htmlFor="terms-checkbox" className={styles.termsLabel}>
                  I agree to the{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenModal("terms");
                    }}
                    className={styles.termsLink}
                  >
                    Terms of Use
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenModal("privacy");
                    }}
                    className={styles.termsLink}
                  >
                    Privacy Policy
                  </button>
                  .
                </label>
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={!agreedToTerms || loading}
                className={styles.submitButton}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className={styles.divider}>
              <div className={styles.dividerLine}></div>
              <span className={styles.dividerText}>Or Sign up with</span>
              <div className={styles.dividerLine}></div>
            </div>

            {/* Social Signup Buttons */}
            <div className={styles.socialButtons}>
              {/* Google Button */}
              <button onClick={handleGoogleSignup} className={styles.socialButton}>
                <svg viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>

              {/* LinkedIn Button */}
              <button onClick={handleLinkedInSignup} className={styles.socialButton}>
                <svg viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
            </div>

            {/* Log In Link */}
            <p className={styles.loginText}>
              Already have an account?{" "}
              <Link href="/login" className={styles.loginLink} onClick={handleLoginClick}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Modal for Terms and Privacy */}
      {openModal && (
        <div 
          className={styles.modal}
          onClick={() => setOpenModal(null)}
        >
          <div 
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {openModal === "terms" ? "Terms of Use" : "Privacy Policy"}
              </h2>
              <button
                onClick={() => setOpenModal(null)}
                className={styles.closeButton}
              >
                <X style={{ width: 24, height: 24 }} />
              </button>
            </div>

            {/* Modal Content */}
            <div className={styles.modalBody}>
              {openModal === "terms" ? (
                <div className={styles.modalText}>
                  <p className={styles.modalHighlight}>
                    <strong>Last Updated:</strong> January 1, 2025
                  </p>
                  
                  <div className={styles.modalSection}>
                    <h3>1. Acceptance of Terms</h3>
                    <p>
                      By accessing and using Tribal Jobs, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
                    </p>
                  </div>

                  <div className={styles.modalSection}>
                    <h3>2. Use of Services</h3>
                    <p>
                      Tribal Jobs provides a platform for connecting gaming industry professionals with job opportunities. You agree to:
                    </p>
                    <ul>
                      <li>Provide accurate and truthful information</li>
                      <li>Maintain the security of your account</li>
                      <li>Not misuse or abuse the platform</li>
                      <li>Comply with all applicable laws and regulations</li>
                      <li>Not create fake profiles or impersonate others</li>
                    </ul>
                  </div>

                  <div className={styles.modalSection}>
                    <h3>3. Account Registration</h3>
                    <p>
                      To access certain features, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                    </p>
                  </div>

                  <div className={styles.modalSection}>
                    <h3>4. Contact Information</h3>
                    <p>
                      For questions about these Terms of Use, contact us at legal@tribaljobs.com
                    </p>
                  </div>
                </div>
              ) : (
                <div className={styles.modalText}>
                  <p className={styles.modalHighlight}>
                    <strong>Effective Date:</strong> January 1, 2025
                  </p>
                  
                  <div className={styles.modalSection}>
                    <h3>1. Information We Collect</h3>
                    <p>
                      At Tribal Jobs, we collect information to provide better services to all our users. The information we collect includes:
                    </p>
                    <ul>
                      <li>Personal information you provide (name, email, phone number)</li>
                      <li>Profile information (resume, work experience, skills)</li>
                      <li>Usage data and browsing activity on our platform</li>
                      <li>Device information and IP addresses</li>
                      <li>Communications you send to us</li>
                    </ul>
                  </div>

                  <div className={styles.modalSection}>
                    <h3>2. How We Use Your Information</h3>
                    <p>
                      We use the information we collect for the following purposes:
                    </p>
                    <ul>
                      <li>To provide and maintain our job matching services</li>
                      <li>To connect job seekers with potential employers</li>
                      <li>To improve and personalize your experience</li>
                      <li>To send you relevant job opportunities and updates</li>
                    </ul>
                  </div>

                  <div className={styles.modalSection}>
                    <h3>3. Contact Us</h3>
                    <p>
                      If you have any questions about this Privacy Policy, please contact us at privacy@tribaljobs.com
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
