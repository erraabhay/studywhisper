import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfessionCardProps {
  confession: {
    id: string;
    content: string;
    likes: number;
    timestamp: string;
    category?: string;
  };
}

export const ConfessionCard = ({ confession }: ConfessionCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(confession.likes);

  const handleLike = () => {
    if (!liked) {
      setLikeCount((prev) => prev + 1);
    } else {
      setLikeCount((prev) => prev - 1);
    }
    setLiked(!liked);
  };

  const categories = confession.category?.split(" | ") || [];

  return (
    <Card className="w-full p-6 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow animate-fade-up">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category, index) => (
              <span
                key={index}
                className="inline-block bg-study-beige text-study-navy text-sm px-3 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
          <p className="text-study-slate text-lg">{confession.content}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-study-slate/60">{confession.timestamp}</span>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-2",
            liked && "text-red-500 hover:text-red-600"
          )}
          onClick={handleLike}
        >
          <Heart className={cn("w-4 h-4", liked && "fill-current")} />
          <span>{likeCount}</span>
        </Button>
      </div>
    </Card>
  );
};