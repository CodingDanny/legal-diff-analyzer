import { Loader2, FileText, Brain, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export const LoadingAnalysis = () => {
  const steps = [
    { icon: FileText, text: "Processing documents..." },
    { icon: Brain, text: "Analyzing differences..." },
    { icon: CheckCircle2, text: "Generating insights..." }
  ];

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
            
            <div className="space-y-3">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg text-muted-foreground"
                  >
                    <div className="flex-shrink-0 text-muted-foreground">
                      <StepIcon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">
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