import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AiAgentInterface } from "./AiAgentInterface";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle: string;
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  showAudioDemo?: boolean;
}

export function Hero({ 
  title, 
  subtitle, 
  features, 
  ctaText = "Sign up", 
  ctaLink = "#", 
  secondaryCtaText = "Read the docs", 
  secondaryCtaLink = "#",
  showAudioDemo = true
}: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-white/[0.01] p-8 md:p-12 mb-8">
      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="max-w-2xl">
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-white mb-4 leading-[1.1]">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Link href={ctaLink}>
              <Button size="lg" className="rounded-full font-bold bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all hover:-translate-y-1">
                {ctaText}
              </Button>
            </Link>
            <Link href={secondaryCtaLink}>
              <Button variant="outline" size="lg" className="rounded-full border-white/10 text-muted-foreground hover:text-white hover:bg-white/5">
                {secondaryCtaText}
              </Button>
            </Link>
          </div>

          {features && (
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground/80">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        {showAudioDemo && (
          <div className="flex flex-col items-center gap-4 w-full md:w-auto">
            <div className="p-8 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-sm w-full md:w-[320px] text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="text-[10px] font-bold tracking-widest text-muted-foreground mb-6 uppercase flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Talk to SACHIDAX
                </div>
                
                <AiAgentInterface />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
