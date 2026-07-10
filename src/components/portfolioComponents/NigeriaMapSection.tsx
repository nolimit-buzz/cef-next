"use client";
import dynamic from 'next/dynamic';

import type { NigeriaMapSection as NigeriaMapSectionData, ResolvedProject } from '../../types/portfolio';

const NigeriaMap = dynamic(() => import('../NigeriaMap').then(m => m.NigeriaMap), { ssr: false });

interface NigeriaMapSectionProps {
  section: NigeriaMapSectionData;
  projects: ResolvedProject[];
}

export const NigeriaMapSection = ({ section, projects }: NigeriaMapSectionProps) => {
  const { id: _id, __component: _component, ...mapProps } = section;
  return <NigeriaMap {...mapProps} projects={projects} />;
};
