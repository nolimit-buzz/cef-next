"use client";
import * as React from 'react';
import { motion } from 'framer-motion';
import { getStrapiMediaURL } from '../lib/strapi';
import type { TransactionPartyItem } from '../types/about';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export const TransactionPartiesGrid = ({ parties }: { parties: TransactionPartyItem[] }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={containerVariants}
      className="bg-white rounded-2xl border border-gray-200/60 p-8 lg:p-12 w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      {/* Header matching the mock */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold tracking-tight leading-tight">
          <span className="text-[#3b5998]">Transaction</span><br />
          <span className="text-[var(--color-accent-green)]">Parties</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {parties.map((party) => {
          const logoUrl = getStrapiMediaURL(party.logo);
          return (
            <motion.div
              key={party.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="flex flex-col group cursor-pointer transition-all duration-300"
            >
              {/* Logo Area */}
              <div className="h-24 flex items-center justify-center mb-6 px-4 bg-gray-50/50 rounded-xl border border-gray-100 transition-all duration-300 group-hover:bg-white group-hover:border-gray-200 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="transform transition-transform duration-500 group-hover:scale-105">
                  {logoUrl && (
                    <img
                      src={logoUrl}
                      alt={party.logo_alt_text || party.partyName}
                      className="h-10 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              </div>

              {/* Role Text */}
              <div className="text-center mt-2">
                <span className="font-medium text-[var(--color-accent-green)] text-sm tracking-wide">
                  {party.roleHighlight}
                </span>
                {" "}
                <span className="text-gray-800 font-medium text-sm tracking-wide">
                  {party.roleRest}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
