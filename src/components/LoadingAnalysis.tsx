import { Loader2, FileText, Brain, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export const LoadingAnalysis = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: FileText, text: "Processing documents...", duration: 2000 },
    { icon: Brain, text: "Analyzing differences...", duration: 2500 },
    { icon: CheckCircle2, text: "Generating insights...", duration: 1500 }
  ];

  useEffect(() => {
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / totalDuration) * 50;
        return Math.min(newProgress, 100);
      });
    }, 50);

    // Step progression
    let stepTimeout: NodeJS.Timeout;
    const progressSteps = () => {
      if (currentStep < steps.length - 1) {
        stepTimeout = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
          progressSteps();
        }, steps[currentStep].duration);
      }
    };
    progressSteps();

    return () => {
      clearInterval(interval);
      clearTimeout(stepTimeout);
    };
  }, [currentStep, steps]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="p-8 max-w-md w-full shadow-document">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary-foreground animate-spin" />
              </div>
              <div className="absolute inset-0 rounded-full border-4 border-accent/20 animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-display text-foreground">
              Analyzing Your Documents
            </h3>
            
            <Progress value={progress} className="w-full h-2" />
            
            <div className="space-y-3">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                      isActive ? 'bg-accent-light text-accent-foreground' : 
                      isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/60'
                    }`}
                  >
                    <div className={`flex-shrink-0 ${
                      isCompleted ? 'text-diff-added-accent' : 
                      isActive ? 'text-accent-foreground' : 'text-muted-foreground/60'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <StepIcon className={`h-5 w-5 ${isActive ? 'animate-pulse' : ''}`} />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${
                      isActive ? 'font-semibold' : ''
                    }`}>
                      {step.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Professional-grade analysis using advanced algorithms
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};