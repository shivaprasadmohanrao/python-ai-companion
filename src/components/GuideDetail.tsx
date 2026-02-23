import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronRight, Lightbulb } from "lucide-react";
import type { Guide } from "@/data/guides";
import CodeBlock from "./CodeBlock";
import QuizSection from "./QuizSection";

interface GuideDetailProps {
  guide: Guide;
  onBack: () => void;
}

const GuideDetail = ({ guide, onBack }: GuideDetailProps) => {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));

  const toggleSection = (idx: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const Icon = guide.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-foreground">{guide.title}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-10">
            <span className="badge-topic uppercase tracking-wider mb-3 inline-block">{guide.tier}</span>
            <h1 className="font-mono text-3xl font-bold text-foreground mb-3">{guide.title}</h1>
            <p className="text-muted-foreground text-lg">{guide.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {guide.tags.map((tag) => (
                <span key={tag} className="badge-topic">{tag}</span>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-3">
            {guide.sections.map((section, idx) => {
              const isExpanded = expandedSections.has(idx);
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-card overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(idx)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground w-6">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono font-medium text-foreground">{section.title}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 pt-0">
                          <div className="pl-9">
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              {section.content.split("**").map((part, i) =>
                                i % 2 === 1 ? (
                                  <strong key={i} className="text-foreground font-semibold">{part}</strong>
                                ) : (
                                  <span key={i}>{part}</span>
                                )
                              )}
                            </p>

                            {section.code && <CodeBlock code={section.code} />}

                            {section.tip && (
                              <div className="flex items-start gap-3 mt-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
                                <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-accent/90 leading-relaxed">{section.tip}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Quiz */}
          {guide.quiz && guide.quiz.length > 0 && (
            <QuizSection items={guide.quiz} />
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default GuideDetail;
