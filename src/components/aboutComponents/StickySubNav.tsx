"use client";
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import type { StickyNavSection as StickyNavSectionData } from '../../types/about';

const STICKY_NAV_ICONS_OFFSET = 150;

export const StickySubNav = ({ navItems }: StickyNavSectionData) => {
  const [activeSection, setActiveSection] = useState(navItems[0]?.navId ?? '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + STICKY_NAV_ICONS_OFFSET;

      for (const item of navItems) {
        const element = document.getElementById(item.navId);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(item.navId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100; // Offset for sticky nav
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[64px] z-40 w-full bg-[#dae7fa]/80 backdrop-blur-md border-b border-gray-200 py-4 hidden md:block transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto no-scrollbar">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.navId)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border",
              activeSection === item.navId
                ? "bg-[#32a99f] border-transparent text-white shadow-sm"
                : "bg-transparent border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-900"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
