import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Store, Palette, Building } from "lucide-react";

interface RoleSelectorProps {
  selectedRole: 'architect' | 'designer' | 'vendor' | null;
  onRoleSelect: (role: 'architect' | 'designer' | 'vendor') => void;
}

const RoleSelector = ({ selectedRole, onRoleSelect }: RoleSelectorProps) => {
  const roles = [
    {
      type: 'architect' as const,
      title: 'Architect',
      description: 'Buyers & collaborators for design projects',
      icon: Building,
      features: ['Browse premium products', 'Connect with vendors', 'Collaboration tools', 'No KYC required']
    },
    {
      type: 'designer' as const,
      title: 'Designer',
      description: 'Creative professionals and design enthusiasts',
      icon: Palette,
      features: ['Browse premium products', 'Showcase portfolio', 'Client collaboration', 'No KYC required']
    },
    {
      type: 'vendor' as const,
      title: 'Vendor / Seller',
      description: 'List and sell premium products',
      icon: Store,
      features: ['List products', 'Manage inventory', 'Access dashboard', 'KYC required for payouts']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-serif font-medium text-primary">Choose Your Role</h2>
        <p className="mt-2 text-muted-foreground">Select how you plan to use our platform</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.type;
          
          return (
            <Card 
              key={role.type}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:shadow-md hover:border-primary/20'
              }`}
              onClick={() => onRoleSelect(role.type)}
            >
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{role.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                  </div>
                  
                  <ul className="text-sm space-y-1">
                    {role.features.map((feature, index) => (
                      <li key={index} className="text-muted-foreground">• {feature}</li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={isSelected ? "default" : "outline"}
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRoleSelect(role.type);
                    }}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RoleSelector;