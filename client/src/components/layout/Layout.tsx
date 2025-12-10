import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MobileNav } from "./MobileNav"; 
import { Footer } from "./Footer";

export function Layout({ children, title, subtitle }: { children: React.ReactNode; title?: string; subtitle?: string }) {
  return (
    <div className="flex min-h-screen bg-background p-4 md:p-6 gap-6 font-sans text-foreground overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-[calc(100dvh-48px)] overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent shadow-lg relative">
        <ScrollArea className="h-full">
          <div className="p-6 md:p-8 flex flex-col min-h-full">
            {/* Mobile Header (Sticky) */}
            <div className="md:hidden sticky top-0 z-50 -mx-6 -mt-6 mb-6 px-6 py-4 bg-background/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
              <div className="font-heading font-bold text-lg tracking-wider text-white">SACHIDAX</div>
              <MobileNav />
            </div>

            {title && <Topbar title={title} subtitle={subtitle} />}
            
            <main className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
              {children}
            </main>
            
            <Footer />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
