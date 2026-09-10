"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import type { ProjectionFunction } from 'react-simple-maps';
import { geoIdentity } from 'd3-geo';
import Link from 'next/link';
import { ArrowUpRight, Layers, Sparkles, Globe2 } from 'lucide-react';

import { sdgColors, sdgTitles } from '../lib/sdgMeta';
import { resolveProject } from '../lib/resolveProject';
import type { StateItem, ProjectItem, ResolvedProject } from '../types/portfolio';

const geoUrl = "/nigeria-states.geojson";

// nigeria-states.geojson is plain lon/lat (EPSG:4326). A spherical d3
// projection (geoMercator etc.) applies antimeridian-crossing clip logic
// that corrupts several of this file's state outlines into huge stray
// artifacts, so we use a plain linear projection instead — visually
// indistinguishable from Mercator across Nigeria's ~10 degree span, and
// unaffected by that clipping step. scale/translate were fit to the file's
// actual lon/lat extent (min/max across all features, with ~12% padding).
//
// The installed react-simple-maps@3.0.0 passes a function `projection` prop
// straight through as the d3 projection instance (it does not call it as a
// factory), which is out of step with its @types package — hence the cast.
const nigeriaProjection = geoIdentity().reflectY(true).scale(54.9).translate([-76.9, 798.5]);
const nigeriaProjectionProp = nigeriaProjection as unknown as ProjectionFunction;

export interface SDGMapProps {
  states: StateItem[];
  projects: ProjectItem[];
}

