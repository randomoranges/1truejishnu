import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "./ScrollReveal";
import { ProcessFlow } from "./ProcessFlow";
import { ProductHuntBadge, BadgeProps } from "./ProductHuntBadge";
import styles from "./BuiltSection.module.css";

/** Projects shown before the "see more" toggle. */
const VISIBLE_COUNT = 2;

type ProjectLink = { label: string; href: string };

type Project = {
  id: string;
  name: string;
  meta: string;
  gap: string;
  philosophy: string;
  became: string;
  next?: string;
  links: ProjectLink[];
  badges?: BadgeProps[];
  /** renders a trailing full stop in the product's own colour */
  dot?: boolean;
};

/**
 * Drives the hairline between the two columns: it fills from 0 to 1 as the
 * project scrolls past, so you can feel how far through a case you are.
 * One rAF-throttled listener covers every project rather than one each.
 */
function useReadingProgress(
  refs: React.MutableRefObject<(HTMLElement | null)[]>
) {
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const anchor = window.innerHeight * 0.5;

      refs.current.forEach((el) => {
        if (!el) return;
        const { top, height } = el.getBoundingClientRect();
        const progress = (anchor - top) / height;
        const clamped = Math.min(1, Math.max(0, progress));
        el.style.setProperty("--progress", clamped.toFixed(3));
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [refs]);
}

export const BuiltSection = () => {
  const { t } = useTranslation();
  const projectRefs = useRef<(HTMLElement | null)[]>([]);
  const [expanded, setExpanded] = useState(false);

  useReadingProgress(projectRefs);

  const allProjects = t("built.projects", { returnObjects: true }) as Project[];
  const projects = expanded ? allProjects : allProjects.slice(0, VISIBLE_COUNT);
  const hiddenCount = allProjects.length - VISIBLE_COUNT;

  return (
    <section id="built" className={styles.section}>
      <div className={styles.container}>
        {/* Section label — commented out; shown in the side nav instead.
        <ScrollReveal variant="fadeIn">
          <span className={styles.label}>{t("built.label")}</span>
        </ScrollReveal>
        */}

        <ScrollReveal variant="fadeUp">
          <p className={styles.intro}>{t("built.intro")}</p>
        </ScrollReveal>

        <ProcessFlow />

        <ScrollReveal variant="fadeUp">
          <p className={styles.introEnd}>
            <span>{t("built.introEnd")}</span>
          </p>
        </ScrollReveal>

        {projects.map((project, i) => {
          const beats = [
            { key: "gap", label: t("built.beats.gap"), body: project.gap },
            {
              key: "philosophy",
              label: t("built.beats.philosophy"),
              body: project.philosophy,
            },
            {
              key: "became",
              label: t("built.beats.became"),
              body: project.became,
            },
          ];

          return (
            <article
              key={project.id}
              className={styles.project}
              ref={(el) => {
                projectRefs.current[i] = el;
              }}
            >
              <div className={styles.meta}>
                <ScrollReveal variant="fadeUp">
                  <span className={styles.index}>
                    {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                  <h3 className={styles.name}>
                    {project.name}
                    {project.dot && <span className={styles.nameDot}>.</span>}
                  </h3>
                  <p className={styles.metaLine}>{project.meta}</p>

                  <div className={styles.links}>
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        className={styles.link}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {link.label} <span className={styles.arrow}>↗</span>
                      </a>
                    ))}
                  </div>

                  {project.badges && (
                    <div className={styles.badges}>
                      {project.badges.map((badge) => (
                        <ProductHuntBadge
                          key={badge.src}
                          src={badge.src}
                          srcDark={badge.srcDark}
                          alt={badge.alt}
                        />
                      ))}
                    </div>
                  )}
                </ScrollReveal>
              </div>

              <div className={styles.rule} aria-hidden="true">
                <span className={styles.ruleFill} />
              </div>

              <div className={styles.beats}>
                {beats.map((beat, bi) => (
                  <ScrollReveal key={beat.key} variant="fadeUp" delay={bi * 90}>
                    <span className={styles.beatLabel}>{beat.label}</span>
                    <p className={styles.beatBody}>{beat.body}</p>
                  </ScrollReveal>
                ))}

                {project.next && (
                  <ScrollReveal variant="fadeUp" className={styles.next}>
                    <span className={styles.beatLabel}>
                      {t("built.beats.next")}
                    </span>
                    <p className={styles.beatBody}>{project.next}</p>
                  </ScrollReveal>
                )}
              </div>
            </article>
          );
        })}

        {hiddenCount > 0 && (
          <ScrollReveal variant="fadeUp" className={styles.moreWrap}>
            <button
              type="button"
              className={styles.moreButton}
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
            >
              <span className={styles.moreLabel}>
                {expanded ? t("built.seeLess") : t("built.seeMore")}
              </span>
              <span className={styles.moreCount}>
                {expanded ? "" : `+${hiddenCount}`}
              </span>
              <span className={styles.moreChevron} aria-hidden="true">
                ↓
              </span>
            </button>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};
