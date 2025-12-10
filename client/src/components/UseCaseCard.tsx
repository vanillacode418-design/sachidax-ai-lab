import { Play, Pause } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UseCaseCardProps {
  title: string;
  description: string;
  onPreview?: () => void;
  onAction?: () => void;
  actionText?: string;
}

export function UseCaseCard({ 
  title, 
  description, 
  onPreview,
  onAction,
  actionText = "Open"
}: UseCaseCardProps) {
  const [playing, setPlaying] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaying(!playing);
  };

  return (
    <div className="group relative p-5 rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-heading font-bold text-lg text-white group-hover:text-primary transition-colors pr-2">
            {title}
          </h3>
          <button 
            onClick={togglePlay}
            className={cn(
              "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
              playing 
                ? "bg-primary text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]" 
                : "bg-white/5 text-muted-foreground hover:bg-primary/20 hover:text-primary hover:scale-105"
            )}
            title={playing ? "Pause Demo" : "Play Demo"}
          >
             {playing ? (
               <Pause className="w-3.5 h-3.5 fill-current" />
             ) : (
               <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
             )}
          </button>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>
      </div>
      
      <div className="pt-4 border-t border-white/5 flex justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onAction}
          className="text-xs font-semibold text-primary hover:text-primary hover:bg-primary/10 -mr-2"
        >
          {actionText}
        </Button>
      </div>
    </div>
  );
}
