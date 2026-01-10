'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './JobsOnFire.module.css';
import Header from './Header';
import { jobService } from '@/services/jobService';

export default function JobsOnFire() {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.searchJobs({ limit: 8 });
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const toggleBookmark = (jobId) => {
    if (bookmarkedJobs.includes(jobId)) {
      setBookmarkedJobs(bookmarkedJobs.filter(id => id !== jobId));
    } else {
      setBookmarkedJobs([...bookmarkedJobs, jobId]);
    }
  };

  const getCompanyInitial = (companyName) => {
    return companyName ? companyName.charAt(0).toUpperCase() : '?';
  };

  const getRandomColor = () => {
    const colors = ['#4169E1', '#4A5568', '#B91C1C', '#EA580C', '#059669', '#7C3AED'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const formatSalary = (min, max, currency) => {
    if (!min && !max) return null;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    if (min && max) {
      return `${formatter.format(min)} - ${formatter.format(max)}`;
    }
    return formatter.format(min || max);
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  if (loading) {
    return (
      <section className={styles.jobsSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>Jobs on Fire</h2>
              <p className={styles.subtitle}>Premium opportunities handpicked for top talent</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading jobs...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.jobsSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>Jobs on Fire</h2>
              <p className={styles.subtitle}>Premium opportunities handpicked for top talent</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>{error}</div>
        </div>
      </section>
    );
  }

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
                <div className={styles.avatar} style={{ backgroundColor: getRandomColor() }}>
                  {getCompanyInitial(job.company_name)}
                </div>
                <div className={styles.jobInfo}>
                  <h3 className={styles.jobTitle}>{job.title}</h3>
                  <p className={styles.company}>{job.company_name}</p>
                  <p className={styles.location}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M9 1.5C6.0975 1.5 3.75 3.8475 3.75 6.75C3.75 10.6875 9 16.5 9 16.5C9 16.5 14.25 10.6875 14.25 6.75C14.25 3.8475 11.9025 1.5 9 1.5ZM9 8.625C7.965 8.625 7.125 7.785 7.125 6.75C7.125 5.715 7.965 4.875 9 4.875C10.035 4.875 10.875 5.715 10.875 6.75C10.875 7.785 10.035 8.625 9 8.625Z" fill="#9CA3AF"/>
  <path d="M9 8.25C9.82843 8.25 10.5 7.57843 10.5 6.75C10.5 5.92157 9.82843 5.25 9 5.25C8.17157 5.25 7.5 5.92157 7.5 6.75C7.5 7.57843 8.17157 8.25 9 8.25Z" fill="#1C1C1C"/>
</svg> {job.location_label}</p>
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
</svg> posted {getTimeAgo(job.published_at)}</span>
                <Link href={`/jobs/${job.id}`} className={styles.viewJobBtn}>View Job</Link>
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
