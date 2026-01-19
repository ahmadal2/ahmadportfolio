"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LiquidGridItem {
    icon: React.ReactNode;
    color: string;
    label: string;
    comment?: string;
}

interface LiquidGridIconsProps {
    items: LiquidGridItem[];
    className?: string;
}

export const LiquidGridIcons: React.FC<LiquidGridIconsProps> = ({ items, className }) => {
    const [activeItem, setActiveItem] = useState<LiquidGridItem | null>(null);

    return (
        <div className={cn("relative py-20 px-4", className)}>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-center">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative flex flex-col items-center"
                    >
                        {/* Liquid Bubble Container */}
                        <div
                            onClick={() => setActiveItem(item)}
                            className="relative h-20 w-20 md:h-24 md:w-24 cursor-pointer"
                        >
                            {/* Morphing Background */}
                            <div className="absolute inset-0 z-0 pointer-events-none">
                                <svg viewBox="0 0 200 200" className="w-full h-full">
                                    <defs>
                                        <filter id={`liquid-bubble-${index}`}>
                                            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed={index}>
                                                <animate attributeName="baseFrequency" values="0.015;0.025;0.015" dur="8s" repeatCount="indefinite" />
                                            </feTurbulence>
                                            <feDisplacementMap in="SourceGraphic" scale="20" />
                                        </filter>
                                    </defs>
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="80"
                                        fill="url(#bubble-grad)"
                                        filter={`url(#liquid-bubble-${index})`}
                                        className="opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                                    />
                                    <linearGradient id="bubble-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor={item.color} />
                                        <stop offset="100%" stopColor="transparent" />
                                    </linearGradient>
                                </svg>
                            </div>

                            {/* Glass Icon Housing */}
                            <div className="absolute inset-0 flex items-center justify-center bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:border-white/30 transform-gpu z-10 shadow-xl">
                                <div className="text-white opacity-40 group-hover:opacity-100 transition-opacity duration-500 scale-125">
                                    {item.icon}
                                </div>
                            </div>

                            {/* Refractive Ring */}
                            <div className="absolute -inset-2 border border-white/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none scale-90 group-hover:scale-100" />
                        </div>

                        {/* Label */}
                        <span className="mt-4 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] group-hover:text-white/60 transition-colors">
                            {item.label}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Modern Modal Overlay */}
            <AnimatePresence>
                {activeItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveItem(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />

                        <motion.div
                            layoutId={`item-${activeItem.label}`}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md bg-white/[0.02] border border-white/10 backdrop-blur-3xl rounded-[3rem] p-10 overflow-hidden shadow-2xl"
                        >
                            <div
                                className="absolute -top-20 -right-20 w-64 h-64 blur-[100px] opacity-10 rounded-full"
                                style={{ backgroundColor: activeItem.color }}
                            />

                            <button
                                onClick={() => setActiveItem(null)}
                                className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <X size={20} className="text-white/40" />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div
                                    className="h-20 w-20 rounded-[2rem] flex items-center justify-center mb-8 bg-white/5 border border-white/10"
                                    style={{ color: activeItem.color }}
                                >
                                    {activeItem.icon}
                                </div>

                                <span className="text-[10px] font-black uppercase tracking-[1em] opacity-40 mb-2">Project Preview</span>
                                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">{activeItem.label}</h3>

                                <div className="h-px w-12 bg-white/10 mb-6" />

                                <p className="text-white/40 text-sm uppercase tracking-widest leading-loose mb-8">
                                    {activeItem.comment || "This strategic deployment is currently undergoing final optimization in our secure sandbox environment."}
                                </p>

                                <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10">
                                    <Info size={14} className="text-blue-500" />
                                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Status: Optimization In Progress</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
