import { useState } from "react";
import { Check, X, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizItem } from "@/data/guides";

interface QuizSectionProps {
  items: QuizItem[];
}

const QuizSection = ({ items }: QuizSectionProps) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const handleSelect = (questionIdx: number, optionIdx: number) => {
    if (revealed[questionIdx]) return;
    setAnswers((prev) => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const revealAnswer = (questionIdx: number) => {
    setRevealed((prev) => ({ ...prev, [questionIdx]: true }));
  };

  const resetQuiz = () => {
    setAnswers({});
    setRevealed({});
  };

  const score = items.reduce((acc, item, idx) => {
    if (revealed[idx] && answers[idx] === item.answer) return acc + 1;
    return acc;
  }, 0);

  const totalRevealed = Object.keys(revealed).length;

  return (
    <div className="mt-8 border-t border-border pt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-mono text-lg text-foreground">🧪 Quick Quiz</h3>
        {totalRevealed > 0 && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Score: <span className="text-primary font-mono">{score}/{totalRevealed}</span>
            </span>
            <button
              onClick={resetQuiz}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {items.map((item, qIdx) => (
          <motion.div
            key={qIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: qIdx * 0.1 }}
            className="rounded-lg bg-secondary/50 p-5"
          >
            <p className="font-medium text-foreground mb-3">
              {qIdx + 1}. {item.question}
            </p>
            <div className="grid gap-2">
              {item.options.map((option, oIdx) => {
                const isSelected = answers[qIdx] === oIdx;
                const isCorrect = item.answer === oIdx;
                const isRevealed = revealed[qIdx];

                let optionClasses = "px-4 py-2.5 rounded-md text-sm text-left transition-all cursor-pointer border ";
                if (isRevealed) {
                  if (isCorrect) {
                    optionClasses += "border-primary/50 bg-primary/10 text-primary";
                  } else if (isSelected && !isCorrect) {
                    optionClasses += "border-destructive/50 bg-destructive/10 text-destructive";
                  } else {
                    optionClasses += "border-border bg-muted/30 text-muted-foreground";
                  }
                } else if (isSelected) {
                  optionClasses += "border-primary/40 bg-primary/5 text-foreground";
                } else {
                  optionClasses += "border-border bg-muted/20 text-secondary-foreground hover:border-primary/30 hover:bg-primary/5";
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(qIdx, oIdx)}
                    className={optionClasses}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground w-5">
                        {String.fromCharCode(65 + oIdx)}.
                      </span>
                      {option}
                      {isRevealed && isCorrect && <Check className="w-4 h-4 text-primary ml-auto" />}
                      {isRevealed && isSelected && !isCorrect && <X className="w-4 h-4 text-destructive ml-auto" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {answers[qIdx] !== undefined && !revealed[qIdx] && (
              <button
                onClick={() => revealAnswer(qIdx)}
                className="mt-3 text-xs font-mono text-primary hover:text-primary/80 transition-colors"
              >
                Check Answer →
              </button>
            )}

            <AnimatePresence>
              {revealed[qIdx] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-sm text-muted-foreground bg-muted/30 rounded-md p-3"
                >
                  💡 {item.explanation}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuizSection;
