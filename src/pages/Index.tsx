import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { DocumentUpload } from "@/components/DocumentUpload";
import { DiffViewer, DiffElement } from "@/components/DiffViewer";
import { LoadingAnalysis } from "@/components/LoadingAnalysis";
import { analyzePdfDiff } from "@/lib/api";
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
  const {
    toast
  } = useToast();
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

    try {
      const result = await analyzePdfDiff(oldFile.file, newFile.file);
      setDiffData(result);
      toast({
        title: "Analysis Complete",
        description: "Your document comparison has been successfully generated."
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your documents. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  const handleReset = () => {
    setOldFile(null);
    setNewFile(null);
    setDiffData(null);
    setIsAnalyzing(false);
  };
  return <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-12">
        {/* Hero Section */}
        {!diffData && !isAnalyzing && <div className="relative">
            <Card className="overflow-hidden shadow-lift">
              <div className="relative h-64 md:h-80">
                <img src={heroImage} alt="Legal document analysis workspace" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-primary/80"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
                  <div className="max-w-3xl space-y-4">
                    <h1 className="text-4xl md:text-5xl font-display font-bold">
                      Legal Document Analysis
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                      Compare document versions with precision. Identification and analysis of the changes tailored for legal professionals.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Features */}
            
          </div>}

        {/* Upload Section */}
        {!diffData && !isAnalyzing && <Card className="p-8 shadow-document">
            <DocumentUpload onFilesUploaded={handleFilesUploaded} isAnalyzing={isAnalyzing} />
            
            {oldFile && newFile && <div className="mt-8 text-center">
                <Button onClick={handleAnalyze} size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity font-semibold px-8">
                  <FileText className="h-5 w-5 mr-2" />
                  Analyze Documents
                </Button>
              </div>}
          </Card>}

        {/* Loading State */}
        {isAnalyzing && <LoadingAnalysis />}

        {/* Results Section */}
        {diffData && !isAnalyzing && <div className="space-y-6">
            <DiffViewer diffData={diffData} oldFileName={oldFile?.name} newFileName={newFile?.name} />
            
            <div className="text-center">
              <Button onClick={handleReset} variant="outline" size="lg" className="font-semibold">
                Analyze New Documents
              </Button>
            </div>
          </div>}
      </main>
    </div>;
};
export default Index;