"use client";
import type { ProjectItem } from '../../types/portfolio';

export const ProjectDetailsCard = ({ project }: { project: ProjectItem }) => {
  return (
    <div className="mt-16 bg-[#F8FAFC] rounded-lg p-8 border border-slate-200">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50 mb-8">Project Details</h3>
      <div className="flex flex-col gap-8">
        <div>
          <div className="text-sm text-[#1A1A1A]/60 mb-1">Client</div>
          <div className="font-medium text-[#1A1A1A]">{project.name}</div>
        </div>
        <div>
          <div className="text-sm text-[#1A1A1A]/60 mb-2">Sector</div>
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border"
            style={{
              backgroundColor: `${project.sectorColor || 'var(--color-accent)'}1A`,
              borderColor: `${project.sectorColor || 'var(--color-accent)'}33`,
              color: project.sectorColor || 'var(--color-accent)'
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.sectorColor || 'var(--color-accent)' }} />
            {project.sector}
          </div>
        </div>
        <div>
          <div className="text-sm text-[#1A1A1A]/60 mb-1">Location</div>
          <div className="font-medium text-[#1A1A1A]">{project.location}</div>
        </div>
      </div>
    </div>
  );
};
