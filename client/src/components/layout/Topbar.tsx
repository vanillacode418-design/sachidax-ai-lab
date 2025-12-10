import { Link, useLocation } from "wouter";
import { Search, LogIn, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const { user, signOut } = useAuth();
  
  return (
    <header className="flex items-center justify-between mb-6 pb-2 border-b border-white/5">
      <div>
        <h1 className="font-heading font-bold text-2xl text-white">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Placeholder for Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="h-9 w-64 rounded-lg bg-black/20 border border-white/5 pl-9 pr-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/50 transition-all"
          />
        </div>

        <Link href="/docs">
          <Button variant="outline" className="h-9 border-white/5 bg-transparent text-muted-foreground hover:text-white hover:bg-white/5 hidden sm:flex">
            Docs
          </Button>
        </Link>
        
        {user ? (
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9 border border-white/10">
                  <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                  <AvatarFallback className="bg-primary text-white font-bold">{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-sidebar border-white/10 text-white" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer">
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem onClick={signOut} className="focus:bg-white/5 focus:text-white cursor-pointer text-red-400 focus:text-red-400">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/signin">
            <Button className="h-9 bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] border-none text-white font-semibold transition-all hover:-translate-y-0.5 gap-2">
              <LogIn className="w-4 h-4" /> Sign In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
