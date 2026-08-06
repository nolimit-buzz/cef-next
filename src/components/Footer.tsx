"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Building2, Globe, ArrowUpRight, Linkedin, Youtube, Instagram, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { partners } from "../data/partners";
import type { GlobalData, SocialPlatform } from "../types/global";

// Sentinel href for the Project Sponsors card. The click handler intercepts it
// and opens the modal; the value doubles as a real destination so the card
// still works when JS has not hydrated (the old '#submit-project' pointed at an
// element id that exists nowhere in the app).
const SUBMIT_PROJECT_HREF = '/contact?type=project';

const DEFAULT_CONTACT_EMAIL = 'support@cleanenergyfund.ng';
const DEFAULT_OFFICE_ADDRESS = 'Plot 1610 Adeola Hopewell street, Victoria Island.';

const CTA_ICONS: Record<string, LucideIcon> = {
  'trending-up': TrendingUp,
  building: Building2,
  globe: Globe,
};

const SOCIAL_ICONS: Partial<Record<SocialPlatform, LucideIcon>> = {
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
};

const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  instagram: 'Instagram',
  x: 'X',
  facebook: 'Facebook',
};

const defaultCtaData = [
  {
    icon: TrendingUp,
    title: 'Investors',
    description: 'Access institutional climate infrastructure opportunities',
    linkText: 'Learn More',
    href: '/investor-relations',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop'
  },
  {
    icon: Building2,
    title: 'Project Sponsors',
    description: 'Submit eligible projects for financing',
    linkText: 'Submit Project',
    href: SUBMIT_PROJECT_HREF,
    image: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=800&auto=format&fit=crop'
  },
  {
    icon: Globe,
    title: 'DFIs',
    description: 'Partner on blended finance and climate impact',
    linkText: 'Get in Touch',
    href: '/contact',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop'
  }
];

