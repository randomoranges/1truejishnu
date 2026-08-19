import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// Commented out per request — kept for later, not deleted.
// import { HoverPill } from "./HoverPill";
// import { ThemeToggle } from "./ThemeToggle";
import styles from "./Hero.module.css";

/**
 * Each intro line carries its own indent step (in `ch` units) so the block
 * reads as a staircase rather than a flush-aligned paragraph.
 */
const INDENTS = [0, 1, 2, 3, 5];

const PHOTO_SRC =
  "https://assets.floot.app/a32514e1-bff0-4614-b913-bc387420f56c/36ab6a43-60d7-40e1-8977-ea51da87edcb.jpeg";

/** Drift is capped so a long scroll can't rotate the mark out of its box. */
const MAX_DRIFT = 6;

export const Hero = () => {
  const { t } = useTranslation();
  const [drift, setDrift] = useState(0);

  // --- Name-meaning popup + intro pill state (commented out) ---------------
  // const [showMeaning, setShowMeaning] = useState(false);
  // const [showPill, setShowPill] = useState(false);
  // const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setDrift(Math.min(MAX_DRIFT, window.scrollY * 0.015));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // useEffect(
  //   () => () => {
  //     if (closeTimer.current) window.clearTimeout(closeTimer.current);
  //   },
  //   []
  // );

  // const open = () => {
  //   if (closeTimer.current) window.clearTimeout(closeTimer.current);
  //   setShowMeaning(true);
  // };

  // const close = () => {
  //   if (closeTimer.current) window.clearTimeout(closeTimer.current);
  //   closeTimer.current = window.setTimeout(() => setShowMeaning(false), 120);
  // };

  const lines = t("hero.lines", { returnObjects: true }) as string[];

  return (
    <section id="hero" className={styles.hero}>
      <div
        className={styles.markWrap}
        // Popup hover handlers commented out with the tooltip below.
        // onMouseEnter={open}
        // onMouseLeave={close}
        // onFocus={open}
        // onBlur={close}
        onDoubleClick={() => window.location.reload()}
        tabIndex={0}
        role="button"
        aria-label={t("hero.wordmark")}
        style={{ "--wordmark-drift": `${drift}deg` } as React.CSSProperties}
      >
        <svg className={styles.wordmark} viewBox="0 0 560 560" aria-hidden="true">
          {/* A 150° sweep on a tighter radius still — the name turns right
              past vertical, so its tail leans back under itself. */}
          <path id="wordmarkArc" d="M 210 118 A 168 168 0 0 1 440 347" fill="none" />
          <text className={styles.wordmarkText}>
            <textPath href="#wordmarkArc" startOffset="0">
              {t("hero.wordmark")}
            </textPath>
          </text>
        </svg>

        {/* Name-meaning popup — commented out per request, kept for later.
        <div
          id="wordmark-meaning"
          role="tooltip"
          className={[styles.meaning, showMeaning ? styles.meaningOn : ""]
            .filter(Boolean)
            .join(" ")}
        >
          <span className={styles.meaningTitle}>जिष्णु · జిష్ణు</span>
          <p className={styles.meaningBody}>{t("hero.meaning")}</p>
        </div>
        */}
      </div>

      <div className={styles.stage}>
        {/* Hover pill — commented out per request, kept for later.
        <HoverPill
          text={t("hero.pill")}
          show={showPill}
          className={styles.introPill}
        />
        */}

        <p
          className={styles.intro}
          // onMouseEnter={() => setShowPill(true)}
          // onMouseLeave={() => setShowPill(false)}
        >
          {lines.map((line, i) => (
            <span
              key={line}
              className={styles.line}
              style={
                {
                  "--indent": INDENTS[i] ?? INDENTS[INDENTS.length - 1],
                  "--delay": `${120 + i * 130}ms`,
                } as React.CSSProperties
              }
            >
              {line}
            </span>
          ))}
        </p>

        <img
          className={styles.photo}
          src={PHOTO_SRC}
          alt={t("hero.photoAlt")}
          loading="eager"
        />
      </div>

      {/* Theme toggle — commented out per request, kept for later.
      <div className={styles.controls}>
        <ThemeToggle />
      </div>
      */}
    </section>
  );
};
