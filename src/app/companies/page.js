'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import styles from './page.module.css';
import Footer from '@/components/Footer';

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [expandedCompanyId, setExpandedCompanyId] = useState(null);

  const companies = [
    {
      id: 1,
      name: 'Evolution Gaming',
      logo: 'W',
      logoColor: '#1E40AF',
      category: 'iGaming',
      size: 'Large',
      description: 'Leading provider of live casino solutions for online gaming operators worldwide.',
      location: 'Malta',
      openPositions: 12,
      coverImage: '/images/companies/evolution.jpg',
      about: 'Evolution Gaming is a leading provider of live casino solutions for online gaming operators worldwide. With a focus on innovation and quality, they offer a wide range of live casino games and services to enhance the gaming experience for players.',
      services: ['Live Casino Solutions', 'Game Shows', 'Mobile Gaming', 'RNG Games'],
      benefits: ['Competitive Salary', 'Health Insurance', 'Remote Work Options', 'Professional Development', 'Annual Bonus'],
      website: 'evolutiongaming.com',
      hiringLocations: ['Malta'],
      openRoles: [
        { title: 'Senior Game Developer', location: 'Malta', type: 'Full-time' },
        { title: 'Live Dealer Manager', location: 'Malta', type: 'Full-time' },
        { title: 'UI/UX Designer', location: 'Malta', type: 'Full-time' },
        { title: 'Backend Engineer', location: 'Malta', type: 'Full-time' }
      ]
    },
    {
      id: 2,
      name: 'Pragmatic Play',
      logo: 'P',
      logoColor: '#0891B2',
      category: 'Game Development',
      size: 'Medium',
      description: 'Multi-product content provider delivering innovative gaming solutions.',
      location: 'Gibraltar',
      openPositions: 8,
      coverImage: '/images/companies/pragmatic.jpg'
    },
    {
      id: 3,
      name: 'Nordeus',
      logo: 'N',
      logoColor: '#4169E1',
      category: 'Mobile Gaming',
      size: 'Medium',
      description: 'Mobile games developer best known for Top Eleven football manager game.',
      location: 'Belgrade',
      openPositions: 15,
      coverImage: '/images/companies/nordeus.jpg'
    },
    {
      id: 4,
      name: 'Wargaming',
      logo: 'W',
      logoColor: '#DC2626',
      category: 'PC/Console Gaming',
      size: 'Large',
      description: 'Award-winning online game developer and publisher of World of Tanks.',
      location: 'Multiple Locations',
      openPositions: 23,
      coverImage: '/images/companies/wargaming.jpg'
    },
    {
      id: 5,
      name: 'Epic Games',
      logo: 'E',
      logoColor: '#4A5568',
      category: 'Game Development',
      size: 'Large',
      description: 'Creator of Fortnite and Unreal Engine, revolutionizing gaming technology.',
      location: 'Remote',
      openPositions: 18,
      coverImage: '/images/companies/epic.jpg'
    },
    {
      id: 6,
      name: 'Ubisoft',
      logo: 'U',
      logoColor: '#0EA5E9',
      category: 'AAA Gaming',
      size: 'Large',
      description: 'International publisher of video games with iconic franchises.',
      location: 'Multiple Locations',
      openPositions: 31,
      coverImage: '/images/companies/ubisoft.jpg'
    },
    {
      id: 7,
      name: 'Mad Head Games',
      logo: 'M',
      logoColor: '#9333EA',
      category: 'Indie Gaming',
      size: 'Small',
      description: 'Independent game studio creating unique gaming experiences.',
      location: 'Belgrade',
      openPositions: 5,
      coverImage: '/images/companies/madhead.jpg'
    },
    {
      id: 8,
      name: 'Eipix',
      logo: 'E',
      logoColor: '#7C3AED',
      category: 'Game Development',
      size: 'Medium',
      description: 'Studio specializing in adventure and hidden object games.',
      location: 'Novi Sad',
      openPositions: 7,
      coverImage: '/images/companies/eipix.jpg'
    },
    {
      id: 9,
      name: 'Riot Games',
      logo: 'R',
      logoColor: '#B91C1C',
      category: 'PC/Console Gaming',
      size: 'Large',
      description: 'Developer of League of Legends and VALORANT.',
      location: 'Los Angeles',
      openPositions: 27,
      coverImage: '/images/companies/riot.jpg'
    },
    {
      id: 10,
      name: 'Blizzard',
      logo: 'B',
      logoColor: '#4169E1',
      category: 'AAA Gaming',
      size: 'Large',
      description: 'Creator of World of Warcraft, Overwatch, and Diablo franchises.',
      location: 'Irvine',
      openPositions: 19,
      coverImage: '/images/companies/blizzard.jpg'
    },
    {
      id: 11,
      name: 'Activision',
      logo: 'A',
      logoColor: '#4A5568',
      category: 'AAA Gaming',
      size: 'Large',
      description: 'Publisher of Call of Duty and other major gaming franchises.',
      location: 'London',
      openPositions: 22,
      coverImage: '/images/companies/activision.jpg'
    },
    {
      id: 12,
      name: 'Nintendo',
      logo: 'N',
      logoColor: '#E31E24',
      category: 'Console Gaming',
      size: 'Large',
      description: 'Iconic Japanese gaming company known for Mario, Zelda, and Switch.',
      location: 'Kyoto',
      openPositions: 14,
      coverImage: '/images/companies/nintendo.jpg'
    }
  ];

  const categories = ['All Categories', 'iGaming', 'Game Development', 'Mobile Gaming', 'PC/Console Gaming', 'AAA Gaming', 'Indie Gaming', 'Console Gaming'];
  const sizes = ['All Sizes', 'Small', 'Medium', 'Large'];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory;
    const matchesSize = selectedSize === 'all' || company.size === selectedSize;
    
    return matchesSearch && matchesCategory && matchesSize;
  });

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.header}>
       <div className={styles.containerCompanies}>
         <h1 className={styles.pageTitle}>
          Discover Gaming Industry <span className={styles.highlight}>Leaders</span>
        </h1>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search employers"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.searchBtn}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

         <div className={styles.filters}>
          <div className={styles.filterGroup}>
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M11.5 5.66667H9.16669C8.98988 5.66667 8.82031 5.59643 8.69528 5.4714C8.57026 5.34638 8.50002 5.17681 8.50002 5V2.66667C8.50002 2.48986 8.57026 2.32029 8.69528 2.19526C8.82031 2.07024 8.98988 2 9.16669 2H11.5C11.6768 2 11.8464 2.07024 11.9714 2.19526C12.0964 2.32029 12.1667 2.48986 12.1667 2.66667V5C12.1667 5.17681 12.0964 5.34638 11.9714 5.4714C11.8464 5.59643 11.6768 5.66667 11.5 5.66667ZM6.16669 11H3.83335C3.65654 11 3.48697 10.9298 3.36195 10.8047C3.23693 10.6797 3.16669 10.5101 3.16669 10.3333V8C3.16669 7.82319 3.23693 7.65362 3.36195 7.5286C3.48697 7.40357 3.65654 7.33333 3.83335 7.33333H6.16669C6.3435 7.33333 6.51307 7.40357 6.63809 7.5286C6.76312 7.65362 6.83335 7.82319 6.83335 8V10.3333C6.83335 10.5101 6.76312 10.6797 6.63809 10.8047C6.51307 10.9298 6.3435 11 6.16669 11ZM11.5 11H9.16669C8.98988 11 8.82031 10.9298 8.69528 10.8047C8.57026 10.6797 8.50002 10.5101 8.50002 10.3333V8C8.50002 7.82319 8.57026 7.65362 8.69528 7.5286C8.82031 7.40357 8.98988 7.33333 9.16669 7.33333H11.5C11.6768 7.33333 11.8464 7.40357 11.9714 7.5286C12.0964 7.65362 12.1667 7.82319 12.1667 8V10.3333C12.1667 10.5101 12.0964 10.6797 11.9714 10.8047C11.8464 10.9298 11.6768 11 11.5 11ZM6.16669 5.66667H3.83335C3.65654 5.66667 3.48697 5.59643 3.36195 5.4714C3.23693 5.34638 3.16669 5.17681 3.16669 5V2.66667C3.16669 2.48986 3.23693 2.32029 3.36195 2.19526C3.48697 2.07024 3.65654 2 3.83335 2H6.16669C6.3435 2 6.51307 2.07024 6.63809 2.19526C6.76312 2.32029 6.83335 2.48986 6.83335 2.66667V5C6.83335 5.17681 6.76312 5.34638 6.63809 5.4714C6.51307 5.59643 6.3435 5.66667 6.16669 5.66667Z" fill="white" fill-opacity="0.4"/>
  <path d="M4.99998 14C5.92045 14 6.66665 13.2538 6.66665 12.3333C6.66665 11.4128 5.92045 10.6667 4.99998 10.6667C4.07951 10.6667 3.33331 11.4128 3.33331 12.3333C3.33331 13.2538 4.07951 14 4.99998 14Z" fill="#FE0032" fill-opacity="0.8"/>
  <path d="M5.66665 12.3333C5.66665 12.5101 5.59641 12.6797 5.47138 12.8047C5.34636 12.9298 5.17679 13 4.99998 13C4.82317 13 4.6536 12.9298 4.52858 12.8047C4.40355 12.6797 4.33331 12.5101 4.33331 12.3333C4.33331 12.1565 4.40355 11.9869 4.52858 11.8619C4.6536 11.7369 4.82317 11.6667 4.99998 11.6667C5.17679 11.6667 5.34636 11.7369 5.47138 11.8619C5.59641 11.9869 5.66665 12.1565 5.66665 12.3333Z" fill="white"/>
