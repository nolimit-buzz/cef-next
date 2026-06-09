"use client";
import  { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import {
  FileText,
  Download,
  Building2,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Search,
  ArrowUpRight
} from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import { cn } from "../lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const resourceCategories = [
  { id: "financial-reports", name: "Financial Reports" },
  { id: "esg-framework", name: "Impact & ESG Framework" },
  { id: "corporate-governance", name: "Corporate Governance" },
  { id: "policies-procedures", name: "Policies & Procedures" },
  { id: "press", name: "Press Releases" },
];

const resourceDocuments = [
  // Financial Reports
  {
    id: 1,
    title: "Annual Financial Results 2025",
    category: "financial-reports",
    date: "Dec 31, 2025",
    size: "4.2 MB",
    type: "PDF",
  },
  {
    id: 2,
    title: "Q3 2025 Investor Presentation",
    category: "financial-reports",
    date: "Oct 15, 2025",
    size: "2.8 MB",
    type: "PDF",
  },
  {
    id: 3,
    title: "Audited Financial Statements FY24",
    category: "financial-reports",
    date: "Mar 30, 2025",
    size: "5.1 MB",
    type: "PDF",
  },
  
  // Impact & ESG
  {
    id: 4,
    title: "Green Bond Framework 2025",
    category: "esg-framework",
    date: "Nov 01, 2025",
    size: "3.5 MB",
    type: "PDF",
  },
  {
    id: 5,
    title: "Environmental & Social Management System (ESMS)",
    category: "esg-framework",
    date: "Aug 20, 2025",
    size: "6.2 MB",
    type: "PDF",
  },
  {
    id: 6,
    title: "Annual Impact & ESG Report 2024",
    category: "esg-framework",
    date: "Apr 15, 2025",
    size: "8.4 MB",
    type: "PDF",
  },

  // Corporate Governance
  {
    id: 7,
    title: "Board of Directors Charter",
    category: "corporate-governance",
    date: "Jan 10, 2025",
    size: "1.2 MB",
    type: "PDF",
  },
  {
    id: 8,
    title: "Shareholders Agreement",
    category: "corporate-governance",
    date: "Feb 05, 2025",
    size: "2.1 MB",
    type: "PDF",
  },

  // Policies & Procedures
  {
    id: 9,
    title: "Anti-Money Laundering (AML) Policy",
    category: "policies-procedures",
    date: "Jun 12, 2025",
    size: "1.8 MB",
    type: "PDF",
  },
  {
    id: 10,
    title: "Code of Conduct & Ethics",
    category: "policies-procedures",
    date: "May 22, 2025",
    size: "1.5 MB",
    type: "PDF",
  },

  // Press
  {
    id: 11,
    title: "CEF Secures ₦15B in Series 2 Capital Raise",
    category: "press",
    date: "Oct 28, 2025",
    size: "800 KB",
    type: "PDF",
  },
  {
    id: 12,
    title: "Partnership Announcement with Global Green Growth Institute",
    category: "press",
    date: "Sep 14, 2025",
    size: "950 KB",
    type: "PDF",
  },
];

export const ResourcesPage = () => {
  return (
    <main className="bg-white">
      <HeroSection />
      <IntroductoryStatementSection />
      <DocumentLibrarySection />
    </main>
  );
};

