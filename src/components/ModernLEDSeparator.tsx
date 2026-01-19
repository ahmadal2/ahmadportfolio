import React from 'react';
import { motion } from 'framer-motion';

const ModernLEDSeparator: React.FC = () => {
    return (
        <div className="relative w-full h-32 flex items-center justify-center overflow-hidden py-10">

            {/* Ambient Glow */}
            <div className="absolute inset-x-0 h-px bg-cyan-500/0 opacity-50 blur-[100px]"
                style={{ background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.4) 0%, transparent 70%)' }} />

            {/* Main Light Beam */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "circOut" }}
                viewport={{ once: false, margin: "-100px" }}
                className="relative w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)]"
            >
                {/* Kinetic Particles */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 -translate-y-1/2 w-20 h-1 bg-white rounded-full blur-[1px]"
                        style={{ left: 0 }}
                        animate={{
                            left: ['0%', '100%'],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.8 / 2
                        }}
                    />
                ))}

                {/* Energy Pulse */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-cyan-400/20 blur-sm"
                    animate={{ opacity: [0.2, 0.5, 0.2], scaleY: [1, 3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Decorative Brackets */}
            <div className="absolute left-[10%] top-1/2 -translate-y-1/2 flex gap-1 opacity-20 hidden md:flex">
                <div className="w-1 h-8 bg-cyan-500 rounded-full" />
                <div className="w-1 h-4 bg-cyan-500 rounded-full" />
            </div>
            <div className="absolute right-[10%] top-1/2 -translate-y-1/2 flex gap-1 opacity-20 hidden md:flex flex-row-reverse">
                <div className="w-1 h-8 bg-cyan-500 rounded-full" />
                <div className="w-1 h-4 bg-cyan-500 rounded-full" />
            </div>

        </div>
    );
};

export default ModernLEDSeparator;
