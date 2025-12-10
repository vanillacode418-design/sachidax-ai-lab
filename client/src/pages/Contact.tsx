import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    toast({
      title: "Message sent",
      description: "We'll get back to you shortly.",
    });
  };

  return (
    <Layout title="Contact Us" subtitle="Get in touch with our team for enterprise solutions or technical support.">
      <div className="max-w-2xl mx-auto mt-8">
        <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">First Name</label>
                <Input placeholder="Jane" className="bg-black/20 border-white/10 text-white" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Last Name</label>
                <Input placeholder="Doe" className="bg-black/20 border-white/10 text-white" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Email</label>
              <Input type="email" placeholder="jane@company.com" className="bg-black/20 border-white/10 text-white" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Message</label>
              <Textarea placeholder="Tell us about your project..." className="bg-black/20 border-white/10 text-white min-h-[120px]" required />
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11">
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-5 h-5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </div>
            <div className="text-sm font-bold text-white">Email</div>
            <div className="text-xs text-muted-foreground mt-1">support@sachidax.ai</div>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-5 h-5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div className="text-sm font-bold text-white">Office</div>
            <div className="text-xs text-muted-foreground mt-1">San Francisco, CA</div>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S.2 5.3 4.1 2"/><path d="M8 22c8-3 8.1-13.7 3.5-17.4"/></svg>
            </div>
            <div className="text-sm font-bold text-white">Twitter</div>
            <div className="text-xs text-muted-foreground mt-1">@sachidax_ai</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
