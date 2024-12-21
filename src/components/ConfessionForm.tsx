import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const categories = ["Funny", "Serious", "Rant", "Question", "Other"];

export const ConfessionForm = () => {
  const [confession, setConfession] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confession.trim()) return;

    setLoading(true);
    console.log("Submitting confession:", { confession, category });

    try {
      const { error } = await supabase.from("confessions").insert([
        {
          content: confession.trim(),
          category: category || null,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Confession submitted!",
        description: "Your confession has been posted anonymously.",
      });
      setConfession("");
      setCategory("");
    } catch (error) {
      console.error("Error submitting confession:", error);
      toast({
        title: "Error",
        description: "Failed to submit confession. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="space-y-4">
        <Textarea
          placeholder="Share your confession anonymously..."
          value={confession}
          onChange={(e) => setConfession(e.target.value)}
          className="min-h-[120px] bg-white"
          disabled={loading}
        />
        <div className="flex gap-4">
          <Select
            value={category}
            onValueChange={setCategory}
            disabled={loading}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="submit"
            className="bg-study-navy hover:bg-study-navy/90 text-white"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Anonymously"}
          </Button>
        </div>
      </div>
    </form>
  );
};