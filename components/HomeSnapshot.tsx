import React from "react";
import {
  Briefcase,
  Users,
  FileText,
  Globe,
  TrendingUp,
  Award,
  Target,
  Calendar,
} from "lucide-react";
import styles from "./HomeSnapshot.module.css";

interface StatCard {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export const HomeSnapshot = () => {
  const stats: StatCard[] = [
    {
      icon: <Briefcase size={32} />,
      value: "2+ Years",
      label: "Product Dev & Analytics",
    },
    {
      icon: <Users size={32} />,
      value: "1,400+",
      label: "Users Acquired Organically",
    },
    {
      icon: <FileText size={32} />,
      value: "2 Published",
      label: "Research Papers",
    },
    {
      icon: <Globe size={32} />,
      value: "3 Languages",
      label: "Fluent + German (A1)",
    },
    {
      icon: <TrendingUp size={32} />,
      value: "40%",
      label: "Performance Boost",
    },
    {
      icon: <Award size={32} />,
      value: "#4 Ranking",
      label: "Product Hunt Launch",
    },
    {
      icon: <Target size={32} />,
      value: "200+",
      label: "B2B Prospects Tracked",
    },
    {
      icon: <Calendar size={32} />,
      value: "20+",
      label: "Events Organized",
    },
  ];

  return (
    <section className={styles.snapshotSection}>
      <div className={styles.snapshotContainer}>
        <div className={styles.snapshotGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};