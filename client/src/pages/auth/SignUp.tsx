import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Link, useLocation } from "wouter";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import stockImage from '@assets/stock_images/abstract_digital_wav_92965f8c.jpg';

export default function SignUp() {
  const { signInWithGoogle, user } = useAuth();
  const [, setLocation] = useLocation();

  if (user) {
    setLocation("/");
    return null;
  }

  return (
    <div className="min-h-screen w-full flex bg-[#0d0f12] text-white overflow-hidden">
      {/* Left Panel - Visuals */}
      <div className="hidden lg:flex flex-1 relative flex-col justify-between p-12 bg-cover bg-center" style={{ backgroundImage: `url(${stockImage})` }}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        
        <div className="relative z-10">
          <div className="font-heading font-bold text-2xl tracking-wider text-white flex items-center gap-2">
            SACHIDAX
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="font-heading text-4xl font-bold leading-tight mb-6">
            Start building for free. <br/> No credit card required.
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white/80">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>100 free synthesis minutes</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Access to all standard voices</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>API access included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative">
        <Link href="/">
           <a className="absolute top-6 right-6 md:top-12 md:right-12 text-sm text-muted-foreground hover:text-white flex items-center gap-2 transition-colors">
             <ArrowLeft className="w-4 h-4" /> Back to Home
           </a>
        </Link>

        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold mb-2">Create an account</h1>
            <p className="text-muted-foreground">Join thousands of developers building with SACHIDAX</p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={signInWithGoogle}
              variant="outline" 
              className="w-full h-11 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white gap-3 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0d0f12] px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Full Name</label>
                <Input placeholder="John Doe" className="bg-white/5 border-white/10 text-white focus:border-primary/50 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Email</label>
                <Input placeholder="name@example.com" className="bg-white/5 border-white/10 text-white focus:border-primary/50 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase text-muted-foreground">Password</label>
                <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 text-white focus:border-primary/50 transition-colors" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                Create Account
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/signin">
              <a className="text-white hover:underline underline-offset-4 font-semibold">Sign in</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
