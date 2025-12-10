import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { useLocation } from "wouter";
import { Mic, PenTool, Bot, Repeat, Link as LinkIcon, BarChart3, Phone } from "lucide-react";

const services = [
  { title: "Voice AI", icon: <Mic className="w-6 h-6" />, description: "Multilingual speech synthesis & recognition, IVR, and telephony integrations." },
  { title: "Text AI", icon: <PenTool className="w-6 h-6" />, description: "Contextual assistants, summarization, classification and natural language APIs." },
  { title: "Virtual Agents", icon: <Bot className="w-6 h-6" />, description: "Dialog flows, webhook integrations and stateful agents for calls & chat." },
  { title: "Automation Workflows", icon: <Repeat className="w-6 h-6" />, description: "Connectors, builders, and templates to automate voice and data flows." },
  { title: "APIs & SaaS", icon: <LinkIcon className="w-6 h-6" />, description: "Robust APIs, SDKs and platform hosting to plug SACHIDAX into your product." },
  { title: "IoT & Dashboards", icon: <BarChart3 className="w-6 h-6" />, description: "Real-time telemetry, dashboards and smart triggers for voice automations." },
];

const useCases = [
  { title: "Sales calls", description: "Outbound sales conversations that introduce product features and book demos." },
  { title: "Lead qualification", description: "Automated questions to validate lead intent and route to sales." },
  { title: "Customer support", description: "First-line troubleshooting and ticket creation via voice flows." },
  { title: "Emergency helpdesk", description: "Critical incident call flows for escalation and response coordination." },
  { title: "Appointment scheduling", description: "Book and confirm appointments automatically through voice or SMS." },
  { title: "COD verification", description: "Confirm Cash-on-Delivery orders with automated verification calls." },
  { title: "Medicine reminders", description: "Timely reminders for patients to take medication as prescribed." },
  { title: "Clinic reminders", description: "Reminder calls for upcoming clinic visits and follow-ups." },
];

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <Hero 
        title="Voice AI agents for developers" 
        subtitle="SACHIDAX delivers voice AI, text AI, virtual agents, automation workflows, APIs and dashboards — built for reliability and privacy-first deployments."
        features={["Multilingual IVR & synthesis", "Contextual assistants & summarization", "Deployable templates & integrations"]}
        ctaText="Sign up"
        secondaryCtaText="Read the docs"
      />

      <section className="mb-12">
        <div className="mb-6">
          <h3 className="font-heading font-bold text-2xl text-white">Services</h3>
          <p className="text-muted-foreground mt-1">Voice AI, Text AI, Virtual Agents, Automation Workflows, APIs & IoT dashboards.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <ServiceCard 
              key={i} 
              {...s} 
              onPreview={() => setLocation("/services")}
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6">
          <h3 className="font-heading font-bold text-2xl text-white">Virtual Calling Use Cases</h3>
          <p className="text-muted-foreground mt-1">50+ ready-to-deploy call flows and templates for every industry.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.map((c, i) => (
            <ServiceCard 
              key={i} 
              {...c} 
              icon={<Phone className="w-6 h-6" />}
              actionText="Open"
              onPreview={() => setLocation("/use-cases")}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
}
