import React, { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

/**
 * A subtle ring that trails the pointer with easing. Over anything clickable
 * it opens up and an accent dot appears at its centre — the custom-cursor
 * equivalent of the hand pointer. The ring uses mix-blend-mode: difference so
 * it reads on every ground; the inner dot paints normally so it keeps its
 * accent colour. While active it replaces the native cursor entirely.
 */
export const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    // hides the native cursor site-wide while the custom one is active
    document.documentElement.classList.add("has-custom-cursor");
    ring.classList.add(styles.on, styles.hidden);
    dot.classList.add(styles.hidden);

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let frame = 0;
    let seen = false;

    const interactive =
      "a, button, [role='switch'], [role='button'], input, textarea, select, label, canvas, summary";

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        seen = true;
        rx = tx;
        ry = ty;
      }
      ring.classList.remove(styles.hidden);
      dot.classList.remove(styles.hidden);
      const target = e.target;
      const isInteractive =
        target instanceof Element && !!target.closest(interactive);
      ring.classList.toggle(styles.active, isInteractive);
      dot.classList.toggle(styles.active, isInteractive);
    };

    const onLeave = () => {
      ring.classList.add(styles.hidden);
      dot.classList.add(styles.hidden);
    };
    const onDown = () => ring.classList.add(styles.press);
    const onUp = () => ring.classList.remove(styles.press);

    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      // the dot sits at the true pointer, so it stays precise while the ring
      // eases in behind it
      dot.style.left = `${tx}px`;
      dot.style.top = `${ty}px`;
      frame = window.requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
};
