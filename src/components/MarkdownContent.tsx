import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string | string[];
}

export const MarkdownContent = ({ content }: MarkdownContentProps) => {
  const normalizeContent = (content: string | string[]): string => {
    if (Array.isArray(content)) {
      return content.join('\n');
    }
    return content || '';
  };

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Customize heading styles to be more compact
          h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-4 first:mt-0">{children}</h1>,
          h2: ({ children }) => <h2 className="text-base font-semibold mb-2 mt-3 first:mt-0">{children}</h2>,
          h3: ({ children }) => <h3 className="text-sm font-medium mb-1 mt-2 first:mt-0">{children}</h3>,
          h4: ({ children }) => <h4 className="text-sm font-medium mb-1 mt-2 first:mt-0">{children}</h4>,
          h5: ({ children }) => <h5 className="text-sm font-medium mb-1 mt-1 first:mt-0">{children}</h5>,
          h6: ({ children }) => <h6 className="text-sm font-medium mb-1 mt-1 first:mt-0">{children}</h6>,
          // Style paragraphs to be more compact
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          // Style lists
          ul: ({ children }) => <ul className="list-disc ml-4 mb-2 last:mb-0">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 last:mb-0">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          // Style emphasis
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          // Style code
          code: ({ children }) => <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
          // Style blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-muted-foreground/20 pl-4 italic text-muted-foreground mb-2">
              {children}
            </blockquote>
          ),
        }}
      >
        {normalizeContent(content)}
      </ReactMarkdown>
    </div>
  );
};