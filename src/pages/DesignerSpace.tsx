import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import GradientText from "@/components/GradientText";
import DesignerTutorial from "@/components/DesignerTutorial";
import PortfolioCard from "@/components/PortfolioCard";
import SplitText from "@/components/SplitText";
import SpotlightCard from "@/components/SpotlightCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  PenTool, 
  Palette, 
  Users, 
  Award, 
  User, 
  Upload,
  Download,
  FolderOpen,
  Eye,
  Share2,
  ExternalLink,
  Plus,
  Grid3X3,
  MessageSquare,
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
  TrendingUp,
  Play,
  HelpCircle,
  Sparkles,
  Zap,
  Target,
  Lightbulb
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

interface FormData {
  name: string;
  specialization: string;
  location: string;
  bio: string;
  dreamProject: string;
  aspirations: string;
  profileImage: string | null;
  email: string;
  phone: string;
  website: string;
}

const DesignerSpace = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showTutorial, setShowTutorial] = useState(false);
  const [showPortfolioDialog, setShowPortfolioDialog] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    specialization: '',
    location: '',
    bio: '',
    dreamProject: '',
    aspirations: '',
    profileImage: null,
    email: '',
    phone: '',
    website: ''
  });
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [showPortfolioCard, setShowPortfolioCard] = useState(false);

  // Scroll to top when component mounts - FIXED navigation issue
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    // Check if user has completed tutorial
    const hasCompletedTutorial = localStorage.getItem('designerTutorialCompleted');
    if (!hasCompletedTutorial) {
      // Show tutorial after a brief delay for better UX
      setTimeout(() => setShowTutorial(true), 2000);
    }
  }, []);

  useEffect(() => {
    const requiredFields = ['name', 'specialization', 'location', 'bio', 'aspirations', 'email'];
    const isComplete = requiredFields.every(field => formData[field as keyof FormData]);
    setIsFormComplete(isComplete);
  }, [formData]);

  // FIXED: Proper controlled input handlers to prevent resetting
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, profileImage: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = () => {
    if (isFormComplete) {
      setShowPortfolioCard(true);
      setShowPortfolioDialog(false);
      
      // Show card with animation
      setTimeout(() => {
        setIsRegistered(true);
      }, 2000);
    }
  };

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

  const RegistrationDialog = () => (
    <Dialog open={showPortfolioDialog} onOpenChange={setShowPortfolioDialog}>
      <DialogTrigger asChild>
        <Button className="bg-eco-sage hover:bg-eco-moss text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <User className="h-5 w-5 mr-2" />
          Join Designer Community
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-2 border-eco-sage max-w-4xl rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-eco-moss">Create Your Designer Profile</DialogTitle>
          <DialogDescription className="text-eco-bark">
            Build your professional portfolio card and join thousands of designers.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-eco-moss">Full Name *</label>
                <input 
                  className="w-full p-3 border-2 border-eco-sand rounded-lg bg-white focus:border-eco-sage focus:ring-2 focus:ring-eco-sage/20 transition-all" 
                  placeholder="Your professional name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-eco-moss">Email *</label>
                <input 
                  type="email"
                  className="w-full p-3 border-2 border-eco-sand rounded-lg bg-white focus:border-eco-sage focus:ring-2 focus:ring-eco-sage/20 transition-all" 
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-eco-moss">Specialization *</label>
                <select 
                  className="w-full p-3 border-2 border-eco-sand rounded-lg bg-white focus:border-eco-sage focus:ring-2 focus:ring-eco-sage/20 transition-all"
                  value={formData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                >
                  <option value="">Select specialization</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="Architecture">Architecture</option>
                  <option value="3D Visualization">3D Visualization</option>
                  <option value="Landscape Design">Landscape Design</option>
                  <option value="Product Design">Product Design</option>
                  <option value="Graphic Design">Graphic Design</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-eco-moss">Location *</label>
                <input 
                  className="w-full p-3 border-2 border-eco-sand rounded-lg bg-white focus:border-eco-sage focus:ring-2 focus:ring-eco-sage/20 transition-all" 
                  placeholder="City, State/Country"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-eco-moss">Phone</label>
                <input 
                  className="w-full p-3 border-2 border-eco-sand rounded-lg bg-white focus:border-eco-sage focus:ring-2 focus:ring-eco-sage/20 transition-all" 
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-eco-moss">Website</label>
                <input 
                  className="w-full p-3 border-2 border-eco-sand rounded-lg bg-white focus:border-eco-sage focus:ring-2 focus:ring-eco-sage/20 transition-all" 
                  placeholder="www.yourportfolio.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-eco-moss">Profile Picture</label>
              <input 
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-3 border-2 border-eco-sand rounded-lg bg-white focus:border-eco-sage focus:ring-2 focus:ring-eco-sage/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-eco-moss">Professional Bio *</label>
              <Textarea 
                className="w-full p-3 border-2 border-eco-sand rounded-lg bg-white focus:border-eco-sage focus:ring-2 focus:ring-eco-sage/20 transition-all min-h-[100px]" 
                placeholder="Tell us about your design journey, experience, and what makes you unique..."
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-eco-moss">Career Aspirations *</label>
              <Textarea 
                className="w-full p-3 border-2 border-eco-sand rounded-lg bg-white focus:border-eco-sage focus:ring-2 focus:ring-eco-sage/20 transition-all min-h-[80px]" 
                placeholder="What are your goals and aspirations as a designer?"
                value={formData.aspirations}
                onChange={(e) => handleInputChange('aspirations', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-eco-moss">Dream Project</label>
              <input 
                className="w-full p-3 border-2 border-eco-sand rounded-lg bg-white focus:border-eco-sage focus:ring-2 focus:ring-eco-sage/20" 
                placeholder="Describe your dream project..."
                value={formData.dreamProject}
                onChange={(e) => handleInputChange('dreamProject', e.target.value)}
              />
            </div>

            <Button 
              onClick={handleFormSubmit}
              disabled={!isFormComplete}
              className="w-full bg-eco-sage hover:bg-eco-moss text-white font-semibold py-3 rounded-lg disabled:opacity-50"
            >
              Create Portfolio Card
            </Button>
          </div>

          {/* Live Preview Section */}
          <div className="lg:sticky lg:top-4">
            <h3 className="text-lg font-semibold text-eco-moss mb-4">Live Preview</h3>
            <PortfolioCard formData={formData} isAnimating={false} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <Layout>
      <div 
        className="min-h-screen relative"
        style={{
          backgroundImage: `url('/lovable-uploads/3771b0b4-c49d-460f-8a2e-fb20c0e2eb23.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-white/5"></div>
        
        <div className="relative z-10">
          {/* Hero Section */}
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              {/* Updated Gradient Title with Aurora font and serene eco colors */}
              <div className="relative mb-8">
                <h1 className="font-['Aurora',serif] text-5xl md:text-7xl font-bold mb-8 relative">
                  <GradientText
                    colors={["#7D9D8C", "#5E8B6F", "#4A6952", "#7D9D8C", "#5E8B6F"]}
                    animationSpeed={3}
                    showBorder={false}
                    className="drop-shadow-2xl"
                  >
                    Designer Space
                  </GradientText>
                </h1>
              </div>
              
              {/* Hero Content */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 max-w-5xl mx-auto">
                <div className="space-y-6">
                  <p className="text-3xl font-serif text-eco-moss font-semibold">
                    Where creativity meets opportunity.
                  </p>
                  <p className="text-xl text-eco-bark leading-relaxed">
                    Showcase your work, connect with clients, and grow your design practice in a community of thousands of professional designers and architects.
                  </p>
                  
                  {/* Feature Highlights with SpotlightCard */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <SpotlightCard className="p-4 bg-eco-sage/10 rounded-2xl" spotlightColor="rgba(125, 157, 140, 0.3)">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-eco-sage rounded-xl">
                          <PenTool className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <SplitText 
                            text="Professional Studio"
                            className="font-semibold text-eco-moss"
                            delay={50}
                            duration={0.4}
                            splitType="chars"
                          />
                          <p className="text-sm text-eco-bark">Complete toolkit for designers</p>
                        </div>
                      </div>
                    </SpotlightCard>
                    
                    <SpotlightCard className="p-4 bg-eco-moss/10 rounded-2xl" spotlightColor="rgba(94, 139, 111, 0.3)">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-eco-moss rounded-xl">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <SplitText 
                            text="15K+ Designers"
                            className="font-semibold text-eco-moss"
                            delay={50}
                            duration={0.4}
                            splitType="chars"
                          />
                          <p className="text-sm text-eco-bark">Vibrant creative community</p>
                        </div>
                      </div>
                    </SpotlightCard>
                    
                    <SpotlightCard className="p-4 bg-eco-leaf/10 rounded-2xl" spotlightColor="rgba(125, 157, 140, 0.3)">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-eco-leaf rounded-xl">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <SplitText 
                            text="Featured Work"
                            className="font-semibold text-eco-moss"
                            delay={50}
                            duration={0.4}
                            splitType="chars"
                          />
                          <p className="text-sm text-eco-bark">Get recognized globally</p>
                        </div>
                      </div>
                    </SpotlightCard>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
                    {!isRegistered && <RegistrationDialog />}
                    
                    <Button 
                      onClick={() => setShowTutorial(true)}
                      variant="outline" 
                      className="border-2 border-eco-sage text-eco-sage hover:bg-eco-sage hover:text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Take Tutorial
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Show Portfolio Card if created */}
            {showPortfolioCard && (
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-serif text-eco-moss font-bold mb-4">Your Portfolio Card</h2>
                  <p className="text-eco-bark">Your professional designer portfolio card is ready!</p>
                </div>
                <PortfolioCard formData={formData} isAnimating={true} />
              </div>
            )}

            {/* Platform Features */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 bg-eco-cream/50 p-2 rounded-2xl">
                  <TabsTrigger 
                    value="dashboard"
                    className="flex items-center gap-2 text-eco-bark data-[state=active]:text-white data-[state=active]:bg-eco-sage rounded-xl font-semibold p-4"
                  >
                    <Grid3X3 className="h-5 w-5" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="portfolio"
                    className="flex items-center gap-2 text-eco-bark data-[state=active]:text-white data-[state=active]:bg-eco-sage rounded-xl font-semibold p-4"
                  >
                    <FolderOpen className="h-5 w-5" />
                    <span className="hidden sm:inline">Portfolio</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="community"
                    className="flex items-center gap-2 text-eco-bark data-[state=active]:text-white data-[state=active]:bg-eco-sage rounded-xl font-semibold p-4"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span className="hidden sm:inline">Community</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tools"
                    className="flex items-center gap-2 text-eco-bark data-[state=active]:text-white data-[state=active]:bg-eco-sage rounded-xl font-semibold p-4"
                  >
                    <Palette className="h-5 w-5" />
                    <span className="hidden sm:inline">Tools</span>
                  </TabsTrigger>
                </TabsList>

                {/* Dashboard Tab */}
                <TabsContent value="dashboard" className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Project Overview */}
                    <Card className="lg:col-span-2 border-2 border-eco-sand bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl font-serif text-eco-moss flex items-center gap-2">
                            <FolderOpen className="h-6 w-6" />
                            Your Projects
                          </CardTitle>
                          <CardDescription className="text-eco-bark">Manage and track your design projects</CardDescription>
                        </div>
                        <SpotlightCard className="bg-eco-sage hover:bg-eco-moss text-white rounded-xl font-semibold" spotlightColor="rgba(255, 255, 255, 0.2)">
                          <Button className="bg-transparent hover:bg-transparent">
                            <Plus className="h-4 w-4 mr-2" />
                            <SplitText 
                              text="New Project"
                              className=""
                              delay={30}
                              duration={0.3}
                              splitType="chars"
                            />
                          </Button>
                        </SpotlightCard>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {mockProjects.map((project) => (
                            <SpotlightCard key={project.id} className="border-2 border-eco-sand hover:shadow-lg transition-all duration-300 hover:scale-105 rounded-2xl" spotlightColor="rgba(125, 157, 140, 0.2)">
                              <Card className="border-0">
                                <CardContent className="p-6">
                                  <div className="aspect-video bg-gradient-to-br from-eco-sage/20 to-eco-moss/20 rounded-xl mb-4 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-eco-sage/40 to-eco-moss/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-eco-moss capitalize">
                                      {project.status.replace('-', ' ')}
                                    </div>
                                  </div>
                                  <SplitText 
                                    text={project.name}
                                    className="font-semibold text-eco-moss mb-2 text-lg"
                                    delay={20}
                                    duration={0.3}
                                    splitType="chars"
                                  />
                                  <p className="text-sm text-eco-bark mb-3">{project.type}</p>
                                  <div className="flex items-center justify-between text-sm text-eco-stone">
                                    <div className="flex items-center gap-4">
                                      <span className="flex items-center gap-1">
                                        <Heart className="h-4 w-4 text-red-500" />
                                        {project.likes}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Eye className="h-4 w-4 text-eco-sage" />
                                        {project.views}
                                      </span>
                                    </div>
                                    <span className="font-medium">{project.timestamp.toLocaleDateString()}</span>
                                  </div>
                                </CardContent>
                              </Card>
                            </SpotlightCard>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <div className="space-y-6">
                      <SpotlightCard className="border-2 border-eco-sand bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" spotlightColor="rgba(125, 157, 140, 0.2)">
                        <Card className="border-0">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <SplitText 
                                text="Profile Views"
                                className="font-semibold text-eco-moss text-lg"
                                delay={30}
                                duration={0.3}
                                splitType="chars"
                              />
                              <div className="p-2 bg-eco-sage/20 rounded-xl">
                                <TrendingUp className="h-5 w-5 text-eco-sage" />
                              </div>
                            </div>
                            <div className="text-4xl font-bold text-eco-moss mb-2">2,847</div>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-green-100 text-green-700 text-xs">+12%</Badge>
                              <span className="text-sm text-eco-bark">from last month</span>
                            </div>
                          </CardContent>
                        </Card>
                      </SpotlightCard>

                      <SpotlightCard className="border-2 border-eco-sand bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" spotlightColor="rgba(125, 157, 140, 0.2)">
                        <Card className="border-0">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <SplitText 
                                text="Project Likes"
                                className="font-semibold text-eco-moss text-lg"
                                delay={30}
                                duration={0.3}
                                splitType="chars"
                              />
                              <div className="p-2 bg-red-100 rounded-xl">
                                <Heart className="h-5 w-5 text-red-500" />
                              </div>
                            </div>
                            <div className="text-4xl font-bold text-eco-moss mb-2">1,523</div>
                            <p className="text-sm text-eco-bark">Across all projects</p>
                          </CardContent>
                        </Card>
                      </SpotlightCard>

                      <SpotlightCard className="border-2 border-eco-sand bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" spotlightColor="rgba(125, 157, 140, 0.2)">
                        <Card className="border-0">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <SplitText 
                                text="Followers"
                                className="font-semibold text-eco-moss text-lg"
                                delay={30}
                                duration={0.3}
                                splitType="chars"
                              />
                              <div className="p-2 bg-eco-moss/20 rounded-xl">
                                <Users className="h-5 w-5 text-eco-moss" />
                              </div>
                            </div>
                            <div className="text-4xl font-bold text-eco-moss mb-2">456</div>
                            <p className="text-sm text-eco-bark">Growing community</p>
                          </CardContent>
                        </Card>
                      </SpotlightCard>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="portfolio" className="space-y-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-serif text-4xl font-bold text-eco-moss">Public Portfolio</h2>
                    <div className="flex gap-3">
                      <Button variant="outline" className="border-2 border-eco-sage hover:bg-eco-sage hover:text-white rounded-xl font-semibold">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                      <Button className="bg-eco-sage hover:bg-eco-moss text-white rounded-xl font-semibold">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockProjects.map((project) => (
                      <Card key={project.id} className="border-2 border-eco-sand hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden rounded-2xl">
                        <div className="aspect-[4/3] bg-gradient-to-br from-eco-sage/30 to-eco-moss/30 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-eco-sage/50 to-eco-moss/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-eco-moss opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {project.type}
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-eco-moss mb-2 text-xl group-hover:text-eco-sage transition-colors">{project.name}</h3>
                          <p className="text-sm text-eco-bark mb-4 line-clamp-2">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs border-eco-sand text-eco-stone rounded-full">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-sm text-eco-stone">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Heart className="h-4 w-4 text-red-500" />
                                {project.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4 text-eco-sage" />
                                {project.views}
                              </span>
                            </div>
                            <span className="font-medium">{project.timestamp.toLocaleDateString()}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="community" className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <Card className="border-2 border-eco-sand bg-white rounded-2xl shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-2xl font-serif text-eco-moss flex items-center gap-2">
                            <MessageSquare className="h-6 w-6" />
                            Community Discussions
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {[
                            { id: 1, title: 'Weekly Design Challenge: Sustainable Interiors', replies: 45, author: 'Sarah Chen' },
                            { id: 2, title: 'Critique My Kitchen Design', replies: 23, author: 'Mike Johnson' },
                            { id: 3, title: 'Color Psychology in Interior Design', replies: 78, author: 'Emma Davis' }
                          ].map((post) => (
                            <div key={post.id} className="flex items-center justify-between p-6 border-2 border-eco-sand rounded-2xl hover:bg-eco-cream/50 transition-colors cursor-pointer">
                              <div>
                                <h4 className="font-semibold text-eco-moss hover:text-eco-sage transition-colors text-lg">{post.title}</h4>
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

                      <Card className="border-2 border-eco-sand bg-white rounded-2xl shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-2xl font-serif text-eco-moss flex items-center gap-2">
                            <Calendar className="h-6 w-6" />
                            Upcoming Events
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-6 border-2 border-eco-sand rounded-2xl">
                            <h4 className="font-semibold text-eco-moss text-lg">Design Trends 2024 Webinar</h4>
                            <p className="text-sm text-eco-bark mb-3">January 25, 2024 • 2:00 PM EST</p>
                            <Button size="sm" className="bg-eco-sage hover:bg-eco-moss text-white rounded-xl font-semibold">Register</Button>
                          </div>
                          <div className="p-6 border-2 border-eco-sand rounded-2xl">
                            <h4 className="font-semibold text-eco-moss text-lg">Virtual Design Expo</h4>
                            <p className="text-sm text-eco-bark mb-3">February 10-12, 2024</p>
                            <Button size="sm" className="bg-eco-sage hover:bg-eco-moss text-white rounded-xl font-semibold">Learn More</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      <Card className="border-2 border-eco-sand bg-white rounded-2xl shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-xl font-serif text-eco-moss flex items-center gap-2">
                            <Star className="h-6 w-6" />
                            Featured Designers
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {featuredDesigners.map((designer) => (
                            <div key={designer.id} className="flex items-center gap-3 p-4 border-2 border-eco-sand rounded-2xl hover:bg-eco-cream/50 transition-colors cursor-pointer">
                              <div className="w-12 h-12 bg-eco-cream rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-eco-sage" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-eco-moss truncate">{designer.name}</h4>
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

                <TabsContent value="tools" className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card className="border-2 border-eco-sand hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white rounded-2xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-eco-moss text-xl">
                          <Palette className="h-6 w-6" />
                          Moodboard Creator
                        </CardTitle>
                        <CardDescription className="text-eco-bark">Create stunning visual boards</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-eco-bark mb-6">Drag-and-drop interface with product integration</p>
                        <Button className="w-full bg-eco-sage hover:bg-eco-moss text-white rounded-xl font-semibold">
                          Create Moodboard
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-eco-sand hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white rounded-2xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-eco-moss text-xl">
                          <Upload className="h-6 w-6" />
                          File Manager
                        </CardTitle>
                        <CardDescription className="text-eco-bark">Organize project files</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-eco-bark mb-6">Upload, organize, and share design files</p>
                        <Button className="w-full bg-eco-sage hover:bg-eco-moss text-white rounded-xl font-semibold">
                          Manage Files
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-eco-sand hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white rounded-2xl">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-eco-moss text-xl">
                          <Users className="h-6 w-6" />
                          Client Collaboration
                        </CardTitle>
                        <CardDescription className="text-eco-bark">Share and get feedback</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-eco-bark mb-6">Invite clients to review and approve designs</p>
                        <Button className="w-full bg-eco-sage hover:bg-eco-moss text-white rounded-xl font-semibold">
                          Collaborate
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* CTA Section - FIXED "Explore Community" button visibility */}
            <div className="mt-20 bg-gradient-to-r from-eco-sage/95 to-eco-moss/95 backdrop-blur-sm rounded-3xl p-12 text-white shadow-2xl border border-white/20">
              <div className="text-center">
                <SplitText 
                  text="Ready to Showcase Your Work?"
                  className="font-serif text-4xl font-bold mb-6"
                  delay={80}
                  duration={0.5}
                  splitType="chars"
                />
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Join thousands of designers who have transformed their careers with our platform
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <SpotlightCard className="bg-white text-eco-moss hover:bg-eco-cream hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-xl" spotlightColor="rgba(255, 255, 255, 0.3)">
                    <Button 
                      onClick={() => setShowPortfolioDialog(true)}
                      size="lg" 
                      className="bg-transparent hover:bg-transparent text-eco-moss"
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      Start Your Portfolio
                    </Button>
                  </SpotlightCard>
                  <SpotlightCard className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-eco-moss hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-xl" spotlightColor="rgba(255, 255, 255, 0.2)">
                    <Button 
                      size="lg" 
                      className="bg-transparent hover:bg-transparent border-0"
                    >
                      <Users className="h-5 w-5 mr-2" />
                      Explore Community
                    </Button>
                  </SpotlightCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Component */}
      <DesignerTutorial 
        isOpen={showTutorial} 
        onClose={() => setShowTutorial(false)} 
      />

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @import url('https://fonts.googleapis.com/css2?family=Aurora:wght@400;700&display=swap');
      `}</style>
    </Layout>
  );
};

export default DesignerSpace;
