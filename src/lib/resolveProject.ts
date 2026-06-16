import { Zap } from "lucide-react";
import { portfolioIconMap } from "./portfolioIcons";
import { sdgColors, sdgTitles } from "./sdgMeta";
import type { ProjectItem, ResolvedProject, ResolvedProjectWithCaseStudy, ResolvedSdg } from "../types/portfolio";

function resolveSdg(sdgNumber: string): ResolvedSdg {
  const num = Number(sdgNumber);
  return { id: num, color: sdgColors[num] ?? "#999999", label: sdgTitles[num] ?? `SDG ${num}` };
}

export function resolveProject(project: ProjectItem): ResolvedProject {
  return {
    id: project.projectId,
    name: project.name,
    sector: project.sector,
    sectorColor: project.sectorColor,
    location: project.location,
    status: project.status,
    description: project.description,
    image: project.image,
    metrics: project.metrics.map((m) => ({
      label: m.label,
      value: m.value,
      icon: portfolioIconMap[m.icon] ?? Zap,
    })),
    sdgs: project.sdgs.map((s) => resolveSdg(s.sdgNumber)),
  };
}

export function resolveProjectWithCaseStudy(project: ProjectItem): ResolvedProjectWithCaseStudy {
  return {
    ...resolveProject(project),
    caseStudy: {
      overview: project.caseStudy.overview.map((p) => p.text),
      challenge: {
        text: project.caseStudy.challenge.text.map((p) => p.text),
        quote: project.caseStudy.challenge.quote,
      },
      solution: project.caseStudy.solution.map((p) => p.text),
      impactMetrics: project.caseStudy.impactMetrics.map((m) => ({
        label: m.label,
        value: m.value,
        icon: portfolioIconMap[m.icon] ?? Zap,
        description: m.description,
        image: m.image,
        sdg: resolveSdg(m.sdgNumber),
      })),
      galleryImages: project.caseStudy.galleryImages.map((g) => g.url),
    },
  };
}
