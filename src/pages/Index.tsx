import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { DocumentUpload } from "@/components/DocumentUpload";
import { DiffViewer, DiffElement } from "@/components/DiffViewer";
import { LoadingAnalysis } from "@/components/LoadingAnalysis";
import { mockDiffData } from "@/data/mockDiffData";
import { useToast } from "@/hooks/use-toast";
import { FileText, Sparkles, Shield, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/legal-hero.jpg";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  file: File;
}

const Index = () => {
  const [oldFile, setOldFile] = useState<UploadedFile | null>(null);
  const [newFile, setNewFile] = useState<UploadedFile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diffData, setDiffData] = useState<DiffElement[] | null>(null);
  const { toast } = useToast();

  const handleFilesUploaded = (oldDoc: UploadedFile | null, newDoc: UploadedFile | null) => {
    setOldFile(oldDoc);
    setNewFile(newDoc);
  };

  const handleAnalyze = async () => {
    if (!oldFile || !newFile) {
      toast({
        title: "Missing Documents",
        description: "Please upload both document versions to proceed with analysis.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    setDiffData(mockDiffData);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete",
      description: "Your document comparison has been successfully generated.",
    });
  };

  const handleReset = () => {
    setOldFile(null);
    setNewFile(null);
    setDiffData(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-12">
        {/* Hero Section */}
        {!diffData && !isAnalyzing && (
          <div className="relative">
            <Card className="overflow-hidden shadow-lift">
              <div className="relative h-64 md:h-80">
                <img 
                  src={heroImage} 
                  alt="Professional legal document analysis workspace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-primary/80"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
                  <div className="max-w-3xl space-y-4">
                    <h1 className="text-4xl md:text-5xl font-display font-bold">
                      Professional Legal Document Analysis
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                      Compare document versions with precision. Identify changes, additions, and removals 
                      with professional-grade diff analysis tailored for legal professionals.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <Card className="p-6 text-center shadow-elegant hover:shadow-lift transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-gradient-accent mx-auto mb-4 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">Intelligent Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms detect and highlight every change with precision
                </p>
              </Card>

              <Card className="p-6 text-center shadow-elegant hover:shadow-lift transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-gradient-accent mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">Secure & Confidential</h3>
                <p className="text-sm text-muted-foreground">
                  Your documents remain private and secure throughout the analysis
                </p>
              </Card>

              <Card className="p-6 text-center shadow-elegant hover:shadow-lift transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-gradient-accent mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">Rapid Results</h3>
                <p className="text-sm text-muted-foreground">
                  Get comprehensive diff analysis in seconds, not hours
                </p>
              </Card>
            </div>
          </div>
        )}

        {/* Upload Section */}
        {!diffData && !isAnalyzing && (
          <Card className="p-8 shadow-document">
            <DocumentUpload 
              onFilesUploaded={handleFilesUploaded}
              isAnalyzing={isAnalyzing}
            />
            
            {oldFile && newFile && (
              <div className="mt-8 text-center">
                <Button 
                  onClick={handleAnalyze}
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 transition-opacity font-semibold px-8"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Analyze Documents
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* Loading State */}
        {isAnalyzing && <LoadingAnalysis />}

        {/* Results Section */}
        {diffData && !isAnalyzing && (
          <div className="space-y-6">
            <DiffViewer 
              diffData={diffData}
              oldFileName={oldFile?.name}
              newFileName={newFile?.name}
            />
            
            <div className="text-center">
              <Button 
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="font-semibold"
              >
                Analyze New Documents
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
