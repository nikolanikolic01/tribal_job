import Image from 'next/image';
import styles from './Partners.module.css';

export default function Partners() {
  const partners = [
    'ROBLOX',
    'SEGA',
    'NINTENDO',
    'UBISOFT',
    'WARGAMING',
  ];

  return (
    <section className={styles.partners}>
      <div className={styles.marquee}>
        <div className={styles.track}>
          {partners.map((partner, index) => (
            <div key={index} className={styles.partnerItem}>
              <span className={styles.partnerName}>{partner}</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {partners.map((partner, index) => (
            <div key={`duplicate-${index}`} className={styles.partnerItem}>
              <span className={styles.partnerName}>{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
