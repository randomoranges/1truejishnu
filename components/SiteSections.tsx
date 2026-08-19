import React, { useEffect, useRef, useState } from "react";
import { Hero } from "./Hero";
import { BuiltSection } from "./BuiltSection";
import { ToolkitGraph } from "./ToolkitGraph";
import { NextSection } from "./NextSection";
import { SiteFooter } from "./SiteFooter";
import { SideNav } from "./SideNav";
import styles from "./SiteSections.module.css";

/**
 * Two flows, switched by the side nav:
 *
 * - "main"    — the landing: hero, then an empty scroll break, then the closing
 *               CTA (no threads). Scrolling down from the hero passes through the
 *               break before the CTA comes in.
 * - "content" — the journey: Work → Skills → the full closing section (with its
 *               converging-thread "hairlines"), one continuous scroll.
 *
 * Work and Skills live only in the content flow; the CTA never repeats.
 */
type View = "main" | "content";

const viewOf = (id: string): View =>
  id === "built" || id === "toolkit" ? "content" : "main";

export const SiteSections = () => {
  const [view, setView] = useState<View>("main");
  const [active, setActive] = useState("hero");
  const pendingScroll = useRef<string | null>(null);

  // Generic scroll-spy over whatever sections the current flow has mounted.
  useEffect(() => {
    const onScroll = () => {
      const secs = Array.from(
        document.querySelectorAll<HTMLElement>("#root section[id]")
      );
      if (!secs.length) return;
      const mid = window.innerHeight / 2;
      let current = secs[0].id;
      for (const el of secs) {
        if (el.getBoundingClientRect().top <= mid) current = el.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [view]);

  // After a flow switch, scroll to the nav target that triggered it.
  useEffect(() => {
    if (!pendingScroll.current) return;
    const id = pendingScroll.current;
    pendingScroll.current = null;
    requestAnimationFrame(() => {
      if (id === "hero") window.scrollTo({ top: 0, behavior: "smooth" });
      else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [view]);

  const overDark = active === "next";

  const select = (id: string) => {
    const target = viewOf(id);
    if (target !== view) {
      pendingScroll.current = id;
      setView(target);
      return;
    }
    if (id === "hero") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <SideNav activeId={active} onSelect={select} overDark={overDark} />

      <div key={view} className={styles.view}>
        {view === "main" ? (
          <>
            <Hero />
            <NextSection variant="closing" />
          </>
        ) : (
          <>
            <BuiltSection />
            <ToolkitGraph />
            <NextSection variant="full" />
          </>
        )}
        <SiteFooter />
      </div>
    </>
  );
};
