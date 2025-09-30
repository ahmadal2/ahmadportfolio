import React from "react";
import { 
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover 
} from "@/components/ui/animated-slideshow";
import { Code2, Database, Cloud, Palette, Smartphone } from "lucide-react";

// Skill data with relevant images
const SKILLS = [
  {
    id: "skill-1",
    title: "Frontend Development",
    description: "Creating responsive and interactive user interfaces with modern frameworks",
    imageUrl: "https://images.unsplash.com/photo-1654618977232-a6c6dea9d1e8?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: Code2,
  },
  {
    id: "skill-2",
    title: "Backend Development",
    description: "Building scalable server-side applications and APIs with robust architecture",
    imageUrl: "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: Database,
  },
  {
    id: "skill-3",
    title: "UI/UX Design",
    description: "Designing intuitive user experiences with modern design principles",
    imageUrl: "https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: Palette,
  },
  {
    id: "skill-4",
    title: "Mobile Development",
    description: "Building cross-platform mobile applications with native-like performance",
    imageUrl: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: Smartphone,
  },
  {
    id: "skill-5",
    title: "Cloud Solutions",
    description: "Deploying and managing scalable cloud infrastructure and services",
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: Cloud,
  },
];

const AnimatedSkillsDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
            My Skills
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Hover over each skill to see detailed information and visual representation
          </p>
        </div>

        <HoverSlider className="min-h-svh place-content-center p-6 md:px-12">
          <div className="flex flex-wrap items-center justify-evenly gap-6 md:gap-12">
            <div className="flex flex-col space-y-2 md:space-y-4">
              {SKILLS.map((skill, index) => (
                <div key={skill.id} className="flex items-center gap-3">
                  <skill.icon className="text-blue-400 w-5 h-5" />
                  <TextStaggerHover
                    key={skill.title}
                    index={index}
                    className="cursor-pointer text-2xl md:text-4xl font-bold uppercase tracking-tighter"
                    text={skill.title}
                  />
                </div>
              ))}
            </div>
            
            <div className="relative">
              <HoverSliderImageWrap className="rounded-2xl overflow-hidden border-2 border-gray-700 shadow-2xl shadow-blue-500/20">
                {SKILLS.map((skill, index) => (
                  <div key={skill.id} className="relative">
                    <HoverSliderImage
                      index={index}
                      imageUrl={skill.imageUrl}
                      src={skill.imageUrl}
                      alt={skill.title}
                      className="size-full max-h-96 object-cover"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-xl font-bold text-white">{skill.title}</h3>
                      <p className="text-gray-300 text-sm mt-1">{skill.description}</p>
                    </div>
                  </div>
                ))}
              </HoverSliderImageWrap>
            </div>
          </div>
        </HoverSlider>
      </div>
    </div>
  );
};

export default AnimatedSkillsDemo;