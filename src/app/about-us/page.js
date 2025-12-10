'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function AboutUsPage() {
  return (
    <div className={styles.page}>
      <Header />
      
      <div className={styles.container}>
        <section className={styles.heroSection}>
          <h1 className={styles.mainTitle}>About Tribal Jobs</h1>
          <div className={styles.underline}></div>
        </section>

        <section className={styles.missionSection}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          
          <div className={styles.missionContent}>
            <p className={styles.paragraph}>
              Tribal Jobs was born from a shared passion for gaming and a vision to revolutionize how talent connects within the gaming industry. We're a small group of friends who decided to turn our love for gaming into something meaningful—a platform that contributes to the growth of the gaming industry, both locally and globally.
            </p>
            
            <p className={styles.paragraph}>
              Operating fully remotely from different corners of the world, we understand the unique dynamics of the gaming ecosystem. We've experienced firsthand the challenges of finding the right opportunities and connecting with the right people in this rapidly evolving industry.
            </p>
            
            <p className={styles.paragraph}>
              Our goal is simple: to bridge the gap between exceptional gaming talent and innovative companies. Whether you're a game developer, esports professional, content creator, or industry specialist, Tribal Jobs is your gateway to meaningful career opportunities in the gaming world.
            </p>
            
            <p className={styles.paragraph}>
              We believe in building a community where passion meets opportunity, where creativity is celebrated, and where the next generation of gaming professionals can thrive. This isn't just a job board—it's a movement to elevate the entire gaming industry.
            </p>
          </div>
        </section>

        <section className={styles.legalSection}>
          <h2 className={styles.sectionTitle}>Legal & Documents</h2>
          
          <div className={styles.legalGrid}>
            <div className={styles.legalCard}>
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className={styles.legalTitle}>Privacy Policy</h3>
              <p className={styles.legalDescription}>
                Learn how we collect, use, and protect your personal information on our platform.
              </p>
            </div>

            <div className={styles.legalCard}>
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className={styles.legalTitle}>Terms of Use</h3>
              <p className={styles.legalDescription}>
                Review the terms and conditions for using Tribal Jobs and our services.
              </p>
            </div>

            <div className={styles.legalCard}>
              <div className={styles.iconWrapper}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className={styles.legalTitle}>Cookie Policy</h3>
              <p className={styles.legalDescription}>
                Understand how we use cookies and similar technologies to enhance your experience.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.companyInfo}>
          <p className={styles.infoText}><strong>Founder & CEO:</strong> Rastko Petrović Zlatanović</p>
          <p className={styles.infoText}><strong>Email:</strong> rastko@tribal-jobs.com</p>
          <p className={styles.infoText}><strong>Registration Date:</strong> 20.03.2025</p>
          <p className={styles.infoText}><strong>Country:</strong> Serbia</p>
          <p className={styles.infoText}><strong>VAT Number (PIB):</strong> 114935894</p>
          <p className={styles.infoText}><strong>Company ID (MB):</strong> 67886618</p>
          <p className={styles.infoText}><strong>Legal Entity Name:</strong> Rastko Petrović Zlatanović Entrepreneur Combined Office and Administrative Services TRIBAL, Vrnjačka Banja</p>
          <p className={styles.infoText}><strong>Registered Address:</strong> Zaselak Clavica 12, 36210 Vrnjačka Banja, Serbia</p>
        </section>
      </div>

      <Footer />
    </div>
  );
}
