"use client";
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getStrapiMediaURL } from '../../lib/strapi';
import type { ProjectItem } from '../../types/portfolio';
import { staggerContainer, fadeUp } from '../portfolioComponents/shared';

export const GallerySection = ({ project }: { project: ProjectItem }) => {
  const galleryRef = useRef<HTMLDivElement>(null);

  const galleryImages = project.caseStudy?.galleryImages?.length
    ? project.caseStudy.galleryImages
    : [{ id: 0, url: project.image, url_alt_text: project.image_alt_text }];

  const scrollGallery = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = galleryRef.current.clientWidth * 0.8;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
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
        {galleryImages.map((img, idx) => {
          const imageUrl = getStrapiMediaURL(img.url);
          if (!imageUrl) return null;
          return (
            <div
              key={img.id}
              className="min-w-[85%] md:min-w-[60%] lg:min-w-[45%] snap-center rounded-lg overflow-hidden aspect-video relative border border-slate-200"
            >
              <img
                src={imageUrl}
                className="object-cover w-full h-full"
                alt={img.url_alt_text || `Gallery image ${idx + 1}`}
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};
