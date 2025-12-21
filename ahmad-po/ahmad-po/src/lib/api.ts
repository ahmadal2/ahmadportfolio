// src/lib/api.ts
export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000"

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return res.json() as Promise<T>
}

// Project type definition
type Project = {
  id: number
  title: string
  description: string
  category: string
  image: string
  tags: string[]
  year: string
  link: string
  github: string
  featured: boolean
}

// Function to fetch projects
export async function getProjects(): Promise<Project[]> {
  // For now, we'll return mock data since we don't have a real API
  // In a real implementation, you would call:
  // return api<Project[]>("/api/projects")
  
  // Your three projects
  return Promise.resolve([
    {
      id: 1,
      title: "Insta1",
      category: "Social Media",
      description: "Instagram clone with modern UI and functionality.",
      image: "https://images.pexels.com/photos/3200910/pexels-photo-3200910.jpeg?auto=compress&cs=tinysrgb&w=1200",
      tags: ["React", "Firebase", "CSS3", "JavaScript"],
      year: "2024",
      link: "https://insta3.netlify.app",
      github: "#",
      featured: true
    },
    {
      id: 2,
      title: "Weather Site",
      category: "Weather App",
      description: "Live weather information with real-time updates and forecasts.",
      image: "https://images.pexels.com/photos/866586/pexels-photo-866586.jpeg?auto=compress&cs=tinysrgb&w=1200",
      tags: ["JavaScript", "API Integration", "CSS3", "HTML5"],
      year: "2024",
      link: "https://weatherweb122.netlify.app/#",
      github: "#",
      featured: true
    },
    {
      id: 3,
      title: "Ahmadlux",
      category: "Automotive Service",
      description: "Web platform for cars and mechanics connecting vehicle owners with service providers.",
      image: "https://images.pexels.com/photos/1007408/pexels-photo-1007408.jpeg?auto=compress&cs=tinysrgb&w=1200",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      year: "2024",
      link: "https://ahmadlux.netlify.app",
      github: "#",
      featured: false
    }
  ])
}