"use client";
import { Zap, Leaf, Users, Briefcase, type LucideIcon } from 'lucide-react';

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Leaf,
  Users,
  Briefcase,
};

export const getMetricIcon = (name: string): LucideIcon => ICON_MAP[name] ?? Zap;

// Standard UN SDG colors, keyed by SDG number as a string.
export const SDG_STYLES: Record<string, { color: string; label: string }> = {
  "1": { color: "#E5243B", label: "No Poverty" },
  "2": { color: "#DDA63A", label: "Zero Hunger" },
  "3": { color: "#4C9F38", label: "Good Health and Well-being" },
  "4": { color: "#C5192D", label: "Quality Education" },
  "5": { color: "#FF3A21", label: "Gender Equality" },
  "6": { color: "#26BDE2", label: "Clean Water and Sanitation" },
  "7": { color: "#FCC30B", label: "Affordable and Clean Energy" },
  "8": { color: "#A21942", label: "Decent Work and Economic Growth" },
  "9": { color: "#FD6925", label: "Industry, Innovation and Infrastructure" },
  "10": { color: "#DD1367", label: "Reduced Inequalities" },
  "11": { color: "#FD9D24", label: "Sustainable Cities and Communities" },
  "12": { color: "#BF8B2E", label: "Responsible Consumption and Production" },
  "13": { color: "#3F7E44", label: "Climate Action" },
  "14": { color: "#0A97D9", label: "Life Below Water" },
  "15": { color: "#56C02B", label: "Life on Land" },
  "16": { color: "#00689D", label: "Peace, Justice and Strong Institutions" },
  "17": { color: "#19486A", label: "Partnerships for the Goals" },
};

const DEFAULT_SDG_STYLE = { color: "#3F7E44", label: "" };

export const getSdgStyle = (sdgNumber: string) => SDG_STYLES[sdgNumber] ?? DEFAULT_SDG_STYLE;
