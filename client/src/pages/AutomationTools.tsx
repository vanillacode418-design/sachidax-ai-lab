import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/ServiceCard";
import { Workflow, Search, Smartphone, Compass, Bug, MessageSquare } from "lucide-react";

const tools = [
  { title: "Flow Builder", icon: <Workflow className="w-6 h-6" />, description: "Visual drag-and-drop builder for designing complex call flows." },
  { title: "Log Analyzer", icon: <Search className="w-6 h-6" />, description: "Search and filter call logs with transcriptions and sentiment analysis." },
  { title: "Phone Number Manager", icon: <Smartphone className="w-6 h-6" />, description: "Provision and manage phone numbers across 100+ countries." },
  { title: "API Explorer", icon: <Compass className="w-6 h-6" />, description: "Interactive API documentation and testing sandbox." },
  { title: "Webhook Debugger", icon: <Bug className="w-6 h-6" />, description: "Real-time inspection of webhook payloads and delivery status." },
  { title: "Prompt Studio", icon: <MessageSquare className="w-6 h-6" />, description: "Test and optimize system prompts for your AI agents." },
];

export default function AutomationTools() {
  return (
    <Layout title="Automation Tools" subtitle="Powerful tools to build, debug, and manage your voice automation infrastructure.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {tools.map((tool, i) => (
          <ServiceCard 
            key={i}
            {...tool}
            actionText="Launch"
            onAction={() => {}}
          />
        ))}
      </div>
    </Layout>
  );
}
