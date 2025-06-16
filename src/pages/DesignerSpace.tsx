
import { useState } from "react";
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
  ArrowUpDown
} from "lucide-react";

const DesignerSpace = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);

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
    window.open(url, '_blank');
  };

  const handleRegistration = () => {
    setIsRegistered(true);
  };

  const RegistrationDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button style={{ backgroundColor: '#03A6A1' }} className="hover:opacity-90 text-white">
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
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #FFE3BB 0%, #ffffff 100%)' }}>
        {/* Hero Section */}
        <div className="eco-container py-16">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6" style={{ color: '#03A6A1' }}>
              Designer Space
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Professional design tools and workspace for architects, interior designers, and freelancers. 
              Access industry-leading tools and manage your projects seamlessly.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="outline" className="px-4 py-2 border-2" style={{ color: '#03A6A1', borderColor: '#03A6A1' }}>
                <PenTool className="h-4 w-4 mr-2" />
                Professional Tools
              </Badge>
              <Badge variant="outline" className="px-4 py-2 border-2" style={{ color: '#FF4F0F', borderColor: '#FF4F0F' }}>
                <ArrowUpDown className="h-4 w-4 mr-2" />
                File Transfer
              </Badge>
              <Badge variant="outline" className="px-4 py-2 border-2" style={{ color: '#FFA673', borderColor: '#FFA673' }}>
                <FolderOpen className="h-4 w-4 mr-2" />
                Portfolio Management
              </Badge>
            </div>
            
            {!isRegistered && <RegistrationDialog />}
          </div>

          {/* Tool Categories */}
          <Tabs defaultValue="moodboard" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8" style={{ backgroundColor: '#FFE3BB' }}>
              {Object.entries(toolCategories).map(([key, category]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="flex items-center gap-2 text-gray-700 data-[state=active]:text-white"
                  style={{ 
                    '--tw-data-active-bg': '#03A6A1'
                  } as React.CSSProperties}
                  data-[state=active]:bg-[#03A6A1]
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
                    <Card key={index} className="hover:shadow-xl transition-all duration-300 border-gray-200 overflow-hidden group">
                      <CardHeader style={{ backgroundColor: '#FFE3BB' }}>
                        <CardTitle className="flex items-center justify-between">
                          <span style={{ color: '#03A6A1' }}>{tool.name}</span>
                          <ExternalLink className="h-4 w-4 text-gray-500" />
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
                          className="w-full text-white hover:opacity-90"
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

          {/* Workspace Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h3 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: '#03A6A1' }}>
              <Layers className="h-6 w-6" />
              Your Professional Workspace
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* File Transfer */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: '#03A6A1' }}>
                    <ArrowUpDown className="h-5 w-5" />
                    File Transfer Hub
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Import projects from other platforms seamlessly</p>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300">
                      <Upload className="h-4 w-4 mr-2" />
                      Import from AutoCAD
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300">
                      <Upload className="h-4 w-4 mr-2" />
                      Import from SketchUp
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300">
                      <Upload className="h-4 w-4 mr-2" />
                      Import from Revit
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: '#03A6A1' }}>
                    <FolderOpen className="h-5 w-5" />
                    Portfolio Manager
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Showcase your professional work</p>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300">
                      <Eye className="h-4 w-4 mr-2" />
                      View Portfolio
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300">
                      <Upload className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share with Clients
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Project Management */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: '#03A6A1' }}>
                    <Layers className="h-5 w-5" />
                    Project Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Organize and track your projects</p>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300">
                      <FolderOpen className="h-4 w-4 mr-2" />
                      Active Projects
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300">
                      <Download className="h-4 w-4 mr-2" />
                      Export Files
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start border-gray-300">
                      <Share2 className="h-4 w-4 mr-2" />
                      Client Collaboration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center rounded-2xl p-8 text-white" style={{ backgroundColor: '#03A6A1' }}>
            <h3 className="font-serif text-3xl font-bold mb-4">Elevate Your Design Practice</h3>
            <p className="text-xl mb-6 opacity-90">
              Access professional tools and streamline your workflow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white hover:bg-gray-100" style={{ color: '#03A6A1' }}>
                Get Premium Access
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white"
                style={{ '--hover-color': '#03A6A1' } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#03A6A1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'white';
                }}
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
