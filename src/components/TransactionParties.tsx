"use client";
import * as React from 'react';
import { motion } from 'framer-motion';

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

export const TransactionPartiesGrid = () => {
  const parties = [
    {
      logoHtml: <img src="https://upload.wikimedia.org/wikipedia/commons/d/db/KPMG_blue_logo.svg" alt="KPMG" className="h-10 object-contain" referrerPolicy="no-referrer" />,
      roleHighlight: "Auditors",
      roleRest: "to the Fund"
    },
    {
      logoHtml: (
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8 text-[#0a4074]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2 L9 22 M8 8 L22 16" />
          </svg>
          <div className="flex flex-col text-left">
            <span className="text-[#8e9091] text-[12px] uppercase tracking-[0.3em] font-light leading-tight">Olaniwun</span>
            <span className="text-[#8e9091] text-[12px] uppercase tracking-[0.3em] font-light leading-tight">Ajayi</span>
          </div>
        </div>
      ),
      roleHighlight: "Solicitors",
      roleRest: "to The Fund"
    },
    {
      logoHtml: (
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 relative">
            <div className="absolute top-0 bottom-0 left-1 w-1 bg-[#d9232a]" />
            <div className="absolute top-0 bottom-0 right-1 w-1 bg-[#d9232a]" />
            <div className="absolute left-0 right-0 top-1 h-1 bg-[#2a2a2a]" />
            <div className="absolute left-0 right-0 bottom-1 h-1 bg-[#2a2a2a]" />
          </div>
          <span className="text-[#595A5C] text-lg font-bold font-sans">Africa Prudential</span>
        </div>
      ),
      roleHighlight: "Registrar",
      roleRest: "to the Fund"
    },
    {
      logoHtml: <img src="https://www.ubagroup.com/wp-content/uploads/2025/03/UBA-58567.svg" alt="UBA" className="h-10 object-contain" referrerPolicy="no-referrer" />,
      roleHighlight: "Custodian",
      roleRest: "to The Fund"
    },
    {
      logoHtml: (
        <div className="flex items-center gap-2">
          <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
            <path d="M50 10 L10 30 V60 C10 80 30 90 50 95 C70 90 90 80 90 60 V30 L50 10 Z" fill="#fff" stroke="#0033a1" strokeWidth="8"/>
            <path d="M25 45 Q50 80 75 45" stroke="#0033a1" strokeWidth="8" fill="none"/>
            <path d="M20 30 Q50 60 80 30" stroke="#00a9e0" strokeWidth="6" fill="none"/>
          </svg>
          <div className="flex flex-col text-left">
            <span className="text-[#0033a1] font-bold text-lg leading-none">Stanbic IBTC</span>
            <span className="text-[#00a9e0] text-[9px] font-semibold text-right tracking-wider">Trustees</span>
          </div>
        </div>
      ),
      roleHighlight: "Trustee",
      roleRest: "to The Fund"
    },
    {
      logoHtml: (
         <div className="flex flex-col items-center">
           <span className="text-[#13498b] font-black text-4xl tracking-tighter leading-[0.8]">fsdh</span>
           <span className="text-[#009bd9] text-[8px] font-bold tracking-[0.1em] uppercase mt-1">Capital Ltd</span>
         </div>
      ),
      roleHighlight: "Fund Adviser /",
      roleRest: "Issuing House"
    }
  ];

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
        {parties.map((party, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="flex flex-col group cursor-pointer transition-all duration-300"
          >
            {/* Logo Area */}
            <div className="h-24 flex items-center justify-center mb-6 px-4 bg-gray-50/50 rounded-xl border border-gray-100 transition-all duration-300 group-hover:bg-white group-hover:border-gray-200 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="transform transition-transform duration-500 group-hover:scale-105">
                {party.logoHtml}
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
        ))}
      </div>
    </motion.div>
  );
};
