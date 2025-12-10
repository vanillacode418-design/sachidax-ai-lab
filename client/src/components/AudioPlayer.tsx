import { useState, useRef, useEffect } from "react";
import { Play, Pause, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateDemoWavBlob } from "@/lib/audio";

export function AudioPlayer({ autoGen = false, blob }: { autoGen?: boolean; blob?: Blob }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let url = "";
    if (blob) {
      url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } else if (autoGen) {
      const generatedBlob = generateDemoWavBlob({ seconds: 6 });
      url = URL.createObjectURL(generatedBlob);
      setAudioUrl(url);
    }

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [blob, autoGen]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration;
    if (dur > 0) setProgress((cur / dur) * 100);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (t: number) => {
    if (!Number.isFinite(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full">
      {audioUrl && (
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          onTimeUpdate={handleTimeUpdate} 
          onEnded={handleEnded}
          onLoadedMetadata={handleLoadedMetadata}
        />
      )}
      
      <div className="flex items-center gap-3">
        <Button 
          size="icon" 
          onClick={togglePlay} 
          className="rounded-full w-10 h-10 bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all shadow-lg shadow-white/10"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </Button>

        <div className="flex-1 space-y-1">
          <div className="relative h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
            if (!audioRef.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            audioRef.current.currentTime = (audioRef.current.duration || 0) * pct;
          }}>
            <div 
              className="absolute top-0 left-0 h-full bg-primary transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        {audioUrl && (
          <a href={audioUrl} download="demo.wav" className="text-muted-foreground hover:text-white transition-colors">
            <Download className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
