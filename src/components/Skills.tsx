import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Database, Cloud, Zap, Code, Server, Smartphone, Palette, GitBranch, Shield, CheckCircle, Award, TrendingUp } from "lucide-react";
import LogoLoop from './LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import { FiFileText, FiBook, FiHeart, FiCloud, FiEdit, FiBarChart2 } from 'react-icons/fi';
import { 
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover 
} from "@/components/ui/animated-slideshow";
import CardFlip from "@/components/ui/flip-card";
import { GlassIcons } from "@/components/ui/glass-icons";

const Skills: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [viewMode, setViewMode] = useState<"traditional" | "animated">("traditional");

  // Modern skill categories for flip cards
  const flipCardSkills = [
    {
      title: "Frontend Development",
      subtitle: "Modern Web Applications",
      description: "Building responsive and interactive user interfaces with cutting-edge frameworks and libraries.",
      features: [
        "React & Next.js Mastery",
        "TypeScript Expertise",
        "TailwindCSS & Styled Components",
        "Framer Motion Animations"
      ],
      color: "#06b6d4",
      icon: Code
    },
    {
      title: "Backend Architecture",
      subtitle: "Scalable Server Solutions",
      description: "Designing robust server-side applications with secure APIs and efficient database management.",
      features: [
        "Node.js & Express",
        "RESTful APIs & GraphQL",
        "MongoDB & PostgreSQL",
        "Authentication & Security"
      ],
      color: "#7c3aed",
      icon: Server
    },
    {
      title: "DevOps & Tools",
      subtitle: "Modern Development Workflow",
      description: "Streamlining development processes with automation, CI/CD pipelines, and cloud deployment.",
      features: [
        "Git & GitHub Workflows",
        "Docker & CI/CD",
        "Vercel & Netlify Deployment",
        "Testing & Debugging"
      ],
      color: "#10b981",
      icon: GitBranch
    }
  ];

  // Technology logos for the LogoLoop component
  const techLogos = [
    { node: <SiReact size={48} className="text-cyan-400" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs size={48} className="text-white" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript size={48} className="text-blue-500" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss size={48} className="text-cyan-500" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  ];

  // Glass icons for coming soon projects with comments
  const comingSoonProjects = [
    { icon: <FiFileText />, color: 'blue', label: 'E-Commerce Platform', comment: 'New features coming soon!' },
    { icon: <FiCloud />, color: 'indigo', label: 'Cloud Dashboard', comment: 'Coming Soon' },
    { icon: <FiBarChart2 />, color: 'green', label: 'Analytics Suite', comment: 'Coming Soon' },
    { icon: <FiHeart />, color: 'red', label: 'Health Tracker', comment: 'Coming Soon' },
    { icon: <FiBook />, color: 'purple', label: 'Learning App', comment: 'Coming Soon' },
    { icon: <FiEdit />, color: 'orange', label: 'Content Editor', comment: 'Coming Soon' },
  ];

  // Skill data for animated slideshow
  const animatedSkills = [
    {
      id: "skill-1",
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces with modern frameworks like React and Next.js, utilizing TypeScript for type safety and TailwindCSS for rapid UI development.",
      imageUrl: "https://images.unsplash.com/photo-1654618977232-a6c6dea9d1e8?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "skill-2",
      title: "Backend Architecture",
      description: "Designing scalable server-side applications with Node.js and Express, implementing RESTful APIs, and working with both SQL and NoSQL databases.",
      imageUrl: "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "skill-3",
      title: "UI/UX Design",
      description: "Designing intuitive user experiences with modern design principles, using tools like Figma and Adobe XD to create wireframes and prototypes.",
      imageUrl: "https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "skill-4",
      title: "Mobile Development",
      description: "Building cross-platform mobile applications with native-like performance using React Native and other modern mobile development frameworks.",
      imageUrl: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "skill-5",
      title: "Cloud Solutions",
      description: "Deploying and managing scalable cloud infrastructure and services using AWS, Docker, and other cloud technologies.",
      imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="py-16 md:py-32 bg-warm-bg dark:bg-gray-900 relative overflow-hidden px-4"
    >
      <div className="container-width space-y-12 md:space-y-20">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-center mb-8 md:mb-16"
        >
          My Skills
        </motion.h2>

        {/* Toggle Button with clear indication of current view */}
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setViewMode("traditional")}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                viewMode === "traditional" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Traditional
            </button>
           
          </div>
          <p className="text-white/70 text-xs md:text-sm">
            Currently viewing: <span className="font-semibold text-white">{viewMode === "traditional" ? "Traditional Skills" : "Animated Skills Slideshow"}</span>
          </p>
        </div>

        {/* View Content */}
        {viewMode === "traditional" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {flipCardSkills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <CardFlip
                  title={skill.title}
                  subtitle={skill.subtitle}
                  description={skill.description}
                  features={skill.features}
                  color={skill.color}
                />
              </motion.div>
            ))}
          </div>
        )}

        {viewMode === "animated" && (
          <div className="flex justify-center">
            <div className="w-full max-w-6xl rounded-2xl overflow-hidden border-2 border-gray-700 shadow-2xl shadow-blue-500/20">
              <HoverSlider className="min-h-[50vh] md:min-h-[70vh] place-content-center p-4 md:p-6 md:px-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
                  <div className="flex flex-col space-y-3 md:space-y-4 w-full md:w-1/2">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">My Technical Expertise</h3>
                    <p className="text-white/80 mb-4 md:mb-6 text-sm md:text-base">
                      Hover over the skill categories to see detailed information and visual representations of my expertise areas.
                    </p>
                    {animatedSkills.map((skill, index) => (
                      <TextStaggerHover
                        key={skill.title}
                        index={index}
                        className="cursor-pointer text-lg md:text-2xl font-bold uppercase tracking-tighter text-white hover:text-blue-400 transition-colors"
                        text={skill.title}
                      />
                    ))}
                  </div>
                  
                  <div className="relative w-full md:w-1/2">
                    <HoverSliderImageWrap className="rounded-2xl overflow-hidden border-2 border-gray-700 shadow-2xl shadow-blue-500/20">
                      {animatedSkills.map((skill, index) => (
                        <div key={skill.id} className="relative">
                          <HoverSliderImage
                            index={index}
                            imageUrl={skill.imageUrl}
                            src={skill.imageUrl}
                            alt={skill.title}
                            className="size-full max-h-64 md:max-h-96 object-cover"
                            loading="eager"
                            decoding="async"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
                            <h3 className="text-lg md:text-xl font-bold text-white">{skill.title}</h3>
                            <p className="text-gray-300 text-xs md:text-sm mt-1">{skill.description}</p>
                          </div>
                        </div>
                      ))}
                    </HoverSliderImageWrap>
                  </div>
                </div>
              </HoverSlider>
            </div>
          </div>
        )}

        {/* Logo Loop Component */}
        <div className="mt-12 md:mt-20">
          <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-6 md:mb-8">
            Technologies I Work With
          </h3>
          <div className="flex justify-center">
            <div style={{ height: '120px', position: 'relative', overflow: 'hidden' }} className="w-full max-w-4xl">
              <LogoLoop
                logos={techLogos}
                speed={120}
                direction="left"
                logoHeight={32}
                gap={20}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor="#000000"
                ariaLabel="Technology partners"
              />
            </div>
          </div>
        </div>

        {/* Coming Soon Projects Section */}
        <div className="mt-16 md:mt-32">
          <div className="text-center mb-10 md:mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-3 md:mb-4">
              Coming Soon Projects
            </h3>
            <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto px-4">
              Exciting new projects are in development. Stay tuned for innovative solutions coming your way.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <GlassIcons items={comingSoonProjects} className="custom-class" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;