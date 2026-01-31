import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiFileText, FiBook, FiHeart, FiCloud, FiEdit, FiBarChart2 } from 'react-icons/fi';
import { Eye } from 'lucide-react';
import { LampDemo } from "@/components/ui/lamp";
import { GlassIcons } from "@/components/ui/glass-icons";
import { HoverSlider, TextStaggerHover, HoverSliderImageWrap, HoverSliderImage } from "@/components/ui/animated-slideshow";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  gradientFrom: string;
  gradientTo: string;
}

const Projects: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  const projects: Project[] = [
    {
      id: 1,
      title: "Instagram Clone",
      description: "Voll funktionsfähige Social-Media-Plattform mit Posts, Likes, Kommentaren und Authentifizierung.",
      technologies: ["React", "Firebase", "Tailwind CSS", "Context API", "Auth"],
      image: "images/pro-foto/insta1.png",
      liveUrl: "https://insta3.netlify.app/",
      gradientFrom: "#56CCF2",
      gradientTo: "#2F80ED"
    },
    {
      id: 2,
      title: "Carwebsite (AhmadLux)",
      description: "Premium Autohaus-Website mit eleganten Animationen, Fahrzeugkatalog, Detailseiten und Kontaktformularen. Responsive Design mit modernen UI-Elementen für eine luxuriöse Benutzererfahrung.",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "JavaScript", "CSS3"],
      image: "/images/pro-foto/ahmadlux.png",
      liveUrl: "https://ahmadlux.netlify.app/",
      gradientFrom: "#a955ff",
      gradientTo: "#ea51ff"
    },
    {
      id: 3,
      title: "Wetter-Website",
      description: "Moderne Wettervorhersage-Anwendung mit 5-Tage-Prognose, Standortsuche, interaktiven Karten und detaillierten Wetterdaten. Responsive Design mit dynamischen Hintergrundanimationen.",
      technologies: ["React", "OpenWeather API", "Tailwind CSS", "Geolocation", "Chart.js"],
      image: "images/pro-foto/weather.png",
      liveUrl: "https://weatherweb122.netlify.app/#/",
      gradientFrom: "#80FF72",
      gradientTo: "#7EE8FA"
    },
    {
      id: 4,
      title: "Architektur / Design-Projekt",
      description: "Portfoliowebsite für Architektur und Design mit Projektgalerien, 3D-Visualisierungen, modernem Layout und ansprechenden Animationen. Fokus auf minimalistisches und elegantes Design.",
      technologies: ["React", "CSS3", "Tailwind CSS", "Design Systems", "Responsive Design"],
      image: "/images/pro-foto/archic1.png",
      liveUrl: "https://archic1.netlify.app/",
      gradientFrom: "#FF9966",
      gradientTo: "#FF5E62"
    },
    {
      id: 5,
      title: "Restaurant-Website",
      description: "Vollständige Restaurant-Website mit Online-Reservierungssystem, Speisekarte, Bestellfunktion, Kundenbewertungen und Zahlungsintegration. Backend für Reservierungsmanagement und Bestellabwicklung.",
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "Payment API", "Reservation System"],
      image: "/images/pro-foto/rest7.png",
      liveUrl: "https://rest7.netlify.app/",
      gradientFrom: "#FF6B6B",
      gradientTo: "#4ECDC4"
    },
  ];

  return (
    <>
      {/* Projects Portfolio Section */}
      <section id="portfolio" ref={ref} className="py-16 md:py-32 section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none" />

        <div className="container-width relative px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl md:text-section font-bold text-white drop-shadow-2xl mb-4 md:mb-6">
              Meine Projekte
            </h2>
            <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
              Hier sind einige meiner neuesten Projekte, die meine Fähigkeiten in Full-Stack-Entwicklung,
              UI/UX-Design und Problemlösung demonstrieren.
            </p>
          </motion.div>

          {/* HoverSlider Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-4 md:p-8"
          >
            <HoverSlider className="min-h-[400px] md:min-h-[500px] place-content-center p-0 md:px-0">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">

                {/* Project Titles */}
                <div className="flex flex-col space-y-3 md:space-y-4 w-full md:w-1/2">
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-2">Projekt-Portfolio</h4>
                  <p className="text-white/80 mb-6 text-sm md:text-lg">
                    Fahren Sie mit der Maus über die Projektnamen, um detaillierte Vorschauen zu sehen.
                  </p>
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      onMouseEnter={() => setHoveredIndex(index)}
                    >
                      <TextStaggerHover
                        index={index}
                        className="cursor-pointer text-lg md:text-2xl font-bold uppercase tracking-tighter text-white hover:text-blue-400 transition-colors duration-300"
                        text={project.title.toLowerCase()}
                      />
                    </div>
                  ))}
                </div>

                {/* Preview Images */}
                <div className="relative w-full md:w-1/2">
                  <HoverSliderImageWrap className="rounded-2xl overflow-hidden border-0 shadow-2xl">
                    {projects.map((project, index) => (
                      <HoverSliderImage
                        key={project.id}
                        index={index}
                        imageUrl={project.image}
                        src={project.image}
                        alt={project.title}
                        className="size-full max-h-64 md:max-h-96 object-cover"
                        loading="eager"
                        decoding="async"
                      >
                        {/* Eye Icon - Top Right Corner */}
                        {project.liveUrl && (
                          <div className="absolute top-3 md:top-4 right-3 md:right-4 z-20">
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 hover:bg-black/80 transition-colors duration-200 shadow-lg border border-white/30"
                              aria-label={`Live Demo öffnen: ${project.title}`}
                            >
                              <Eye size={16} className="text-white md:w-4 md:h-4" />
                            </a>
                          </div>
                        )}
                      </HoverSliderImage>
                    ))}
                  </HoverSliderImageWrap>

                  {/* Project Info - Below Image with Glassmorphism */}
                  <motion.div
                    key={`info-${hoveredIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="relative mt-4 md:mt-6"
                  >
                    {/* Glow Effect */}
                    <div className="pointer-events-none absolute inset-x-2 md:inset-x-3 -bottom-4 md:-bottom-6 top-[85%] md:top-[90%] rounded-[16px] md:rounded-[20px] bg-blue-400/20 blur-lg md:blur-xl shadow-[0_10px_20px_-4px_rgba(59,130,246,0.4)] md:shadow-[0_20px_40px_-8px_rgba(59,130,246,0.4)] z-0" />

                    {/* Glassmorphism Card */}
                    <div className={
                      "relative z-10 w-full overflow-hidden rounded-[16px] md:rounded-[20px] " +
                      "bg-white/10 dark:bg-white/5 backdrop-blur-xl " +
                      "border border-white/20 border-b-white/10 " +
                      "shadow-lg shadow-black/20 hover:shadow-black/10 " +
                      "transition-all duration-300"
                    }>
                      <div className="p-4 md:p-6">
                        {/* Project Status */}
                        <div className="mb-3 md:mb-4 flex items-center justify-between text-xs md:text-sm text-white/70">
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <span className="inline-block h-2 w-2 md:h-2.5 md:w-2.5 rounded-full animate-pulse bg-emerald-400" />
                            <span className="select-none">Projekt verfügbar</span>
                          </div>
                          <div className="flex items-center gap-1.5 md:gap-2 opacity-80">
                            <Eye className="h-3 w-3 md:h-4 md:w-4" />
                            <span>Live Preview</span>
                          </div>
                        </div>

                        {/* Project Title & Description */}
                        <div className="mb-4 md:mb-6 text-center">
                          <h5 className="text-white font-bold text-xl md:text-2xl mb-2 md:mb-3 tracking-tight">
                            {projects[hoveredIndex].title}
                          </h5>
                          <p className="text-white/90 text-sm md:text-base leading-relaxed px-2">
                            {projects[hoveredIndex].description}
                          </p>
                        </div>

                        {/* Technologies Section */}
                        <div className="mb-4 md:mb-6">
                          <h6 className="text-white/90 font-semibold text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4">
                            Verwendete Technologien:
                          </h6>
                          <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center">
                            {projects[hoveredIndex].technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1.5 md:px-4 md:py-2 bg-white/15 backdrop-blur-md rounded-full text-xs md:text-sm text-white font-medium border border-white/30 shadow-lg hover:bg-white/25 hover:scale-105 transition-all duration-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Live Demo Button with Gradient Animation */}
                        {projects[hoveredIndex].liveUrl && (
                          <div className="flex justify-center">
                            <a
                              href={projects[hoveredIndex].liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                '--gradient-from': ' #80FF72',
                                '--gradient-to': '#7EE8FA'
                              } as React.CSSProperties}
                              className="relative w-[60px] h-[40px] md:w-[80px] md:h-[50px] bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-500 hover:w-[180px] md:hover:w-[240px] hover:shadow-none group cursor-pointer border border-white/30"
                            >
                              {/* Gradient background on hover */}
                              <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
                              {/* Blur glow */}
                              <span className="absolute top-[2px] md:top-[4px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[10px] md:blur-[15px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-60"></span>
                              {/* Icon */}
                              <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0">
                                <Eye size={14} className="text-white md:w-4 md:h-4" />
                              </span>
                              {/* Text */}
                              <span className="absolute text-white font-bold text-xs md:text-sm transition-all duration-500 scale-0 group-hover:scale-100 delay-150 whitespace-nowrap">
                                Live Demo besuchen
                              </span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </HoverSlider>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Projects Section */}
      <section className="py-16 md:py-32 relative overflow-hidden px-4">
        <div className="container-width">
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
              <GlassIcons items={[
                { icon: <FiFileText />, color: 'blue', label: 'E-Commerce Platform', comment: 'New features coming soon!' },
                { icon: <FiCloud />, color: 'indigo', label: 'Cloud Dashboard', comment: 'Coming Soon' },
                { icon: <FiBarChart2 />, color: 'green', label: 'Analytics Suite', comment: 'Coming Soon' },
                { icon: <FiHeart />, color: 'red', label: 'Health Tracker', comment: 'Coming Soon' },
                { icon: <FiBook />, color: 'purple', label: 'Learning App', comment: 'Coming Soon' },
                { icon: <FiEdit />, color: 'orange', label: 'Content Editor', comment: 'Coming Soon' },
              ]} className="custom-class" />
            </div>
          </div>
        </div>
      </section>

      {/* Lamp Section - UNTER Projects */}
      <section className="relative">
        <LampDemo />

      </section>

      {/* Are you ready? Your website is the next */}

    </>
  );
};

export default Projects;