import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Minus, Equal, Eye, ZoomIn, ZoomOut, RefreshCw, ArrowRight, AlertTriangle, Info, Pilcrow } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DiffElement {
  type: 'unchanged' | 'added' | 'removed' | 'modified' | 'moved' | 'moved_and_modified';
  content?: string | string[];
  old_index?: number;
  new_index?: number;
  old_range?: [number, number];
  new_range?: [number, number];
  // For modified and moved_and_modified types
  old_content?: string | string[];
  new_content?: string | string[];
  similarity?: number;
  inline_diff?: Array<[number, string]>; // [operation, text] where operation: 0=unchanged, 1=added, -1=removed
  // Classification for changes (all types except unchanged and moved)
  classification?: {
    decision: 'Critical' | 'Minor' | 'Formatting';
  };
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
    const moved = diffData.filter(item => item.type === 'moved').length;
    const movedAndModified = diffData.filter(item => item.type === 'moved_and_modified').length;
    const equal = diffData.filter(item => item.type === 'unchanged').length;
    
    // Classification stats
    const critical = diffData.filter(item => item.classification?.decision === 'Critical').length;
    const minor = diffData.filter(item => item.classification?.decision === 'Minor').length;
    const formatting = diffData.filter(item => item.classification?.decision === 'Formatting').length;
    
    return { added, removed, modified, moved, movedAndModified, equal, critical, minor, formatting, total: diffData.length };
  }, [diffData]);

  const getElementIcon = (type: DiffElement['type']) => {
    switch (type) {
      case 'added': return <Plus className="h-4 w-4" />;
      case 'removed': return <Minus className="h-4 w-4" />;
      case 'unchanged': return <Equal className="h-4 w-4" />;
      case 'modified': return <RefreshCw className="h-4 w-4" />;
      case 'moved': return <ArrowRight className="h-4 w-4" />;
      case 'moved_and_modified': return <RefreshCw className="h-4 w-4" />;
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
      case 'moved':
        return "bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 text-foreground";
      case 'moved_and_modified':
        return "bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 text-foreground";
    }
  };

  const getBadgeVariant = (type: DiffElement['type']): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case 'added': return "default";
      case 'removed': return "destructive";
      case 'unchanged': return "secondary";
      case 'modified': return "outline";
      case 'moved': return "outline";
      case 'moved_and_modified': return "outline";
    }
  };

  const getClassificationMeta = (classification?: DiffElement['classification']) => {
    if (!classification) return null;
    
    switch (classification.decision) {
      case 'Critical':
        return {
          label: 'CRITICAL',
          icon: <AlertTriangle className="h-3 w-3" />,
          className: 'bg-red-500 text-white border-red-600 hover:bg-red-600 no-underline opacity-100 font-semibold'
        };
      case 'Minor':
        return {
          label: 'MINOR', 
          icon: <Info className="h-3 w-3" />,
          className: 'bg-yellow-500 text-white border-yellow-600 hover:bg-yellow-600 no-underline opacity-100 font-semibold'
        };
      case 'Formatting':
        return {
          label: 'FORMATTING',
          icon: <Pilcrow className="h-3 w-3" />,
          className: 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600 no-underline opacity-100 font-semibold'
        };
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
                 <RefreshCw className="h-3 w-3" />
                 {stats.modified} Modified
               </Badge>
               <Badge variant={getBadgeVariant('moved')} className="gap-1">
                 <ArrowRight className="h-3 w-3" />
                 {stats.moved} Moved
               </Badge>
               <Badge variant={getBadgeVariant('moved_and_modified')} className="gap-1">
                 <RefreshCw className="h-3 w-3" />
                 {stats.movedAndModified} Moved+Mod
               </Badge>
              <Badge variant={getBadgeVariant('unchanged')} className="gap-1">
                <Equal className="h-3 w-3" />
                {stats.equal} Unchanged
              </Badge>
            </div>

            {/* Classification Stats */}
            {(stats.critical > 0 || stats.minor > 0 || stats.formatting > 0) && (
              <div className="flex items-center gap-2 border-l pl-3">
                {stats.critical > 0 && (
                  <Badge variant="destructive" className="gap-1 text-xs">
                    <AlertTriangle className="h-3 w-3" />
                    {stats.critical} Critical
                  </Badge>
                )}
                {stats.minor > 0 && (
                  <Badge variant="default" className="gap-1 text-xs">
                    <Info className="h-3 w-3" />
                    {stats.minor} Minor
                  </Badge>
                )}
                {stats.formatting > 0 && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <Pilcrow className="h-3 w-3" />
                    {stats.formatting} Formatting
                  </Badge>
                )}
              </div>
            )}
            
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
                if ((element.type === 'moved' || element.type === 'moved_and_modified') && element.new_index !== undefined) {
                  return `${element.type}-${element.new_index}`;
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
                if ((element.type === 'moved' || element.type === 'moved_and_modified') && element.new_index !== undefined) {
                  return element.new_index;
                }
                return null; // For removed elements, show nothing
              };

              // Special rendering for moved_and_modified elements
              if (element.type === 'moved_and_modified') {
                const normalizeContent = (content: string | string[] | undefined): string[] => {
                  if (!content) return [];
                  return Array.isArray(content) ? content : [content];
                };

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
                            {normalizeContent(element.old_content).map((line, lineIndex) => (
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
                            {normalizeContent(element.new_content).map((line, lineIndex) => (
                              <div key={lineIndex}>{line}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                       <div className="flex-shrink-0 flex items-center gap-2">
                         <Badge 
                           variant={getBadgeVariant(element.type)} 
                           className="text-xs"
                         >
                           MOVED+MOD
                         </Badge>
                          {element.classification && (
                            <div 
                              className={cn(
                                "inline-flex items-center rounded-full px-2 py-1 text-xs gap-1",
                                "decoration-none line-through-none opacity-100 font-bold transform-none",
                                "shadow-sm border",
                                getClassificationMeta(element.classification)?.className
                              )}
                              style={{ textDecoration: 'none', opacity: 1, fontWeight: '700' }}
                            >
                              {getClassificationMeta(element.classification)?.icon}
                              {getClassificationMeta(element.classification)?.label}
                            </div>
                          )}
                       </div>
                    </div>
                  </div>
                );
              }

              // Special rendering for modified elements (Option 5)
              if (element.type === 'modified') {
                const normalizeContent = (content: string | string[] | undefined): string[] => {
                  if (!content) return [];
                  return Array.isArray(content) ? content : [content];
                };
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
                            {normalizeContent(element.old_content).map((line, lineIndex) => (
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
                            {normalizeContent(element.new_content).map((line, lineIndex) => (
                              <div key={lineIndex}>{line}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                       <div className="flex-shrink-0 flex items-center gap-2">
                         <Badge 
                           variant={getBadgeVariant(element.type)} 
                           className="text-xs"
                         >
                           MODIFIED
                         </Badge>
                          {element.classification && (
                            <div 
                              className={cn(
                                "inline-flex items-center rounded-full px-2 py-1 text-xs gap-1",
                                "decoration-none line-through-none opacity-100 font-bold transform-none",
                                "shadow-sm border",
                                getClassificationMeta(element.classification)?.className
                              )}
                              style={{ textDecoration: 'none', opacity: 1, fontWeight: '700' }}
                            >
                              {getClassificationMeta(element.classification)?.icon}
                              {getClassificationMeta(element.classification)?.label}
                            </div>
                          )}
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
                    
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <Badge 
                        variant={getBadgeVariant(element.type)} 
                        className="text-xs"
                      >
                        {element.type === 'moved' ? 'MOVED' : element.type.toUpperCase()}
                      </Badge>
                       {element.classification && (
                         <div 
                           className={cn(
                             "inline-flex items-center rounded-full px-2 py-1 text-xs gap-1",
                             "decoration-none line-through-none opacity-100 font-bold transform-none",
                             "shadow-sm border",
                             getClassificationMeta(element.classification)?.className
                           )}
                           style={{ textDecoration: 'none', opacity: 1, fontWeight: '700' }}
                         >
                           {getClassificationMeta(element.classification)?.icon}
                           {getClassificationMeta(element.classification)?.label}
                         </div>
                       )}
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
            Processed {stats.total} document sections with {stats.added} additions, {stats.removed} removals, {stats.modified} modifications, {stats.moved} moves, and {stats.movedAndModified} moved+modified
          </p>
          <div className="flex justify-center gap-4 pt-2">
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
              <div className="text-2xl font-bold text-blue-600">{stats.moved}</div>
              <div className="text-xs text-muted-foreground">Moved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-800">{stats.movedAndModified}</div>
              <div className="text-xs text-muted-foreground">Moved+Mod</div>
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