import { useState, useCallback } from "react";
import { Upload, FileText, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  file: File;
}

interface DocumentUploadProps {
  onFilesUploaded: (oldFile: UploadedFile | null, newFile: UploadedFile | null) => void;
  isAnalyzing: boolean;
}

export const DocumentUpload = ({ onFilesUploaded, isAnalyzing }: DocumentUploadProps) => {
  const [oldDocument, setOldDocument] = useState<UploadedFile | null>(null);
  const [newDocument, setNewDocument] = useState<UploadedFile | null>(null);
  const [dragOver, setDragOver] = useState<'old' | 'new' | null>(null);

  const handleFileUpload = useCallback((file: File, type: 'old' | 'new') => {
    if (file.type !== 'application/pdf') {
      alert('Please upload PDF files only.');
      return;
    }

    const uploadedFile: UploadedFile = {
      name: file.name,
      size: file.size,
      type: file.type,
      file
    };

    if (type === 'old') {
      setOldDocument(uploadedFile);
      onFilesUploaded(uploadedFile, newDocument);
    } else {
      setNewDocument(uploadedFile);
      onFilesUploaded(oldDocument, uploadedFile);
    }
  }, [oldDocument, newDocument, onFilesUploaded]);

  const handleDrop = useCallback((e: React.DragEvent, type: 'old' | 'new') => {
    e.preventDefault();
    setDragOver(null);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0], type);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent, type: 'old' | 'new') => {
    e.preventDefault();
    setDragOver(type);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const UploadArea = ({ 
    type, 
    document, 
    title, 
    description 
  }: { 
    type: 'old' | 'new'; 
    document: UploadedFile | null; 
    title: string; 
    description: string; 
  }) => (
    <Card
      className={cn(
        "relative border-2 border-dashed transition-all duration-200 cursor-pointer hover:shadow-elegant",
        dragOver === type && "border-accent bg-accent-light/20 shadow-lift",
        !dragOver && !document && "border-border hover:border-accent/60",
        document && "border-diff-added-accent bg-diff-added/30"
      )}
      onDrop={(e) => handleDrop(e, type)}
      onDragOver={(e) => handleDragOver(e, type)}
      onDragLeave={handleDragLeave}
      onClick={() => {
        const input = window.document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf';
        input.onchange = (e) => {
          const files = (e.target as HTMLInputElement).files;
          if (files?.length) handleFileUpload(files[0], type);
        };
        input.click();
      }}
    >
      <div className="p-8 text-center">
        {document ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-diff-added-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{document.name}</h3>
              <p className="text-sm text-muted-foreground">
                {formatFileSize(document.size)} • PDF Document
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                if (type === 'old') {
                  setOldDocument(null);
                  onFilesUploaded(null, newDocument);
                } else {
                  setNewDocument(null);
                  onFilesUploaded(oldDocument, null);
                }
              }}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className={cn(
                "rounded-full p-3 transition-colors",
                dragOver === type ? "bg-accent text-accent-foreground" : "bg-muted"
              )}>
                <Upload className="h-8 w-8" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold font-display text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Click to browse or drag & drop your PDF file</p>
              <p className="flex items-center justify-center gap-1">
                <FileText className="h-3 w-3" />
                PDF files only, up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-display text-foreground">Upload Documents for Analysis</h2>
        <p className="text-muted-foreground">
          Upload both versions of your legal document to generate a comprehensive diff analysis
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <UploadArea
          type="old"
          document={oldDocument}
          title="Original Version"
          description="Upload the earlier version of your document"
        />
        <UploadArea
          type="new"
          document={newDocument}
          title="Updated Version"
          description="Upload the newer version to compare against"
        />
      </div>

      {oldDocument && newDocument && !isAnalyzing && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Both documents uploaded successfully. Ready to analyze differences.
          </p>
        </div>
      )}
    </div>
  );
};