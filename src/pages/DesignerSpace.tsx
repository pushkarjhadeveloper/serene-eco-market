import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PenTool, 
  Palette, 
  Layers, 
  Box, 
  Brain, 
  Scan, 
  Sparkles, 
  Zap, 
  Monitor,
  Save,
  Share2,
  Download,
  Upload,
  Eye
} from "lucide-react";

const DesignerSpace = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [projects, setProjects] = useState<any[]>([]);

  const toolCategories = {
    moodboard: {
      title: "AI-Based Moodboard Generators",
      icon: <Palette className="h-6 w-6" />,
      tools: [
        {
          name: "SereneEco AI Canvas",
          description: "AI-powered sustainable design moodboards",
          originalTool: "Canva AI",
          features: ["Eco-friendly templates", "Smart color palettes", "Sustainable material suggestions"],
          color: "from-green-500 to-teal-600"
        },
        {
          name: "EcoBoard Studio",
          description: "Professional interior moodboard creation",
          originalTool: "Morpholio Board",
          features: ["Real-time collaboration", "Material libraries", "Client presentation mode"],
          color: "from-blue-500 to-indigo-600"
        },
        {
          name: "Serene3D Mood",
          description: "3D moodboard visualization",
          originalTool: "Foyr Neo",
          features: ["3D mood scenes", "Virtual staging", "Photorealistic renders"],
          color: "from-purple-500 to-pink-600"
        }
      ]
    },
    assistant: {
      title: "Virtual Design Advisors",
      icon: <Brain className="h-6 w-6" />,
      tools: [
        {
          name: "SereneEco AI Advisor",
          description: "GPT-4o powered design consultant",
          originalTool: "GPT-4o Design Plugin",
          features: ["Style recommendations", "Trend analysis", "Quick sketch generation"],
          color: "from-emerald-500 to-green-600"
        },
        {
          name: "EcoDesign Claude",
          description: "Claude-powered sustainable design assistant",
          originalTool: "Claude Design Plugin",
          features: ["Eco-material suggestions", "Energy efficiency tips", "Sustainability scoring"],
          color: "from-teal-500 to-cyan-600"
        }
      ]
    },
    modeling: {
      title: "3D Modeling & Rendering",
      icon: <Box className="h-6 w-6" />,
      tools: [
        {
          name: "SereneEco Revit AI",
          description: "AI-enhanced architectural modeling",
          originalTool: "Autodesk Revit with AI plugins",
          features: ["Smart building components", "Energy analysis", "Sustainable design optimization"],
          color: "from-orange-500 to-red-600"
        },
        {
          name: "EcoSketch Pro",
          description: "Quick modeling with VR rendering",
          originalTool: "SketchUp2025 + Enscape",
          features: ["Real-time VR preview", "Quick prototyping", "Material visualization"],
          color: "from-violet-500 to-purple-600"
        },
        {
          name: "Serene Blender AI",
          description: "Open-source 3D creation suite",
          originalTool: "Blender with AI add-ons",
          features: ["Custom interior modeling", "AI-assisted texturing", "Photorealistic rendering"],
          color: "from-indigo-500 to-blue-600"
        },
        {
          name: "EcoRender Studio",
          description: "Real-time photorealistic rendering",
          originalTool: "D5 Render/Lumion 2025",
          features: ["Instant visualization", "Weather simulation", "360° panoramas"],
          color: "from-yellow-500 to-orange-600"
        },
        {
          name: "Serene Rhino",
          description: "Parametric design platform",
          originalTool: "Rhino + Grasshopper",
          features: ["Complex geometry", "Parametric modeling", "Algorithm-based design"],
          color: "from-pink-500 to-rose-600"
        }
      ]
    },
    measurement: {
      title: "Measurement & Scanning Tools",
      icon: <Scan className="h-6 w-6" />,
      tools: [
        {
          name: "EcoMeasure Pro",
          description: "AI-powered floor plan creation",
          originalTool: "Magicplan",
          features: ["Auto room detection", "Furniture placement", "Area calculations"],
          color: "from-cyan-500 to-blue-600"
        },
        {
          name: "SereneEco Scan",
          description: "Property scanning and modeling",
          originalTool: "CubiCasa",
          features: ["3D space scanning", "Instant floor plans", "Property analytics"],
          color: "from-green-500 to-emerald-600"
        }
      ]
    }
  };

  const handleToolLaunch = (toolName: string) => {
    setSelectedTool(toolName);
    // Simulate tool opening - in real implementation, this would launch the actual tool
    console.log(`Launching ${toolName}`);
  };

  const handleSaveProject = () => {
    const newProject = {
      id: Date.now(),
      name: `Project ${projects.length + 1}`,
      tool: selectedTool,
      date: new Date().toLocaleDateString(),
      status: "In Progress"
    };
    setProjects([...projects, newProject]);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-eco-cream via-white to-eco-sand/20">
        {/* Hero Section */}
        <div className="eco-container py-16">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-eco-sage via-eco-moss to-eco-leaf bg-clip-text text-transparent">
                Designer Space
              </span>
            </h1>
            <p className="text-xl text-eco-bark max-w-3xl mx-auto mb-8">
              Professional design tools and workspace for architects, interior designers, and freelancers. 
              Create, collaborate, and bring your sustainable design vision to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="px-4 py-2 text-eco-moss border-eco-sage">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Tools
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-eco-moss border-eco-sage">
                <Save className="h-4 w-4 mr-2" />
                Cloud Workspace
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-eco-moss border-eco-sage">
                <Share2 className="h-4 w-4 mr-2" />
                Client Collaboration
              </Badge>
            </div>
          </div>

          {/* Tool Categories */}
          <Tabs defaultValue="moodboard" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              {Object.entries(toolCategories).map(([key, category]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="flex items-center gap-2 data-[state=active]:bg-eco-sage/10"
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.title.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(toolCategories).map(([key, category]) => (
              <TabsContent key={key} value={key} className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="font-serif text-3xl font-bold text-eco-moss mb-4 flex items-center justify-center gap-3">
                    {category.icon}
                    {category.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tools.map((tool, index) => (
                    <Card key={index} className="hover:shadow-xl transition-all duration-300 border-eco-sand/30 overflow-hidden group">
                      <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="text-eco-moss">{tool.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {tool.originalTool}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-eco-bark">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 mb-4">
                          {tool.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-eco-bark">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tool.color}`} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button 
                          onClick={() => handleToolLaunch(tool.name)}
                          className={`w-full bg-gradient-to-r ${tool.color} text-white hover:scale-105 transition-transform`}
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Launch Tool
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Workspace Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg border border-eco-sand/30 p-8">
            <h3 className="font-serif text-2xl font-bold text-eco-moss mb-6 flex items-center gap-3">
              <Monitor className="h-6 w-6" />
              Your Workspace
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Active Tool */}
              <Card className="border-eco-sage/30">
                <CardHeader>
                  <CardTitle className="text-eco-moss">Active Tool</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedTool ? (
                    <div className="space-y-3">
                      <p className="font-medium">{selectedTool}</p>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSaveProject}>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-eco-bark">No tool selected</p>
                  )}
                </CardContent>
              </Card>

              {/* Recent Projects */}
              <Card className="border-eco-sage/30">
                <CardHeader>
                  <CardTitle className="text-eco-moss">Recent Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  {projects.length > 0 ? (
                    <div className="space-y-2">
                      {projects.slice(-3).map((project) => (
                        <div key={project.id} className="p-2 bg-eco-cream rounded border">
                          <p className="font-medium text-sm">{project.name}</p>
                          <p className="text-xs text-eco-bark">{project.date}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-eco-bark">No projects yet</p>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-eco-sage/30">
                <CardHeader>
                  <CardTitle className="text-eco-moss">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Files
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export Project
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-r from-eco-sage to-eco-moss rounded-2xl p-8 text-white">
            <h3 className="font-serif text-3xl font-bold mb-4">Ready to Transform Your Design Process?</h3>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of designers already using our comprehensive toolkit
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-eco-moss hover:bg-gray-100">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DesignerSpace;
