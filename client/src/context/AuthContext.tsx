import { createContext, useContext, useEffect, useState } from "react";
import { User, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if we are in a mock environment (missing config)
    const isMock = !import.meta.env.VITE_FIREBASE_API_KEY;
    
    if (isMock) {
        // Simulate auth check delay
        setTimeout(() => setLoading(false), 500);
        return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const isMock = !import.meta.env.VITE_FIREBASE_API_KEY;
      if (isMock) {
        // Mock sign in for prototype
        setUser({ 
            uid: "mock-user-123", 
            email: "demo@sachidax.ai", 
            displayName: "Demo User",
            photoURL: "https://github.com/shadcn.png" 
        } as User);
        toast({ title: "Signed in (Mock)", description: "Welcome to the demo!" });
        return;
      }
      
      await signInWithPopup(auth, googleProvider);
      toast({ title: "Signed in successfully" });
    } catch (error: any) {
      toast({ 
        title: "Error signing in", 
        description: error.message, 
        variant: "destructive" 
      });
    }
  };

  const signOut = async () => {
    try {
      const isMock = !import.meta.env.VITE_FIREBASE_API_KEY;
      if (isMock) {
        setUser(null);
        toast({ title: "Signed out (Mock)" });
        return;
      }

      await firebaseSignOut(auth);
      toast({ title: "Signed out" });
    } catch (error: any) {
      toast({ 
        title: "Error signing out", 
        description: error.message, 
        variant: "destructive" 
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
