
import React, { useState, Children, isValidElement, cloneElement } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepperProps {
  children: React.ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  backButtonText?: string;
  nextButtonText?: string;
}

interface StepProps {
  children: React.ReactNode;
}

export const Step: React.FC<StepProps> = ({ children }) => {
  return <div className="step-content">{children}</div>;
};

const Stepper: React.FC<StepperProps> = ({
  children,
  initialStep = 2,
  onStepChange,
  onFinalStepCompleted,
  backButtonText = "Previous",
  nextButtonText = "Next"
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const steps = Children.toArray(children).filter(child => 
    isValidElement(child) && child.type === Step
  );
  const totalSteps = steps.length;

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
    } else {
      onFinalStepCompleted?.();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep);
    }
  };

  const currentStepContent = steps[currentStep - 1];

  return (
    <div className="stepper-container w-full max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {Array.from({ length: totalSteps }, (_, index) => (
            <React.Fragment key={index}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 ${
                  index + 1 <= currentStep
                    ? 'bg-eco-sage text-white border-eco-sage'
                    : 'bg-white text-eco-bark border-eco-sand'
                }`}
              >
                {index + 1}
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded ${
                    index + 1 < currentStep ? 'bg-eco-sage' : 'bg-eco-sand'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-center text-eco-bark text-sm">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-eco-sand mb-6 min-h-[300px]">
        {currentStepContent}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={currentStep === 1}
          className="border-2 border-eco-sage text-eco-sage hover:bg-eco-sage hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          {backButtonText}
        </Button>
        
        <Button
          onClick={goToNextStep}
          className="bg-eco-sage hover:bg-eco-moss text-white"
        >
          {currentStep === totalSteps ? 'Complete' : nextButtonText}
          {currentStep < totalSteps && <ChevronRight className="h-4 w-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
};

export default Stepper;
