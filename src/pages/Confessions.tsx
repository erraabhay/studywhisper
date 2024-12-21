import { useState } from "react";
import { ConfessionForm } from "@/components/ConfessionForm";
import { ConfessionCard } from "@/components/ConfessionCard";
import { Button } from "@/components/ui/button";
import { Clock, ThumbsUp } from "lucide-react";

// Mock data for initial development
const mockConfessions = [
  {
    id: "1",
    content: "I've been pretending to understand calculus all semester...",
    likes: 42,
    timestamp: "2 hours ago",
    category: "Funny",
  },
  {
    id: "2",
    content: "Sometimes I go to the library just to take a nap between classes.",
    likes: 28,
    timestamp: "4 hours ago",
    category: "Rant",
  },
  {
    id: "3",
    content: "I actually enjoy writing research papers. Is that weird?",
    likes: 15,
    timestamp: "6 hours ago",
    category: "Question",
  },
];

const Confessions = () => {
  const [sortBy, setSortBy] = useState<"recent" | "likes">("recent");
  const [confessions, setConfessions] = useState(mockConfessions);

  const handleSort = (type: "recent" | "likes") => {
    setSortBy(type);
    const sorted = [...confessions].sort((a, b) => {
      if (type === "likes") {
        return b.likes - a.likes;
      }
      // For simplicity, we're using the mock data order for "recent"
      return mockConfessions.findIndex((c) => c.id === a.id) -
        mockConfessions.findIndex((c) => c.id === b.id);
    });
    setConfessions(sorted);
  };

  return (
    <div className="min-h-screen bg-study-paper p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-study-navy mb-8 text-center">
          Campus Confessions
        </h1>
        
        <ConfessionForm />
        
        <div className="flex justify-end gap-2 mb-4">
          <Button
            variant={sortBy === "recent" ? "default" : "outline"}
            onClick={() => handleSort("recent")}
            className="flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Recent
          </Button>
          <Button
            variant={sortBy === "likes" ? "default" : "outline"}
            onClick={() => handleSort("likes")}
            className="flex items-center gap-2"
          >
            <ThumbsUp className="w-4 h-4" />
            Most Liked
          </Button>
        </div>

        <div className="space-y-4">
          {confessions.map((confession) => (
            <ConfessionCard key={confession.id} confession={confession} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Confessions;