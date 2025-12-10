import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "For developers experimenting with voice AI.",
    features: ["100 mins/month synthesis", "Basic text AI usage", "1 Virtual Agent", "Community Support"],
    cta: "Start Free",
    popular: false
  },
  {
    name: "Pro",
    price: "$49",
    description: "For scaling applications and startups.",
    features: ["1,000 mins/month synthesis", "Advanced embeddings", "10 Virtual Agents", "Email Support", "Custom Voices"],
    cta: "Get Pro",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale deployments and SLAs.",
    features: ["Unlimited synthesis", "Fine-tuned models", "Unlimited Agents", "24/7 Priority Support", "On-premise deployment"],
    cta: "Contact Sales",
    popular: false
  }
];

export default function Pricing() {
  return (
    <Layout title="Pricing" subtitle="Simple, transparent pricing for every stage of your journey.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
        {plans.map((plan, i) => (
          <div key={i} className={`relative p-8 rounded-2xl border ${plan.popular ? 'border-primary bg-primary/5' : 'border-white/5 bg-white/[0.02]'} flex flex-col`}>
            {plan.popular && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 md:translate-x-0 md:right-8 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Most Popular
              </div>
            )}
            <h3 className="font-heading font-bold text-xl text-white mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold text-white mb-4">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
            <p className="text-sm text-muted-foreground mb-8">{plan.description}</p>
            
            <div className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white'}`}>
                    <Check className="w-3 h-3" />
                  </div>
                  {feature}
                </div>
              ))}
            </div>

            <Button className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
