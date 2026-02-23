import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import { guides } from "@/data/guides";
import GuideCard from "@/components/GuideCard";
import GuideDetail from "@/components/GuideDetail";

const Index = () => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const activeGuide = guides.find((g) => g.id === selectedGuide);

  const filteredGuides = guides.filter(
    (g) =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (activeGuide) {
    return <GuideDetail guide={activeGuide} onBack={() => setSelectedGuide(null)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <span className="font-mono font-semibold text-foreground tracking-tight">
            Python Mastery Hub
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary text-xs font-mono text-muted-foreground mb-6">
            <BookOpen className="w-3 h-3" /> Interactive Knowledge Guides
          </span>
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-foreground mb-2">
            Python <span className="text-gradient-primary">Mastery</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg mt-4">
            From basics to building AI voice agents. Interactive guides with working examples, 
            memory tricks, and quizzes.
          </p>
          <p className="text-muted-foreground text-sm mt-3">
            {guides.length} guides available — select one below to begin learning.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="max-w-md mx-auto mt-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search guides, topics, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
          </div>
        </motion.div>
      </section>

      {/* Guide Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGuides.map((guide, idx) => (
            <GuideCard
              key={guide.id}
              guide={guide}
              index={idx}
              onClick={() => setSelectedGuide(guide.id)}
            />
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-mono">No guides match your search.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-xs text-muted-foreground font-mono">
          Built with 🐍 for Python developers • All examples are working code
        </p>
      </footer>
    </div>
  );
};

export default Index;
