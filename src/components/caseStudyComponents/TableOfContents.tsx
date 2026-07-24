"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CASE_STUDY_SECTIONS = ['Overview', 'The Challenge', 'Our Solution', 'Impact Metrics', 'Gallery'];

const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, sectionId: string) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 120;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

const useActiveSection = () => {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const observers = new Map();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-150px 0px -40% 0px',
      threshold: 0
    });

    CASE_STUDY_SECTIONS.forEach((section) => {
      const sectionId = section.toLowerCase().replace(' ', '-');
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
        observers.set(sectionId, element);
      }
    });

    return () => {
      observers.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return activeSection;
};

export const TableOfContents = () => {
  const activeSection = useActiveSection();

  return (
    <nav className="relative flex flex-col gap-6 pl-5">
      {/* Continuous thin line */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#1A1A1A]/10" />

      {CASE_STUDY_SECTIONS.map((item) => {
        const sectionId = item.toLowerCase().replace(' ', '-');
        const isActive = activeSection === sectionId;
        return (
          <div key={item} className="relative">
            {isActive && (
              <motion.div
                layoutId="activeSidebarLine"
                className="absolute -left-[21px] top-0 bottom-0 w-[3px] bg-[var(--color-accent)] rounded-r-full"
              />
            )}
            <a
              href={`#${sectionId}`}
              onClick={(e) => handleScroll(e, sectionId)}
              className={`text-[15px] font-medium transition-colors hover:text-[var(--color-accent)] ${isActive ? 'text-[var(--color-accent)]' : 'text-[#1A1A1A]/60'}`}
            >
              {item}
            </a>
          </div>
        );
      })}
    </nav>
  );
};

export const MobileTableOfContents = () => {
  const activeSection = useActiveSection();

  return (
    <div className="lg:hidden sticky top-20 z-40 bg-white/90 backdrop-blur-md py-4 -mx-6 px-6 sm:px-0 sm:mx-0 border-b border-[#1A1A1A]/10 overflow-x-auto whitespace-nowrap no-scrollbar">
      <nav className="flex gap-6">
        {CASE_STUDY_SECTIONS.map((item) => {
          const sectionId = item.toLowerCase().replace(' ', '-');
          const isActive = activeSection === sectionId;
          return (
            <a
              key={item}
              href={`#${sectionId}`}
              onClick={(e) => handleScroll(e, sectionId)}
              className={`text-sm font-medium transition-colors hover:text-[var(--color-accent)] ${isActive ? 'text-[var(--color-accent)]' : 'text-[#1A1A1A]/60'}`}
            >
              {item}
            </a>
          );
        })}
      </nav>
    </div>
  );
};
