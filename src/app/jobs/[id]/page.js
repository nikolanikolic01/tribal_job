'use client';

import { useParams, useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();

  // Mock data - in real app this would come from API
  const job = {
    id: params.id,
    title: 'Senior Game Designer',
    company: 'Nordeus',
    location: 'Belgrade',
    workModel: 'Hybrid',
    jobType: 'Full-time',
    contractType: 'Employment contract',
    seniority: 'Senior',
    roleDepartment: 'Game Design & Creative',
    posted: '2 days ago',
    avatar: 'N',
    color: '#4169E1',
    about: 'Nordeus is a leading mobile games developer, best known for Top Eleven - the world\'s most successful mobile football manager game. With offices in Belgrade and London, we are a team of 200+ passionate professionals working on globally successful titles.',
    roleDescription: 'We\'re looking for a Senior Game Designer to join our team and help shape the future of our flagship title. You\'ll be working closely with product managers, developers, and artists to create engaging game features that delight millions of players worldwide.',
    responsibilities: [
      'Design and balance game features, systems, and economy',
      'Create detailed game design documentation',
      'Collaborate with cross-functional teams to implement features',
      'Analyze player data and feedback to iterate on designs',
      'Mentor junior designers and contribute to design culture'
    ],
    requirements: [
      '5+ years of experience in game design',
      'Shipped at least 2 mobile games as a designer',
      'Strong understanding of F2P mechanics and monetization',
      'Excellent analytical and problem-solving skills',
      'Experience with data-driven design decisions'
    ],
    niceToHave: [
      'Passion for football and sports games',
      'Experience with Unity or Unreal Engine',
      'Background in psychology or behavioral economics',
      'Familiarity with SQL and analytics tools'
    ],
    tools: ['Unity', 'Excel/Google Sheets', 'Confluence', 'JIRA', 'Analytics platforms'],
    benefits: [
      'Competitive salary with performance bonuses',
      'Private health insurance',
      'Flexible working hours',
      'Professional development budget',
      'Modern office in the heart of Belgrade',
      'Team building events and gaming nights'
    ],
    salary: '€3,000 - €5,000/month'
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to jobs
        </button>

        <div className={styles.jobHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.avatar} style={{ backgroundColor: job.color }}>
              {job.avatar}
            </div>
            <div className={styles.headerInfo}>
              <h1 className={styles.jobTitle}>{job.title}</h1>
              <p className={styles.company}>{job.company}</p>
              <p className={styles.location}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {job.location}
              </p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.shareBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className={styles.applyBtn}>Apply</button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.mainContent}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>About the Company</h2>
              <p className={styles.text}>{job.about}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>About the Role</h2>
              <p className={styles.text}>{job.roleDescription}</p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Vacancy Details</h2>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Working Model:</span>
                  <span className={styles.detailValue}>{job.workModel}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Seniority:</span>
                  <span className={styles.detailValue}>{job.seniority}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Employment Type:</span>
                  <span className={styles.detailValue}>{job.jobType}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Role Type:</span>
                  <span className={styles.detailValue}>Individual contributor</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Contract Type:</span>
                  <span className={styles.detailValue}>{job.contractType}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Role Department:</span>
                  <span className={styles.detailValue}>{job.roleDepartment}</span>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Responsibilities</h2>
              <ul className={styles.list}>
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Requirements</h2>
              <ul className={styles.list}>
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Nice-to-have</h2>
              <ul className={styles.list}>
                {job.niceToHave.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Tools & Technologies</h2>
              <div className={styles.tags}>
                {job.tools.map((tool, index) => (
                  <span key={index} className={styles.tag}>{tool}</span>
                ))}
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Benefits</h2>
              <ul className={styles.list}>
                {job.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Salary</h2>
              <p className={styles.salary}>{job.salary}</p>
            </section>

            <div className={styles.posted}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
              </svg>
              posted {job.posted}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.applyCard}>
              <h3 className={styles.applyCardTitle}>Interested?</h3>
              <p className={styles.applyCardText}>Apply now and join our amazing team!</p>
              <button className={styles.applyBtnLarge}>Apply for this position</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
