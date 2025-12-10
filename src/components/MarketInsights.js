import styles from './MarketInsights.module.css';

export default function MarketInsights() {
  const stats = [
    {
      icon: './images/people.svg',
      number: '5,500+',
      description: 'Gaming professionals currently active in Serbia'
    },
    {
      icon: './images/building.svg',
      number: '110+',
      description: 'Studios and gaming employers operating across the country'
    },
    {
      icon: './images/trophy.svg',
      number: '10,000+',
      description: 'Professional gamers driving a competitive and creative gaming culture'
    }
  ];

  const chartData = [
    { year: '2018', value: 80, label: '€80M' },
    { year: '2019', value: 90, label: '€90M' },
    { year: '2020', value: 120, label: '€120M' },
    { year: '2021', value: 125, label: '€125M' },
    { year: '2022', value: 160, label: '€160M' },
    { year: '2023', value: 175, label: '€175M' },
    { year: '2024', value: 225, label: '€225M' }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <section className={styles.insightsSection}>
      {/* Project Missions Header - Full Width */}
      <div className={styles.projectHeaderDiv}> 
        <div className={styles.container}>
          <div className={styles.projectHeader}>
            <h2 className={styles.projectTitle}>
              Project missions. Side gigs. Freelance quests.
            </h2>
            <p className={styles.projectSubtitle}>
              Whatever your playstyle is — we've got roles for it. No commissions. Ever.
            </p>
            <button className={styles.exploreBtn}>Explore Projects</button>
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className={styles.container}>
        <div className={styles.marketSection}>
          <h2 className={styles.marketTitle}>Market Insights</h2>
          <p className={styles.marketSubtitle}>
            A snapshot of Serbia's rapidly growing gaming ecosystem, talent capacity, and industry expansion — helping<br />
            employers understand why Serbia is becoming one of Europe's most attractive hiring destinations.
          </p>

          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon}><img src={stat.icon} alt="" /></div>
                <div className={styles.statNumber}>{stat.number}</div>
                <p className={styles.statDescription}>{stat.description}</p>
              </div>
            ))}
          </div>

          {/* Chart and Text Section */}
          <div className={styles.chartSection}>
            <div className={styles.chartContainer}>
            <img src="./images/Container_chart.png" alt="Gaming Industry Growth Chart" className={styles.chartImage} />
            </div>

            <div className={styles.textContent}>
              <p className={styles.paragraph}>
                Serbia's gaming industry has experienced exceptional growth between 2018 and 2024. Revenues increased from approximately <strong>€80M</strong> in 2018 to over <strong>€177M</strong> in 2023, reaching a record <strong>€234M</strong> in 2024. This growth is accompanied by a steady rise in the number of studios — from a few dozen in the early 2010s to over 110 registered teams by 2023, stabilizing at around <strong>100 active studios in 2024</strong>.
              </p>
              <p className={styles.paragraph}>
                At the same time, Serbia has seen explosive workforce expansion: the number of gaming professionals grew from around <strong>1,200 in 4,400</strong> experts by 2024, driven largely by an influx of experienced international talent. The industry nearly doubled its workforce in 2023 alone (98% growth).
              </p>
              <p className={styles.paragraph}>
                Serbia has been firmly positioned on the global gaming map thanks to strong local studios and major foreign investments. Companies such as <strong>Epic Games, Wargaming, Playtrix</strong>, and <strong>Spearsoft</strong> have opened development hubs, while <strong>Nordeus</strong> (Top Eleven) was acquired by <strong>Take-Two Interactive</strong> in 2021, reflecting industry maturity. Most Serbian studios build their own titles and earn directly on the global market, enabling independence and continuous team growth.
              </p>
              <p className={styles.paragraph}>
                Serbia is now recognized as a highly attractive destination for gaming investment and hiring — thanks to a strong technical and creative talent pool, competitive operating costs, and a supportive ecosystem. Universities have launched specialized video game development programs (e.g., <strong>Master 4.0</strong>), while the <strong>Serbian Games Association (SGA)</strong> strengthens the ecosystem through reports, networking, and community support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
