
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  ArrowLeft, 
  PenTool, 
  Upload, 
  Users, 
  MessageSquare, 
  Eye,
  Settings,
  Award,
  Palette
} from 'lucide-react';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  content: string;
  tips: string[];
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to Designers Space",
    description: "Your creative journey starts here",
    icon: Award,
    content: "Designers Space is a platform where creativity meets opportunity. You can showcase your work, connect with clients, and grow your design practice alongside thousands of professional designers.",
    tips: [
      "Build a stunning portfolio",
      "Connect with clients worldwide", 
      "Join a vibrant design community",
      "Access professional design tools"
    ]
  },
  {
    id: 2,
    title: "Create Your Portfolio",
    description: "Showcase your best work",
    icon: PenTool,
    content: "Your portfolio is your digital showcase. Upload your projects, add descriptions, and organize them by categories. High-quality images and detailed project descriptions help attract potential clients.",
    tips: [
      "Upload high-resolution images",
      "Write compelling project descriptions",
      "Organize work by categories",
      "Update regularly with new projects"
    ]
  },
  {
    id: 3,
    title: "Upload & Manage Projects",
    description: "Easy project management",
    icon: Upload,
    content: "Use our file manager to upload, organize, and share your design files. You can create project folders, add tags for easy searching, and manage different versions of your work.",
    tips: [
      "Use descriptive file names",
      "Create organized folder structures",
      "Add relevant tags to projects",
      "Keep project files backed up"
    ]
  },
  {
    id: 4,
    title: "Connect with Community",
    description: "Network with fellow designers",
    icon: Users,
    content: "Join discussions, participate in design challenges, attend virtual events, and collaborate with other designers. Our community is here to support your growth and creativity.",
    tips: [
      "Participate in weekly challenges",
      "Share knowledge and get feedback",
      "Attend virtual design events",
      "Follow inspiring designers"
    ]
  },
  {
    id: 5,
    title: "Client Collaboration",
    description: "Work seamlessly with clients",
    icon: MessageSquare,
    content: "Share projects with clients, get feedback, and collaborate in real-time. Our collaboration tools make it easy to manage client relationships and project approvals.",
    tips: [
      "Set clear project expectations",
      "Use our feedback system",
      "Schedule regular check-ins",
      "Keep communication professional"
    ]
  },
  {
    id: 6,
    title: "Track Your Success",
    description: "Monitor your growth",
    icon: Eye,
    content: "View detailed analytics about your portfolio performance, including views, likes, and follower growth. Use these insights to optimize your content strategy.",
    tips: [
      "Monitor portfolio views regularly",
      "Track which projects perform best",
      "Engage with your audience",
      "Optimize based on analytics"
    ]
  }
];

interface DesignerTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const DesignerTutorial: React.FC<DesignerTutorialProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem('designerTutorialCompleted', 'true');
    onClose();
  };

  const currentTutorialStep = tutorialSteps[currentStep];
  const IconComponent = currentTutorialStep.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white border-2 border-eco-sage">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-eco-sage/20 rounded-lg">
                <IconComponent className="h-6 w-6 text-eco-sage" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-serif text-eco-moss">
                  {currentTutorialStep.title}
                </DialogTitle>
                <DialogDescription className="text-eco-bark">
                  {currentTutorialStep.description}
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-eco-sage' : 'bg-eco-sand'
                }`}
              />
            ))}
          </div>

          {/* Step Content */}
          <Card className="border-eco-sand">
            <CardContent className="p-6">
              <p className="text-eco-bark leading-relaxed mb-6">
                {currentTutorialStep.content}
              </p>

              <div className="space-y-3">
                <h4 className="font-semibold text-eco-moss flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Pro Tips:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentTutorialStep.tips.map((tip, index) => (
                    <Badge key={index} variant="outline" className="border-eco-sage text-eco-moss justify-start p-2">
                      {tip}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-eco-sand hover:bg-eco-sage hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <span className="text-sm text-eco-stone">
              {currentStep + 1} of {tutorialSteps.length}
            </span>

            {currentStep === tutorialSteps.length - 1 ? (
              <Button
                onClick={handleFinish}
                className="bg-eco-sage hover:bg-eco-moss text-white"
              >
                Get Started
                <Award className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-eco-sage hover:bg-eco-moss text-white"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DesignerTutorial;
