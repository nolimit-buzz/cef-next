"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getCloudinaryTransformedURL, getStrapiMediaURL } from '../../lib/strapi';
import { TransactionPartiesGrid } from '../TransactionParties';
import type { TeamSection as TeamSectionData } from '../../types/about';
import { fadeUp } from './shared';

export const TeamSection = ({ sectionLabel, headingPrimary, headingSecondary, body, cta, members, transactionParties }: TeamSectionData) => {
  return (
    <section id="team" className="py-24 lg:py-32 bg-gray-50 relative z-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
                {sectionLabel}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.15] tracking-tight mb-6">
              <span className="text-[#0A1224]">{headingPrimary} </span>
              <span className="text-slate-400">{headingSecondary}</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {body}
            </p>
          </motion.div>
          {/* Parked for now — the CMS `cta` field is untouched, so uncomment to restore.
          <motion.button
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }}
            className="px-6 py-3 border border-gray-300 rounded-[8px] text-sm font-medium text-[#0A1224] hover:bg-gray-100 hover:border-gray-400 transition-colors whitespace-nowrap bg-white shadow-sm"
          >
            {cta}
          </motion.button>
          */}
        </div>

        {/* Investment Committee Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-24">
          {members.map((member, i) => {
            const nameParts = member.name.split(' ');
            const firstName = nameParts.slice(0, -1).join(' ');
            const lastName = nameParts[nameParts.length - 1];
            const photoUrl = getCloudinaryTransformedURL(getStrapiMediaURL(member.photo));

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-[8px] overflow-hidden mb-4 bg-black/5">
                  {photoUrl && (
                    <Image
                      src={photoUrl}
                      alt={member.photo_alt_text || member.name}
                      fill
                      quality={100}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <h3 className="font-bold text-lg text-[#0A1224]">
                  {firstName} <span className="text-[var(--color-accent-green)]">{lastName}</span>
                </h3>
                <p className="text-sm text-gray-500 mt-1">{member.title}</p>
              </motion.div>
            );
          })}
        </div>

        <TransactionPartiesGrid parties={transactionParties} />

      </div>
    </section>
  );
};
