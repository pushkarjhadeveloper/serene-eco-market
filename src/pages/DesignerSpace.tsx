import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  PenTool, 
  Palette, 
  Layers, 
  Box, 
  Brain, 
  Scan, 
  User, 
  Upload,
  Download,
  FolderOpen,
  Eye,
  Share2,
  ExternalLink,
  ArrowUpDown,
  Clock
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  tool: string;
  url: string;
  timestamp: Date;
}

const DesignerSpace = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    badges: false,
    tools: false,
    workspace: false,
    cta: false
  });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target.getAttribute('data-section');
            if (target) {
              setIsVisible(prev => ({ ...prev, [target]: true }));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe sections with a slight delay for staggered animation
    setTimeout(() => setIsVisible(prev => ({ ...prev, hero: true })), 100);
    
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const toolCategories = {
    moodboard: {
      title: "AI-Based Moodboard Generators",
      icon: <Palette className="h-6 w-6" />,
      tools: [
        {
          name: "Canva AI",
          description: "AI-powered design platform with smart suggestions",
          url: "https://canva.com",
          features: ["Smart templates", "AI image generation", "Brand kit integration"],
        },
        {
          name: "Morpholio Board",
          description: "Professional moodboard creation for designers",
          url: "https://morpholio.com/board",
          features: ["Real-time collaboration", "Material libraries", "Client presentation mode"],
        },
        {
          name: "Foyr Neo",
          description: "3D design and moodboard visualization",
          url: "https://foyr.com",
          features: ["3D mood scenes", "Virtual staging", "Photorealistic renders"],
        }
      ]
    },
    assistant: {
      title: "Virtual Design Advisors",
      icon: <Brain className="h-6 w-6" />,
      tools: [
        {
          name: "GPT-4o Design Plugin",
          description: "Advanced AI design consultant",
          url: "https://openai.com/gpt-4",
          features: ["Style recommendations", "Trend analysis", "Quick sketch generation"],
        },
        {
          name: "Claude Design Assistant",
          description: "Claude-powered design guidance",
          url: "https://claude.ai",
          features: ["Design critiques", "Creative brainstorming", "Project planning"],
        }
      ]
    },
    modeling: {
      title: "3D Modeling & Rendering",
      icon: <Box className="h-6 w-6" />,
      tools: [
        {
          name: "Autodesk Revit (with AI plugins)",
          description: "Professional BIM software with AI enhancements",
          url: "https://autodesk.com/revit",
          features: ["Smart building components", "Energy analysis", "Collaborative design"],
        },
        {
          name: "SketchUp 2025 + Enscape",
          description: "Quick modeling with real-time VR rendering",
          url: "https://sketchup.com",
          features: ["Real-time VR preview", "Quick prototyping", "Material visualization"],
        },
        {
          name: "Blender (with AI add-ons)",
          description: "Open-source 3D creation suite",
          url: "https://blender.org",
          features: ["Custom interior modeling", "AI-assisted texturing", "Photorealistic rendering"],
        },
        {
          name: "D5 Render",
          description: "Real-time photorealistic rendering",
          url: "https://d5render.com",
          features: ["Instant visualization", "Weather simulation", "360° panoramas"],
        },
        {
          name: "Lumion 2025",
          description: "Architectural visualization software",
          url: "https://lumion.com",
          features: ["Quick rendering", "Animation tools", "Landscape design"],
        },
        {
          name: "Rhino + Grasshopper",
          description: "Parametric design platform",
          url: "https://rhino3d.com",
          features: ["Complex geometry", "Parametric modeling", "Algorithm-based design"],
        }
      ]
    },
    measurement: {
      title: "Measurement & Scanning Tools",
      icon: <Scan className="h-6 w-6" />,
      tools: [
        {
          name: "Magicplan",
          description: "AI-powered floor plan creation",
          url: "https://magicplan.app",
          features: ["Auto room detection", "Furniture placement", "Area calculations"],
        },
        {
          name: "CubiCasa",
          description: "Property scanning and modeling",
          url: "https://cubicasa.com",
          features: ["3D space scanning", "Instant floor plans", "Property analytics"],
        }
      ]
    }
  };

  const handleToolLaunch = (toolName: string, url: string) => {
    setSelectedTool(toolName);
    
    // Track the project
    const newProject: Project = {
      id: Date.now().toString(),
      name: `${toolName} Project`,
      tool: toolName,
      url: url,
      timestamp: new Date()
    };
    
    setRecentProjects(prev => [newProject, ...prev.slice(0, 4)]); // Keep only 5 recent projects
    window.open(url, '_blank');
  };

  const handleRegistration = () => {
    setIsRegistered(true);
  };

  const RegistrationDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="bg-eco-sage hover:bg-eco-moss text-white transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-eco-moss to-eco-sage opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <User className="h-4 w-4 mr-2 relative z-10" />
          <span className="relative z-10">Register as Designer</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-eco-cream border-eco-sand">
        <DialogHeader>
          <DialogTitle className="text-eco-moss">Designer Registration</DialogTitle>
          <DialogDescription className="text-eco-bark">
            Join our professional designer community and access premium features.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-eco-moss">Full Name</label>
            <input className="w-full p-2 border border-eco-sand rounded-md bg-white focus:border-eco-sage focus:ring-1 focus:ring-eco-sage transition-colors" placeholder="Enter your full name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-eco-moss">Professional Title</label>
            <input className="w-full p-2 border border-eco-sand rounded-md bg-white focus:border-eco-sage focus:ring-1 focus:ring-eco-sage transition-colors" placeholder="e.g., Interior Designer, Architect" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-eco-moss">Years of Experience</label>
            <select className="w-full p-2 border border-eco-sand rounded-md bg-white focus:border-eco-sage focus:ring-1 focus:ring-eco-sage transition-colors">
              <option>Select experience level</option>
              <option>0-2 years</option>
              <option>3-5 years</option>
              <option>6-10 years</option>
              <option>10+ years</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-eco-moss">Specialization</label>
            <select className="w-full p-2 border border-eco-sand rounded-md bg-white focus:border-eco-sage focus:ring-1 focus:ring-eco-sage transition-colors">
              <option>Select specialization</option>
              <option>Interior Design</option>
              <option>Architecture</option>
              <option>3D Visualization</option>
              <option>Landscape Design</option>
              <option>Other</option>
            </select>
          </div>
          <Button 
            onClick={handleRegistration}
            className="w-full bg-eco-sage hover:bg-eco-moss text-white transition-colors duration-300"
          >
            Complete Registration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const rotatingTexts = [
    "Professional Tools",
    "Creative Solutions", 
    "Design Excellence"
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-eco-cream">
        {/* Hero Section with Enhanced Animations */}
        <div className="eco-container py-16">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Shiny Gradient Text */}
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 relative">
              <span 
                className="bg-gradient-to-r from-eco-sage via-eco-moss to-eco-leaf bg-clip-text text-transparent animate-pulse relative shine-text"
              >
                Designer Space
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-eco-sage via-eco-moss to-eco-leaf bg-clip-text text-transparent opacity-50 blur-sm -z-10"></div>
            </h1>
            
            {/* Variable Proximity Text */}
            <div className="space-y-4 max-w-3xl mx-auto mb-8">
              <p className="text-xl text-eco-moss transition-all duration-700 hover:scale-105 hover:text-eco-moss/80">
                Professional design tools and workspace for architects,
              </p>
              <p className="text-lg text-eco-bark transition-all duration-700 delay-100 hover:scale-105 hover:text-eco-bark/80">
                interior designers, and freelancers.
              </p>
              <p className="text-base text-eco-stone transition-all duration-700 delay-200 hover:scale-105 hover:text-eco-stone/80">
                Access industry-leading tools and manage your projects seamlessly.
              </p>
            </div>
            
            {/* Rotating Text Badges */}
            <div 
              className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-1000 delay-300 ${isVisible.badges ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-section="badges"
            >
              <Badge variant="outline" className="px-4 py-2 border-2 border-eco-sage text-eco-sage hover:scale-105 transition-transform">
                <PenTool className="h-4 w-4 mr-2" />
                <span className="inline-block transition-all duration-500">
                  {rotatingTexts[currentTextIndex]}
                </span>
              </Badge>
              <Badge variant="outline" className="px-4 py-2 border-2 border-eco-moss text-eco-moss hover:scale-105 transition-transform">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <span className="inline-block animate-pulse">File Transfer</span>
              </Badge>
              <Badge variant="outline" className="px-4 py-2 border-2 border-eco-leaf text-eco-leaf hover:scale-105 transition-transform">
                <FolderOpen className="h-4 w-4 mr-2" />
                <span className="inline-block animate-bounce">Portfolio Management</span>
              </Badge>
            </div>
            
            {!isRegistered && <RegistrationDialog />}
          </div>

          {/* Recent Projects Section */}
          {recentProjects.length > 0 && (
            <div className="mb-16 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-eco-sand">
              <h3 className="font-serif text-2xl font-bold mb-4 flex items-center gap-3 text-eco-moss">
                <Clock className="h-6 w-6 animate-spin" />
                Recent Work
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentProjects.map((project, index) => (
                  <Card 
                    key={project.id} 
                    className="hover:shadow-md transition-all duration-300 hover:scale-105 border-eco-sand bg-eco-cream"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: 'fade-in 0.6s ease-out forwards'
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-eco-moss">{project.name}</h4>
                          <p className="text-sm text-eco-bark">{project.tool}</p>
                          <p className="text-xs text-eco-stone">{project.timestamp.toLocaleDateString()}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(project.url, '_blank')}
                          className="border-eco-sage text-eco-sage hover:bg-eco-sage hover:text-white transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Tool Categories */}
          <div 
            className={`transition-all duration-1000 delay-500 ${isVisible.tools ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-section="tools"
          >
            <Tabs defaultValue="moodboard" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-white/80 backdrop-blur-sm shadow-lg border border-eco-sand">
                {Object.entries(toolCategories).map(([key, category]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className="flex items-center gap-2 text-eco-bark data-[state=active]:text-white data-[state=active]:bg-eco-sage hover:scale-105 transition-all duration-300"
                  >
                    <div className="animate-pulse">{category.icon}</div>
                    <span className="hidden sm:inline">{category.title.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(toolCategories).map(([key, category]) => (
                <TabsContent key={key} value={key} className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="font-serif text-3xl font-bold mb-4 flex items-center justify-center gap-3 text-eco-moss">
                      <div className="animate-bounce">{category.icon}</div>
                      {category.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.tools.map((tool, index) => (
                      <Card 
                        key={index} 
                        className="hover:shadow-xl hover:scale-105 transition-all duration-300 border-eco-sand overflow-hidden group bg-white/90 backdrop-blur-sm"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          animation: 'fade-in 0.6s ease-out forwards'
                        }}
                      >
                        <CardHeader className="bg-eco-cream/60">
                          <CardTitle className="flex items-center justify-between">
                            <span className="text-eco-moss">{tool.name}</span>
                            <ExternalLink className="h-4 w-4 text-eco-stone group-hover:text-eco-sage transition-colors animate-pulse" />
                          </CardTitle>
                          <CardDescription className="text-eco-bark">
                            {tool.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <ul className="space-y-2 mb-4">
                            {tool.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-eco-bark">
                                <div className="w-2 h-2 rounded-full bg-eco-sage animate-pulse" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Button 
                            onClick={() => handleToolLaunch(tool.name, tool.url)}
                            className="w-full bg-eco-sage hover:bg-eco-moss text-white hover:scale-105 transition-all duration-300"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open Tool
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Workspace Section */}
          <div 
            className={`mt-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-eco-sand p-8 transition-all duration-1000 delay-700 ${isVisible.workspace ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-section="workspace"
          >
            <h3 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3 text-eco-moss">
              <Layers className="h-6 w-6 animate-spin" />
              Your Professional Workspace
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-eco-sand hover:shadow-lg transition-all duration-300 hover:scale-105 bg-eco-cream">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-eco-moss">
                    <ArrowUpDown className="h-5 w-5 animate-bounce" />
                    File Transfer Hub
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-eco-bark mb-4">Import projects from other platforms seamlessly</p>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full justify-start border-eco-sand hover:bg-eco-sage hover:text-white hover:scale-105 transition-all">
                      <Upload className="h-4 w-4 mr-2" />
                      Import from AutoCAD
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-eco-sand hover:bg-eco-sage hover:text-white hover:scale-105 transition-all">
                      <Upload className="h-4 w-4 mr-2" />
                      Import from SketchUp
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-eco-sand hover:bg-eco-sage hover:text-white hover:scale-105 transition-all">
                      <Upload className="h-4 w-4 mr-2" />
                      Import from Revit
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-eco-sand hover:shadow-lg transition-all duration-300 hover:scale-105 bg-eco-cream">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-eco-moss">
                    <FolderOpen className="h-5 w-5 animate-pulse" />
                    Portfolio Manager
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-eco-bark mb-4">Showcase your professional work</p>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full justify-start border-eco-sand hover:bg-eco-sage hover:text-white hover:scale-105 transition-all">
                      <Eye className="h-4 w-4 mr-2" />
                      View Portfolio
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-eco-sand hover:bg-eco-sage hover:text-white hover:scale-105 transition-all">
                      <Upload className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-eco-sand hover:bg-eco-sage hover:text-white hover:scale-105 transition-all">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share with Clients
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-eco-sand hover:shadow-lg transition-all duration-300 hover:scale-105 bg-eco-cream">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-eco-moss">
                    <Layers className="h-5 w-5 animate-spin" />
                    Project Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-eco-bark mb-4">Organize and track your projects</p>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full justify-start border-eco-sand hover:bg-eco-sage hover:text-white hover:scale-105 transition-all">
                      <FolderOpen className="h-4 w-4 mr-2" />
                      Active Projects
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-eco-sand hover:bg-eco-sage hover:text-white hover:scale-105 transition-all">
                      <Download className="h-4 w-4 mr-2" />
                      Export Files
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-eco-sand hover:bg-eco-sage hover:text-white hover:scale-105 transition-all">
                      <Share2 className="h-4 w-4 mr-2" />
                      Client Collaboration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div 
            className={`mt-16 text-center rounded-2xl p-8 text-white shadow-2xl transition-all duration-1000 delay-900 bg-gradient-to-r from-eco-sage to-eco-moss ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-section="cta"
          >
            <h3 className="font-serif text-3xl font-bold mb-4 animate-pulse">Elevate Your Design Practice</h3>
            <p className="text-xl mb-6 opacity-90">
              Access professional tools and streamline your workflow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-eco-moss hover:bg-eco-cream hover:scale-105 transition-all duration-300"
              >
                Get Premium Access
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-eco-moss hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .shine-text {
          background-size: 200% 100%;
          animation: shine 3s ease-in-out infinite;
        }
        
        @keyframes shine {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </Layout>
  );
};

export default DesignerSpace;
