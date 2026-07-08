"use client";
import dynamic from 'next/dynamic';

const NigeriaMap = dynamic(() => import('../NigeriaMap').then(m => m.NigeriaMap), { ssr: false });

export const NigeriaMapSection = () => <NigeriaMap />;
