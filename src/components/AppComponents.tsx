"use client";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Menu,
  X,
  Zap,
  Leaf,
  TrendingUp,
  Users,
  ShieldCheck,
  Download,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Globe2,
  Sun,
  Wind,
  Battery,
  Droplets,
  ChevronRight,
  Layers,
  Aperture,
  Lightbulb,
  Search,
  Lock,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Hero } from "./Navbar";
import { AboutFund } from "./AboutFund";
import { Portfolio } from "./Portfolio";
import { DevelopmentImpact } from "./DevelopmentImpact";
import { Blog } from "./Blog";
import { EligibilityCriteria } from "./EligibilityCriteria";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { portfolioData } from "../data/projects";

// --- Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const megaMenuContainer = {
  hidden: { opacity: 0, y: -10, pointerEvents: "none" as const },
  visible: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto" as const,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    pointerEvents: "none" as const,
    transition: { duration: 0.2 },
  },
};

const megaMenuColumn = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
      staggerChildren: 0.08,
    },
  },
};

const megaMenuItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const megaMenuCard = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// --- Components ---



export const Home = () => {
  return (
    <main>
      <Hero />
      <AboutFund />
      <Portfolio />
      <DevelopmentImpact />
      <Blog />
      <EligibilityCriteria />
    </main>
  );
};

const ScrollToTop = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [((typeof window !== "undefined" ? window.location.pathname : ""))]);
  return null;
};

export function App() {
  return (
    
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent)] selection:text-[var(--color-background)]">
        
        
        
      </div>
  );
}
