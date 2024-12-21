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

const yearCategories = ["1st year", "2nd year", "3rd year", "4th year"];
const branchCategories = [
  "CSE",
  "CSN",
  "CSO",
  "CSM",
  "ECE",
  "EEE",
  "ECI",
  "MEC",
];

export const ConfessionForm = () => {
  const [confession, setConfession] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confession.trim()) return;

    setLoading(true);
    console.log("Submitting confession:", { confession, year, branch });

    try {
      const category = `${year}${branch ? ` | ${branch}` : ""}`;
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
      setYear("");
      setBranch("");
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
        <div className="flex gap-4 flex-wrap">
          <Select value={year} onValueChange={setYear} disabled={loading}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {yearCategories.map((year) => (
                <SelectItem key={year} value={year.toLowerCase()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={branch} onValueChange={setBranch} disabled={loading}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              {branchCategories.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
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