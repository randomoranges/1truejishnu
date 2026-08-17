import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollReveal } from "./ScrollReveal";
import styles from "./ProcessFlow.module.css";

type Step = { step: string; title: string; body: string };

/**
 * Two hand-drawn looking curves: one sweeping left-to-right, one back again.
 * The wobble lives in the control points rather than in an SVG filter, so the
 * dotted stroke keeps its even spacing.
 */
const CURVE_RIGHT =
  "M 40 6 C 96 30, 122 6, 176 34 S 240 78, 302 64 S 374 80, 404 114";
const CURVE_LEFT =
  "M 404 6 C 348 30, 322 6, 268 34 S 204 78, 142 64 S 70 80, 40 114";

/** Draws its dots in once it scrolls into view. */
const Connector = ({ toLeft }: { toLeft: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[styles.connector, shown ? styles.reveal : ""]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <svg viewBox="0 0 444 120" width="100%" height="100%">
        <path
          className={styles.connectorPath}
          d={toLeft ? CURVE_LEFT : CURVE_RIGHT}
        />
      </svg>
    </div>
  );
};

export const ProcessFlow = () => {
  const { t } = useTranslation();
  const steps = t("built.process", { returnObjects: true }) as Step[];

  return (
    <div className={styles.flow}>
      {steps.map((item, i) => {
        const onRight = i % 2 === 1;
        return (
          <React.Fragment key={item.step}>
            <ScrollReveal
              variant="fadeUp"
              className={[styles.step, onRight ? styles.right : ""]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles.stepHead}>
                <span className={styles.stepNumber}>{item.step}</span>
                <h3 className={styles.stepTitle}>{item.title}</h3>
              </div>
              <p className={styles.stepBody}>{item.body}</p>
            </ScrollReveal>

            {i < steps.length - 1 && <Connector toLeft={onRight} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};
