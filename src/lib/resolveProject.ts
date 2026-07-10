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
    image: project.image ?? "",
    metrics: project.metrics.map((m) => ({
      label: m.label,
      value: m.value,
      icon: portfolioIconMap[m.icon] ?? Zap,
    })),
    sdgs: project.sdgs.map((s) => resolveSdg(s.sdgNumber)),
  };
}

export function resolveProjectWithCaseStudy(project: ProjectItem): ResolvedProjectWithCaseStudy {
  // caseStudy (and its challenge) are optional components in the CMS — fall
  // back to empty content rather than crashing the page when absent.
  const caseStudy = project.caseStudy;
  return {
    ...resolveProject(project),
    caseStudy: {
      overview: (caseStudy?.overview ?? []).map((p) => p.text),
      challenge: {
        text: (caseStudy?.challenge?.text ?? []).map((p) => p.text),
        quote: caseStudy?.challenge?.quote ?? "",
      },
      solution: (caseStudy?.solution ?? []).map((p) => p.text),
      impactMetrics: (caseStudy?.impactMetrics ?? []).map((m) => ({
        label: m.label,
        value: m.value,
        icon: portfolioIconMap[m.icon] ?? Zap,
        description: m.description,
        image: m.image ?? "",
        sdg: resolveSdg(m.sdgNumber),
      })),
      galleryImages: (caseStudy?.galleryImages ?? []).map((g) => g.url ?? ""),
    },
  };
}
