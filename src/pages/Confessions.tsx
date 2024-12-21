import { useState, useEffect } from "react";
import { ConfessionForm } from "@/components/ConfessionForm";
import { ConfessionCard } from "@/components/ConfessionCard";
import { Button } from "@/components/ui/button";
import { Clock, ThumbsUp } from "lucide-react";
import { AuthForm } from "@/components/AuthForm";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const fetchConfessions = async () => {
  console.log("Fetching confessions");
  const { data, error } = await supabase
    .from("confessions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

const Confessions = () => {
  const [sortBy, setSortBy] = useState<"recent" | "likes">("recent");
  const [session, setSession] = useState(null);

  const { data: confessions = [], isLoading } = useQuery({
    queryKey: ["confessions"],
    queryFn: fetchConfessions,
  });

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Auth state changed:", session?.user?.email);
    });

    return () => subscription.unsubscribe();
  }, []);

  const sortedConfessions = [...confessions].sort((a, b) => {
    if (sortBy === "likes") {
      return (b.likes || 0) - (a.likes || 0);
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const handleSort = (type: "recent" | "likes") => {
    setSortBy(type);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-study-paper p-4 md:p-8">
        <div className="max-w-4xl mx-auto text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-study-paper p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-study-navy mb-8 text-center">
          Campus Confessions
        </h1>

        {session ? (
          <ConfessionForm />
        ) : (
          <div className="mb-8">
            <AuthForm />
          </div>
        )}

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
          {sortedConfessions.map((confession) => (
            <ConfessionCard
              key={confession.id}
              confession={{
                ...confession,
                timestamp: new Date(confession.created_at).toLocaleString(),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Confessions;