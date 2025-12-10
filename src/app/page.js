import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import JobsOnFire from "@/components/JobsOnFire";
import MarketInsights from "@/components/MarketInsights";
import Partnership from "@/components/Partnership";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Hero />
        <Partners />
        <JobsOnFire />
        <MarketInsights />
        <Partnership />
      </main>
      <Footer />
    </div>
  );
}
