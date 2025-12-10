import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Image 
          src="/images/landing_image.png" 
          alt="Hero Background" 
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>
          FIND YOUR NEXT <span className={styles.highlight}>QUEST</span>
        </h1>
        <p className={styles.subtitle}>
          Join the community over <span className={styles.highlightNumber}>10,000</span> users
        </p>
        
        <div className={styles.searchBox}>
          <input 
            type="text" 
            placeholder="Job title" 
            className={styles.searchInput}
          />
          <input 
            type="text" 
            placeholder="Location" 
            className={styles.searchInput}
          />
          <button className={styles.searchBtn}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <p className={styles.description}>
          A specialized platform for all roles across the gaming industry<br />
          from engineering and operations to business and creative teams.
        </p>

        <button className={styles.postJobBtn}>Post a Job</button>
      </div>
    </section>
  );
}
