"use client";
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValueEvent } from 'framer-motion';
import { ArrowUpRight, Sun, ShieldCheck, Users, Globe2, Zap, Building2, Coins, TrendingUp, Leaf } from 'lucide-react';
import { CountUp } from './CountUp';
import type { AboutFundSection, ApproachSection } from '../types/home';
import type { PartnerItem } from '../types/global';
import { getCtaHref } from '../lib/strapi';
import { PartnerMarquee, toMarqueePartners } from './PartnerMarquee';

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

// Words are animated individually, so each one is its own span. The container
// must NOT be a flex row: flexbox discards whitespace-only text nodes between
// items, which left the words visually run together whenever the `gap-x`
// utility failed to apply, and always broke copy/paste and screen-reader
// output. Normal inline flow with real spaces keeps the text intact.
const TextReveal = ({ text }: { text: string }) => {
  const words = text.split(' ');
  return (
    <div>
      {words.map((word, i) => (
        <span key={i}>
          {i > 0 ? ' ' : null}
          <motion.span
            initial={{ opacity: 0.1, y: 2 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.4, delay: i * 0.015, ease: "easeOut" as const }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

const FocusCard = ({ icon: Icon, headline, statement, proof, tags, isWide = false, image = null, accentColor = "var(--color-accent-green)", tooltipText, children, forceHover = false }: {
  icon: any,
  headline: string,
  statement?: string,
  proof?: string,
  tags?: string[],
  isWide?: boolean,
  image?: string | null,
  accentColor?: string,
  tooltipText?: string,
  children?: React.ReactNode,
  forceHover?: boolean
}) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -8 }}
    className={`relative overflow-hidden group transition-all duration-500 shadow-2xl rounded-lg border bg-[var(--color-surface)] border-blue-500/20 ${isWide ? "md:col-span-2" : "col-span-1"} h-full flex flex-col p-8`}
  >
    {image && (
      <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${forceHover ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <img
          src={image}
          alt={headline}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 opacity-40 mix-blend-luminosity ${forceHover ? 'scale-105' : 'group-hover:scale-105'}`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[rgb(0,133,202)]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent" />
      </div>
    )}

    <div className="relative z-10 flex flex-col h-full">
      {/* Visual Anchor */}
      <div className="relative w-max mb-8">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center border transition-all duration-500 ${forceHover ? 'bg-[var(--color-accent-green)]/20 border-[var(--color-accent-green)]/30' : 'bg-[var(--color-accent-green)]/5 border-[var(--color-accent-green)]/10 group-hover:bg-[var(--color-accent-green)]/20 group-hover:border-[var(--color-accent-green)]/30'}`}
        >
          <Icon
            className={`w-6 h-6 transition-all duration-500 text-[var(--color-accent-green)] ${forceHover ? 'scale-110' : 'group-hover:scale-110'}`}
          />
        </div>
      </div>

      {/* Headline */}
      <span className={`text-[10px] font-medium uppercase tracking-[0.4em] mb-4 block transition-colors duration-500 ${forceHover ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-secondary)]'}`}>
        {headline}
      </span>

      {/* Impact Statement */}
      {children ? children : (
        <h3 className={`leading-tight mb-auto transition-colors duration-500 ${isWide ? "text-3xl font-medium max-w-md" : "text-[18px] font-light"} ${forceHover ? 'text-white' : 'group-hover:text-white'}`}>
          {statement}
        </h3>
      )}

      {/* Footer */}
      {(proof || tags) && (
        <div className="mt-12 flex items-center justify-between gap-4">
          {proof && (
            <div
              className={`border px-5 py-2 rounded-full transition-all duration-500 bg-[var(--color-accent-green)]/10 border-[var(--color-accent-green)]/20 ${forceHover ? 'scale-105' : 'group-hover:scale-105'}`}
            >
              <span className="text-xs font-bold tracking-tight text-[var(--color-accent-green)]">
                {proof}
              </span>
            </div>
          )}

          {tags && (
            <div className="flex gap-3">
              {tags.map(tag => (
                <span key={tag} className={`text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-widest transition-opacity duration-500 ${forceHover ? 'opacity-80' : 'opacity-40 group-hover:opacity-80'}`}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  </motion.div>
);

const StickyCard = ({ item, i, isLast, setLastActive }: { key?: React.Key, item: any, i: number, isLast: boolean, setLastActive: (v: boolean) => void }) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start 65%", "start 130px"]
  });
  const [isActive, setIsActive] = useState(i === 0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const active = i === 0 ? true : latest > 0;
    if (isActive !== active) {
      setIsActive(active);
      if (isLast) setLastActive(active);
    }
  });

  const Icon = item.icon;

  return (
    <div className="relative">
      <div ref={triggerRef} className="absolute top-0 w-full h-px pointer-events-none" />
      <div
        className={`sticky top-32 bg-white pt-8 pb-12 min-h-[30vh] flex flex-col justify-start overflow-hidden -mx-6 px-6 sm:mx-0 sm:px-8 transition-all duration-500 border border-slate-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-[var(--card-color)] ${isActive ? 'opacity-100' : 'opacity-[0.15]'}`}
        style={{
          zIndex: i + 10,
          '--card-color': `rgba(${item.color}, 0.5)`
        } as React.CSSProperties}
      >
        {/* Gradient corner */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at top right, rgba(${item.color}, 0.15) 0%, transparent 60%)` }}
        />

        {/* Faded Background Icon */}
        {Icon && (
          <div
            className="absolute -bottom-12 -left-12 pointer-events-none z-0 transition-opacity duration-1000"
            style={{
              color: `rgba(${item.color}, 1)`,
              opacity: 0.15,
              maskImage: 'linear-gradient(to top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
              WebkitMaskImage: 'linear-gradient(to top right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
              transform: 'rotate(-15deg)'
            }}
          >
            <Icon className="w-64 h-64" strokeWidth={2} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <h4 className="text-2xl font-medium text-slate-900 max-w-[220px] leading-tight">
            {item.title.split(" ").map((word: string, idx: number) => (
              <span key={idx}>
                {idx > 0 ? ' ' : null}
                <motion.span
                  initial={{ opacity: 0.1, y: 10 }}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.1, y: 10 }}
                  transition={{ duration: 0.5, delay: isActive ? idx * 0.08 : 0, ease: [0.16, 1, 0.3, 1] as const }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h4>
          <div className={`text-slate-600 font-light leading-relaxed text-lg transition-all duration-700 ${isActive ? 'opacity-100 blur-none translate-y-0' : 'opacity-0 blur-[2px] translate-y-4'}`}>
            {item.content}
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineStep = ({ item, i, isLast, setLastActive }: { key?: React.Key, item: any, i: number, isLast: boolean, setLastActive?: (v: boolean) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 30%"]
  });

  const [status, setStatus] = useState<'upcoming' | 'active' | 'past'>(i === 0 ? 'active' : 'upcoming');

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (i === 0 && latest < 0.1) {
      setStatus('active');
    } else if (latest < 0.1) {
      setStatus('upcoming');
    } else if (latest > 0.8 && !isLast) {
      setStatus('past');
    } else {
      setStatus('active');
    }

    if (isLast && setLastActive) {
      setLastActive(latest > 0.65);
    }
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const isActiveOrPast = status === 'active' || status === 'past';

  return (
    <div ref={ref} className="relative pl-10 md:pl-16 pb-16">
      {/* Timeline Node */}
      <div
        className={`absolute left-[7px] md:left-[11px] top-1 w-4 h-4 rounded-full border-2 z-10 transition-colors duration-700 ${isActiveOrPast ? 'bg-white' : 'bg-slate-200 border-slate-300'}`}
        style={{ borderColor: isActiveOrPast ? `rgba(${item.color}, 0.55)` : undefined }}
      >
        {isActiveOrPast && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="absolute inset-1 rounded-full"
            style={{ backgroundColor: `rgba(${item.color}, 0.55)` }}
          />
        )}
      </div>

      {/* Timeline Line (Grey Background) */}
      {!isLast && (
        <div className="absolute left-[14px] md:left-[18px] top-5 bottom-[-4px] w-0.5 bg-slate-200" />
      )}

      {/* Timeline Line (Colored Fill) */}
      {!isLast && (
        <motion.div
          className="absolute left-[14px] md:left-[18px] top-5 bottom-[-4px] w-0.5 origin-top"
          style={{
            scaleY: lineHeight,
            backgroundColor: `rgba(${item.color}, 0.25)`
          }}
        />
      )}

      {/* Content */}
      <div className={`transition-all duration-1000 ${status === 'active' ? 'opacity-100 blur-none translate-y-0' : status === 'past' ? 'opacity-40 blur-none translate-y-0' : 'opacity-20 blur-[8px] translate-y-8'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <h4 className="text-2xl font-medium text-slate-900 max-w-[180px] flex flex-col gap-y-1 leading-tight content-start">
            {item.title.split("\n").map((line: string, idx: number) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0.1, y: 10 }}
                animate={isActiveOrPast ? { opacity: 1, y: 0 } : { opacity: 0.1, y: 10 }}
                transition={{ duration: 0.5, delay: isActiveOrPast ? idx * 0.06 : 0, ease: [0.16, 1, 0.3, 1] as const }}
                className="inline-block"
              >
                {line}
              </motion.span>
            ))}
          </h4>
          <div className="text-slate-600 font-light leading-relaxed text-lg">
            {item.content.split(" ").map((word: string, idx: number) => (
              <span key={idx}>
                {idx > 0 ? ' ' : null}
                <motion.span
                  initial={{ opacity: 0.1, y: 10 }}
                  animate={isActiveOrPast ? { opacity: 1, y: 0 } : { opacity: 0.1, y: 10 }}
                  transition={{ duration: 0.5, delay: isActiveOrPast ? idx * 0.02 : 0, ease: [0.16, 1, 0.3, 1] as const }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutFund = ({
  aboutFund,
  approach,
  // Partners live on the Global single-type rather than this page's section:
  // the same strip renders in the footer, and one source keeps them in step.
  partners,
  partnersLabel,
}: {
  aboutFund?: AboutFundSection;
  approach?: ApproachSection;
  partners?: PartnerItem[] | null;
  partnersLabel?: string;
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isLastCardActive, setIsLastCardActive] = useState(false);
  const [isHowWorksLastActive, setIsHowWorksLastActive] = useState(false);
  const [activeTab, setActiveTab] = useState('Why CeF');
  const [credentialIndex, setCredentialIndex] = useState(0);

  const card3 = aboutFund?.bento_cards?.[3];
  const credentials = card3?.credential_1 && card3?.credential_2
    ? [card3.credential_1, card3.credential_2]
    : [
        "Certified under the Climate Bonds Standard, ensuring investments align with sustainability benchmarks.",
        "Assigned an investment-grade national scale rating, reflecting robust governance and portfolio quality.",
      ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCredentialIndex((prev) => (prev + 1) % credentials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const tabs = [
    { key: 'Why CeF', label: approach?.tab_why_cef ?? 'Why CeF' },
    { key: 'Fund Aims', label: approach?.tab_fund_aims ?? 'Fund Aims' },
    { key: 'How CeF Works', label: approach?.tab_how_cef ?? 'How CeF Works' },
  ];

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity }}
      className="bg-[var(--color-background)] text-[var(--color-text-primary)] relative z-20"
    >
      {/* DARK SECTION: Mandate & Bento Grid */}
      <div className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Mandate Header */}
            <div className="max-w-4xl mb-24">
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--color-text-tertiary)]">
                  {aboutFund?.eyebrow ?? "Our Mandate"}
                </span>
              </motion.div>

              <motion.h2 variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-medium leading-[1.2] sm:leading-[1.15] tracking-tight text-[var(--color-text-primary)] mb-8 sm:mb-12">
                {aboutFund?.headline ?? "We provide local currency funding from domestic institutional investors to small and medium sized climate compliant energy projects."}
              </motion.h2>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-start sm:items-center">
                {(aboutFund?.cta?.length
                  ? aboutFund.cta
                  : [{ cta_text: "Download Fact Sheet" }]
                ).map((item, i) => {
                  // First CTA is the solid primary, any extras are ghost buttons.
                  const className = i === 0
                    ? "bg-white text-black hover:bg-[var(--color-accent-green)] hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto"
                    : "text-white/80 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2 hover:text-white w-full sm:w-auto";
                  const label = (
                    <>
                      {item.cta_text} <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </>
                  );
                  const href = getCtaHref(item);
                  return href ? (
                    <a
                      key={item.id ?? i}
                      href={href}
                      rel="noopener noreferrer"
                      download
                      className={className}
                    >
                      {label}
                    </a>
                  ) : (
                    <button key={item.id ?? i} className={className}>
                      {label}
                    </button>
                  );
                })}
              </motion.div>
            </div>

            {/* Bento Grid (5 Boxes) */}
            {(() => {
              const cards = aboutFund?.bento_cards ?? [];
              const c0 = cards[0];
              const c1 = cards[1];
              const c2 = cards[2];
              const c3 = cards[3];
              const c4 = cards[4];
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <FocusCard
                    icon={Sun}
                    headline={c0?.eyebrow ?? "Energy Transition"}
                    statement={c0?.statement ?? "Decarbonizing the National Off-Grid with Renewable Infrastructure."}
                    proof={c0?.proof ?? "500MW Pipeline"}
                    tags={(c0?.tags as string[] | null) ?? ["SDG 7", "ESG"]}
                    tooltipText="Clean Energy Focus"
                    image={c0?.image ?? "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop"}
                  />
                  <FocusCard
                    icon={ShieldCheck}
                    headline={c1?.eyebrow ?? "Financial Resilience"}
                    statement={c1?.statement ?? "Eliminating FX Risk through Local Currency Funding."}
                    proof={c1?.proof ?? "₦15.4B AUM"}
                    tags={(c1?.tags as string[] | null) ?? ["Risk Mitigated"]}
                    tooltipText="Risk Management"
                    image={c1?.image ?? "https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=800&auto=format&fit=crop"}
                  />
                  <FocusCard
                    icon={Users}
                    headline={c2?.eyebrow ?? "Social Equity"}
                    statement={c2?.statement ?? "Bridging the Energy Gap for Underserved Communities."}
                    proof={c2?.proof ?? "2,400+ Jobs"}
                    tags={(c2?.tags as string[] | null) ?? ["Impact"]}
                    tooltipText="Community Impact"
                    image={c2?.image ?? "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=800&auto=format&fit=crop"}
                  />

                  {/* Box 4: Wide Image Box with Slider */}
                  <FocusCard
                    icon={Globe2}
                    headline={c3?.eyebrow ?? "Fund Credentials"}
                    isWide={true}
                    image={c3?.image ?? "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2670&auto=format&fit=crop"}
                    tooltipText="Global Standards"
                    forceHover={true}
                  >
                    <div className="relative h-28 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.h3
                          key={credentialIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.4, ease: "easeOut" as const }}
                          className="text-3xl font-medium leading-tight text-white absolute inset-0"
                        >
                          {credentials[credentialIndex]}
                        </motion.h3>
                      </AnimatePresence>
                    </div>
                  </FocusCard>

                  {/* Box 5: Gender Spotlight */}
                  <FocusCard
                    icon={Globe2}
                    headline={c4?.eyebrow ?? "Strategic Priority"}
                    statement={c4?.statement ?? "Gender & Impact Lens: Driving inclusive growth through targeted climate investments."}
                    accentColor="#EF4444"
                    tooltipText="SDG 5 Alignment"
                    image={c4?.image ?? "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop"}
                  />
                </div>
              );
            })()}

            {/* Strategic Partners Strip */}

            <PartnerMarquee
              heading={partnersLabel ?? "OEM Strategic Partners"}
              partners={toMarqueePartners(partners)}
            />
          </motion.div>
        </div>
      </div>

      {/* LIGHT SECTION: Approach & Rationale */}
      <div className="bg-[#F8FAFC] py-32 text-slate-900 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-medium leading-[1.2] sm:leading-[1.15] tracking-tight mb-8 sm:mb-12 lg:mb-16">
            <span className="text-slate-900">{approach?.heading_part1 ?? "Our Approach & "} </span>
            {(approach?.heading_part2 ?? "Rationale") && (
              <span className="text-slate-400">{approach?.heading_part2 ?? "Rationale"}</span>
            )}
          </h2>

          {/* Tabs */}
          <div className="sticky top-[65px] z-40 bg-[#F8FAFC] pt-4 sm:pt-6 pb-0 mb-12 sm:mb-16 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
            <div className="flex gap-6 sm:gap-8 md:gap-12 border-b border-slate-200 overflow-x-auto no-scrollbar px-6 -mx-6 sm:px-0 sm:mx-0 pt-2">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-3 sm:pb-4 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all relative whitespace-nowrap min-w-max ${activeTab === tab.key ? "text-[var(--color-accent-light)]" : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent-light)]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            <AnimatePresence mode="wait">
              {activeTab === 'Why CeF' && (
                <motion.div
                  key="why-cef"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col gap-12 sm:gap-16"
                >
                  {/* Row 1: Big Title (3/4 width) */}
                  <div className="lg:w-3/4">
                    <span className="text-[10px] sm:text-xs font-bold text-[var(--color-accent-light)] uppercase tracking-widest mb-4 sm:mb-6 block">
                      {approach?.why_cef_eyebrow ?? "/ Fund Rationale"}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.3] md:leading-[1.2] tracking-tight text-slate-900">
                      <TextReveal text={approach?.why_cef_headline ?? "Commercial financing in Nigeria often does not provide long-term local currency funding for infrastructure projects due to FX risk, tenor limitations, and perceived credit risks."} />
                    </h3>
                  </div>

                  {/* Row 2: Split Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
                    {/* Sticky Left Column: Description */}
                    <div className="lg:col-span-5">
                      <div className="lg:sticky lg:top-32">
                        <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-md">
                          {approach?.why_cef_body ?? "CeF addresses this gap by structuring investments that combine credit enhancement, blended finance, and institutional capital mobilisation."}
                        </p>

                        {/* <AnimatePresence>
                          {isLastCardActive && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                              className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6"
                            >
                              <button className="bg-slate-900 text-white hover:bg-[var(--color-accent-light)] hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg w-full sm:w-fit whitespace-nowrap">
                                {approach?.why_cef_primary_cta ?? "Download Fund Rationale"} <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                              <a href="#structure" className="text-slate-600 hover:text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-fit">
                                {approach?.why_cef_secondary_cta ?? "View Fund Structure"} <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                              </a>
                            </motion.div>
                          )}
                        </AnimatePresence> */}
                      </div>
                    </div>

                    {/* Scrolling Right Column with Stacking Interaction */}
                    <div className="lg:col-span-7 pb-16 sm:pb-24 lg:pb-32 relative">
                      {(approach?.why_cef_cards?.length
                        ? approach.why_cef_cards.map((card, i) => ({
                            title: card.title,
                            content: card.content,
                            color: ["0, 133, 202", "242, 125, 38", "80, 184, 72", "32, 58, 143"][i] ?? "0, 133, 202",
                            icon: [Zap, TrendingUp, Building2, Leaf][i] ?? Zap,
                          }))
                        : [
                            { title: "Addressing the Energy Deficit", content: "Nigeria faces a significant energy gap, with millions lacking reliable access. CeF prioritizes projects that bridge this divide through sustainable, decentralized solutions.", color: "0, 133, 202", icon: Zap },
                            { title: "Mitigating Currency Volatility", content: "By providing funding in Naira, we eliminate the devastating impact of FX fluctuations on project viability, ensuring long-term financial stability for developers.", color: "242, 125, 38", icon: TrendingUp },
                            { title: "Unlocking Institutional Capital", content: "We create investment-grade opportunities that allow pension funds and insurance companies to safely deploy capital into the real economy and infrastructure.", color: "80, 184, 72", icon: Building2 },
                            { title: "Catalyzing the Energy Transition", content: "CeF serves as a bridge to a low-carbon future, de-risking early-stage renewable technologies and supporting the national decarbonization mandate.", color: "32, 58, 143", icon: Leaf },
                          ]
                      ).map((item, i, arr) => (
                        <StickyCard
                          key={i}
                          item={item}
                          i={i}
                          isLast={i === arr.length - 1}
                          setLastActive={setIsLastCardActive}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'Fund Aims' && (
                <motion.div
                  key="fund-aims"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {(approach?.fund_aims?.length
                    ? approach.fund_aims.map((aim, i) => ({
                        title: aim.title,
                        desc: aim.description,
                        img: aim.image ?? [
                          "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop",
                          "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2670&auto=format&fit=crop",
                          "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop",
                          "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=2670&auto=format&fit=crop",
                          "https://images.unsplash.com/photo-1611974717484-1490b30ee4c2?q=80&w=2670&auto=format&fit=crop",
                          "https://images.unsplash.com/photo-1454165833767-027ff33027ef?q=80&w=2670&auto=format&fit=crop",
                        ][i] ?? "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop",
                      }))
                    : [
                        { title: "Climate Mitigation", desc: "Provide long-term funding to climate-aligned projects reducing carbon footprints.", img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop" },
                        { title: "Clean Generation", desc: "Support small-scale clean energy generation and distribution networks.", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2670&auto=format&fit=crop" },
                        { title: "Low-Carbon Infra", desc: "Finance infrastructure that inherently supports a low-carbon economy.", img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop" },
                        { title: "Alternative Energy", desc: "Back innovative alternative clean energy solutions and technologies.", img: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?q=80&w=2670&auto=format&fit=crop" },
                        { title: "Reduce FX Exposure", desc: "Provide long-term local currency financing to eliminate exchange rate risks.", img: "https://images.unsplash.com/photo-1611974717484-1490b30ee4c2?q=80&w=2670&auto=format&fit=crop" },
                        { title: "Integrated Portfolio", desc: "Create a diversified portfolio managing collective risk across value chains.", img: "https://images.unsplash.com/photo-1454165833767-027ff33027ef?q=80&w=2670&auto=format&fit=crop" },
                      ]
                  ).map((item, i) => (
                    <div key={i} className="group relative h-[320px] rounded-lg overflow-hidden bg-slate-900">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      {/* The hovered appearance is the resting state: the copy
                          must be readable without interaction. */}
                      <div className="absolute inset-0 bg-[rgb(0,133,202)]/60 mix-blend-multiply" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute top-6 right-6">
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white text-black">
                          <span className="text-xl font-light">+</span>
                        </div>
                      </div>
                      <div className="absolute bottom-8 left-8 right-8">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-2 block">Impact</span>
                        <h4 className="text-xl font-medium text-white mb-3">{item.title}</h4>
                        <p className="text-sm text-white/90 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'How CeF Works' && (
                <motion.div
                  key="how-works"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="pt-12"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Sticky Left Column */}
                    <div className="lg:col-span-5">
                      <div className="lg:sticky lg:top-32">
                        <span className="text-xs font-bold text-[var(--color-accent-light)] uppercase tracking-widest mb-4 block">
                          {approach?.how_cef_eyebrow ?? "/ How CeF Works"}
                        </span>
                        <h3 className="text-2xl font-medium leading-tight mb-8 text-slate-900">
                          {approach?.how_cef_headline ?? "Our operating model is designed to unlock scalable, local currency financing for clean energy projects through strategic partnerships and blended finance."}
                        </h3>

                        <AnimatePresence>
                          {isHowWorksLastActive && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                              className="mt-12"
                            >
                              <button className="bg-slate-900 text-white hover:bg-[var(--color-accent-light)] hover:text-white px-8 py-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg w-fit whitespace-nowrap">
                                {approach?.how_cef_cta ?? "View Eligibility Criteria"} <ArrowUpRight className="w-4 h-4" />
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Scrolling Right Column - Timeline Reveal */}
                    <div className="lg:col-span-7 pb-12">
                      {(approach?.how_cef_steps?.length
                        ? approach.how_cef_steps.map((step, i) => ({
                            title: step.title,
                            content: step.content,
                            color: ["0, 133, 202", "242, 125, 38", "80, 184, 72", "32, 58, 143"][i] ?? "0, 133, 202",
                          }))
                        : [
                            { title: "Credit\nEnhancement", content: "InfraCredit provides AAA-rated guarantees to de-risk investments.", color: "0, 133, 202" },
                            { title: "Catalytic\nCapital", content: "CeF provides subordinated or bridge capital to optimize capital structures.", color: "242, 125, 38" },
                            { title: "Institutional\nInvestment", content: "Pension funds and insurance companies provide senior debt financing.", color: "80, 184, 72" },
                            { title: "Scalable\nImpact", content: "The model unlocks scalable local currency financing for clean energy projects.", color: "32, 58, 143" },
                          ]
                      ).map((item, i, arr) => (
                        <TimelineStep
                          key={i}
                          item={item}
                          i={i}
                          isLast={i === arr.length - 1}
                          setLastActive={setIsHowWorksLastActive}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>


    </motion.section>
  );
};