const HeroSection = () => {
  return (
    <section className="relative bg-[var(--color-background)] flex flex-col border-b border-white/5 lg:h-screen lg:min-h-[700px] lg:max-h-[1080px]">
      {/* Top Tier: Split Hero */}
      <div className="flex flex-col lg:flex-row w-full lg:flex-1 pt-24 lg:pt-28">
        {/* Left Column: Dark Background */}
        <div className="w-full lg:w-[55%] bg-[var(--color-background)] flex flex-col justify-center px-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-12 py-12 lg:py-0 relative z-20">
          <div className="mb-8 hidden lg:block">
            <Breadcrumbs />
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full pr-4"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-3 mb-6 lg:mb-8 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full"
            >
              <span className="text-base text-[var(--color-accent-green)]">
                <FileText className="w-4 h-4" />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/90">
                Media Center & Resources
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[40px] md:text-5xl lg:text-[48px] xl:text-[52px] font-medium leading-[1.1] tracking-tight"
            >
              <span className="text-white">Institutional Documents</span>{" "}
              <br className="hidden lg:block" />
              <span className="text-white/50">
                Transparency & Insights.
              </span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Right Column: Image Background */}
        <div className="w-full lg:w-[45%] relative min-h-[40vh] lg:min-h-0 lg:h-full overflow-hidden">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-transparent z-10 lg:block hidden" />
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2913&auto=format&fit=crop"
            alt="Institutional Resources"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Bottom Tier: 3-Column Content Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 z-20 relative shrink-0">
        {/* Column 1: Sub-headline */}
        <div className="lg:col-span-2 bg-white p-8 lg:py-12 xl:py-14 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-12 border-t border-r border-gray-200 flex items-center">
          <motion.p 
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-[#0A1224] text-lg leading-relaxed font-light"
          >
            Access our comprehensive library of reports, frameworks, and governance documents. 
            We ensure radical transparency for all institutional stakeholders.
          </motion.p>
        </div>

        {/* Column 2: Brand Accent Block */}
        <div className="bg-[#0094da] p-8 lg:py-12 xl:py-14 lg:px-10 flex flex-col justify-center gap-6 border-t border-white/10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <Building2 className="w-8 h-8 text-white shrink-0" />
            <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug">Public Disclosures<br/>& Regulatory Compliance</span>
          </motion.div>
          <div className="w-full h-px bg-white/20" />
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <TrendingUp className="w-8 h-8 text-white shrink-0" />
            <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug">Investment Policies<br/>& Reports</span>
          </motion.div>
        </div>

        {/* Column 3: Light Block */}
        <div className="bg-[#50B848] p-8 lg:py-12 xl:py-14 lg:pr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pl-10 flex items-center border-t border-[#50B848]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <ShieldCheck className="w-10 h-10 text-white shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs xl:text-sm font-bold text-white/80 uppercase tracking-widest mb-1">Impact Validation</span>
              <span className="text-lg xl:text-xl font-bold text-white uppercase tracking-wide">ESG Frameworks</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const IntroductoryStatementSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white text-[#0A1224] relative z-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <h2 className="text-[32px] md:text-4xl lg:text-[40px] font-medium leading-[1.15] tracking-tight mb-8">
              <span className="text-[#0A1224]">Committed to</span><br/>
              <span className="text-gray-400">Radical Transparency.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light mb-10">
              As a responsible institutional platform, we provide open access to our core methodologies,
              financial performances, and operational policies. This centralized repository
              empowers our partners, investors, and stakeholders with the clear insights needed to
              evaluate our ongoing sustainable impact.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DocumentLibrarySection = () => {
  const pathname = usePathname();
  const location = typeof window !== 'undefined' ? window.location : { hash: '', pathname };
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedYear, setExpandedYear] = useState<string>("2025");

  useEffect(() => {
    if (location.hash) {
      const hashCategory = location.hash.replace('#', '');
      if (resourceCategories.some(c => c.id === hashCategory)) {
        setActiveCategory(hashCategory);
      }
    }
  }, [location.hash]);

  const filteredDocs = resourceDocuments.filter((doc) => {
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group financial docs by year for the accordion
  const financialDocs = filteredDocs.filter(d => d.category === "financial-reports");
  const otherDocs = filteredDocs.filter(d => d.category !== "financial-reports");

  // Grouping functional helper
  const groupByYear = (docs: typeof resourceDocuments) => {
    return docs.reduce((acc, doc) => {
      const year = doc.date.split(', ')[1] || doc.date.split(' ').pop() || "2025";
      if (!acc[year]) acc[year] = [];
      acc[year].push(doc);
      return acc;
    }, {} as Record<string, typeof resourceDocuments>);
  };

  const financialDocsByYear = groupByYear(financialDocs);
  const years = Object.keys(financialDocsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <section className="py-16 lg:py-24 bg-gray-50 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Sticky Nav / Filter */}
          <div className="lg:w-1/3 xl:w-1/4">
            <div className="sticky top-32">
              <div className="mb-6 relative">
                <input 
                  type="text" 
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#0A1224] transition-all"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>

              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">
                  Categories
                </h3>
                <nav className="flex flex-col gap-2">
                  <button
                    onClick={() => setActiveCategory("all")}
                    className={cn(
                      "text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      activeCategory === "all"
                        ? "bg-[#0A1224] text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    All Documents
                  </button>
                  {resourceCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        "text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                        activeCategory === category.id
                          ? "bg-[#0A1224] text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      {category.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Right Column: Asset Feed */}
          <div className="lg:w-2/3 xl:w-3/4">
            <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-2xl lg:text-3xl font-medium text-[#0A1224]">
                {activeCategory === "all" 
                  ? "All Documents" 
                  : resourceCategories.find(c => c.id === activeCategory)?.name}
              </h2>
              <span className="text-sm font-medium text-gray-500">
                {filteredDocs.length} {filteredDocs.length === 1 ? 'file' : 'files'}
              </span>
            </div>

            {filteredDocs.length > 0 ? (
              <div className="flex flex-col gap-10">
                
                {/* Financial Documents Accordion */}
                {(activeCategory === "all" || activeCategory === "financial-reports") && financialDocs.length > 0 && (
                  <div className="flex flex-col gap-4">
                    {activeCategory === "all" && <h3 className="text-lg font-medium text-gray-900 mb-2">Financial Reports</h3>}
                    {years.map((year) => (
                      <div key={year} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                        <button
                          onClick={() => setExpandedYear(expandedYear === year ? "" : year)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-xl font-medium text-[#0A1224]">{year} Financial Reports</span>
                          <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform", expandedYear === year && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                          {expandedYear === year && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden border-t border-gray-100"
                            >
                              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 bg-gray-50/50">
                                {financialDocsByYear[year].map((doc, index) => (
                                  <DocumentCard key={doc.id} doc={doc} delay={index * 0.05} />
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}

                {/* Other Documents Grid */}
                {otherDocs.length > 0 && (
                  <div className="flex flex-col gap-4">
                    {activeCategory === "all" && <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">Other Resources</h3>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                      {otherDocs.map((doc, index) => (
                        <DocumentCard key={doc.id} doc={doc} delay={index * 0.05} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-24 bg-white border border-gray-100 rounded-xl shadow-sm">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                <p className="text-gray-500">We couldn&apos;t find any documents matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const DocumentCard = ({ doc, delay }: { doc: any, delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.4 }}
      className="group bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all cursor-pointer relative flex flex-col h-full"
    >
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
         <ArrowUpRight className="w-5 h-5 text-[#0A1224]" />
      </div>
      
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-400 group-hover:text-white transition-colors group-hover:bg-[#0094da]">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1 block">
            {resourceCategories.find(c => c.id === doc.category)?.name}
          </span>
          <h4 className="text-[17px] font-medium text-[#0A1224] leading-snug pr-4">
            {doc.title}
          </h4>
        </div>
      </div>
      
      <div className="flex items-center gap-3 text-xs font-medium text-gray-400 mt-auto pt-4 border-t border-gray-50">
        <span>{doc.date}</span>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <span>{doc.size}</span>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <span className="uppercase text-[#0094da] font-bold">{doc.type}</span>
      </div>

      <a href={`/docs/${doc.id}`} download className="absolute inset-0 z-10" aria-label={`Download ${doc.title}`}></a>
    </motion.div>
  );
};
