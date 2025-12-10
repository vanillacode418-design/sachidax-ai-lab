import { Play, Pause } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface VoiceCardProps {
  name: string;
  gender: string;
  accent: string;
  tags?: string[];
  isPlaying?: boolean;
  onPlayToggle?: () => void;
  onSelect?: () => void;
}

export function VoiceCard({ 
  name, 
  gender, 
  accent, 
  tags = [], 
  onSelect 
}: VoiceCardProps) {
  const [playing, setPlaying] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaying(!playing);
  };

  return (
    <div 
      onClick={onSelect}
      className="group relative flex items-center gap-4 p-3 rounded-lg bg-[#1a1d21] border border-white/5 hover:border-white/10 hover:bg-[#202429] transition-all cursor-pointer"
    >
      {/* Play Button */}
      <button 
        onClick={togglePlay}
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded flex items-center justify-center transition-colors",
          playing 
            ? "bg-cyan-500/20 text-cyan-400" 
            : "bg-white/5 text-muted-foreground group-hover:bg-cyan-500/10 group-hover:text-cyan-400"
        )}
      >
        {playing ? (
          <Pause className="w-5 h-5 fill-current" />
        ) : (
          <Play className="w-5 h-5 fill-current ml-0.5" />
        )}
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-semibold text-sm text-gray-100 truncate pr-2">
          {name}
        </h4>
        <div className="flex items-center gap-1.5 mt-0.5 text-[10px] uppercase tracking-wider font-medium text-muted-foreground/60">
          <span>{gender}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/40" />
          <span>{accent}</span>
        </div>
      </div>

      {/* Action / Arrow */}
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/70">
           <Play className="w-3 h-3 fill-current" />
        </div>
      </div>
    </div>
  );
}
