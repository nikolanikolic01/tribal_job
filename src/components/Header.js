import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';


export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
     
        
        <nav className={styles.nav}>
                   <Link href="/">
        <Image
          src="/images/logo_tribal.png"
          alt="Tribal Jobs"
          width={60}
          height={60}
        />
      </Link>

          <Link href="/jobs">Jobs</Link>
          <Link href="/companies">Companies</Link>
          <a href="#news">News</a>
          <a href="#pricing">Pricing</a>
          <Link href="/about-us">About Us</Link>
          <a href="#contact">Contact</a>
        </nav>

        <div className={styles.actions}>
          <div className={styles.language}>
            <span className={styles.active}>ENG</span>
            <span>/</span>
            <span>SRB</span>
          </div>
          <button className={styles.candidatesBtn}>Candidates</button>
          <button className={styles.employersBtn}>Employers</button>
        </div>
      </div>
    </header>
  );
}
