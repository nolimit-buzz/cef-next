"use client";
import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import Link from "next/link";
import { ArrowUpRight } from 'lucide-react';

import { portfolioData } from '../data/projects';

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// Project interface for map interaction
interface Project {
  id: string;
  name: string;
  sector: string;
  description: string;
  sdgs: { id: number; color: string; label: string; }[];
}

// Data mapping states to projects
const stateData: Record<string, { projects: Project[], description: string }> = {
  "Nigeria": {
    projects: portfolioData,
    description: "Driving clean energy transition across Nigeria — from solar installations to sustainable mobility and industrial decarbonization."
  },
  "Lagos": { 
    projects: [portfolioData[0]], 
    description: "Hub for sustainable urban mobility and clean transport infrastructure." 
  },
  "Kano": { 
    projects: [portfolioData[1]], 
    description: "Industrial renewable energy projects supporting manufacturing and local production." 
  },
  "Rivers": { 
    projects: [portfolioData[2]], 
    description: "Clean energy transition for maritime and industrial operations." 
  },
  "Abuja Federal Capital Territory": { 
    projects: [portfolioData[4]], 
    description: "Strategic commercial solar installations and energy efficiency in the capital." 
  },
  "Oyo": { 
    projects: [portfolioData[3]], 
    description: "Solar-powered agricultural processing and resilient rural energy systems." 
  },
  "Kaduna": { 
    projects: [portfolioData[2]], 
    description: "Expanding telecommunications connectivity through hybrid renewable power." 
  },
  "Ogun": {
    projects: [portfolioData[0]],
    description: "Logistics and e-mobility corridor support for cross-state transit."
  }
};

const sdgColors: Record<number, string> = {
  7: "#FCC30B", // Affordable and Clean Energy
  8: "#A21942", // Decent Work and Economic Growth
  9: "#FD6925", // Industry, Innovation and Infrastructure
  11: "#FD9D24", // Sustainable Cities and Communities
  13: "#3F7E44", // Climate Action
  1: "#E5243B", // No Poverty
  2: "#DDA63A", // Zero Hunger
};

const sdgTitles: Record<number, string> = {
  7: "Affordable & Clean Energy",
  8: "Decent Work & Economic Growth",
  9: "Industry, Innovation & Infrastructure",
  11: "Sustainable Cities & Communities",
  13: "Climate Action",
  1: "No Poverty",
  2: "Zero Hunger",
};

export const NigeriaMap = () => {
  const [activeState, setActiveState] = useState<string | null>(null);

  const handleStateClick = (stateName: string) => {
    setActiveState(activeState === stateName ? null : stateName);
  };

  const activeData = activeState && stateData[activeState] ? stateData[activeState] : null;

  return (
    <section className="py-24 bg-[var(--color-background)] text-white relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              National Impact Footprint
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-4">
            <span className="text-white">Driving Impact Across</span> <span className="text-white/40">Nigeria</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
            Interactive visualization of our project locations and their specific alignment to the Sustainable Development Goals per state.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Map Container */}
          <div className="w-full lg:w-2/3 relative h-[400px] md:h-[500px] lg:h-[600px]">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 2500, center: [8, 9] }}
              width={800}
              height={600}
              style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isNigeria = geo.properties.name === "Nigeria";
                    const isActive = activeState === "Nigeria" && isNigeria;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => { if (isNigeria) handleStateClick("Nigeria"); }}
                        style={{
                          default: {
                            fill: isActive ? "var(--color-accent-green)" : isNigeria ? "#1E3A8A" : "#0B1426",
                            outline: "none",
                            stroke: "rgba(255,255,255,0.1)",
                            strokeWidth: 0.5,
                            transition: "all 0.3s ease",
                            cursor: isNigeria ? "pointer" : "default",
                          },
                          hover: {
                            fill: isNigeria ? "var(--color-accent)" : "#0B1426",
                            outline: "none",
                            stroke: "rgba(255,255,255,0.2)",
                            strokeWidth: 0.5,
                            cursor: isNigeria ? "pointer" : "default",
                          },
                          pressed: { fill: "var(--color-accent-green)", outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
            <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-4 pointer-events-none">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#1E3A8A] animate-pulse" />
                <span className="text-sm font-medium text-white">Active Region: Nigeria</span>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-white/5 backdrop-blur-md p-2 rounded text-[10px] text-white/50 border border-white/10">
              API Connected: <span className="text-green-500 font-bold">LIVE</span>
            </div>
          </div>

          {/* Data Panel */}
          <div className="w-full lg:w-1/3 z-10">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 h-full sticky top-24 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                {activeState ? (
                  <motion.div
                    key="state-data"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-1">{activeState} State</h3>
                    <div className="text-sm font-medium text-[var(--color-accent-green)] mb-6">Regional Impact Profile</div>
                    
                    {activeData ? (
                      <div className="space-y-8">
                        <div>
                          <p className="text-white/70 leading-relaxed mb-6">
                            {activeData.description}
                          </p>
                          <div className="space-y-6">
                            <h4 className="text-xs font-bold text-white uppercase tracking-widest border-l-2 border-[var(--color-accent-green)] pl-3">
                              Current Projects ({activeData.projects.length})
                            </h4>
                            {activeData.projects.map((proj, idx) => (
                              <div key={idx} className="bg-white/5 rounded-lg p-5 border border-white/10 group">
                                <Link href={`/portfolio/${proj.id}`} className="block">
                                  <div className="flex justify-between items-start mb-3">
                                    <span className="text-[10px] font-bold text-[var(--color-accent-green)] uppercase tracking-tight">{proj.sector}</span>
                                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <ArrowUpRight className="w-4 h-4 text-white/50" />
                                    </div>
                                  </div>
                                  <h5 className="text-lg font-medium text-white mb-2">{proj.name}</h5>
                                  <p className="text-sm text-white/60 line-clamp-2 leading-relaxed mb-4">
                                    {proj.description}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {proj.sdgs.map(sdg => (
                                      <div key={sdg.id} className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white shadow-sm" style={{ backgroundColor: sdg.color, color: sdg.id === 7 ? 'black' : 'white' }}>
                                        {sdg.id}
                                      </div>
                                    ))}
                                  </div>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-widest border-l-2 border-white/20 pl-3 mb-4">
                            Aggregated SDG Impact
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {Array.from(new Set(activeData.projects.flatMap(p => p.sdgs.map(s => s.id)))).map(sdgId => (
                              <div key={sdgId} className="flex items-center gap-2 bg-white/5 p-2 rounded border border-white/10">
                                <div 
                                  className="w-6 h-6 rounded shrink-0 flex items-center justify-center text-[9px] font-bold shadow-sm"
                                  style={{ backgroundColor: sdgColors[sdgId], color: sdgId === 7 ? 'black' : 'white' }}
                                >
                                  {sdgId}
                                </div>
                                <span className="text-[10px] font-medium text-white/70 truncate">{sdgTitles[sdgId]}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-8 text-center text-white/50">
                        <p>No active operational projects in this state currently.</p>
                        <p className="text-sm mt-2 text-white/40">Future pipeline under evaluation.</p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center text-white/50 py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-4 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-white mb-2">Select a State</p>
                    <p className="text-sm text-white/50 leading-relaxed max-w-[200px] mx-auto">
                      Click on any highlighted state on the map to view regional project impact and specific SDG contributions.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
