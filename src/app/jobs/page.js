'use client';

import { useState } from 'react';
import styles from './page.module.css';
import Header from '@/components/Header';
import Image from 'next/image';

export default function JobsPage() {
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedWorkModel, setSelectedWorkModel] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState([]);
  const [selectedContractType, setSelectedContractType] = useState([]);
  const [selectedSeniority, setSelectedSeniority] = useState([]);
  const [selectedRoleType, setSelectedRoleType] = useState([]);
  const [selectedRoleDepartment, setSelectedRoleDepartment] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const jobsPerPage = 10;

  const jobs = [
    {
      id: 1,
      title: 'Senior Game Designer',
      company: 'Nordeus',
      location: 'Belgrade',
      workModel: 'Hybrid',
      jobType: 'Full-time',
      contractType: 'Employment contract',
      seniority: 'Senior',
      roleType: 'Individual contributor',
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
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'Eipix',
      location: 'Novi Sad',
      workModel: 'Remote',
      jobType: 'Full-time',
      contractType: 'Employment contract',
      seniority: 'Mid-level',
      posted: '3 days ago',
      avatar: '3',
      color: '#9333EA'
    },
    {
      id: 3,
      title: '3D Artist',
      company: 'Dikla Studios',
      location: 'Belgrade',
      workModel: 'On-site',
      jobType: 'Full-time',
      contractType: 'Employment contract',
      seniority: 'Junior',
      posted: '3 days ago',
      avatar: 'D',
      color: '#6366F1'
    },
    {
      id: 4,
      title: 'Character Design – Fantasy RPG',
      company: 'Mad Head Games',
      location: 'Remote',
      workModel: 'Remote',
      jobType: 'Part-time',
      contractType: 'Freelance',
      seniority: 'Mid-level',
      posted: '4 days ago',
      avatar: 'M',
      color: '#9333EA'
    },
    {
      id: 5,
      title: 'Lead 3D Artist',
      company: 'Epic Games',
      location: 'Remote',
      workModel: 'Remote',
      jobType: 'Full-time',
      contractType: 'Employment contract',
      seniority: 'Lead',
      posted: '1 day ago',
      avatar: 'E',
      color: '#4A5568'
    },
    {
      id: 6,
      title: 'Gameplay Programmer',
      company: 'Riot Games',
      location: 'Los Angeles, USA',
      workModel: 'Hybrid',
      jobType: 'Full-time',
      contractType: 'Employment contract',
      seniority: 'Senior',
      posted: '3 days ago',
      avatar: 'R',
      color: '#B91C1C'
    },
    {
      id: 7,
      title: 'Technical Artist',
      company: 'Activision',
      location: 'London, UK',
      workModel: 'On-site',
      jobType: 'Full-time',
      contractType: 'Employment contract',
      seniority: 'Mid-level',
      posted: '4 days ago',
      avatar: 'A',
      color: '#4A5568'
    },
    {
      id: 8,
      title: 'UI/UX Designer',
      company: 'Blizzard',
      location: 'Irvine, USA',
      workModel: 'Hybrid',
      jobType: 'Full-time',
      contractType: 'Employment contract',
      seniority: 'Senior',
      posted: '2 days ago',
      avatar: 'B',
      color: '#4169E1'
    }
  ];

  const handleFilterToggle = (filterArray, setFilterArray, value) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter(item => item !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedLocation([]);
    setSelectedWorkModel([]);
    setSelectedJobType([]);
    setSelectedContractType([]);
    setSelectedSeniority([]);
    setSelectedRoleType([]);
    setSelectedRoleDepartment([]);
    setSearchQuery('');
  };

  // Pagination
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
     <Header/>
      <div className={styles.header}>
         <div className={styles.background}>
      
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>
          Ready for a new storyline? <span className={styles.highlight}>Start here</span>
        </h1>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search jobs by title, skills, or company"
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
      </div>
      </div>

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.filterHeader}>
            <button className={styles.clearBtn} onClick={clearAllFilters}>Clear Filters</button>
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>LOCATION</h3>
            <div className={styles.searchFilter}>
              <input type="text" placeholder="Search location..." className={styles.filterSearch} />
            </div>
            {['Global (Remote)', 'Europe', 'Serbia', 'Bosnia', 'Montenegro', 'Macedonia', 'Romania', 'Bulgaria'].map(loc => (
              <label key={loc} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedLocation.includes(loc)}
                  onChange={() => handleFilterToggle(selectedLocation, setSelectedLocation, loc)}
                />
                <span>{loc}</span>
              </label>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>WORKING MODEL</h3>
            {['Remote', 'Hybrid', 'On-site', 'Flexible'].map(model => (
              <label key={model} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedWorkModel.includes(model)}
                  onChange={() => handleFilterToggle(selectedWorkModel, setSelectedWorkModel, model)}
                />
                <span>{model}</span>
              </label>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>JOB TYPE</h3>
            {['Full-time', 'Part-time', 'Project-Based'].map(type => (
              <label key={type} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedJobType.includes(type)}
                  onChange={() => handleFilterToggle(selectedJobType, setSelectedJobType, type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>CONTRACT TYPE</h3>
            {['Employment contract', 'B2B', 'Freelance', 'Internship Contract'].map(contract => (
              <label key={contract} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedContractType.includes(contract)}
                  onChange={() => handleFilterToggle(selectedContractType, setSelectedContractType, contract)}
                />
                <span>{contract}</span>
              </label>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>SENIORITY</h3>
            {['Intern', 'Junior', 'Mid-level', 'Senior', 'Lead', 'Principal', 'C-level'].map(level => (
              <label key={level} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedSeniority.includes(level)}
                  onChange={() => handleFilterToggle(selectedSeniority, setSelectedSeniority, level)}
                />
                <span>{level}</span>
              </label>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>ROLE TYPE</h3>
            {['Individual contributor', 'Leadership'].map(type => (
              <label key={type} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedRoleType.includes(type)}
                  onChange={() => handleFilterToggle(selectedRoleType, setSelectedRoleType, type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>ROLE DEPARTMENT</h3>
            {['Engineering & Development', 'Art', 'Product & Project', 'Design', 'Marketing & Growth', 'QA & Customer Development', 'Operations & Support', 'People & Culture', 'Finance & Legal', 'HR & People Leadership'].map(dept => (
              <label key={dept} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedRoleDepartment.includes(dept)}
                  onChange={() => handleFilterToggle(selectedRoleDepartment, setSelectedRoleDepartment, dept)}
                />
                <span>{dept}</span>
              </label>
            ))}
          </div>

          <div className={styles.filterFooter}>
            <button className={styles.clearBtnBottom} onClick={clearAllFilters}>Clear Filters</button>
          </div>
        </aside>

        <main className={styles.mainContent}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Featured Jobs</h2>
            <div className={styles.sortBy}>
              <span>Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.sortSelect}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="salary">Salary</option>
              </select>
            </div>
          </div>

          <div className={styles.jobsList}>
            {currentJobs.map((job) => {
              const isExpanded = expandedJobId === job.id;
              
              return (
                <div 
                  key={job.id} 
                  className={`${styles.jobCard} ${isExpanded ? styles.expanded : ''}`}
                >
                  <div className={styles.jobCardInner}>
                    <div className={styles.jobHeader}>
                      <div className={styles.avatar} style={{ backgroundColor: job.color }}>
                        {job.avatar}
                      </div>
                      <div className={styles.jobInfo}>
                        <h3 className={styles.jobTitle}>{job.title}</h3>
                        <p className={styles.company}>{job.company}</p>
                        <p className={styles.location}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          {job.location}
                        </p>
                      </div>
                      <button className={styles.bookmarkBtn}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M5 2h10a1 1 0 0 1 1 1v16l-6-4-6 4V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                      </button>
                    </div>

                    {!isExpanded && (
                      <div className={styles.jobFooter}>
                        <span className={styles.posted}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
                          </svg>
                          posted {job.posted}
                        </span>
                        <button 
                          className={styles.applyBtn}
                          onClick={() => setExpandedJobId(job.id)}
                        >
                          Apply
                        </button>
                      </div>
                    )}

                    {isExpanded && job.about && (
                      <div className={styles.expandedContent}>
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
                              <span className={styles.detailValue}>{job.roleType}</span>
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

                        {job.responsibilities && (
                          <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Responsibilities</h2>
                            <ul className={styles.list}>
                              {job.responsibilities.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </section>
                        )}

                        {job.requirements && (
                          <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Requirements</h2>
                            <ul className={styles.list}>
                              {job.requirements.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </section>
                        )}

                        {job.niceToHave && (
                          <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Nice-to-have</h2>
                            <ul className={styles.list}>
                              {job.niceToHave.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </section>
                        )}

                        {job.tools && (
                          <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Tools & Technologies</h2>
                            <div className={styles.tags}>
                              {job.tools.map((tool, index) => (
                                <span key={index} className={styles.tag}>{tool}</span>
                              ))}
                            </div>
                          </section>
                        )}

                        {job.benefits && (
                          <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Benefits</h2>
                            <ul className={styles.list}>
                              {job.benefits.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </section>
                        )}

                        {job.salary && (
                          <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Salary</h2>
                            <p className={styles.salary}>{job.salary}</p>
                          </section>
                        )}

                        <div className={styles.expandedFooter}>
                          <span className={styles.posted}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
                            </svg>
                            posted {job.posted}
                          </span>
                          <div className={styles.expandedActions}>
                            <button 
                              className={styles.closeBtn}
                              onClick={() => setExpandedJobId(null)}
                            >
                              Close
                            </button>
                            <button className={styles.applyBtnLarge}>
                              Apply for this position
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button 
                className={styles.pageBtn}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`${styles.pageBtn} ${currentPage === index + 1 ? styles.activePage : ''}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              
              <button 
                className={styles.pageBtn}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