export const SDGMap = ({ states, projects: rawProjects }: SDGMapProps) => {
  // Metric icons resolve to React components, which can't be passed as
  // server-component props to a client component — projects arrive raw and
  // are resolved here instead.
  const projects: ResolvedProject[] = useMemo(() => rawProjects.map(resolveProject), [rawProjects]);

  // states[0] is the seeded whole-country "Nigeria" aggregate entry. There's
  // no single "Nigeria" polygon in the states geojson (it's all sub-national),
  // so the aggregate is a non-geometric selection: when active, every
  // rendered state polygon highlights together instead of one specific shape.
  const aggregateName = states[0]?.stateName ?? null;

  const [activeRegion, setActiveRegion] = useState<string | null>(() => aggregateName);

  // Guards against states arriving after first render (e.g. if this ever
  // becomes client-fetched) without re-selecting the aggregate after a user
  // has deliberately clicked elsewhere. Mirrors the same pattern used by
  // NigeriaMap.tsx on the Portfolio page.
  const hasSeededActiveRegion = useRef(activeRegion !== null);
  useEffect(() => {
    if (hasSeededActiveRegion.current || !states.length) return;
    hasSeededActiveRegion.current = true;
    setActiveRegion(states[0].stateName);
  }, [states]);

  const handleRegionClick = (shapeName: string) => {
    setActiveRegion(activeRegion === shapeName ? aggregateName : shapeName);
  };

  const stateData: Record<string, { projects: ResolvedProject[]; description: string }> = {};
  for (const state of states) {
    stateData[state.stateName] = {
      description: state.description,
      projects: state.projectRefs
        .map((ref) => projects.find((p) => p.id === ref.projectId))
        .filter((p): p is ResolvedProject => Boolean(p)),
    };
  }

  const activeData = activeRegion ? stateData[activeRegion] : undefined;
  const activeSdgs = activeData
    ? Array.from(new Set(activeData.projects.flatMap((p) => p.sdgs.map((s) => s.id))))
    : [];

  // In the aggregate view, only highlight states that actually have a linked
  // project — the aggregate entry itself isn't a real shape on the map, so it
  // doesn't count.
  const statesWithData = new Set(
    states
      .filter((state) => state.stateName !== aggregateName && stateData[state.stateName]?.projects.length)
      .map((state) => state.stateName),
  );

  return (
    <section className="py-24 bg-[var(--color-background)] text-white relative z-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#6B80A6]">
                Global Impact
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-0 mt-4">
              <span className="text-white">SDG Alignment</span> <span className="text-white/60">Map</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] mt-4 max-w-2xl mx-auto">
              Explore our regional impact across Nigeria. Click a highlighted state to view its projects and SDG contributions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className="lg:col-span-2 bg-[#0A1224] rounded-lg p-4 border border-white/10 relative overflow-hidden h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
              <ComposableMap projection={nigeriaProjectionProp} width={800} height={600}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const shapeName = geo.properties.shapeName as string;
                      // The individually clicked state (not the non-geometric
                      // aggregate) gets its own blue "selected" color; every
                      // other state with data stays green regardless of what's
                      // currently selected.
                      const isIndividuallySelected = activeRegion === shapeName && shapeName !== aggregateName;
                      const hasData = statesWithData.has(shapeName);
                      const defaultFill = isIndividuallySelected
                        ? "var(--color-accent-light)"
                        : hasData
                          ? "var(--color-accent-green)"
                          : "#1E293B";
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          aria-label={shapeName}
                          onClick={() => handleRegionClick(shapeName)}
                          style={{
                            default: {
                              fill: defaultFill,
                              outline: "none",
                              stroke: "#334155",
                              strokeWidth: 0.5,
                              transition: "all 0.3s ease",
                              cursor: "pointer",
                            },
                            hover: {
                              fill: "var(--color-accent-light)",
                              outline: "none",
                              stroke: "#334155",
                              strokeWidth: 0.5,
                              cursor: "pointer",
                            },
                            pressed: {
                              fill: "var(--color-accent)",
                              outline: "none",
                              stroke: "#334155",
                              strokeWidth: 0.5,
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>

              {/* Map Overlay Info — doubles as a reset-to-aggregate control */}
              <button
                type="button"
                onClick={() => aggregateName && setActiveRegion(aggregateName)}
                disabled={!aggregateName || activeRegion === aggregateName}
                className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-4 flex items-center gap-3 transition-colors enabled:hover:bg-black/60 disabled:cursor-default"
              >
                <div className="w-3 h-3 rounded-full bg-[var(--color-accent-green)] animate-pulse" />
                <span className="text-sm font-medium text-white">
                  Active Region: {activeRegion ?? "None"}
                </span>
              </button>
            </motion.div>

            <div className="lg:col-span-1 flex flex-col gap-4 h-full">
              <AnimatePresence mode="wait">
                {activeData && activeData.projects.length > 0 ? (
                  <motion.div
                    key={`region-${activeRegion}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-6 bg-[#0A1224] border border-white/10 rounded-lg p-8 h-full"
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300/60 mb-2">
                        Regional Overview
                      </div>
                      <h3 className="text-3xl font-light text-white mb-4">{activeRegion}</h3>
                      <p className="text-white/60 text-sm leading-relaxed mb-6">{activeData.description}</p>

                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                          <Layers className="w-5 h-5 text-[var(--color-accent-light)] mb-2" />
                          <div className="text-xl font-medium text-white mb-1">{activeData.projects.length}</div>
                          <div className="text-[10px] uppercase tracking-wider text-white/40">Projects</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/5">
                          <Sparkles className="w-5 h-5 text-[var(--color-accent-green)] mb-2" />
                          <div className="text-xl font-medium text-white mb-1">{activeSdgs.length}</div>
                          <div className="text-[10px] uppercase tracking-wider text-white/40">SDGs Addressed</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-grow overflow-y-auto">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
                        Projects in this Region
                      </div>
                      <div className="flex flex-col gap-3 mb-6">
                        {activeData.projects.map((proj) => (
                          <Link
                            key={proj.id}
                            href={`/portfolio/${proj.id}`}
                            className="block p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <span className="text-[10px] font-bold text-[var(--color-accent-green)] uppercase tracking-tight">{proj.sector}</span>
                                <div className="text-sm font-medium text-white mt-1">{proj.name}</div>
                              </div>
                              <ArrowUpRight className="w-4 h-4 text-white/40 shrink-0" />
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
                        Primary SDG Contributions
                      </div>
                      <div className="flex flex-col gap-3">
                        {activeSdgs.map((sdgId, idx) => (
                          <motion.div
                            key={sdgId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                          >
                            <div
                              className="w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs shadow-lg shrink-0"
                              style={{ backgroundColor: sdgColors[sdgId] ?? "#999999", color: sdgId === 7 ? 'black' : 'white' }}
                            >
                              {sdgId}
                            </div>
                            <span className="text-sm font-medium text-white/80">{sdgTitles[sdgId] ?? `SDG ${sdgId}`}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-6 border-t border-white/10">
                      <a href="/portfolio" className="flex items-center justify-between group cursor-pointer">
                        <span className="text-sm font-medium text-white group-hover:text-blue-200 transition-colors">View Regional Projects</span>
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform group-hover:scale-110">
                          <ArrowUpRight className="w-5 h-5 text-[#0A1224]" />
                        </div>
                      </a>
                    </div>
                  </motion.div>
                ) : activeData ? (
                  <motion.div
                    key={`region-empty-${activeRegion}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-[600px] flex flex-col items-center justify-center text-center p-8 bg-[#0A1224] border border-white/10 rounded-lg"
                  >
                    <h3 className="text-xl font-medium text-white mb-2">{activeRegion}</h3>
                    <p className="text-white/50 text-sm max-w-[280px] mb-2">{activeData.description}</p>
                    <p className="text-white/30 text-xs max-w-[250px]">No projects are currently linked to this state.</p>
                  </motion.div>
                ) : activeRegion ? (
                  <motion.div
                    key={`region-unknown-${activeRegion}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-[600px] flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/20 rounded-lg bg-[#0A1224]"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                      <Globe2 className="w-8 h-8 text-white/20" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">{activeRegion}</h3>
                    <p className="text-white/50 text-sm max-w-[260px]">
                      No project data yet for {activeRegion}.{aggregateName ? " View the aggregate Nigeria overview or explore other highlighted states." : ""}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-[600px] flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/20 rounded-lg bg-[#0A1224]"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                      <Globe2 className="w-8 h-8 text-white/20" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">Select a Region</h3>
                    <p className="text-white/50 text-sm max-w-[250px]">Click on highlighted regions on the map to view detailed institutional metrics and SDG alignment data.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
