"use client";
import { useEffect } from 'react';
import type { ProjectItem } from '../../types/portfolio';
import { HeroSection } from './HeroSection';
import { TableOfContents, MobileTableOfContents } from './TableOfContents';
import { ProjectDetailsCard } from './ProjectDetailsCard';
import { OverviewSection } from './OverviewSection';
import { ChallengeSection } from './ChallengeSection';
import { SolutionSection } from './SolutionSection';
import { ImpactMetricsSection } from './ImpactMetricsSection';
import { GallerySection } from './GallerySection';
import { OtherProjectsSection } from './OtherProjectsSection';
import { NextProjectCTA } from './NextProjectCTA';

export const CaseStudyView = ({ project, otherProjects }: { project: ProjectItem; otherProjects: ProjectItem[] }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.projectId]);

  return (
    <div className="bg-white text-[#1A1A1A] min-h-screen font-sans">
      <HeroSection project={project} />

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">

          {/* Left Column: Sticky Sidebar (~25%) */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50 mb-8">Contents</h3>
              <TableOfContents />
              <ProjectDetailsCard project={project} />
            </div>
          </div>

          {/* Mobile Horizontal Menu */}
          <MobileTableOfContents />

          {/* Right Column: Scrollable Content (~75%) */}
          <div className="lg:col-span-9 flex flex-col gap-32">
            <OverviewSection project={project} />
            <ChallengeSection project={project} />
            <SolutionSection project={project} />
            <ImpactMetricsSection project={project} />
            <GallerySection project={project} />
            <OtherProjectsSection otherProjects={otherProjects} />
            <NextProjectCTA />
          </div>
        </div>
      </div>
    </div>
  );
};
