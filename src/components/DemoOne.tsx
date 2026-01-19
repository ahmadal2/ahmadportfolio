import React, { useState, useEffect, useRef } from "react";
import { Carousel } from "@/components/ui/carousel";
import { Play, X, ExternalLink, Loader2, Maximize2, Cpu, Globe, Zap, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
    id: string;
    title: string;
    url: string;
    image?: string;
    accent: string;
}

const ProjectPreview: React.FC<{
    project: Project | null;
    onClose: () => void
}> = ({ project, onClose }) => {
    const [iframeLoading, setIframeLoading] = useState(true);
    const [latency, setLatency] = useState("24ms");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (project) {
            setIframeLoading(true);
            const timer = setTimeout(() => {
                containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);

            const latencyInterval = setInterval(() => {
                setLatency(`${Math.floor(Math.random() * 15 + 15)}ms`);
            }, 2000);

            return () => {
                clearTimeout(timer);
                clearInterval(latencyInterval);
            };
        }
    }, [project]);

    return (
        <AnimatePresence mode="wait">
            {project && (
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0, y: 50, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.98 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-[98vw] mx-auto mt-12 mb-24 overflow-hidden bg-black/40 backdrop-blur-[60px] rounded-[3rem] border border-white/10 z-[100] shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                >
                    <div
                        className="absolute top-0 left-1/4 w-1/2 h-1/2 blur-[120px] opacity-10 pointer-events-none"
                        style={{ backgroundColor: project.accent }}
                    />

                    <div className="relative z-20 flex flex-col md:flex-row items-center justify-between px-10 py-8 border-b border-white/10 gap-8">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="absolute inset-0 blur-lg opacity-40 animate-pulse" style={{ backgroundColor: project.accent }} />
                                <div className="relative h-14 w-14 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center">
                                    <Cpu size={28} className="text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-white font-black text-2xl md:text-3xl tracking-tighter uppercase italic leading-none mb-1">
                                    {project.title}
                                </h3>
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-green-500">
                                        <div className="h-1.5 w-1.5 rounded-full bg-current animate-pulse shadow-[0_0_5px_currentColor]" />
                                        Direct Link Active
                                    </span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 border-l border-white/10 pl-3">
                                        Latency: <span className="text-white/60 tabular-nums">{latency}</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center gap-8 py-3 px-8 bg-black/40 rounded-full border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-2">
                                <Globe size={14} className="text-blue-400" />
                                <span className="text-[11px] font-black text-white/50 uppercase tracking-widest">Global CDN</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={14} className="text-purple-400" />
                                <span className="text-[11px] font-black text-white/50 uppercase tracking-widest">SSL Secure</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap size={14} className="text-yellow-400" />
                                <span className="text-[11px] font-black text-white/50 uppercase tracking-widest">Next-Gen Speed</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-5">
                            {/* DARK MODERN 2026 BUTTON - HIGH READABILITY */}
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative h-14 px-10 rounded-full bg-neutral-950 text-white flex items-center gap-4 hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                            >
                                <div className="relative z-10 flex flex-col items-start">
                                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 leading-none mb-1 group-hover:text-white/60 transition-colors">Launch Node</span>
                                    <span className="text-[13px] font-black uppercase tracking-[0.1em] text-white leading-none">Visit Project</span>
                                </div>
                                <div className="relative z-10 p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/20 group-hover:border-white/30 transition-all">
                                    <ExternalLink size={16} strokeWidth={2.5} className="text-white" />
                                </div>

                                {/* 2026 Refraction & Glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] via-transparent to-transparent opacity-100" />
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-all duration-500 blur-[1px]"
                                    style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
                                />
                                <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
                            </a>

                            <button
                                onClick={onClose}
                                className="h-14 w-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all group active:scale-90"
                            >
                                <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                        </div>
                    </div>

                    <div className="relative w-full h-[75vh] md:h-[88vh] bg-[#020202] group/viewport">
                        {/* Ultra-Thin Bezel Illusion */}
                        <div className="absolute inset-0 pointer-events-none border-[12px] border-black/80 z-20 rounded-[inherit]" />

                        <AnimatePresence>
                            {iframeLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] z-30"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 blur-[60px] opacity-20 animate-pulse scale-150" style={{ backgroundColor: project.accent }} />
                                        <div className="relative h-24 w-24">
                                            <Loader2 className="animate-spin text-white opacity-40 absolute inset-0" size={96} strokeWidth={0.5} />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-[10px] font-black text-white/50 animate-pulse uppercase tracking-[0.2em]">Neural</span>
                                            </div>
                                        </div>
                                    </div>
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="mt-12 text-center"
                                    >
                                        <p className="text-white/40 text-[10px] uppercase tracking-[0.8em] font-black mb-2 px-1">Initializing Secure Session</p>
                                        <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ x: '-100%' }}
                                                animate={{ x: '100%' }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                className="h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                            />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <iframe
                            src={project.url}
                            className={`w-full h-full border-none transition-all duration-1500 ease-out-expo ${iframeLoading ? 'opacity-0 scale-105 blur-3xl' : 'opacity-100 scale-100 blur-0'}`}
                            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                            title={project.title}
                            onLoad={() => setIframeLoading(false)}
                        />

                        {!iframeLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/70 backdrop-blur-xl border border-white/10 rounded-full z-40 pointer-events-none flex items-center gap-3"
                            >
                                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em]">Live Interaction Mode</span>
                            </motion.div>
                        )}
                    </div>

                    <div className="relative px-12 py-6 bg-white/5 border-t border-white/10 flex items-center justify-between overflow-hidden">
                        <div className="flex gap-12">
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.5em]">Network</span>
                                <span className="text-[11px] font-black text-white/60 uppercase tracking-widest">QUANTUM HTTPS/3</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.5em]">Status</span>
                                <span className="text-[11px] font-black text-green-500/80 uppercase tracking-widest">SYNCHRONIZED</span>
                            </div>
                        </div>
                        <div className="hidden sm:flex flex-col items-end gap-1">
                            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.5em]">Source Origin</span>
                            <span className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-widest">{project.url.replace('https://', '').replace('.netlify.app/', '')}</span>
                        </div>
                        <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2 rotate-90 text-[100px] font-black text-white/[0.01] pointer-events-none uppercase tracking-tighter">
                            Session
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const ProjectCard: React.FC<{
    project: Project;
    onOpen: (p: Project) => void
}> = ({ project, onOpen }) => {
    return (
        <motion.div
            whileHover={{ y: -15, scale: 1.02 }}
            onClick={() => onOpen(project)}
            className="h-[520px] w-full relative overflow-hidden rounded-[4rem] bg-neutral-900 border border-white/5 group cursor-pointer shadow-[0_45px_100px_rgba(0,0,0,0.7)] transition-all duration-700 hover:border-white/20"
        >
            <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 opacity-30 group-hover:opacity-60"
                style={{ backgroundImage: `radial-gradient(circle at top right, ${project.accent}22, transparent 90%)` }}
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

            <div className="absolute inset-0 flex flex-col p-16 justify-end z-10 bg-gradient-to-t from-black via-transparent to-transparent">
                <div className="transition-all duration-1000 transform translate-y-12 group-hover:translate-y-0">
                    <div className="flex items-center gap-5 mb-8">
                        <div className="h-px w-16 bg-white/20 group-hover:w-24 transition-all duration-1000" />
                        <span
                            className="text-[10px] font-black uppercase tracking-[0.8em] transition-all"
                            style={{ color: project.accent }}
                        >
                            Protocol Node
                        </span>
                    </div>

                    <h3 className="text-white text-5xl md:text-7xl font-black mb-12 tracking-[-0.04em] uppercase leading-[0.85] italic transition-all duration-700">
                        {project.title.split(' ')[0]}<br />
                        <span className="text-white/20 group-hover:text-white/40 transition-colors uppercase">{project.title.split(' ').slice(1).join(' ')}</span>
                    </h3>

                    <div className="flex items-center gap-10">
                        <div className="relative h-24 w-24 group-hover:scale-110 transition-transform duration-700">
                            <div
                                className="absolute inset-0 blur-[40px] opacity-0 group-hover:opacity-40 transition-opacity"
                                style={{ backgroundColor: project.accent }}
                            />
                            <div className="relative h-full w-full rounded-[2.5rem] bg-white flex items-center justify-center shadow-[0_20px_50px_rgba(255,255,255,0.2)] overflow-hidden group/btn">
                                <Play fill="black" className="ml-1.5 relative z-10" size={36} />
                                <div className="absolute inset-0 bg-gradient-to-tr from-white to-neutral-200 transition-transform duration-500 scale-150 rotate-45 translate-y-full group-hover/btn:translate-y-0" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-white font-black text-xs uppercase tracking-[0.3em] leading-none">Execute Node</span>
                            <span className="text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold">LIVE PREVIEW</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-14 right-14 opacity-5 group-hover:opacity-30 transition-opacity">
                <Maximize2 size={32} className="text-white" />
            </div>
        </motion.div>
    );
};

