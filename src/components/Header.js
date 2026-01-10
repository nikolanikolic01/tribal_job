'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCandidatesDropdown, setShowCandidatesDropdown] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`${styles.header} ${isScrolled ? styles.blurred : ''}`}
      style={{
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo_tribal.png"
            alt="Tribal Jobs"
            width={52}
            height={52}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <Link href="/jobs">Jobs</Link>
          <Link href="/companies">Companies</Link>
          <Link href="/news">News</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about-us">About Us</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Desktop Actions */}
        <div className={styles.actions}>
          <div className={styles.language}>
            <span className={styles.active}>ENG</span>
            <span>/</span>
            <span>SRB</span>
          </div>
          <div 
            className={styles.candidatesWrapper}
            onMouseEnter={() => setShowCandidatesDropdown(true)}
            onMouseLeave={() => setShowCandidatesDropdown(false)}
          >
            <button className={styles.candidatesBtn}>Candidates</button>
            {showCandidatesDropdown && (
              <div className={styles.candidatesDropdown}>
                {user ? (
                  <>
                    <Link href="/profile" className={styles.dropdownItem}>Profile</Link>
                    <button onClick={logout} className={styles.dropdownItem}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className={styles.dropdownItem}>Login</Link>
                    <Link href="/signup" className={styles.dropdownItem}>Sign Up</Link>
                  </>
                )}
              </div>
            )}
          </div>
          <button className={styles.employersBtn}>Employers</button>
        </div>

        {/* Mobile Burger Menu Button */}
        <button 
          className={`${styles.burgerBtn} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
            <path d="M3.5 10.5H17.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.5 15.75H17.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.5 5.25H17.5" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <nav className={styles.mobileNav}>
              <Link href="/jobs" onClick={closeMenu}>Jobs</Link>
              <Link href="/companies" onClick={closeMenu}>Companies</Link>
              <Link href="/news" onClick={closeMenu}>News</Link>
              <Link href="/pricing" onClick={closeMenu}>Pricing</Link>
              <Link href="/about-us" onClick={closeMenu}>About Us</Link>
              <Link href="/contact" onClick={closeMenu}>Contact</Link>
              {user ? (
                <>
                  <Link href="/profile" onClick={closeMenu}>Profile</Link>
                  <button onClick={() => { logout(); closeMenu(); }} className={styles.mobileLogoutBtn}>Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={closeMenu}>Login</Link>
                  <Link href="/signup" onClick={closeMenu}>Sign Up</Link>
                </>
              )}
            </nav>
            
            <div className={styles.mobileActionsBottom}>
              <button className={styles.mobileEmployersBtn}>For Employers</button>
              <div className={styles.mobileLanguage}>
                <span className={styles.active}>ENG</span>
                <span>/</span>
                <span>SRB</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
