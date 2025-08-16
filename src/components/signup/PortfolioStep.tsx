import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Control, useFieldArray } from "react-hook-form";
import { Upload, X, Plus } from "lucide-react";

interface PortfolioStepProps {
  control: Control<any>;
}

const PortfolioStep = ({ control }: PortfolioStepProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "portfolio"
  });

  const addProject = () => {
    if (fields.length < 10) {
      append({
        title: "",
        description: "",
        budgetRange: "",
        projectType: "",
        images: []
      });
    }
  };

  const handleImageUpload = (projectIndex: number, files: FileList | null) => {
    if (files) {
      // In a real implementation, you'd upload to a cloud service
      // For now, we'll just show the file names
      const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      // Update the form field with the image URLs
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Portfolio Showcase</h2>
        <p className="text-sm text-muted-foreground">Add at least 3 projects (minimum required)</p>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <Card key={field.id} className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Project {index + 1}</h3>
              {fields.length > 3 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <FormField
                control={control}
                name={`portfolio.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Modern Villa Interior" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`portfolio.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description (100-200 characters)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of the project..."
                        maxLength={200}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name={`portfolio.${index}.budgetRange`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget Range</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="5L-10L">₹5L - ₹10L</SelectItem>
                          <SelectItem value="10L-50L">₹10L - ₹50L</SelectItem>
                          <SelectItem value="50L+">₹50L+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`portfolio.${index}.projectType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="hospitality">Hospitality</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormLabel>Project Images</FormLabel>
                <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload project images (JPG, PNG)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(index, e.target.files)}
                    className="hidden"
                    id={`images-${index}`}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById(`images-${index}`)?.click()}
                  >
                    Choose Files
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {fields.length < 10 && (
        <Button
          type="button"
          variant="outline"
          onClick={addProject}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Project
        </Button>
      )}

      <div className="text-center text-sm text-muted-foreground">
        <p>Minimum 3 projects required • Maximum 10 projects allowed</p>
      </div>
    </div>
  );
};

export default PortfolioStep;