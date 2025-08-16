import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar, Briefcase, Award, Phone, Mail } from "lucide-react";

interface ProfilePreviewStepProps {
  formData: any;
  onEdit: (step: number) => void;
}

const ProfilePreviewStep = ({ formData, onEdit }: ProfilePreviewStepProps) => {
  const getDisplayRole = () => {
    if (formData.userType === 'both') return 'Architect & Interior Designer';
    if (formData.userType === 'architect') return 'Architect';
    return 'Interior Designer';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Profile Preview</h2>
        <p className="text-sm text-muted-foreground">
          Here's how your profile will appear to clients
        </p>
      </div>

      {/* Hero Section */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">
              {formData.firstName?.[0]}{formData.lastName?.[0]}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-xl font-semibold">
                {formData.firstName} {formData.lastName}
              </h1>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Verified
              </Badge>
            </div>
            <p className="text-primary font-medium mb-2">{getDisplayRole()}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {formData.city}, {formData.state}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formData.experience} experience
              </div>
            </div>
          </div>
          <Button>Request Consultation</Button>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Star className="h-6 w-6 mx-auto text-yellow-500 mb-2" />
          <div className="text-lg font-semibold">4.8</div>
          <div className="text-xs text-muted-foreground">Rating</div>
        </Card>
        <Card className="p-4 text-center">
          <Briefcase className="h-6 w-6 mx-auto text-primary mb-2" />
          <div className="text-lg font-semibold">{formData.portfolio?.length || 0}</div>
          <div className="text-xs text-muted-foreground">Projects</div>
        </Card>
        <Card className="p-4 text-center">
          <Award className="h-6 w-6 mx-auto text-green-600 mb-2" />
          <div className="text-lg font-semibold">{formData.experience}</div>
          <div className="text-xs text-muted-foreground">Experience</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-lg font-semibold text-primary">₹₹₹</div>
          <div className="text-xs text-muted-foreground">Premium</div>
        </Card>
      </div>

      {/* Portfolio Preview */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Portfolio</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {formData.portfolio?.slice(0, 6).map((project: any, index: number) => (
            <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center p-4">
                <div className="text-sm font-medium">{project.title}</div>
                <div className="text-xs text-muted-foreground">{project.projectType}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Professional Details */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Professional Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Education:</span>
            <span>{formData.education}</span>
          </div>
          {formData.coaNumber && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">COA Number:</span>
              <span>{formData.coaNumber}</span>
            </div>
          )}
          {formData.companyName && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Company:</span>
              <span>{formData.companyName}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span>{formData.city}, {formData.state} - {formData.pincode}</span>
          </div>
        </div>
      </Card>

      {/* Contact Info */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{formData.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{formData.phone}</span>
          </div>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => onEdit(3)} className="flex-1">
          Edit Portfolio
        </Button>
        <Button variant="outline" onClick={() => onEdit(2)} className="flex-1">
          Edit Details
        </Button>
      </div>
    </div>
  );
};

export default ProfilePreviewStep;