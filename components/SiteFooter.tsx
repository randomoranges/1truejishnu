import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./SiteFooter.module.css";

type Social = { label: string; href: string };

export const SiteFooter = () => {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState(false);

  const socials = t("footer.socials", { returnObjects: true }) as Social[];
  const email = t("footer.email");

  // The thread only draws itself once the footer is actually reached.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked; the mailto link beside it still works.
      setCopied(false);
    }
  };

  return (
    <footer
      ref={rootRef}
      className={[styles.footer, shown ? styles.visible : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.inner}>
        {/* the merged thread arrives and spreads into the rule */}
        <div className={styles.arrival} aria-hidden="true">
          <span className={styles.stem} />
          <span className={styles.spread} />
        </div>

        <div className={styles.columns}>
          <div className={styles.identity}>
            <span className={styles.identityName}>{t("footer.name")}</span>
            <span className={styles.identityRights}>{t("footer.rights")}</span>
          </div>

          <div className={styles.contact}>
            <a className={styles.email} href={`mailto:${email}`}>
              {email}
            </a>
            <button
              type="button"
              className={[styles.copy, copied ? styles.copyDone : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={onCopy}
            >
              {copied ? t("footer.copied") : t("footer.copy")}
            </button>
          </div>

          <ul className={styles.socials}>
            {socials.map((social) => (
              <li key={social.href}>
                <a
                  className={styles.social}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
