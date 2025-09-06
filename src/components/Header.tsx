import { Scale, FileSearch } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b bg-card shadow-elegant">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary">
              <Scale className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-display text-foreground">LegalDiff Pro</h1>
              <p className="text-sm text-muted-foreground">Professional Document Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileSearch className="h-4 w-4" />
            <span>Secure • Confidential • Professional</span>
          </div>
        </div>
      </div>
    </header>
  );
};