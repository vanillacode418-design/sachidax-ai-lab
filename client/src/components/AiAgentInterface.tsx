import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Mic, Square } from "lucide-react";

// This is a placeholder for the future API integration
// User said: "I will provide you API later"
// We will mock the AI behavior for now.

type AgentStatus = "idle" | "listening" | "processing" | "speaking";

export function AiAgentInterface() {
  const [status, setStatus] = useState<AgentStatus>("idle");
  const [transcript, setTranscript] = useState("");
  
  // Mock function to simulate AI lifecycle
  const startInteraction = () => {
    setStatus("listening");
    setTranscript("Listening...");
    
    // Simulate listening delay
    setTimeout(() => {
      setStatus("processing");
      setTranscript("Thinking...");
      
      // Simulate processing delay
      setTimeout(() => {
        setStatus("speaking");
        setTranscript("Hello! I am SACHIDAX AI. How can I help you automate your workflows today?");
        
        // Simulate speaking duration
        setTimeout(() => {
          setStatus("idle");
          setTranscript("");
        }, 5000);
      }, 1500);
    }, 2000);
  };

  const stopInteraction = () => {
    setStatus("idle");
    setTranscript("");
  };

  const isAnimating = status === "listening" || status === "speaking";

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* Talk Button - Vapi Style */}
      <button
        onClick={status === "idle" ? startInteraction : stopInteraction}
        className={cn(
          "relative group px-8 py-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-300 overflow-hidden",
          status === "idle" && "hover:border-white/30 hover:bg-white/5",
          status !== "idle" && "border-primary/50 bg-primary/10"
        )}
      >
        <div className="relative z-10 flex items-center gap-3 font-mono text-sm tracking-widest font-bold uppercase text-white/90">
          {status === "idle" ? (
            <>
              <span>Talk to SACHIDAX</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>{status === "listening" ? "Listening..." : status === "speaking" ? "Speaking..." : "Processing..."}</span>
            </>
          )}
        </div>
        
        {/* Button Glow Effect */}
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:animate-shine"
        )} />
      </button>

      {/* Vapi-like Visualizer */}
      <div className="h-16 flex items-center justify-center gap-1.5">
        {/* 
           We create 7 bars with specific colors mimicking the Vapi/Siri spectrum 
           Green -> Cyan -> Blue -> Purple -> Pink
        */}
        {[
          "bg-[#4ade80]", // Green
          "bg-[#2dd4bf]", // Teal
          "bg-[#06b6d4]", // Cyan
          "bg-[#3b82f6]", // Blue
          "bg-[#8b5cf6]", // Violet
          "bg-[#d946ef]", // Fuchsia
          "bg-[#f43f5e]", // Rose
        ].map((colorClass, i) => (
          <div
            key={i}
            className={cn(
              "w-3 rounded-full transition-all duration-300 ease-in-out",
              colorClass,
              isAnimating ? "animate-music-bar" : "h-3 opacity-30"
            )}
            style={{
              animationDelay: `${i * 0.1}s`,
              height: isAnimating ? undefined : "12px", // Fixed height when idle
              boxShadow: isAnimating ? `0 0 10px ${colorClass.replace('bg-[', '').replace(']', '')}` : 'none'
            }}
          />
        ))}
      </div>

      {/* Transcript Area */}
      <div className="h-12 flex items-center justify-center">
        {transcript && (
          <p className="text-center text-sm font-medium text-white/90 max-w-xs animate-in fade-in slide-in-from-bottom-2">
            "{transcript}"
          </p>
        )}
      </div>

      <style>{`
        @keyframes music-bar {
          0% { height: 12px; opacity: 0.5; }
          50% { height: 48px; opacity: 1; }
          100% { height: 12px; opacity: 0.5; }
        }
        .animate-music-bar {
          animation: music-bar 0.8s ease-in-out infinite;
        }
        @keyframes shine {
          from { transform: translateX(-100%) skewX(-12deg); }
          to { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
}
