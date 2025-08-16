import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Control } from "react-hook-form";
import { Upload, Star, Award, CheckCircle } from "lucide-react";

interface CredibilityStepProps {
  control: Control<any>;
  selectedRole: 'architect' | 'designer' | 'both' | null;
}

const CredibilityStep = ({ control, selectedRole }: CredibilityStepProps) => {
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  const handleDocumentUpload = (docType: string, files: FileList | null) => {
    if (files) {
      // In a real implementation, you'd upload to a cloud service
      setUploadedDocs(prev => [...prev, docType]);
    }
  };

  const verificationDocs = [
    {
      id: 'coa',
      title: 'COA Certificate',
      description: 'Council of Architecture certificate',
      required: selectedRole === 'architect' || selectedRole === 'both',
      icon: CheckCircle
    },
    {
      id: 'degree',
      title: 'Degree/Diploma',
      description: 'Educational qualification certificate',
      required: false,
      icon: Award
    },
    {
      id: 'company',
      title: 'Company Registration',
      description: 'Business registration certificate',
      required: false,
      icon: Star
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Star className="h-12 w-12 mx-auto text-primary mb-4" />
        <h2 className="text-xl font-semibold">Get Verified Professional Badge</h2>
        <p className="text-sm text-muted-foreground">
          Optional but highly recommended - Higher ranking & More client trust
        </p>
      </div>

      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-primary mt-1" />
          <div>
            <h3 className="font-medium text-primary">Benefits of Verification</h3>
            <ul className="text-sm text-muted-foreground mt-1 space-y-1">
              <li>• Higher ranking in search results</li>
              <li>• Verified badge on your profile</li>
              <li>• Increased client trust and inquiries</li>
              <li>• Priority listing in featured section</li>
            </ul>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="font-medium">Upload Supporting Documents</h3>
        
        {verificationDocs.map((doc) => {
          const Icon = doc.icon;
          const isUploaded = uploadedDocs.includes(doc.id);
          
          return (
            <Card key={doc.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${isUploaded ? 'bg-green-100' : 'bg-muted'}`}>
                  <Icon className={`h-5 w-5 ${isUploaded ? 'text-green-600' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{doc.title}</h4>
                    {doc.required && (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                        Recommended for {selectedRole}s
                      </span>
                    )}
                    {isUploaded && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        Uploaded
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{doc.description}</p>
                  
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                    <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload {doc.title} (PDF, JPG, PNG)
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleDocumentUpload(doc.id, e.target.files)}
                      className="hidden"
                      id={`doc-${doc.id}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById(`doc-${doc.id}`)?.click()}
                      disabled={isUploaded}
                    >
                      {isUploaded ? 'Uploaded' : 'Choose File'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Additional Certifications & Awards (Optional)</h3>
        
        <FormField
          control={control}
          name="certifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certifications & Awards</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="List any certifications, awards, or recognitions (e.g., IIID membership, Green building certification, Design awards, etc.)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <Card className="p-4 bg-muted/50">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            You can always upload documents later from your profile settings.
            <br />
            <strong>Skip this step to continue with basic profile.</strong>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CredibilityStep;