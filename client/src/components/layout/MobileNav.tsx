import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, Wrench, Diamond, Cpu, Phone, Mail, FileText } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/services", icon: Wrench, label: "Services" },
  { href: "/pricing", icon: Diamond, label: "Pricing" },
  { href: "/automation-tools", icon: Cpu, label: "Automation Tools" },
  { href: "/use-cases", icon: Phone, label: "Use Cases" },
  { href: "/contact", icon: Mail, label: "Contact" },
  { href: "/policies", icon: FileText, label: "Policies" },
];

export function MobileNav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      {/* Brand is now handled in the parent Sticky Header for better layout control, or we can keep it here if we want just the button */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white -mr-2">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-sidebar border-r border-white/5 text-white w-[280px] p-0">
          <div className="p-6 border-b border-white/5">
            <div className="font-heading font-bold text-xl tracking-wider text-white">SACHIDAX</div>
            <div className="text-sm text-muted-foreground">Automation Hub</div>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold transition-all duration-200",
                      isActive
                        ? "text-white bg-white/10 border border-white/5"
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", isActive ? "opacity-100" : "opacity-80")} />
                    <span>{item.label}</span>
                  </a>
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
