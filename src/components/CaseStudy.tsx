"use client";
import { useEffect, useState, useRef } from 'react';
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, Layers, Zap, DollarSign, Leaf, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, redirect } from "next/navigation";

import Link from "next/link";
import { portfolioData } from '../data/projects';
import Breadcrumbs from './Breadcrumbs';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const sections = ['Overview', 'The Challenge', 'Our Solution', 'Impact Metrics', 'Gallery'];

export const CaseStudy = () => {
  const params = useParams() as { id?: string };
  const id = params?.id;
  const [activeSection, setActiveSection] = useState('overview');
  const galleryRef = useRef<HTMLDivElement>(null);

  const project = portfolioData.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const observers = new Map();
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      rootMargin: '-150px 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const sectionId = section.toLowerCase().replace(' ', '-');
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
        observers.set(sectionId, element);
      }
    });

    return () => {
      observers.forEach((element) => observer.unobserve(element));
    };
  }, [id]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = galleryRef.current.clientWidth * 0.8;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!project) {
    if (typeof window !== "undefined") window.location.href = "/"; return null;
  }

  // Fallback data if caseStudy details are not fully populated in projects.ts
  const overviewText = project.caseStudy?.overview || [
    project.description,
    "Their integrated approach not only reduces carbon emissions but also significantly lowers operating costs, creating a tangible economic and environmental impact."
  ];

  const challengeText = project.caseStudy?.challenge?.text || [
    "Nigeria's infrastructure sectors are heavily reliant on expensive and polluting fossil fuels, which contribute significantly to urban air pollution.",
    "The primary hurdle for this project was securing the upfront capital expenditure required to scale their infrastructure simultaneously, a capital-intensive endeavor that traditional commercial banks view as high-risk."
  ];

  const challengeQuote = project.caseStudy?.challenge?.quote || "The transition to clean energy requires more than just technology; it demands a reliable, ubiquitous infrastructure that eliminates risk for commercial operators.";

  const solutionText = project.caseStudy?.solution || [
    "We structured a local currency financing facility that provided the long-term capital needed to aggressively expand their network without exposure to foreign exchange volatility.",
    "By utilizing a blended finance approach, we integrated a partial credit guarantee. This de-risked the transaction sufficiently to attract local pension funds.",
    "The facility also incorporated a technical assistance grant to support the development of proprietary management software, ensuring optimal operations."
  ];

  const impactMetrics = project.caseStudy?.impactMetrics || project.metrics.map(m => ({
    label: m.label,
    value: m.value,
    icon: m.icon,
    description: `Key metric demonstrating the impact of ${m.label.toLowerCase()}.`,
    image: project.image,
    sdg: project.sdgs[0] || { id: 7, color: '#FCC30B', label: 'Affordable and Clean Energy' }
  }));

  const galleryImages = project.caseStudy?.galleryImages || [
    project.image,
    "https://images.unsplash.com/photo-1620800647868-81d9f8260401?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop"
  ];

  const otherProjects = portfolioData.filter(p => p.id !== id).slice(0, 2);

  return (
    <div className="bg-white text-[#1A1A1A] min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-[var(--color-background)] overflow-hidden min-h-[50vh] flex flex-col justify-center border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src={project.image} 
            alt="Project Hero" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <Breadcrumbs />
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end"
          >
            <motion.div variants={fadeUp} className="lg:col-span-8">
              <span 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-6 border"
                style={{ 
                  backgroundColor: `${project.sectorColor || 'var(--color-accent)'}1A`, 
                  borderColor: project.sectorColor || 'var(--color-accent)',
                  color: project.sectorColor || 'var(--color-accent)'
                }}
              >
                {project.sector}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-6 text-white max-w-4xl">
                {project.name}
              </h1>
              <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
                {project.description}
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="lg:col-span-4 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                {project.metrics.slice(0, 4).map((metric, idx) => {
                  const Icon = metric.icon;
                  return (
                    <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl flex flex-col items-start">
                      <Icon className="w-4 h-4 text-[var(--color-accent-light)] mb-2" />
                      <div className="text-xl font-light text-white mb-1">{metric.value}</div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-white/50">{metric.label}</div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 block mb-3">
                  SDG Alignment
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.sdgs.map((sdg) => (
                    <div 
                      key={sdg.id} 
                      className="group/sdg relative flex items-center gap-1.5 px-2 py-1 rounded-full border cursor-default"
                      style={{ backgroundColor: `${sdg.color}1A`, borderColor: `${sdg.color}33` }}
                    >
                      <div 
                        className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                        style={{ backgroundColor: sdg.color, color: sdg.id === 7 ? 'black' : 'white' }}
                      >
                        {sdg.id}
                      </div>
                      <span className="text-[10px] font-medium" style={{ color: sdg.color }}>SDG {sdg.id}</span>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover/sdg:opacity-100 transition-all duration-300 pointer-events-none w-max max-w-[200px] text-center shadow-xl scale-95 group-hover/sdg:scale-100 z-50">
                        {sdg.label}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1A1A1A]/90" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
          
          {/* Left Column: Sticky Sidebar (~25%) */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50 mb-8">Contents</h3>
              <nav className="relative flex flex-col gap-6 pl-5">
                {/* Continuous thin line */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#1A1A1A]/10" />
                
                {sections.map((item) => {
                  const sectionId = item.toLowerCase().replace(' ', '-');
                  const isActive = activeSection === sectionId;
                  return (
                    <div key={item} className="relative">
                      {isActive && (
                        <motion.div 
                          layoutId="activeSidebarLine"
                          className="absolute -left-[21px] top-0 bottom-0 w-[3px] bg-[var(--color-accent)] rounded-r-full" 
                        />
                      )}
                      <a 
                        href={`#${sectionId}`}
                        onClick={(e) => handleScroll(e, sectionId)}
                        className={`text-[15px] font-medium transition-colors hover:text-[var(--color-accent)] ${isActive ? 'text-[var(--color-accent)]' : 'text-[#1A1A1A]/60'}`}
                      >
                        {item}
                      </a>
                    </div>
                  );
                })}
              </nav>

              {/* Project Details Card */}
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
            </div>
          </div>

          {/* Mobile Horizontal Menu */}
          <div className="lg:hidden sticky top-20 z-40 bg-white/90 backdrop-blur-md py-4 -mx-6 px-6 sm:px-0 sm:mx-0 border-b border-[#1A1A1A]/10 overflow-x-auto whitespace-nowrap no-scrollbar">
            <nav className="flex gap-6">
              {sections.map((item) => {
                const sectionId = item.toLowerCase().replace(' ', '-');
                const isActive = activeSection === sectionId;
                return (
                  <a 
                    key={item} 
                    href={`#${sectionId}`}
                    onClick={(e) => handleScroll(e, sectionId)}
                    className={`text-sm font-medium transition-colors hover:text-[var(--color-accent)] ${isActive ? 'text-[var(--color-accent)]' : 'text-[#1A1A1A]/60'}`}
                  >
                    {item}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Right Column: Scrollable Content (~75%) */}
          <div className="lg:col-span-9 flex flex-col gap-32">
            
            {/* Overview */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={staggerContainer}
              id="overview"
              className="scroll-mt-32"
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight mb-8">
                <span className="text-slate-900">Project </span>
                <span className="text-slate-400">Overview</span>
              </motion.h2>
              <motion.div variants={fadeUp}>
                {overviewText.map((paragraph, idx) => (
                  <p key={idx} className="text-slate-600 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            </motion.section>

            {/* The Challenge */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={staggerContainer}
              id="the-challenge"
              className="scroll-mt-32"
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight mb-8">
                <span className="text-slate-900">The </span>
                <span className="text-slate-400">Challenge</span>
              </motion.h2>
              <motion.div variants={fadeUp}>
                {challengeText.map((paragraph, idx) => {
                  if (idx === 1) {
                    return (
                      <React.Fragment key={idx}>
                        <blockquote className="border-l-[3px] border-[var(--color-accent)] pl-8 py-2 my-12 text-2xl md:text-3xl font-light text-slate-900 italic leading-snug">
                          &quot;{challengeQuote}&quot;
                        </blockquote>
                        <p className="text-slate-600 leading-relaxed mb-6">
                          {paragraph}
                        </p>
                      </React.Fragment>
                    );
                  }
                  return (
                    <p key={idx} className="text-slate-600 leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  );
                })}
              </motion.div>
            </motion.section>

            {/* Our Solution */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={staggerContainer}
              id="our-solution"
              className="scroll-mt-32"
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight mb-8">
                <span className="text-slate-900">Our </span>
                <span className="text-slate-400">Solution</span>
              </motion.h2>
              <motion.div variants={fadeUp}>
                {solutionText.map((paragraph, idx) => (
                  <p key={idx} className="text-slate-600 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <motion.div variants={fadeUp} className="bg-[#F8FAFC] p-8 rounded-lg border border-slate-200">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                    <Layers className="w-5 h-5 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="text-xl font-medium mb-3 text-slate-900">Infrastructure Scaling</h3>
                  <p className="text-slate-600 leading-relaxed mb-8">
                    Financed the deployment of new infrastructure across key commercial nodes, ensuring optimal coverage.
                  </p>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1620800647868-81d9f8260401?q=80&w=800&auto=format&fit=crop" alt="Infrastructure" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="bg-white text-slate-900 p-8 rounded-lg flex flex-col justify-between relative overflow-hidden border border-slate-200">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-green)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                      <Zap className="w-5 h-5 text-[var(--color-accent-green)]" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">Capacity Expansion</h3>
                    <p className="text-slate-600 leading-relaxed mb-8">
                      Enabled the procurement of additional assets, directly leased to verified partners through an innovative model.
                    </p>
                  </div>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden relative z-10">
                    <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop" alt="Capacity" className="w-full h-full object-cover opacity-90" referrerPolicy="no-referrer" />
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* Impact Metrics & SDG Alignment (Dark Section) */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={staggerContainer}
              id="impact-metrics"
              className="scroll-mt-32 bg-[var(--color-surface)] rounded-lg p-8 md:p-12 lg:p-16 relative overflow-hidden border border-white/5"
            >
              {/* Background Glows */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-lg">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-accent)]/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--color-accent-green)]/10 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <motion.h2 variants={fadeUp} className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight mb-12">
                  <span className="text-white">Impact </span>
                  <span className="text-[var(--color-text-secondary)]">Metrics</span>
                </motion.h2>
                
                {/* Metrics Grid */}
                <motion.div 
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {impactMetrics.map((metric, idx) => (
                    <motion.div 
                      key={idx} 
                      variants={itemVariants}
                      whileHover={{ y: -8 }}
                      className="relative overflow-hidden group transition-all duration-500 shadow-xl rounded-lg border border-white/10 bg-white/5 h-full flex flex-col p-8"
                    >
                      {/* Hover Image Background */}
                      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <img 
                          src={metric.image} 
                          alt={metric.label} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40 mix-blend-luminosity"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-[var(--color-accent)]/60 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent" />
                      </div>

                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-12">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-[var(--color-accent)]/20 group-hover:border-[var(--color-accent)]/30 transition-colors duration-500"
                          >
                            <metric.icon className="w-5 h-5 text-white/70 group-hover:text-[var(--color-accent-light)] transition-colors duration-500" />
                          </motion.div>
                          
                          {/* Inline SDG */}
                          <div 
                            className="flex items-center gap-1.5 px-2 py-1 rounded-full border cursor-default"
                            style={{ backgroundColor: `${metric.sdg.color}1A`, borderColor: `${metric.sdg.color}33` }}
                          >
                            <div 
                              className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                              style={{ backgroundColor: metric.sdg.color, color: metric.sdg.id === 7 ? 'black' : 'white' }}
                            >
                              {metric.sdg.id}
                            </div>
                            <span className="text-[10px] font-medium" style={{ color: metric.sdg.color }}>SDG {metric.sdg.id}</span>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <div className="text-4xl md:text-5xl font-light mb-4 text-white tracking-tight group-hover:text-white transition-colors duration-500">{metric.value}</div>
                          <div className="text-sm font-medium text-white/90 mb-2">{metric.label}</div>
                          <div className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-500">{metric.description}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.section>

            {/* Gallery Slider */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={staggerContainer}
              id="gallery"
              className="scroll-mt-32"
            >
              <div className="flex items-center justify-between mb-8">
                <motion.h2 variants={fadeUp} className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight">
                  <span className="text-slate-900">Project </span>
                  <span className="text-slate-400">Gallery</span>
                </motion.h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => scrollGallery('left')}
                    className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-slate-200 text-slate-900 flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => scrollGallery('right')}
                    className="w-10 h-10 rounded-full bg-[#F8FAFC] border border-slate-200 text-slate-900 flex items-center justify-center hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div 
                ref={galleryRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 no-scrollbar px-6 -mx-6 sm:px-0 sm:mx-0"
              >
                {galleryImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="min-w-[85%] md:min-w-[60%] lg:min-w-[45%] snap-center rounded-lg overflow-hidden aspect-video relative border border-slate-200"
                  >
                    <img 
                      src={img} 
                      className="object-cover w-full h-full" 
                      alt={`Gallery image ${idx + 1}`}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Other Projects */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={staggerContainer}
              className="mt-12 mb-12"
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-[42px] font-medium leading-[1.15] tracking-tight mb-8">
                <span className="text-slate-900">Other </span>
                <span className="text-slate-400">Projects</span>
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherProjects.map((otherProject, idx) => (
                  <Link href={`/portfolio/${otherProject.id}`} key={idx} onClick={() => window.scrollTo(0,0)}>
                    <motion.div 
                      variants={fadeUp}
                      whileHover={{ y: -5 }}
                      className="group relative h-[300px] rounded-lg overflow-hidden bg-white cursor-pointer border border-slate-200"
                    >
                      <img 
                        src={otherProject.image} 
                        alt={otherProject.name} 
                        className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute bottom-8 left-8 right-8">
                        <span 
                          className="px-2 py-1 text-[10px] font-bold rounded-full text-white shadow-lg mb-3 inline-block"
                          style={{ backgroundColor: otherProject.sectorColor || 'var(--color-accent)' }}
                        >
                          {otherProject.sector}
                        </span>
                        <h4 className="text-2xl font-medium text-white flex items-center justify-between">
                          {otherProject.name}
                          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-all">
                            <ArrowUpRight className="w-5 h-5" />
                          </div>
                        </h4>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.section>

            {/* Next Project CTA */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              variants={fadeUp}
              className="mt-12 bg-[var(--color-surface)] rounded-lg p-12 md:p-20 text-center relative overflow-hidden border border-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 to-transparent" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Ready to scale your impact?</h2>
                <p className="text-[var(--color-text-secondary)] mb-10 max-w-xl mx-auto text-lg">
                  Discover how our local currency financing can accelerate your transition to clean energy.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/portfolio" className="bg-[var(--color-accent-green)] text-white hover:bg-[var(--color-accent)] px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300">
                    View All Case Studies <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <a href="mailto:contact@example.com" className="bg-white/10 text-white hover:bg-white/20 px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
                    Contact Our Team
                  </a>
                </div>
              </div>
            </motion.section>

          </div>
        </div>
      </div>
    </div>
  );
};

