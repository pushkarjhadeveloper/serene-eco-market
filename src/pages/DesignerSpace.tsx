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
        <Button style={{ backgroundColor: '#03A6A1' }} className="hover:opacity-90 text-white transform hover:scale-105 transition-all duration-300">
          <User className="h-4 w-4 mr-2" />
          Register as Designer
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle style={{ color: '#03A6A1' }}>Designer Registration</DialogTitle>
          <DialogDescription className="text-gray-600">
            Join our professional designer community and access premium features.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: '#03A6A1' }}>Full Name</label>
            <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter your full name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: '#03A6A1' }}>Professional Title</label>
            <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Interior Designer, Architect" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: '#03A6A1' }}>Years of Experience</label>
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option>Select experience level</option>
              <option>0-2 years</option>
              <option>3-5 years</option>
              <option>6-10 years</option>
              <option>10+ years</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: '#03A6A1' }}>Specialization</label>
            <select className="w-full p-2 border border-gray-300 rounded-md">
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
            className="w-full text-white hover:opacity-90"
            style={{ backgroundColor: '#03A6A1' }}
          >
            Complete Registration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-[#FFE3BB]">
        {/* Hero Section with Gradient Text */}
        <div className="eco-container py-16">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#03A6A1] via-[#FF4F0F] to-[#FFA673] bg-clip-text text-transparent animate-pulse">
              Designer Space
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Professional design tools and workspace for architects, interior designers, and freelancers. 
              Access industry-leading tools and manage your projects seamlessly.
            </p>
            
            <div 
              className={`flex flex-wrap justify-center gap-4 mb-8 transition-all duration-1000 delay-300 ${isVisible.badges ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-section="badges"
            >
              <Badge variant="outline" className="px-4 py-2 border-2 hover:scale-105 transition-transform" style={{ color: '#03A6A1', borderColor: '#03A6A1' }}>
                <PenTool className="h-4 w-4 mr-2" />
                Professional Tools
              </Badge>
              <Badge variant="outline" className="px-4 py-2 border-2 hover:scale-105 transition-transform" style={{ color: '#FF4F0F', borderColor: '#FF4F0F' }}>
                <ArrowUpDown className="h-4 w-4 mr-2" />
                File Transfer
              </Badge>
              <Badge variant="outline" className="px-4 py-2 border-2 hover:scale-105 transition-transform" style={{ color: '#FFA673', borderColor: '#FFA673' }}>
                <FolderOpen className="h-4 w-4 mr-2" />
                Portfolio Management
              </Badge>
            </div>
            
            {!isRegistered && <RegistrationDialog />}
          </div>

          {/* Recent Projects Section */}
          {recentProjects.length > 0 && (
            <div className="mb-16 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="font-serif text-2xl font-bold mb-4 flex items-center gap-3" style={{ color: '#03A6A1' }}>
                <Clock className="h-6 w-6" />
                Recent Work
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentProjects.map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">{project.name}</h4>
                          <p className="text-sm text-gray-600">{project.tool}</p>
                          <p className="text-xs text-gray-500">{project.timestamp.toLocaleDateString()}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(project.url, '_blank')}
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
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
                {Object.entries(toolCategories).map(([key, category]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key}
                    className="flex items-center gap-2 text-gray-700 data-[state=active]:text-white data-[state=active]:bg-[#03A6A1] hover:scale-105 transition-all"
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.title.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(toolCategories).map(([key, category]) => (
                <TabsContent key={key} value={key} className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="font-serif text-3xl font-bold mb-4 flex items-center justify-center gap-3" style={{ color: '#03A6A1' }}>
                      {category.icon}
                      {category.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.tools.map((tool, index) => (
                      <Card key={index} className="hover:shadow-xl hover:scale-105 transition-all duration-300 border-gray-200 overflow-hidden group bg-white/90 backdrop-blur-sm">
                        <CardHeader className="bg-white/60">
                          <CardTitle className="flex items-center justify-between">
                            <span style={{ color: '#03A6A1' }}>{tool.name}</span>
                            <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-[#03A6A1] transition-colors" />
                          </CardTitle>
                          <CardDescription className="text-gray-600">
                            {tool.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <ul className="space-y-2 mb-4">
                            {tool.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF4F0F' }} />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Button 
                            onClick={() => handleToolLaunch(tool.name, tool.url)}
                            className="w-full text-white hover:opacity-90 hover:scale-105 transition-all"
                            style={{ backgroundColor: '#03A6A1' }}
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
            className={`mt-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-8 transition-all duration-1000 delay-700 ${isVisible.workspace ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-section="workspace"
          >
            <h3 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: '#03A6A1' }}>
              <Layers className="h-6 w-6" />
              Your Professional Workspace
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: '#03A6A1' }}>
                    <ArrowUpDown className="h-5 w-5" />
                    File Transfer Hub
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Import projects from other platforms seamlessly</p>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300 hover:scale-105 transition-transform">
                      <Upload className="h-4 w-4 mr-2" />
                      Import from AutoCAD
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300 hover:scale-105 transition-transform">
                      <Upload className="h-4 w-4 mr-2" />
                      Import from SketchUp
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300 hover:scale-105 transition-transform">
                      <Upload className="h-4 w-4 mr-2" />
                      Import from Revit
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: '#03A6A1' }}>
                    <FolderOpen className="h-5 w-5" />
                    Portfolio Manager
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Showcase your professional work</p>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300 hover:scale-105 transition-transform">
                      <Eye className="h-4 w-4 mr-2" />
                      View Portfolio
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300 hover:scale-105 transition-transform">
                      <Upload className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300 hover:scale-105 transition-transform">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share with Clients
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: '#03A6A1' }}>
                    <Layers className="h-5 w-5" />
                    Project Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Organize and track your projects</p>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300 hover:scale-105 transition-transform">
                      <FolderOpen className="h-4 w-4 mr-2" />
                      Active Projects
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300 hover:scale-105 transition-transform">
                      <Download className="h-4 w-4 mr-2" />
                      Export Files
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300 hover:scale-105 transition-transform">
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
            className={`mt-16 text-center rounded-2xl p-8 text-white shadow-2xl transition-all duration-1000 delay-900 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
            style={{ backgroundColor: '#03A6A1' }}
            data-section="cta"
          >
            <h3 className="font-serif text-3xl font-bold mb-4">Elevate Your Design Practice</h3>
            <p className="text-xl mb-6 opacity-90">
              Access professional tools and streamline your workflow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100 hover:scale-105 transition-all" 
                style={{ color: '#03A6A1' }}
              >
                Get Premium Access
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#03A6A1] hover:scale-105 transition-all"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DesignerSpace;
