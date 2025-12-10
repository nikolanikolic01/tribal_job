import styles from './Partnership.module.css';

export default function Partnership() {
  const insights = [
    {
      id: 1,
      title: 'How Serbia Became a Rising Force in Global Game Development',
      description: 'Discover the key factors behind Serbia\'s rapid growth in the gaming industry and how it\'s attracting major studios from around the world.',
      image: '/images/insights/gaming-tablet.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'The Rise of Remote Game Development Teams',
      description: 'How distributed teams are reshaping the future of game creation and what it means for talent acquisition.',
      image: '/images/insights/remote-dev.jpg',
      featured: false
    },
    {
      id: 3,
      title: 'Essential Skills Every Game Developer Needs in 2025',
      description: 'Stay competitive with this comprehensive guide to the most in-demand technical and soft skills in gaming.',
      image: '/images/insights/developer.jpg',
      featured: false
    }
  ];

  return (
    <section className={styles.partnershipSection}>
      <div className={styles.container}>
        {/* Partnership CTA */}
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>
            Interested in <span className={styles.highlight}>partnering</span> with us?
          </h2>
          <p className={styles.ctaSubtitle}>
            Discover how we can support your hiring and business expansion needs.
          </p>
          <button className={styles.contactBtn}>Contact us</button>
        </div>

        {/* Latest Insights */}
        <div className={styles.insightsSection}>
          <h2 className={styles.insightsTitle}>Latest Insights</h2>
          <p className={styles.insightsSubtitle}>
            Stay updated with trends, news, and expert perspectives from the gaming industry.
          </p>

          <div className={styles.insightsGrid}>
            {insights.map((insight) => (
              <div 
                key={insight.id} 
                className={`${styles.insightCard} ${insight.featured ? styles.featured : ''}`}
              >
                <div className={styles.imageWrapper}>
                  <div className={styles.imagePlaceholder}>
                    {insight.featured ? '🎮' : insight.id === 2 ? '💻' : '👨‍💻'}
                  </div>
                  <div className={styles.imageOverlay}></div>
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.badge}>Latest News</span>
                  <h3 className={styles.cardTitle}>{insight.title}</h3>
                  <p className={styles.cardDescription}>{insight.description}</p>
                  <button className={styles.readMoreBtn}>Read More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
