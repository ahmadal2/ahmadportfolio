"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Server,
  GitBranch,
  Code,
  Globe
} from "lucide-react";
import LiquidFlipCard from "@/components/ui/flip-card";
import LogoLoop from './LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPostgresql, SiMongodb, SiDocker, SiGithub, SiVercel } from 'react-icons/si';

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const yScroll = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const skillCategories = [
    {
      title: "Frontend Engineering",
      subtitle: "UI/UX Systems",
      description: "Architecting hyper-responsive interfaces with a focus on fluid interactions and '2026' design aesthetics.",
      features: [
        "React & Next.js Systems",
        "Motion Design Frameworks",
        "Performance Optimization",
        "Typed State Orchestration"
      ],
      color: "#06b6d4",
      icon: Code
    },
    {
      title: "Backend Core",
      subtitle: "Scalable Infrastructure",
      description: "Building resilient microservices and high-concurrency server architectures for global scalability.",
      features: [
        "Distributed Computing",
        "Real-time Protocols",
        "Secure API Ecosystems",
        "Data Persistence Models"
      ],
      color: "#7c3aed",
      icon: Server
    },
    {
      title: "Software Evolution",
      subtitle: "DevOps & Cloud",
      description: "Orchestrating complex deployments with modern CI/CD pipelines and containerized environments.",
      features: [
        "Cloud Native Orchestration",
        "Edge Compute Deployment",
        "Zero-Trust Architectures",
        "Automated Scaling Logic"
      ],
      color: "#10b981",
      icon: GitBranch
    }
  ];

  const techLogos = [
    { node: <SiReact size={32} className="text-cyan-400" />, title: "React" },
    { node: <SiNextdotjs size={32} className="text-white" />, title: "Next.js" },
    { node: <SiTypescript size={32} className="text-blue-500" />, title: "TypeScript" },
    { node: <SiTailwindcss size={32} className="text-cyan-500" />, title: "Tailwind" },
    { node: <SiNodedotjs size={32} className="text-green-500" />, title: "Node.js" },
    { node: <SiPostgresql size={32} className="text-blue-400" />, title: "PostgreSQL" },
    { node: <SiMongodb size={32} className="text-green-600" />, title: "MongoDB" },
    { node: <SiDocker size={32} className="text-blue-500" />, title: "Docker" },
    { node: <SiGithub size={32} className="text-white" />, title: "GitHub" },
    { node: <SiVercel size={32} className="text-white" />, title: "Vercel" },
  ];

  return (
    <section id="skills" ref={containerRef} className="py-24 md:py-48 bg-transparent relative overflow-hidden">
      {/* 2026 Ambient Background System */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vh] bg-blue-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vh] bg-green-500/5 blur-[120px] rounded-full animate-pulse-slow" />

        {/* Scanning Line Effect */}
        <motion.div
          style={{ y: yScroll }}
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 opacity-20"
        />

        {/* Particle Grids */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150 brightness-150" />
      </div>

      <div className="max-w-[1401px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          style={{ opacity }}
          className="mb-32 flex flex-col md:flex-row items-end justify-between gap-12"
        >
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-500 to-transparent rounded-full" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[1em] mb-4 block">Capabilities Gallery</span>
            <h2 className="text-6xl md:text-[8rem] font-black text-white italic tracking-tighter leading-[0.85] uppercase">
              Technical<br /><span className="text-white/20">Arsenal</span>
            </h2>
          </div>

          <div className="text-right hidden md:block">
            <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Integrated Execution v2.26</span>
          </div>
        </motion.div>

        {/* 3-Column Flip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto mb-48">
          {skillCategories.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <LiquidFlipCard {...skill} />
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Nucleus Track */}
        <div className="pt-24 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16 px-4">
            <div className="flex items-center gap-6">
              <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Globe size={20} className="text-blue-500 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] block mb-1">Global Core</span>
                <span className="text-xs font-black text-white uppercase italic tracking-widest leading-none">Technological Tracks</span>
              </div>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-white/5 via-white/10 to-transparent hidden md:block mx-12" />
            <div className="text-right">
              <span className="text-[9px] font-black text-green-500/60 uppercase tracking-widest italic">Node-Synchronized / Optimized</span>
            </div>
          </div>

          <LogoLoop
            logos={techLogos}
            speed={80}
            direction="left"
            logoHeight={34}
            gap={48}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="rgba(0,0,0,0)"
          />
        </div>

        {/* Global Footer */}
        <div className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
          <div className="flex items-center gap-4 text-white">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping" />
            <span className="text-[8px] font-black uppercase tracking-[0.4em]">System Pulse: Stable</span>
          </div>
          <div className="flex gap-8">
            <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em]">Status: Cyber-Resilient</span>
            <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em]">v2.26.01</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;