import React from "react";
import styles from "./SideNav.module.css";

type NavItem = { id: string; label: string };

export const NAV_SECTIONS: NavItem[] = [
  { id: "hero", label: "intro" },
  { id: "built", label: "things I've built" },
  { id: "toolkit", label: "the toolkit" },
  { id: "next", label: "next" },
];

type Props = {
  activeId: string;
  onSelect: (id: string) => void;
  /** true when the section under the nav is the dark closing panel */
  overDark?: boolean;
};

/**
 * A quiet vertical index fixed to the left edge. It is fully controlled: the
 * page decides which section is active and what a click does (scroll within
 * the main view, or switch to a stand-alone Work / Skills view).
 * mix-blend-mode keeps it legible over both the light sections and the dark
 * closing panel.
 */
export const SideNav = ({ activeId, onSelect, overDark }: Props) => {
  return (
    <nav
      className={[styles.nav, overDark ? styles.onDark : ""]
        .filter(Boolean)
        .join(" ")}
      aria-label="Sections"
    >
      <ul className={styles.list}>
        {NAV_SECTIONS.map((item) => {
          const on = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={[styles.item, on ? styles.active : ""]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={on ? "true" : undefined}
                onClick={() => onSelect(item.id)}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
