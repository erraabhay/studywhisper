import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 animate-fade-down">
      <h1 className="text-4xl md:text-6xl font-bold text-study-navy text-center mb-4">
        StudyConfess
      </h1>
      <p className="text-xl md:text-2xl text-study-slate mb-8 text-center">
        Share Freely, Stay Anonymous.
      </p>
      <div className="max-w-2xl text-center mb-8">
        <p className="text-study-slate/80 mb-4">
          A safe space for college students to share their thoughts, experiences, and confessions
          anonymously.
        </p>
        <p className="text-sm text-study-sage font-medium">
          All confessions are posted anonymously
        </p>
      </div>
      <Button
        onClick={() => navigate("/confessions")}
        className="bg-study-navy hover:bg-study-navy/90 text-white px-8 py-6 rounded-lg text-lg"
      >
        Start Confessing
      </Button>
    </div>
  );
};