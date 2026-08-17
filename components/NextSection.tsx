import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HoverPill } from "./HoverPill";
import styles from "./NextSection.module.css";

/**
 * Two threads converge into one as the section scrolls. Progress is written
 * to a single CSS custom property; every phase of the reveal is expressed in
 * CSS from that number, so scrubbing back and forth is exact and the JS work
 * per frame stays to one style write.
 */
export const NextSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [showPill, setShowPill] = useState(false);
  /** the closer is only on screen late in the scrub */
  const [closerIn, setCloserIn] = useState(false);
  const closerInRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let last = -1;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      if (distance <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      const rounded = Math.round(progress * 1000) / 1000;
      if (rounded === last) return;
      last = rounded;
      section.style.setProperty("--p", String(rounded));

      // one state change per crossing, not per frame
      const inCloser = rounded > 0.78;
      if (inCloser !== closerInRef.current) {
        closerInRef.current = inCloser;
        setCloserIn(inCloser);
      }
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
  }, []);

  return (
    <section
      id="next"
      ref={sectionRef}
      className={styles.next}
      style={{ "--p": 0 } as React.CSSProperties}
    >
      <div className={styles.sticky}>
        <div className={styles.stage}>
          <span className={styles.label}>{t("next.label")}</span>

          <svg
            className={styles.threads}
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Two rails that start vertical, lean in, and arrive almost
                vertical again — a confluence rather than a hard V. */}
            <path
              className={styles.thread}
              d="M 150 190 C 150 430, 468 470, 500 640"
            />
            <path
              className={styles.thread}
              d="M 850 190 C 850 430, 532 470, 500 640"
            />
            {/* the single line they become — it ends on the closing thought
                rather than on a marker */}
            <path
              className={`${styles.thread} ${styles.threadMerged}`}
              d="M 500 640 L 500 790"
            />
          </svg>

          {/* Each line knocks the thread out behind it, so the rails never
              run through the type. */}
          <p className={`${styles.line} ${styles.lineOne}`}>
            <span className={styles.knockout}>{t("next.lineOne")}</span>
          </p>
          <p className={`${styles.line} ${styles.lineTwo}`}>
            <span className={styles.knockout}>{t("next.lineTwo")}</span>
          </p>
          <p className={`${styles.line} ${styles.lineThree}`}>
            <span className={styles.knockout}>{t("next.lineThree")}</span>
          </p>
          {/* where the merged line lands */}
          <p className={`${styles.line} ${styles.lineFour}`}>
            <span className={styles.knockout}>{t("next.lineFour")}</span>
          </p>

          <div
            className={styles.closer}
            onMouseEnter={() => setShowPill(true)}
            onMouseLeave={() => setShowPill(false)}
          >
            <h2 className={styles.statement}>{t("next.statement")}</h2>
            <p className={styles.note}>{t("next.note")}</p>
            {closerIn && (
              <HoverPill
                text={t("next.pill")}
                show={showPill}
                className={styles.closerPill}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
