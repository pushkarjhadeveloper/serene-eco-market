import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

interface ProfessionalDetailsStepProps {
  control: Control<any>;
  selectedRole: 'architect' | 'designer' | 'both' | null;
}

const ProfessionalDetailsStep = ({ control, selectedRole }: ProfessionalDetailsStepProps) => {
  const showCOAField = selectedRole === 'architect' || selectedRole === 'both';

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Professional Details</h2>
        <p className="text-sm text-muted-foreground">Help clients understand your expertise</p>
      </div>

      <FormField
        control={control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Years of Experience</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience range" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="0-2">0-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="6-10">6-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="education"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Educational Qualification</FormLabel>
            <FormControl>
              <Input placeholder="e.g., B.Arch, Diploma in Interior Design" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {showCOAField && (
        <FormField
          control={control}
          name="coaNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                COA Registration Number 
                {selectedRole === 'both' ? ' (Optional for Designers)' : ''}
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter COA registration number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company/Studio Name (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Leave blank if freelancer" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="pincode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pin Code</FormLabel>
            <FormControl>
              <Input placeholder="6-digit pin code" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProfessionalDetailsStep;