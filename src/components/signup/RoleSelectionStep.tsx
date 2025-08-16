import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Palette, Briefcase } from "lucide-react";

interface RoleSelectionStepProps {
  selectedRole: 'architect' | 'designer' | 'both' | null;
  onRoleSelect: (role: 'architect' | 'designer' | 'both') => void;
}

const RoleSelectionStep = ({ selectedRole, onRoleSelect }: RoleSelectionStepProps) => {
  const roles = [
    {
      type: 'architect' as const,
      title: 'Architect',
      description: 'Licensed architect with COA registration',
      icon: User,
      features: ['COA verification', 'Structural design projects', 'Building permits']
    },
    {
      type: 'designer' as const,
      title: 'Interior Designer',
      description: 'Interior design specialist',
      icon: Palette,
      features: ['Space planning', 'Interior concepts', 'Furniture selection']
    },
    {
      type: 'both' as const,
      title: 'Both',
      description: 'Architect & Interior Designer',
      icon: Briefcase,
      features: ['Complete design solutions', 'Architecture + Interiors', 'End-to-end projects']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Select Your Role</h2>
        <p className="text-sm text-muted-foreground">Choose your professional area</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.type;
          
          return (
            <Card 
              key={role.type}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:border-primary/50'
              }`}
              onClick={() => onRoleSelect(role.type)}
            >
              <div className="text-center space-y-3">
                <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {role.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
                <Button 
                  variant={isSelected ? "default" : "outline"} 
                  size="sm" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRoleSelect(role.type);
                  }}
                >
                  {isSelected ? "Selected" : "Select"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelectionStep;