import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import MetallicPaint, { parseLogoImage } from "@/components/MetallicPaint";
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
  Clock,
  Plus,
  Grid3X3,
  MessageSquare,
  Users,
  Award,
  Bookmark,
  Settings,
  Search,
  Filter,
  Heart,
  Star,
  Camera,
  Image,
  FileText,
  Calendar,
  TrendingUp
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  type: string;
  status: 'in-progress' | 'completed' | 'draft';
  images: string[];
  tags: string[];
  timestamp: Date;
  likes: number;
  views: number;
  description: string;
}

interface Designer {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
  location: string;
  followers: number;
  projects: number;
  verified: boolean;
}

const DesignerSpace = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    community: false,
    portfolio: false
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

    setTimeout(() => setIsVisible(prev => ({ ...prev, hero: true })), 100);
    
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function createTextImage() {
      try {
        // Create a canvas to generate text as image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 800;
        canvas.height = 200;
        
        ctx.fillStyle = 'black';
        ctx.font = 'bold 72px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Designers Space', canvas.width / 2, canvas.height / 2);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setImageData(imageData);
      } catch (err) {
        console.error("Error creating text image:", err);
      }
    }

    createTextImage();
  }, []);

  const mockProjects: Project[] = [
    {
      id: '1',
      name: 'Modern Living Room Redesign',
      type: 'Residential',
      status: 'completed',
      images: ['/placeholder.svg', '/placeholder.svg'],
      tags: ['Modern', 'Minimalist', 'Living Room'],
      timestamp: new Date('2024-01-15'),
      likes: 234,
      views: 1200,
      description: 'Complete transformation of a traditional living space into a modern, minimalist haven.'
    },
    {
      id: '2',
      name: 'Office Space Innovation',
      type: 'Commercial',
      status: 'in-progress',
      images: ['/placeholder.svg'],
      tags: ['Office', 'Productivity', 'Workspace'],
      timestamp: new Date('2024-01-20'),
      likes: 89,
      views: 456,
      description: 'Creating an innovative workspace that boosts creativity and collaboration.'
    }
  ];

  const mockCommunityPosts = [
    { id: 1, title: 'Weekly Design Challenge: Sustainable Interiors', replies: 45, author: 'Sarah Chen' },
    { id: 2, title: 'Critique My Kitchen Design', replies: 23, author: 'Mike Johnson' },
    { id: 3, title: 'Color Psychology in Interior Design', replies: 78, author: 'Emma Davis' }
  ];

  const featuredDesigners: Designer[] = [
    {
      id: '1',
      name: 'Alexandra Rodriguez',
      avatar: '/placeholder.svg',
      specialization: 'Interior Design',
      location: 'New York, NY',
      followers: 15600,
      projects: 87,
      verified: true
    },
    {
      id: '2',
      name: 'James Mitchell',
      avatar: '/placeholder.svg',
      specialization: 'Architecture',
      location: 'Los Angeles, CA',
      followers: 12300,
      projects: 64,
      verified: true
    }
  ];

  const rotatingTexts = [
    "Professional Studio",
    "Creative Portfolio", 
    "Design Community"
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const RegistrationDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="bg-eco-sage hover:bg-eco-moss text-white transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
          style={{
            transform: `translateY(${scrollY * -0.1}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-eco-moss to-eco-sage opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <User className="h-4 w-4 mr-2 relative z-10" />
          <span className="relative z-10">Join Designer Community</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-eco-cream border-eco-sand max-w-md">
        <DialogHeader>
          <DialogTitle className="text-eco-moss">Create Your Designer Profile</DialogTitle>
          <DialogDescription className="text-eco-bark">
            Join thousands of designers showcasing their work and connecting with clients.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-eco-moss">Display Name</label>
            <input className="w-full p-3 border border-eco-sand rounded-lg bg-white focus:border-eco-sage focus:ring-2 focus:ring-eco-sage/20 transition-all" placeholder="Your professional name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-eco-moss">Specialization</label>
            <select className="w-full p-3 border border-eco-sand rounded-lg bg-white focus:border-eco-sage focus:ring-2 focus:ring-eco-sage/20 transition-all">
              <option>Interior Design</option>
              <option>Architecture</option>
              <option>3D Visualization</option>
              <option>Landscape Design</option>
              <option>Product Design</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-eco-moss">Location</label>
            <input className="w-full p-3 border border-eco-sand rounded-lg bg-white focus:border-eco-sage focus:ring-2 focus:ring-eco-sage/20 transition-all" placeholder="City, State/Country" />
          </div>
          <Button 
            onClick={() => setIsRegistered(true)}
            className="w-full bg-eco-sage hover:bg-eco-moss text-white transition-colors duration-300 p-3 rounded-lg"
          >
            Create Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-eco-cream">
        {/* Hero Section */}
        <div className="eco-container py-20">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative mb-8">
              <h1 className="font-serif text-5xl md:text-7xl font-bold mb-8 relative">
                {imageData ? (
                  <div className="inline-block w-full max-w-4xl h-32 md:h-40">
                    <MetallicPaint 
                      imageData={imageData} 
                      params={{ 
                        edge: 2, 
                        patternBlur: 0.005, 
                        patternScale: 2, 
                        refraction: 0.015, 
                        speed: 0.3, 
                        liquid: 0.07 
                      }}
                      className="metallic-title"
                    />
                  </div>
                ) : (
                  <span className="bg-gradient-to-r from-eco-sage via-eco-moss to-eco-leaf bg-clip-text text-transparent shine-text">
                    Designers Space
                  </span>
                )}
              </h1>
            </div>
            
            <div className="space-y-6 max-w-4xl mx-auto mb-10">
              <p className="text-2xl text-eco-moss transition-all duration-700 hover:scale-105">
                Where creativity meets opportunity.
              </p>
              <p className="text-xl text-eco-bark transition-all duration-700 delay-100">
                Showcase your work, connect with clients, and grow your design practice.
              </p>
              <p className="text-lg text-eco-stone transition-all duration-700 delay-200">
                Join a community of professional designers and architects.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="outline" className="px-6 py-3 border-2 border-eco-sage text-eco-sage hover:scale-105 transition-transform text-lg">
                <PenTool className="h-5 w-5 mr-2" />
                <span className="inline-block transition-all duration-500">
                  {rotatingTexts[currentTextIndex]}
                </span>
              </Badge>
              <Badge variant="outline" className="px-6 py-3 border-2 border-eco-moss text-eco-moss hover:scale-105 transition-transform text-lg">
                <Users className="h-5 w-5 mr-2" />
                <span className="inline-block animate-pulse">15K+ Designers</span>
              </Badge>
              <Badge variant="outline" className="px-6 py-3 border-2 border-eco-leaf text-eco-leaf hover:scale-105 transition-transform text-lg">
                <Award className="h-5 w-5 mr-2" />
                <span className="inline-block animate-bounce">Featured Work</span>
              </Badge>
            </div>
            
            {!isRegistered && <RegistrationDialog />}
          </div>

          {/* Main Platform Features */}
          <div 
            className={`transition-all duration-1000 delay-300 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-section="features"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 bg-white/90 backdrop-blur-sm shadow-lg border border-eco-sand p-2">
                <TabsTrigger 
                  value="dashboard"
                  className="flex items-center gap-2 text-eco-bark data-[state=active]:text-white data-[state=active]:bg-eco-sage hover:scale-105 transition-all duration-300 p-3"
                >
                  <Grid3X3 className="h-5 w-5 animate-pulse" />
                  <span className="hidden sm:inline">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="portfolio"
                  className="flex items-center gap-2 text-eco-bark data-[state=active]:text-white data-[state=active]:bg-eco-sage hover:scale-105 transition-all duration-300 p-3"
                >
                  <FolderOpen className="h-5 w-5 animate-bounce" />
                  <span className="hidden sm:inline">Portfolio</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="community"
                  className="flex items-center gap-2 text-eco-bark data-[state=active]:text-white data-[state=active]:bg-eco-sage hover:scale-105 transition-all duration-300 p-3"
                >
                  <MessageSquare className="h-5 w-5 animate-spin" />
                  <span className="hidden sm:inline">Community</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="tools"
                  className="flex items-center gap-2 text-eco-bark data-[state=active]:text-white data-[state=active]:bg-eco-sage hover:scale-105 transition-all duration-300 p-3"
                >
                  <Box className="h-5 w-5 animate-pulse" />
                  <span className="hidden sm:inline">Tools</span>
                </TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Project Overview */}
                  <Card className="lg:col-span-2 border-eco-sand bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-eco-moss flex items-center gap-2">
                          <FolderOpen className="h-6 w-6" />
                          Your Projects
                        </CardTitle>
                        <CardDescription className="text-eco-bark">Manage and track your design projects</CardDescription>
                      </div>
                      <Button className="bg-eco-sage hover:bg-eco-moss text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        New Project
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockProjects.map((project, index) => (
                          <Card key={project.id} className="border-eco-sand hover:shadow-md transition-all duration-300 hover:scale-105">
                            <CardContent className="p-4">
                              <div className="aspect-video bg-eco-cream rounded-lg mb-3 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-eco-sage/20 to-eco-moss/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-medium text-eco-moss">
                                  {project.status}
                                </div>
                              </div>
                              <h4 className="font-semibold text-eco-moss mb-1">{project.name}</h4>
                              <p className="text-sm text-eco-bark mb-2">{project.type}</p>
                              <div className="flex items-center justify-between text-xs text-eco-stone">
                                <div className="flex items-center gap-3">
                                  <span className="flex items-center gap-1">
                                    <Heart className="h-3 w-3" />
                                    {project.likes}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    {project.views}
                                  </span>
                                </div>
                                <span>{project.timestamp.toLocaleDateString()}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <div className="space-y-4">
                    <Card className="border-eco-sand bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-eco-moss">Profile Views</h3>
                          <TrendingUp className="h-5 w-5 text-eco-sage" />
                        </div>
                        <div className="text-3xl font-bold text-eco-moss mb-2">2,847</div>
                        <p className="text-sm text-eco-bark">+12% from last month</p>
                      </CardContent>
                    </Card>

                    <Card className="border-eco-sand bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-eco-moss">Project Likes</h3>
                          <Heart className="h-5 w-5 text-eco-sage" />
                        </div>
                        <div className="text-3xl font-bold text-eco-moss mb-2">1,523</div>
                        <p className="text-sm text-eco-bark">Across all projects</p>
                      </CardContent>
                    </Card>

                    <Card className="border-eco-sand bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-eco-moss">Followers</h3>
                          <Users className="h-5 w-5 text-eco-sage" />
                        </div>
                        <div className="text-3xl font-bold text-eco-moss mb-2">456</div>
                        <p className="text-sm text-eco-bark">Growing community</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Portfolio Tab */}
              <TabsContent value="portfolio" className="space-y-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-3xl font-bold text-eco-moss">Public Portfolio</h2>
                  <div className="flex gap-3">
                    <Button variant="outline" className="border-eco-sand hover:bg-eco-sage hover:text-white">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                    <Button className="bg-eco-sage hover:bg-eco-moss text-white">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockProjects.map((project, index) => (
                    <Card key={project.id} className="border-eco-sand hover:shadow-xl transition-all duration-300 hover:scale-105 group overflow-hidden">
                      <div className="aspect-[4/3] bg-eco-cream relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-eco-sage/30 to-eco-moss/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-eco-moss opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {project.type}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-eco-moss mb-2 group-hover:text-eco-sage transition-colors">{project.name}</h3>
                        <p className="text-sm text-eco-bark mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs border-eco-sand text-eco-stone">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-eco-stone">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {project.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {project.views}
                            </span>
                          </div>
                          <span>{project.timestamp.toLocaleDateString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Community Tab */}
              <TabsContent value="community" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <Card className="border-eco-sand bg-white/90 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-eco-moss flex items-center gap-2">
                          <MessageSquare className="h-6 w-6" />
                          Community Discussions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {mockCommunityPosts.map((post, index) => (
                          <div key={post.id} className="flex items-center justify-between p-4 border border-eco-sand rounded-lg hover:bg-eco-cream/50 transition-colors cursor-pointer">
                            <div>
                              <h4 className="font-medium text-eco-moss hover:text-eco-sage transition-colors">{post.title}</h4>
                              <p className="text-sm text-eco-bark">by {post.author}</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-eco-stone">
                              <MessageSquare className="h-4 w-4" />
                              {post.replies}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="border-eco-sand bg-white/90 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-eco-moss flex items-center gap-2">
                          <Calendar className="h-6 w-6" />
                          Upcoming Events
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-4 border border-eco-sand rounded-lg">
                          <h4 className="font-medium text-eco-moss">Design Trends 2024 Webinar</h4>
                          <p className="text-sm text-eco-bark">January 25, 2024 • 2:00 PM EST</p>
                          <Button size="sm" className="mt-2 bg-eco-sage hover:bg-eco-moss text-white">Register</Button>
                        </div>
                        <div className="p-4 border border-eco-sand rounded-lg">
                          <h4 className="font-medium text-eco-moss">Virtual Design Expo</h4>
                          <p className="text-sm text-eco-bark">February 10-12, 2024</p>
                          <Button size="sm" className="mt-2 bg-eco-sage hover:bg-eco-moss text-white">Learn More</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card className="border-eco-sand bg-white/90 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-eco-moss flex items-center gap-2">
                          <Star className="h-6 w-6" />
                          Featured Designers
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {featuredDesigners.map((designer, index) => (
                          <div key={designer.id} className="flex items-center gap-3 p-3 border border-eco-sand rounded-lg hover:bg-eco-cream/50 transition-colors cursor-pointer">
                            <div className="w-12 h-12 bg-eco-cream rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-eco-sage" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-eco-moss truncate">{designer.name}</h4>
                                {designer.verified && <Award className="h-4 w-4 text-eco-sage" />}
                              </div>
                              <p className="text-sm text-eco-bark">{designer.specialization}</p>
                              <p className="text-xs text-eco-stone">{designer.location}</p>
                              <div className="flex items-center gap-3 text-xs text-eco-stone mt-1">
                                <span>{designer.followers.toLocaleString()} followers</span>
                                <span>{designer.projects} projects</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Tools Tab */}
              <TabsContent value="tools" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-eco-sand hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-eco-moss">
                        <Palette className="h-6 w-6" />
                        Moodboard Creator
                      </CardTitle>
                      <CardDescription className="text-eco-bark">Create stunning visual boards</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-eco-bark mb-4">Drag-and-drop interface with product integration</p>
                      <Button className="w-full bg-eco-sage hover:bg-eco-moss text-white">
                        Create Moodboard
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-eco-sand hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-eco-moss">
                        <Upload className="h-6 w-6" />
                        File Manager
                      </CardTitle>
                      <CardDescription className="text-eco-bark">Organize project files</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-eco-bark mb-4">Upload, organize, and share design files</p>
                      <Button className="w-full bg-eco-sage hover:bg-eco-moss text-white">
                        Manage Files
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-eco-sand hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-eco-moss">
                        <Users className="h-6 w-6" />
                        Client Collaboration
                      </CardTitle>
                      <CardDescription className="text-eco-bark">Share and get feedback</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-eco-bark mb-4">Invite clients to review and approve designs</p>
                      <Button className="w-full bg-eco-sage hover:bg-eco-moss text-white">
                        Collaborate
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* CTA Section */}
          <div 
            className={`mt-20 text-center rounded-2xl p-12 text-white shadow-2xl transition-all duration-1000 delay-700 bg-gradient-to-r from-eco-sage to-eco-moss ${isVisible.portfolio ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            data-section="portfolio"
          >
            <h3 className="font-serif text-4xl font-bold mb-6 shine-text">Ready to Showcase Your Work?</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of designers who have transformed their careers with our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-eco-moss hover:bg-eco-cream hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
              >
                Start Your Portfolio
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-eco-moss hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
              >
                Explore Community
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .metallic-title {
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }
      `}</style>
    </Layout>
  );
};

export default DesignerSpace;