</svg>
            <select 
              className={styles.select}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={index === 0 ? 'all' : cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M8.00004 7.99999C9.4728 7.99999 10.6667 6.80608 10.6667 5.33332C10.6667 3.86056 9.4728 2.66666 8.00004 2.66666C6.52728 2.66666 5.33337 3.86056 5.33337 5.33332C5.33337 6.80608 6.52728 7.99999 8.00004 7.99999Z" fill="white" fill-opacity="0.4"/>
  <path d="M13.3334 14V12.6667C13.3334 11.2522 12.7715 9.89563 11.7713 8.89544C10.7711 7.89525 9.41451 7.33334 8.00002 7.33334C6.58553 7.33334 5.22898 7.89525 4.22878 8.89544C3.22859 9.89563 2.66669 11.2522 2.66669 12.6667V14" fill="white" fill-opacity="0.4"/>
</svg>
            <select 
              className={styles.select}
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {sizes.map((size, index) => (
                <option key={index} value={index === 0 ? 'all' : size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
       </div>

       
      </div>

      <div className={styles.container}>
        <div className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>Featured Companies</h2>
          <p className={styles.resultsCount}>Showing {filteredCompanies.length} companies</p>
        </div>

        <div className={styles.companiesGrid}>
          {filteredCompanies.map((company) => (
            <div key={company.id} className={`${styles.companyCard} ${expandedCompanyId === company.id ? styles.expanded : ''}`}>
              <div className={styles.coverImage} style={{ background: `linear-gradient(135deg, ${company.logoColor}40 0%, ${company.logoColor}20 100%)` }}>
                <div className={styles.smallLogo} style={{ backgroundColor: company.logoColor }}>
                  {company.logo}
                </div>
              </div>
              
              <div className={styles.companyContent}>
                <div className={styles.topRow}>
                  <div className={styles.categoryBadge}>{company.category}</div>
                  <div className={styles.sizeBadge}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                    {company.size}
                  </div>
                </div>

                <h3 className={styles.companyName}>{company.name}</h3>
                <p className={styles.companyDescription}>{company.description}</p>

                <div className={styles.companyFooter}>
                  <div className={styles.location}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {company.location}
                  </div>
                  <div className={styles.positions}>
                    {company.openPositions} open positions
                  </div>
                </div>

                {expandedCompanyId !== company.id && (
                  <button 
                    className={styles.viewCompanyBtn}
                    onClick={() => setExpandedCompanyId(company.id)}
                  >
                    View Company
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </div>

              {expandedCompanyId === company.id && (
                <div className={styles.expandedContent}>
                  <div className={styles.leftColumn}>
                    <div className={styles.expandedSection}>
                      <h4 className={styles.sectionTitle}>About the Company</h4>
                      <p className={styles.sectionText}>{company.about || company.description}</p>
                    </div>

                    {company.services && (
                      <div className={styles.expandedSection}>
                        <h4 className={styles.sectionTitle}>Services</h4>
                        <div className={styles.tagsList}>
                          {company.services.map((service, idx) => (
                            <span key={idx} className={styles.tag}>{service}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {company.benefits && (
                      <div className={styles.expandedSection}>
                        <h4 className={styles.sectionTitle}>Benefits</h4>
                        <div className={styles.tagsList}>
                          {company.benefits.map((benefit, idx) => (
                            <span key={idx} className={styles.tag}>{benefit}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {company.website && (
                      <div className={styles.expandedSection}>
                        <h4 className={styles.sectionTitle}>Website</h4>
                        <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className={styles.websiteLink}>
                          {company.website}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                          </svg>
                        </a>
                      </div>
                    )}

                    {company.hiringLocations && (
                      <div className={styles.expandedSection}>
                        <h4 className={styles.sectionTitle}>Hiring Locations</h4>
                        <div className={styles.tagsList}>
                          {company.hiringLocations.map((loc, idx) => (
                            <span key={idx} className={styles.locationTag}>{loc}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={styles.rightColumn}>
                    {company.openRoles && (
                      <div className={styles.expandedSection}>
                        <h4 className={styles.sectionTitle}>Open Roles</h4>
                        <div className={styles.rolesList}>
                          {company.openRoles.map((role, idx) => (
                            <div key={idx} className={styles.roleCard}>
                              <h5 className={styles.roleTitle}>{role.title}</h5>
                              <div className={styles.roleInfo}>
                                <span className={styles.roleLocation}>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                  </svg>
                                  {role.location}
                                </span>
                                <span className={styles.roleType}>{role.type}</span>
                              </div>
                              <button className={styles.viewRoleBtn}>View →</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {expandedCompanyId === company.id && (
                <button 
                  className={styles.collapseBtn}
                  onClick={() => setExpandedCompanyId(null)}
                >
                  Collapse
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: 'rotate(180deg)' }}>
                    <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
