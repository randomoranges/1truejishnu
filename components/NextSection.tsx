import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
// Hover pill commented out per request — kept for later, not deleted.
// import { HoverPill } from "./HoverPill";
import styles from "./NextSection.module.css";

type Props = {
  /**
   * "full"    — the converging-threads build-up scrubbed by scroll, ending on
   *             the closing statement (end of the Work → Skills flow).
   * "closing" — just the closing statement + note on a single screen, no threads
   *             (the CTA the hero switches to). The 2-second stop that precedes
   *             it lives in the switcher, not here.
   */
  variant?: "closing" | "full";
};

export const NextSection = ({ variant = "full" }: Props) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isFull = variant === "full";

  // The scroll scrub only runs for the full variant.
  useEffect(() => {
    if (!isFull) return;
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
  }, [isFull]);

  return (
    <section
      id="next"
      ref={sectionRef}
      className={`${styles.next} ${isFull ? styles.full : styles.closing}`}
      // closing variant pins --p to 1 so the closer resolves to its final state
      style={isFull ? undefined : ({ "--p": 1 } as React.CSSProperties)}
    >
      <div className={styles.sticky}>
        <div className={styles.stage}>
          {/* Section label — commented out; shown in the side nav instead.
          <span className={styles.label}>{t("next.label")}</span>
          */}

          {isFull && (
            <>
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
                <path
                  className={`${styles.thread} ${styles.threadMerged}`}
                  d="M 500 640 L 500 845"
                />
              </svg>

              {/* Each line knocks the thread out behind it. */}
              <p className={`${styles.line} ${styles.lineOne}`}>
                <span className={styles.knockout}>{t("next.lineOne")}</span>
              </p>
              <p className={`${styles.line} ${styles.lineTwo}`}>
                <span className={styles.knockout}>{t("next.lineTwo")}</span>
              </p>
              <p className={`${styles.line} ${styles.lineThree}`}>
                <span className={styles.knockout}>{t("next.lineThree")}</span>
              </p>
              <p className={`${styles.line} ${styles.lineFour}`}>
                <span className={styles.knockout}>{t("next.lineFour")}</span>
              </p>
            </>
          )}

          <div className={styles.closer}>
            <h2 className={styles.statement}>{t("next.statement")}</h2>
            <p className={styles.note}>{t("next.note")}</p>
            {/* Hover pill — commented out per request, kept for later.
            <HoverPill text={t("next.pill")} show={false} className={styles.closerPill} />
            */}
          </div>
        </div>
      </div>
    </section>
  );
};
