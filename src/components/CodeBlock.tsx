import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock = ({ code, language = "python" }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting using CSS classes to avoid regex conflicts
  const highlightCode = (code: string) => {
    return code
      .split("\n")
      .map((line) => {
        // First, escape HTML
        let escaped = line
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

        // Apply highlighting with CSS classes (no inline hsl values that conflict with number regex)
        let highlighted = escaped
          // Comments first (highest priority)
          .replace(/(#.*$)/gm, '<span class="syn-comment">$1</span>')
          // Triple-quoted strings
          .replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, '<span class="syn-string">$1</span>')
          // Strings (double quotes)
          .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="syn-string">$1</span>')
          // Strings (single quotes)  
          .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="syn-string">$1</span>')
          // Keywords
          .replace(
            /\b(def|class|import|from|return|if|elif|else|for|while|try|except|finally|with|as|async|await|yield|raise|True|False|None|and|or|not|in|is|lambda|break|continue|pass|global|nonlocal)\b/g,
            '<span class="syn-keyword">$1</span>'
          )
          // Built-in functions
          .replace(
            /\b(print|len|range|type|isinstance|sorted|list|dict|set|tuple|int|float|str|bool|super|enumerate|zip|map|filter|open|getattr|setattr|hasattr)\b(?=\()/g,
            '<span class="syn-builtin">$1</span>'
          )
          // Decorators
          .replace(/(@\w+)/g, '<span class="syn-decorator">$1</span>')
          // Numbers (now safe — no inline styles to conflict with)
          .replace(/(?<!["\w])(\b\d+\.?\d*\b)(?!["\w])/g, '<span class="syn-number">$1</span>');

        return highlighted;
      })
      .join("\n");
  };

  return (
    <div className="code-block my-4 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
        <span className="text-xs font-mono text-muted-foreground">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-primary" />
              <span className="text-primary">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed scrollbar-thin">
        <code
          dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
          className="font-mono text-foreground/90"
        />
      </pre>
    </div>
  );
};

export default CodeBlock;
