import React from "react";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  title: string;
  description: string;
  className?: string;
  actionButton?: {
    label: string;
    href: string;
  };
}

export const ProjectCard = ({
  title,
  description,
  className,
  actionButton,
}: ProjectCardProps) => {
  return (
    <div className={`${styles.card} ${className || ""}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
      {actionButton && (
        <a
          href={actionButton.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.actionButton}
        >
          {actionButton.label}
        </a>
      )}
    </div>
  );
};