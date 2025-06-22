
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Stepper, { Step } from '@/components/Stepper';
import ProfileCard from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface FormData {
  name: string;
  title: string;
  handle: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  bio: string;
  specialization: string;
  avatarUrl: string;
}

const DesignerCommunityPage = () => {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    title: '',
    handle: '',
    email: '',
    phone: '',
    website: '',
    location: '',
    bio: '',
    specialization: '',
    avatarUrl: ''
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStepperComplete = () => {
    setShowProfileCard(true);
  };

  if (showProfileCard) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-tr from-sky-100 to-blue-200 flex flex-col items-center justify-center gap-6 p-6">
          <div className="w-full max-w-4xl">
            <Button variant="outline" asChild className="mb-6">
              <Link to="/designer-space" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Designer Space
              </Link>
            </Button>
            
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Designer Community!</h1>
              <p className="text-gray-600">Here's your designer profile card</p>
            </div>

            <div className="flex justify-center">
              <ProfileCard
                name={formData.name || "Designer Name"}
                title={formData.title || "Designer"}
                handle={formData.handle || "designer"}
                status="Online"
                contactText="Contact Me"
                avatarUrl={formData.avatarUrl || "/placeholder.svg"}
                showUserInfo={true}
                enableTilt={true}
                location={formData.location}
                email={formData.email}
                phone={formData.phone}
                website={formData.website}
                bio={formData.bio}
                specialization={formData.specialization}
                onContactClick={() => console.log('Contact clicked')}
              />
            </div>

            <div className="text-center mt-8">
              <Button 
                onClick={() => setShowProfileCard(false)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-tr from-sky-100 to-blue-200 p-6">
        <div className="max-w-4xl mx-auto">
          <Button variant="outline" asChild className="mb-6">
            <Link to="/designer-space" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Designer Space
            </Link>
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Join the Designer Community</h1>
            <p className="text-gray-600">Create your designer profile to connect with other professionals</p>
          </div>

          <Stepper
            initialStep={1}
            onStepChange={(step) => console.log('Current step:', step)}
            onFinalStepCompleted={handleStepperComplete}
            backButtonText="Previous"
            nextButtonText="Next"
          >
            <Step>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Basic Information</h2>
                <p className="text-gray-600 mb-6">Let's start with your basic details</p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="title" className="text-gray-700">Professional Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => updateFormData('title', e.target.value)}
                      placeholder="e.g., Interior Designer, Architect"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="handle" className="text-gray-700">Username</Label>
                    <Input
                      id="handle"
                      value={formData.handle}
                      onChange={(e) => updateFormData('handle', e.target.value)}
                      placeholder="Your unique username"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </Step>

            <Step>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
                <p className="text-gray-600 mb-6">How can others reach you?</p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="website" className="text-gray-700">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => updateFormData('website', e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location" className="text-gray-700">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => updateFormData('location', e.target.value)}
                      placeholder="City, Country"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </Step>

            <Step>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Professional Details</h2>
                <p className="text-gray-600 mb-6">Tell us about your expertise</p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="specialization" className="text-gray-700">Specialization</Label>
                    <Input
                      id="specialization"
                      value={formData.specialization}
                      onChange={(e) => updateFormData('specialization', e.target.value)}
                      placeholder="e.g., Sustainable Design, Modern Architecture"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio" className="text-gray-700">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => updateFormData('bio', e.target.value)}
                      placeholder="Tell us about yourself, your experience, and what drives your passion for design..."
                      className="mt-1 min-h-[120px]"
                    />
                  </div>
                </div>
              </div>
            </Step>

            <Step>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Picture</h2>
                <p className="text-gray-600 mb-6">Add a professional photo to complete your profile</p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="avatarUrl" className="text-gray-700">Profile Picture URL</Label>
                    <Input
                      id="avatarUrl"
                      value={formData.avatarUrl}
                      onChange={(e) => updateFormData('avatarUrl', e.target.value)}
                      placeholder="https://example.com/your-photo.jpg"
                      className="mt-1"
                    />
                  </div>
                  
                  {formData.avatarUrl && (
                    <div className="flex justify-center">
                      <img 
                        src={formData.avatarUrl} 
                        alt="Profile preview" 
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-300"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">Profile Summary</h3>
                    <p className="text-sm text-gray-600">
                      Name: {formData.name || 'Not provided'}<br/>
                      Title: {formData.title || 'Not provided'}<br/>
                      Username: @{formData.handle || 'Not provided'}<br/>
                      Specialization: {formData.specialization || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            </Step>
          </Stepper>
        </div>
      </div>
    </Layout>
  );
};

export default DesignerCommunityPage;
