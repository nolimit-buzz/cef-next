"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, TrendingUp, Zap, Leaf } from 'lucide-react';
import Breadcrumbs from '../Breadcrumbs';
import { getStrapiMediaURL } from '../../lib/strapi';
import type { HeroSection as HeroSectionData } from '../../types/about';
import { fadeUp, staggerContainer, Multiline } from './shared';

const HERO_CREDENTIAL_ICONS = [Leaf, ShieldCheck, TrendingUp, Zap];

export const HeroSection = ({ badge, headingLine1, headingLine2, subheading, credentials, ratingLabel, ratingValue, hero_video, poster_image, poster_image_alt_text }: HeroSectionData) => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroVideoUrl = getStrapiMediaURL(hero_video);
  const heroPosterUrl = getStrapiMediaURL(poster_image);

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
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-6 lg:mb-8 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full">
              <span className="text-base">🏆</span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/90">
                {badge}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-[40px] md:text-5xl lg:text-[48px] xl:text-[52px] font-medium leading-[1.1] tracking-tight">
              <span className="text-white">{headingLine1}</span> <br className="hidden lg:block" /> <span className="text-white/50">{headingLine2}</span>
            </motion.h1>
          </motion.div>
        </div>

        {/* Right Column: Image/Video Background */}
        <div className="w-full lg:w-[45%] relative min-h-[40vh] lg:min-h-0 lg:h-full">
          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={heroPosterUrl}
              className="w-full h-full object-cover motion-reduce:hidden"
            >
              {heroVideoUrl && <source src={heroVideoUrl} type="video/mp4" />}
            </video>
            {heroPosterUrl && (
              <img
                src={heroPosterUrl}
                alt={poster_image_alt_text || "Solar panels"}
                className="hidden motion-reduce:block absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/30 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-transparent z-10 lg:block hidden" />
          </motion.div>
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
            {subheading}
          </motion.p>
        </div>

        {/* Column 2: Brand Accent Block */}
        <div className="bg-[#0094da] p-8 lg:py-12 xl:py-14 lg:px-10 flex flex-col justify-center gap-6 border-t border-white/10">
          {credentials.map((credential, i) => {
            const Icon = HERO_CREDENTIAL_ICONS[i % HERO_CREDENTIAL_ICONS.length];
            return (
              <div key={credential.id}>
                {i > 0 && <div className="w-full h-px bg-white/20 mb-6" />}
                <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
                  <Icon className="w-8 h-8 text-white shrink-0" />
                  <span className="text-sm xl:text-base font-medium text-white uppercase tracking-wider leading-snug">
                    <Multiline text={credential.label} />
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Column 3: Light Block */}
        <div className="bg-[#32a99f] p-8 lg:py-12 xl:py-14 lg:pr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pl-10 flex items-center border-t border-[#32a99f]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-4">
            <TrendingUp className="w-10 h-10 text-white shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs xl:text-sm font-bold text-white/80 uppercase tracking-widest mb-1">{ratingLabel}</span>
              <span className="text-lg xl:text-xl font-bold text-white uppercase tracking-wide">{ratingValue}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
