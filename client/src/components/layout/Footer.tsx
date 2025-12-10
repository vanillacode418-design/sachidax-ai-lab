import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Linkedin, Github, Instagram, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 pt-16 border-t border-white/5 bg-black/20 relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About Section */}
          <div className="space-y-6">
            <div>
              <div className="font-heading font-bold text-xl tracking-wider text-white mb-2">SACHIDAX</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Empowering developers to build the next generation of voice-first applications. 
                Our mission is to make human-like voice AI accessible, scalable, and secure for everyone.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-all hover:-translate-y-1">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-all hover:-translate-y-1">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-all hover:-translate-y-1">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-all hover:-translate-y-1">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/services"><a className="hover:text-primary transition-colors">Voice AI</a></Link></li>
              <li><Link href="/services"><a className="hover:text-primary transition-colors">Virtual Agents</a></Link></li>
              <li><Link href="/automation-tools"><a className="hover:text-primary transition-colors">Flow Builder</a></Link></li>
              <li><Link href="/use-cases"><a className="hover:text-primary transition-colors">Voice Library</a></Link></li>
              <li><Link href="/pricing"><a className="hover:text-primary transition-colors">Pricing</a></Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              <li><Link href="/policies"><a className="hover:text-primary transition-colors">Privacy Policy</a></Link></li>
              <li><Link href="/policies"><a className="hover:text-primary transition-colors">Terms of Service</a></Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-bold text-white mb-6">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates on new voices, features, and tutorials.
            </p>
            <div className="space-y-3">
              <Input 
                placeholder="Enter your email" 
                className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground/50 focus:border-primary/50" 
              />
              <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/5">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 pb-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2025 SACHIDAX Automation Hub. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Systems Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3" />
              <span>support@sachidax.ai</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
