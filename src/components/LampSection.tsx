"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { ArrowRight } from "lucide-react";

export default function LampSection() {
    return (
        <LampContainer>
            <motion.div
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="mt-8 flex flex-col items-center gap-6"
            >
                <div className="relative group">
                    <div
                        className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 opacity-75 blur-lg group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
                    />
                    <motion.button
                        className="relative inline-flex h-20 items-center justify-center overflow-hidden rounded-full bg-black px-12 font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-neutral-900 border border-white/10"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            boxShadow: ["0px 0px 0px rgba(6,182,212,0)", "0px 0px 20px rgba(6,182,212,0.5)", "0px 0px 0px rgba(6,182,212,0)"]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-full">
                            <motion.div
                                className="absolute w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                            />
                        </div>

                        <span className="relative text-2xl font-black uppercase tracking-[0.2em] mr-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            Your Website Is Next
                        </span>
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowRight className="relative w-8 h-8 text-cyan-400" />
                        </motion.div>
                    </motion.button>
                </div>
            </motion.div>
        </LampContainer>
    );
}
