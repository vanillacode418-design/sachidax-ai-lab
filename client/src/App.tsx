import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Pricing from "@/pages/Pricing";
import AutomationTools from "@/pages/AutomationTools";
import UseCases from "@/pages/UseCases";
import Contact from "@/pages/Contact";
import Policies from "@/pages/Policies";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/automation-tools" component={AutomationTools} />
      <Route path="/use-cases" component={UseCases} />
      <Route path="/contact" component={Contact} />
      <Route path="/policies" component={Policies} />
      
      {/* Auth Routes */}
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
