import React, { useEffect, useRef, useState } from "react";
import styles from "./HoverPill.module.css";

type Props = {
  text: string;
  /** parent-driven hover state */
  show: boolean;
  /** placement comes from the parent's stylesheet */
  className?: string;
};

/**
 * A small accent pill that stays hidden until you hover the text it belongs
 * to. Each time it appears it gives a short wiggle; it never shows itself
 * unprompted.
 */
export const HoverPill = ({ text, show, className }: Props) => {
  const [shaking, setShaking] = useState(false);
  const wasShown = useRef(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    // only fire on the false -> true edge, not on every render while hovered
    if (show && !wasShown.current) {
      setShaking(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setShaking(false), 640);
    }
    wasShown.current = show;
  }, [show]);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    []
  );

  return (
    <span
      aria-hidden="true"
      className={[
        styles.pill,
        show ? styles.on : "",
        shaking ? styles.hint : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {text}
    </span>
  );
};