const defaultFooterLinkGroups = [
  {
    heading: 'About us',
    links: [
      // Anchors match existing section ids on /about (AboutFundSection and
      // MilestonesSection); both entries used to point at bare /about.
      { label: 'Our mission', href: '/about#overview' },
      { label: 'History', href: '/about#track-record' },
      { label: 'Our Impact', href: '/impact' },
    ],
  },
  {
    heading: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Investor Relations', href: '/investor-relations' },
      { label: 'Impact', href: '/impact' },
      { label: 'Pipeline & Eligibility', href: '/eligibility' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const aboutCtaData = [
  {
    icon: TrendingUp,
    title: 'Investment Strategy',
    description: 'Explore our approach to climate-aligned returns',
    linkText: 'View Strategy',
    href: '/#strategy',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop'
  },
  {
    icon: Building2,
    title: 'Access Investor Relations',
    description: 'Download Series 2 Prospectus',
    linkText: 'Download Prospectus',
    href: '/investor-relations',
    image: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=800&auto=format&fit=crop'
  },
  {
    icon: Globe,
    title: 'View Eligibility Criteria',
    description: 'Review our investment mandate and sectors',
    linkText: 'View Criteria',
    href: '/eligibility',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop'
  }
];

const governanceCtaData = [
  {
    icon: TrendingUp,
    title: 'Investment Committee',
    description: 'Meet the experts guiding our investment decisions',
    linkText: 'View Committee',
    href: '#investment-committee',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop'
  },
  {
    icon: Building2,
    title: 'Fund Managers',
    description: 'Learn about our experienced management team',
    linkText: 'View Managers',
    href: '#fund-managers',
    image: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?q=80&w=800&auto=format&fit=crop'
  },
  {
    icon: Globe,
    title: 'Governance & Impact',
    description: 'Explore our ESG framework and impact metrics',
    linkText: 'View Impact',
    href: '#governance-impact',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop'
  }
];

export const Footer = ({ global }: { global?: GlobalData | null }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const pathname = usePathname();
  const location = typeof window !== 'undefined' ? window.location : { hash: '', pathname };
  const isAboutPage = location.pathname === '/about';
  const isGovernancePage = location.pathname === '/governance';

  const contactEmail = global?.support_email || global?.contact_email || DEFAULT_CONTACT_EMAIL;
  const officeAddress = global?.office_address || DEFAULT_OFFICE_ADDRESS;

  // The About and Governance pages keep their own on-page CTA sets; only the
  // site-wide "Partnering for impact" trio is CMS-editable.
  const cmsCtaData = global?.partner_cta_cards?.length
    ? global.partner_cta_cards.map((card) => ({
      icon: CTA_ICONS[card.icon ?? 'globe'] ?? Globe,
      title: card.title,
      description: card.description ?? '',
      linkText: card.cta_label ?? 'Learn More',
      href: card.cta_href || SUBMIT_PROJECT_HREF,
      image: card.background_image ?? defaultCtaData[0].image,
    }))
    : defaultCtaData;

  const currentCtaData = isGovernancePage ? governanceCtaData : (isAboutPage ? aboutCtaData : cmsCtaData);

  const footerLinkGroups = global?.footer_links?.length
    ? global.footer_links.map((group) => ({
      heading: group.heading,
      links: group.links ?? [],
    }))
    : defaultFooterLinkGroups;

  // Only render icons for platforms we have an icon for and that have a real
  // URL — an empty list is better than the placeholder `href="#"` icons that
  // used to ship.
  const socialLinks = (global?.social_links ?? []).filter(
    (link) => link.url && SOCIAL_ICONS[link.platform]
  );

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === SUBMIT_PROJECT_HREF) {
      e.preventDefault();
      openModal();
    }
  };

  const openModal = () => {
    setStatus('idle');
    setStatusMessage('');
    setIsModalOpen(true);
  };

  const handleProjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus('submitting');
    setStatusMessage('');

    try {
      const res = await fetch('/api/submit-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: data.get('projectName'),
          sector: data.get('sector'),
          description: data.get('description'),
          impact: data.get('impact'),
          contactName: data.get('contactName'),
          email: data.get('email'),
        }),
      });

      const payload = (await res.json().catch(() => null)) as { message?: string } | null;

      if (!res.ok) {
        setStatus('error');
        setStatusMessage(payload?.message ?? 'Submission failed. Please try again.');
        return;
      }

      form.reset();
      setStatus('success');
      setStatusMessage(payload?.message ?? 'Thanks — your project submission has been received.');
    } catch {
      setStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <footer className="bg-[#040d18] text-white pt-0 pb-12 relative z-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Connected Boxes CTA Section */}
        <div className="mb-32 pt-20">
          <h2 className="text-3xl md:text-[42px] font-medium mb-16 tracking-tight leading-[1.15]">
            <span className="text-white">Partnering for impact</span>{' '}
            <span className="text-electric-blue">across all sectors</span>
          </h2>

          <div className="border border-white/10 bg-[#040d18] ">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {currentCtaData.map((cta, index) => (
                <a
                  key={index}
                  href={cta.href}
                  onClick={(e) => handleCtaClick(e, cta.href)}
                  className={`group relative p-10 md:p-12 flex flex-col justify-between min-h-[360px] transition-colors duration-500 cursor-pointer ${index !== currentCtaData.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''
                    }`}
                >
                  {/* Image Background with "Why CEF" Blue Overlay */}
                  <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity">
                    <img
                      src={cta.image}
                      alt={cta.title}
                      className="w-full h-full object-cover mix-blend-luminosity grayscale"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />
                  </div>

                  <div className="relative z-10">
                    {/* Electric Blue Icon */}
                    <div className="w-12 h-12 bg-[var(--color-accent-green)]/10 border-1 border-[var(--color-accent-green)] flex items-center justify-center mb-10 text-[var(--color-accent-green)]  group-hover:text-obsidian transition-colors duration-300 rounded-lg">
                      <cta.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-3xl font-medium text-white mb-4 tracking-tight">{cta.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-sm font-light group-hover:text-white transition-colors duration-300">
                      {cta.description}
                    </p>
                  </div>

                  <div className="relative z-10 mt-12 flex items-center gap-2 text-white font-medium group-hover:text-electric-blue transition-colors duration-300">
                    {cta.linkText}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </a>
              ))}
            </div>

            {/* Strategic Partners Marquee */}
            <div className="py-12 border-t border-[var(--color-border)]">
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--color-text-tertiary)] mb-8">
                  Strategic Partners & Funders
                </span>

                <div className="w-full overflow-hidden relative">
                  <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
                  <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

                  <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                    className="flex items-center gap-16 md:gap-24 whitespace-nowrap w-max px-12"
                  >
                    {[
                      ...partners,
                      ...partners, // duplicate for seamless loop
                    ].map((partner, i) =>
                      partner.type !== "logo" ? (
                        <span
                          key={i}
                          className="text-lg md:text-2xl font-sans italic tracking-tight text-[var(--color-text-secondary)]/30 hover:text-[var(--color-text-secondary)] transition-colors cursor-default"
                        >
                          {partner.name}
                        </span>
                      ) : (
                        <div
                          key={i}
                          className="flex items-center justify-center h-8 w-32 flex-shrink-0
                         grayscale opacity-30 hover:grayscale-0 hover:opacity-100
                         transition-all duration-300 cursor-default"
                        >
                          <img
                            src={partner.src}
                            alt={partner.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Navigation */}
        <div className="border-t border-[var(--color-border)] pt-20 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">

            {/* Brand Column */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="https://reverse.cleanenergyfund.ng/wp-content/uploads/2023/09/Clean-Energy-Logo-1-2.svg"
                  alt="Clean Energy Local Currency Fund"
                  className="h-12 w-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                Financing Nigeria&apos;s energy transition through local currency climate infrastructure investment.
              </p>
            </div>

            {/* Links Columns */}
            {footerLinkGroups.map((group) => (
              <div key={group.heading} className="lg:col-span-2">
                <h4 className="text-white font-medium mb-8 text-sm">{group.heading}</h4>
                <ul className="space-y-5">
                  {group.links.map(({ label, href }) => (
                    <li key={`${group.heading}-${label}`}>
                      <Link href={href} className="text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="lg:col-span-2">
              <h4 className="text-white font-medium mb-8 text-sm">Contact</h4>
              <div className="space-y-5 text-sm text-[var(--color-text-secondary)]">
                <p><a href={`mailto:${contactEmail}`} className="hover:text-white transition-colors">{contactEmail}</a></p>
                <p className="leading-relaxed">
                  {officeAddress}
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="mb-6">
                <img
                  src="https://reverse.cleanenergyfund.ng/wp-content/uploads/2023/09/FundCo.svg"
                  alt="FundCo Capital Managers"
                  className="h-12 w-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-10">
                FundCo is authorised and registered by the Nigeria Securities & Exchange Commission to act as fund manager for the Clean Energy Local Currency Fund
              </p>

              {/* <div className="mb-6">
                <img
                  src="https://reverse.cleanenergyfund.ng/wp-content/uploads/2023/09/ren-cap-01-1.svg"
                  alt="Renaissance Capital"
                  className="h-16 w-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                Renaissance Securities (Nigeria) Limited is acting as the Issuing House and Financial Adviser to the Clean Energy Local Currency Fund
              </p> */}
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-center pt-12 border-t border-[var(--color-border)]">
            {socialLinks.length > 0 && (
              <div className="flex gap-4 mb-8">
                {socialLinks.map((link) => {
                  const Icon = SOCIAL_ICONS[link.platform]!;
                  const label = SOCIAL_LABELS[link.platform];
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all text-[var(--color-text-secondary)] hover:text-white"
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            )}
            <div className="text-xs text-[var(--color-text-secondary)] flex flex-row items-center gap-2 justify-center">
            < div className="inline items-center gap-2">
             <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy & Terms of Service</Link>
              <span className="opacity-50 px-2">•</span>
              <span>© 2026 Clean Energy Fund Facility</span>
            </div>
            </div>
          </div>
        </div>

      </div>

      {/* Submit Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-2xl font-medium text-white">Submit Project</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form className="space-y-6" onSubmit={handleProjectSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Project Name</label>
                      <input
                        type="text"
                        name="projectName"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent-green)] transition-colors"
                        placeholder="e.g. Solar Mini-Grid Phase 1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Sector</label>
                      <select
                        name="sector"
                        required
                        defaultValue=""
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-accent-green)] transition-colors appearance-none"
                      >
                        <option value="" disabled className="text-black">Select a sector</option>
                        <option value="solar" className="text-black">Solar / Mini-Grid</option>
                        <option value="wind" className="text-black">Wind Energy</option>
                        <option value="hydro" className="text-black">Hydro Power</option>
                        <option value="biomass" className="text-black">Biomass</option>
                        <option value="other" className="text-black">Other Renewable</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Project Description</label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent-green)] transition-colors resize-none"
                      placeholder="Briefly describe the project scope, location, and current stage..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Expected Impact</label>
                    <textarea
                      name="impact"
                      required
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent-green)] transition-colors resize-none"
                      placeholder="e.g. MW capacity, jobs created, CO2 reduction..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Contact Name</label>
                      <input
                        type="text"
                        name="contactName"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent-green)] transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-accent-green)] transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  {statusMessage && (
                    <p
                      role="status"
                      aria-live="polite"
                      className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-[var(--color-accent-green)]'}`}
                    >
                      {statusMessage}
                    </p>
                  )}

                  <div className="pt-4 flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-3 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {status === 'success' ? 'Close' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="px-8 py-3 rounded-lg text-sm font-medium bg-[var(--color-accent-green)] text-white hover:bg-[var(--color-accent)] transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? 'Submitting…' : 'Submit Project'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </footer>
  );
};
