import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  onPreview?: () => void;
  onAction?: () => void;
  actionText?: string;
}

export function ServiceCard({ 
  title, 
  description, 
  icon, 
  className,
  onPreview,
  onAction,
  actionText = "Preview"
}: ServiceCardProps) {
  return (
    <div className={cn(
      "group relative p-6 rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20",
      className
    )}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="font-heading font-bold text-lg text-white group-hover:text-primary transition-colors">{title}</h3>
      </div>
      
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 min-h-[60px]">
        {description}
      </p>
      
      <div className="flex gap-2">
        {onPreview && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onPreview}
            className="h-8 text-xs font-semibold hover:bg-white/5 hover:text-white"
          >
            {actionText}
          </Button>
        )}
        {onAction && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onAction}
            className="h-8 text-xs font-semibold hover:bg-white/5 hover:text-white"
          >
            Details
          </Button>
        )}
      </div>
    </div>
  );
}
