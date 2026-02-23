import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Guide } from "@/data/guides";

interface GuideCardProps {
  guide: Guide;
  index: number;
  onClick: () => void;
}

const GuideCard = ({ guide, index, onClick }: GuideCardProps) => {
  const Icon = guide.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      onClick={onClick}
      className="group relative rounded-xl border border-border bg-card p-6 cursor-pointer card-glow transition-all duration-300 hover:translate-y-[-2px]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
          <Icon className="w-5 h-5" />
        </div>
        <span className="badge-topic uppercase tracking-wider">{guide.tier}</span>
      </div>

      <h3 className="font-mono text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {guide.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {guide.description}
      </p>

      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
        <span>{guide.sections.length} Sections</span>
        {guide.quiz && (
          <>
            <span>•</span>
            <span>{guide.quiz.length} Quiz Questions</span>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {guide.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="badge-topic">
            {tag}
          </span>
        ))}
        {guide.tags.length > 4 && (
          <span className="badge-topic">+{guide.tags.length - 4} more</span>
        )}
      </div>

      <div className="flex items-center gap-1 text-sm font-mono text-primary group-hover:gap-2 transition-all">
        Open Guide <ArrowRight className="w-4 h-4" />
      </div>
    </motion.div>
  );
};

export default GuideCard;
