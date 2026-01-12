import React, { useEffect, useRef, useState } from 'react';
import styles from './TabNavigation.module.css';

export interface Tab {
  id: string;
  label: string;
}

export interface TabNavigationProps {
  /**
   * An array of tab objects to display.
   */
  tabs: Tab[];
  /**
   * Optional className to apply to the root element.
   */
  className?: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  className,
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(tabs[0]?.id || '');
  const tabsListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  // Scroll to section handler
  const handleTabClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // We also optimistically set the active tab, though the observer will confirm it
      setActiveTabId(id);
    }
  };

  // Setup Intersection Observer to spy on sections
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '-20% 0px -60% 0px', // Active when section is near top of viewport but not just barely entering bottom
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTabId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections based on tab IDs
    tabs.forEach((tab) => {
      const element = document.getElementById(tab.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [tabs]);

  // Scroll active tab into view when it changes
  useEffect(() => {
    const container = tabsListRef.current;
    const activeButton = tabRefs.current[activeTabId];

    if (container && activeButton) {
      // Calculate position to center the button in the container
      const scrollLeft =
        activeButton.offsetLeft -
        container.offsetWidth / 2 +
        activeButton.offsetWidth / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [activeTabId]);

  return (
    <nav
      className={`${styles.container} ${className || ''}`}
      aria-label="Page sections"
    >
      <div className={styles.tabsList} ref={tabsListRef}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[tab.id] = el;
            }}
            role="tab"
            aria-selected={activeTabId === tab.id}
            className={styles.tabTrigger}
            onClick={() => handleTabClick(tab.id)}
            data-state={activeTabId === tab.id ? 'active' : 'inactive'}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};