export default function DemoOne() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const projects: Project[] = [
        { id: "1", title: "Fragrance Pro", url: "https://perfume7.netlify.app/", accent: "#3b82f6" },
        { id: "2", title: "AhmadLux Elite", url: "https://ahmadlux.netlify.app/", accent: "#a955ff" },
        { id: "3", title: "ArchiContext Studio", url: "https://archic1.netlify.app/", accent: "#FF9966" },
        { id: "4", title: "InstaSocial V3", url: "https://insta3.netlify.app/", accent: "#2F80ED" },
        { id: "5", title: "Gastronome X", url: "https://rest7.netlify.app/", accent: "#FF6B6B" },
        { id: "6", title: "Weather Forecast", url: "https://weatherweb122.netlify.app/#/", accent: "#80FF72" },
    ];

    return (
        <div id="demo-archive" className="relative transition-all duration-700">
            <div className="py-40 relative overflow-hidden bg-transparent">
                <div className="absolute inset-0 pointer-events-none -z-10 opacity-30">
                    <div className="absolute top-1/4 left-1/4 w-[1000px] h-[1000px] bg-blue-600/10 blur-[250px] rounded-full animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[1000px] h-[1000px] bg-emerald-500/10 blur-[250px] rounded-full animate-pulse delay-1000" />
                </div>


                <div className="container mx-auto px-4 max-w-[95rem]">
                    <div className="mb-32 flex flex-col md:flex-row items-end justify-between gap-16">
                        <div className="relative pl-6">
                            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-white to-white/10 rounded-full" />
                            <h2 className="text-7xl md:text-[10rem] font-black text-white tracking-[-0.06em] uppercase leading-[0.7] italic transform scale-y-110 origin-left">
                                My<br /><span className="text-white/10 select-none">Projects</span>
                            </h2>
                            <p className="mt-10 text-[11px] font-black text-blue-400 uppercase tracking-[1em] opacity-80 decoration-blue-500 underline underline-offset-8">Production Deck 2.26</p>
                        </div>
                        <div className="flex gap-20 pb-6 border-b border-white/10">
                            <div className="text-left md:text-right">
                                <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.6em] mb-4 italic">Framework</p>
                                <p className="text-white font-black text-5xl tracking-tighter tabular-nums italic">NEXT-GEN</p>
                            </div>
                            <div className="text-left md:text-right">
                                <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.6em] mb-4 italic">Nodes</p>
                                <p className="text-white font-black text-5xl tracking-tighter tabular-nums italic">ACTIVE 06</p>
                            </div>
                        </div>
                    </div>

                    <Carousel
                        options={{ align: 'start', containScroll: 'trimSnaps', dragFree: true }}
                        slides={projects.map((project) => (
                            <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
                        ))}
                    />
                </div>
            </div >

            <ProjectPreview
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />

        </div >
    );
}
