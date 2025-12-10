import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Home, Wrench, Diamond, Cpu, Phone, Mail, FileText } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/services", icon: Wrench, label: "Services" },
  { href: "/pricing", icon: Diamond, label: "Pricing" },
  { href: "/automation-tools", icon: Cpu, label: "Automation Tools" },
  { href: "/use-cases", icon: Phone, label: "Use Cases" },
  { href: "/contact", icon: Mail, label: "Contact" },
  { href: "/policies", icon: FileText, label: "Policies" },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-[260px] h-[calc(100vh-48px)] sticky top-6 rounded-xl border border-white/5 bg-sidebar shadow-lg backdrop-blur-md overflow-hidden">
      <div className="p-5">
        <div className="font-heading font-bold text-lg tracking-wider text-white">SACHIDAX</div>
        <div className="text-xs text-muted-foreground mt-1.5">Automation Hub</div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 group relative",
                  isActive
                    ? "text-white bg-gradient-to-r from-purple-500/10 to-cyan-500/5 border border-white/5 shadow-[0_6px_18px_rgba(23,14,86,0.18)]"
                    : "text-muted-foreground hover:text-white hover:bg-white/5 hover:translate-x-1"
                )}
              >
                {isActive && (
                  <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.2)]" />
                )}
                <item.icon className={cn("w-5 h-5", isActive ? "opacity-100" : "opacity-80")} />
                <span>{item.label}</span>
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-4 rounded-xl border border-white/5 bg-gradient-to-b from-white/5 to-white/0 shadow-sm">
          <div className="font-bold text-sm text-white">Book Free Consultation</div>
          <div className="text-xs text-muted-foreground mt-1 mb-3">Schedule a walkthrough</div>
          <Link href="/contact">
            <a className="block w-full text-center py-2 px-3 rounded-lg bg-primary text-white text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Request
            </a>
          </Link>
        </div>
        <div className="text-center text-[10px] text-muted-foreground mt-3">
          © SACHIDAX
        </div>
      </div>
    </aside>
  );
}
