'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './JobsOnFire.module.css';
import Header from './Header';

export default function JobsOnFire() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  const toggleBookmark = (jobId) => {
    if (bookmarkedJobs.includes(jobId)) {
      setBookmarkedJobs(bookmarkedJobs.filter(id => id !== jobId));
    } else {
      setBookmarkedJobs([...bookmarkedJobs, jobId]);
    }
  };

  const jobs = [
    {
      id: 1,
      title: 'Senior Game Designer',
      company: 'Ubisoft',
      location: 'Montreal, Canada',
      posted: '2 days ago',
      avatar: 'U',
      color: '#4169E1'
    },
    {
      id: 2,
      title: 'Lead 3D Artist',
      company: 'Epic Games',
      location: 'Remote',
      posted: '1 day ago',
      avatar: 'E',
      color: '#4A5568'
    },
    {
      id: 3,
      title: 'Gameplay Programmer',
      company: 'Riot Games',
      location: 'Los Angeles, USA',
      posted: '3 days ago',
      avatar: 'R',
      color: '#B91C1C'
    },
    {
      id: 4,
      title: 'Technical Artist',
      company: 'Activision',
      location: 'London, UK',
      posted: '4 days ago',
      avatar: 'A',
      color: '#4A5568'
    },
    {
      id: 5,
      title: 'UI/UX Designer',
      company: 'Blizzard',
      location: 'Irvine, USA',
      posted: '2 days ago',
      avatar: 'B',
      color: '#4169E1'
    },
    {
      id: 6,
      title: 'Game Producer',
      company: 'Nintendo',
      location: 'Kyoto, Japan',
      posted: '5 days ago',
      avatar: 'N',
      color: '#E31E24'
    },
    {
      id: 7,
      title: 'Environment Artist',
      company: 'CD Projekt Red',
      location: 'Warsaw, Poland',
      posted: '3 days ago',
      avatar: 'C',
      color: '#B91C1C'
    },
    {
      id: 8,
      title: 'Systems Designer',
      company: 'Valve',
      location: 'Seattle, USA',
      posted: '1 day ago',
      avatar: 'V',
      color: '#EA580C'
    }
  ];

  return (
    <section className={styles.jobsSection}>
     
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Jobs on Fire</h2>
            <p className={styles.subtitle}>Premium opportunities handpicked for top talent</p>
          </div>
        </div>

        <div className={styles.jobsGrid}>
          {jobs.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              <div className={styles.jobHeader}>
                <div className={styles.avatar} style={{ backgroundColor: job.color }}>
                  {job.avatar}
                </div>
                <div className={styles.jobInfo}>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <p className={styles.company}>{job.company}</p>
                  <p className={styles.location}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M9 1.5C6.0975 1.5 3.75 3.8475 3.75 6.75C3.75 10.6875 9 16.5 9 16.5C9 16.5 14.25 10.6875 14.25 6.75C14.25 3.8475 11.9025 1.5 9 1.5ZM9 8.625C7.965 8.625 7.125 7.785 7.125 6.75C7.125 5.715 7.965 4.875 9 4.875C10.035 4.875 10.875 5.715 10.875 6.75C10.875 7.785 10.035 8.625 9 8.625Z" fill="#9CA3AF"/>
  <path d="M9 8.25C9.82843 8.25 10.5 7.57843 10.5 6.75C10.5 5.92157 9.82843 5.25 9 5.25C8.17157 5.25 7.5 5.92157 7.5 6.75C7.5 7.57843 8.17157 8.25 9 8.25Z" fill="#1C1C1C"/>
</svg> {job.location}</p>
                </div>
                <button 
                  className={`${styles.bookmarkBtn} ${bookmarkedJobs.includes(job.id) ? styles.bookmarked : ''}`}
                  onClick={() => toggleBookmark(job.id)}
                >
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={bookmarkedJobs.includes(job.id) ? 'currentColor' : 'none'}/>
</svg>
                </button>
              </div>
              
              <div className={styles.jobFooter}>
                <span className={styles.posted}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" fill="#9CA3AF"/>
  <path d="M9 4.5V9L12 10.5" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round"/>
</svg> posted {job.posted}</span>
                <Link href="/jobs" className={styles.viewJobBtn}>View Job</Link>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Tribal Jobs connects talent with top studios worldwide<br />
            Discover more opportunities and find the role that fits you best
          </p>
          <Link href="/jobs" className={styles.viewAllBtn}>View All Jobs</Link>
        </div>
      </div>
    </section>
  );
}
