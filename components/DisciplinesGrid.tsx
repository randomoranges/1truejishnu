import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "./ScrollReveal";
import styles from "./DisciplinesGrid.module.css";

/** An entry may be a bare label or an object carrying its own children. */
type Item = string | { label: string; blurb?: string; items?: Item[] };

type Cluster = {
  id: string;
  label: string;
  color: string;
  blurb: string;
  items: Item[];
};

const itemLabel = (item: Item) => (typeof item === "string" ? item : item.label);

/**
 * A pared-back replacement for the interactive graph: the same disciplines,
 * laid out as a quiet grid. Each cell is a category with its top-level items
 * as a middot-separated list — readable at a glance, no canvas, and it adapts
 * to whichever theme is active.
 */
export const DisciplinesGrid = () => {
  const { t } = useTranslation();
  const clusters = t("toolkit.clusters", { returnObjects: true }) as Cluster[];

  return (
    <section id="toolkit" className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal variant="fadeIn">
          <span className={styles.label}>{t("toolkit.label")}</span>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp">
          <h2 className={styles.heading}>{t("toolkit.heading")}</h2>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={100}>
          <p className={styles.description}>{t("toolkit.description")}</p>
        </ScrollReveal>

        <ScrollReveal variant="fadeUp" delay={160}>
          <div className={styles.grid}>
            {clusters.map((cluster) => {
              const items = cluster.items.map(itemLabel);
              return (
                <div
                  key={cluster.id}
                  className={styles.cell}
                  style={{ "--cell-color": cluster.color } as React.CSSProperties}
                >
                  <div className={styles.cellHead}>
                    <span className={styles.dot} />
                    <span className={styles.name}>{cluster.label}</span>
                  </div>
                  <p className={styles.items}>
                    {items.map((item, i) => (
                      <React.Fragment key={item}>
                        {/* spaces around the middot give the line break
                            opportunities, so long tokens never overflow */}
                        {i > 0 && (
                          <>
                            {" "}
                            <span className={styles.sep}>·</span>{" "}
                          </>
                        )}
                        {item}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
