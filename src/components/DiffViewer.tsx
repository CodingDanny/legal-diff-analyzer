import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Minus, Equal, Eye, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DiffElement {
  type: 'unchanged' | 'added' | 'removed' | 'modified';
  content?: string | string[];
  old_index?: number;
  new_index?: number;
  old_range?: [number, number];
  new_range?: [number, number];
  // For modified type
  old_content?: string[];
  new_content?: string[];
  similarity?: number;
  inline_diff?: Array<[number, string]>; // [operation, text] where operation: 0=unchanged, 1=added, -1=removed
}

interface DiffViewerProps {
  diffData: DiffElement[];
  oldFileName?: string;
  newFileName?: string;
}

export const DiffViewer = ({ diffData, oldFileName = "Original", newFileName = "Updated" }: DiffViewerProps) => {
  const [fontSize, setFontSize] = useState(16);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  const stats = useMemo(() => {
    const added = diffData.filter(item => item.type === 'added').length;
    const removed = diffData.filter(item => item.type === 'removed').length;
    const modified = diffData.filter(item => item.type === 'modified').length;
    const equal = diffData.filter(item => item.type === 'unchanged').length;
    return { added, removed, modified, equal, total: diffData.length };
  }, [diffData]);

  const getElementIcon = (type: DiffElement['type']) => {
    switch (type) {
      case 'added': return <Plus className="h-4 w-4" />;
      case 'removed': return <Minus className="h-4 w-4" />;
      case 'unchanged': return <Equal className="h-4 w-4" />;
      case 'modified': return <RefreshCw className="h-4 w-4" />;
    }
  };

  const getElementStyles = (type: DiffElement['type']) => {
    switch (type) {
      case 'added':
        return "bg-diff-added border-l-4 border-diff-added-accent text-foreground";
      case 'removed':
        return "bg-diff-removed border-l-4 border-diff-removed-accent text-foreground line-through opacity-75";
      case 'unchanged':
        return "bg-diff-equal border-l-4 border-border text-foreground";
      case 'modified':
        return "bg-muted/50 border-l-4 border-primary text-foreground";
    }
  };

  const getBadgeVariant = (type: DiffElement['type']): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case 'added': return "default";
      case 'removed': return "destructive";
      case 'unchanged': return "secondary";
      case 'modified': return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats and Controls */}
      <Card className="p-6 shadow-elegant">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-display text-foreground">Document Comparison Analysis</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span className="font-medium text-diff-removed-accent">{oldFileName}</span>
              <span>→</span>
              <span className="font-medium text-diff-added-accent">{newFileName}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Badge variant={getBadgeVariant('added')} className="gap-1">
                <Plus className="h-3 w-3" />
                {stats.added} Added
              </Badge>
              <Badge variant={getBadgeVariant('removed')} className="gap-1">
                <Minus className="h-3 w-3" />
                {stats.removed} Removed  
              </Badge>
              <Badge variant={getBadgeVariant('modified')} className="gap-1">
                <FileText className="h-3 w-3" />
                {stats.modified} Modified
              </Badge>
              <Badge variant={getBadgeVariant('unchanged')} className="gap-1">
                <Equal className="h-3 w-3" />
                {stats.equal} Unchanged
              </Badge>
            </div>
            
            <div className="flex items-center gap-1 border-l pl-3">
              <Button
                variant="outline" 
                size="sm"
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline" 
                size="sm"
                onClick={() => setFontSize(Math.min(20, fontSize + 2))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLineNumbers(!showLineNumbers)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Diff Content */}
      <Card className="shadow-document">
        <div className="border-b bg-muted/30 px-6 py-3">
          <h3 className="font-semibold font-display text-foreground">
            Updated Document with Highlighted Changes
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Green sections are additions, red sections are removals, modified sections show old and new versions
          </p>
        </div>
        
        <div className="max-h-[70vh] overflow-auto scrollbar-thin">
          <div className="p-6 space-y-1">
            {diffData.map((element, index) => {
              const getElementKey = () => {
                if (element.type === 'unchanged' && element.new_range) {
                  return `${element.type}-${element.new_range[0]}-${element.new_range[1]}`;
                }
                if (element.type === 'added' && element.new_index !== undefined) {
                  return `${element.type}-${element.new_index}`;
                }
                if (element.type === 'removed' && element.old_index !== undefined) {
                  return `${element.type}-${element.old_index}`;
                }
                return `${element.type}-${index}`;
              };

              const getDisplayContent = () => {
                if (Array.isArray(element.content)) {
                  return element.content.join('\n');
                }
                return element.content;
              };

              const getLineNumber = () => {
                if (element.type === 'added' && element.new_index !== undefined) {
                  return element.new_index;
                }
                if (element.type === 'unchanged' && element.new_range) {
                  const [start, end] = element.new_range;
                  return start === end ? start : `${start}:${end}`;
                }
                if (element.type === 'modified' && element.new_range) {
                  const [start, end] = element.new_range;
                  return start === end ? start : `${start}:${end}`;
                }
                return null; // For removed elements, show nothing
              };

              // Special rendering for modified elements (Option 5)
              if (element.type === 'modified') {
                return (
                  <div
                    key={getElementKey()}
                    className={cn(
                      "relative rounded-md p-4 transition-all duration-200",
                      "hover:shadow-sm border border-transparent",
                      getElementStyles(element.type)
                    )}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    <div className="flex items-start gap-3">
                      {showLineNumbers && (
                        <div className="flex-shrink-0 w-12 text-xs text-muted-foreground font-mono">
                          {getLineNumber() || ''}
                        </div>
                      )}
                      
                      <div className="flex-shrink-0 mt-1 opacity-60">
                        {getElementIcon(element.type)}
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        {/* Old content (removed) */}
                        <div className="bg-diff-removed border border-diff-removed-accent/30 rounded p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Minus className="h-3 w-3 text-diff-removed-accent" />
                            <span className="text-xs font-medium text-diff-removed-accent">REMOVED</span>
                          </div>
                          <div className="font-document leading-relaxed line-through opacity-75">
                            {element.old_content?.map((line, lineIndex) => (
                              <div key={lineIndex}>{line}</div>
                            ))}
                          </div>
                        </div>
                        
                        {/* New content (added) */}
                        <div className="bg-diff-added border border-diff-added-accent/30 rounded p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Plus className="h-3 w-3 text-diff-added-accent" />
                            <span className="text-xs font-medium text-diff-added-accent">ADDED</span>
                          </div>
                          <div className="font-document leading-relaxed">
                            {element.new_content?.map((line, lineIndex) => (
                              <div key={lineIndex}>{line}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <Badge 
                          variant={getBadgeVariant(element.type)} 
                          className="text-xs"
                        >
                          MODIFIED
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={getElementKey()}
                  className={cn(
                    "relative rounded-md p-4 transition-all duration-200",
                    "hover:shadow-sm border border-transparent",
                    getElementStyles(element.type)
                  )}
                  style={{ fontSize: `${fontSize}px` }}
                >
                  <div className="flex items-start gap-3">
                    {showLineNumbers && (
                      <div className="flex-shrink-0 w-12 text-xs text-muted-foreground font-mono">
                        {getLineNumber() || ''}
                      </div>
                    )}
                    
                    <div className="flex-shrink-0 mt-1 opacity-60">
                      {getElementIcon(element.type)}
                    </div>
                    
                    <div className="flex-1 font-document leading-relaxed">
                      {getDisplayContent().split('\n').map((line, lineIndex) => (
                        <div key={lineIndex}>
                          {line || <br />}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex-shrink-0">
                      <Badge 
                        variant={getBadgeVariant(element.type)} 
                        className="text-xs"
                      >
                        {element.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
      
      {/* Summary Card */}
      <Card className="p-6 bg-gradient-subtle shadow-elegant">
        <div className="text-center space-y-2">
          <h3 className="font-semibold font-display text-foreground">Analysis Summary</h3>
          <p className="text-sm text-muted-foreground">
            Processed {stats.total} document sections with {stats.added} additions, {stats.removed} removals, and {stats.modified} modifications
          </p>
          <div className="flex justify-center gap-6 pt-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-diff-added-accent">{stats.added}</div>
              <div className="text-xs text-muted-foreground">Additions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-diff-removed-accent">{stats.removed}</div>
              <div className="text-xs text-muted-foreground">Deletions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.modified}</div>
              <div className="text-xs text-muted-foreground">Modified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">{stats.equal}</div>
              <div className="text-xs text-muted-foreground">Unchanged</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};