import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Mic, PenTool, Bot, Repeat, Link as LinkIcon, BarChart3 } from "lucide-react";

const detailedServices = [
  { 
    title: "Voice AI", 
    icon: <Mic className="w-6 h-6" />, 
    description: "Multilingual speech synthesis, neural TTS voices, prosody control, telephony integration and SSML support.",
    features: ["Neural TTS with multiple voices", "SSML and prosody tuning", "Telephony & SIP integrations", "Low-latency streaming"]
  },
  { 
    title: "Text AI", 
    icon: <PenTool className="w-6 h-6" />, 
    description: "Contextual assistants, summarization, entity extraction, embeddings and multi-turn dialog capabilities.",
    features: ["Summarization & intent detection", "Embeddings for search", "Context-aware sessions", "Audit logs"]
  },
  { 
    title: "Virtual Agents", 
    icon: <Bot className="w-6 h-6" />, 
    description: "Flow designer, state management, webhook actions, CRM connectors and fallback routing.",
    features: ["Flow designer", "State management", "Webhook actions", "CRM connectors"]
  },
  { 
    title: "Automation Workflows", 
    icon: <Repeat className="w-6 h-6" />, 
    description: "Builder UI, triggers, scheduling, retries, error handling and observability for production automations.",
    features: ["Builder UI", "Triggers & scheduling", "Retries & error handling", "Observability"]
  },
  { 
    title: "APIs & SDKs", 
    icon: <LinkIcon className="w-6 h-6" />, 
    description: "RESTful APIs, realtime websockets, SDKs (Node, Python, Java) and secure auth for integrating SACHIDAX into your products.",
    features: ["RESTful APIs", "Realtime websockets", "SDKs", "Secure auth"]
  },
  { 
    title: "IoT & Dashboards", 
    icon: <BarChart3 className="w-6 h-6" />, 
    description: "Device ingestion, telemetry pipelines, thresholds and low-latency dashboards for operational automation and voice triggers.",
    features: ["Device ingestion", "Telemetry pipelines", "Thresholds", "Low-latency dashboards"]
  },
];

export default function Services() {
  return (
    <Layout title="Services" subtitle="Explore SACHIDAX's capabilities — voice, text, virtual agents, workflows, APIs and IoT dashboards.">
      <Hero 
        title="Services & Capabilities" 
        subtitle="Everything you need to build production-grade voice and automation experiences: TTS/TTS variants, conversational flows, integrations, and monitoring."
        ctaText="Get a Demo"
        ctaLink="/contact"
        secondaryCtaText="View Pricing"
        secondaryCtaLink="/pricing"
        showAudioDemo={true}
      />

      <section className="mb-12">
        <div className="mb-6">
          <h3 className="font-heading font-bold text-2xl text-white">Categories</h3>
          <p className="text-muted-foreground mt-1">Click any item to open a detailed preview, features and audio sample.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {detailedServices.map((s, i) => (
            <ServiceCard 
              key={i} 
              title={s.title}
              description={s.description}
              icon={s.icon}
              onAction={() => {}}
              actionText="Details"
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6">
          <h3 className="font-heading font-bold text-2xl text-white">Featured Services Deep Dive</h3>
          <p className="text-muted-foreground mt-1">Deep-dive previews, feature lists and use-case examples.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {detailedServices.slice(0, 2).map((s, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-white/[0.01]">
              <h4 className="font-heading font-bold text-xl text-white mb-4">{s.title} — Features</h4>
              <ul className="space-y-2 mb-6">
                {s.features?.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:text-white">Open Sample</Button>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
