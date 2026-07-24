import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-12">
      {/* Animated bg */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 -left-24 h-96 w-96 rounded-full bg-primary/40 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-24 h-96 w-96 rounded-full bg-accent/40 blur-3xl"
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong w-full max-w-md rounded-3xl p-8 shadow-elegant"
      >
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-lg tracking-tight">AdaptLearn</span>
        </Link>

        <h1 className="text-2xl font-semibold text-center">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground text-center">Sign in to continue your journey</p>

        <form
          onSubmit={(e) => { e.preventDefault(); navigate({ to: "/student" }); }}
          className="mt-8 space-y-4"
        >
          <label className="block">
            <span className="text-xs text-muted-foreground">Email</span>
            <div className="mt-1.5 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full glass rounded-xl pl-10 pr-3 py-2.5 text-sm bg-transparent outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-xs text-muted-foreground">Password</span>
            <div className="mt-1.5 relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type={showPw ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full glass rounded-xl pl-10 pr-10 py-2.5 text-sm bg-transparent outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
              <input type="checkbox" className="accent-primary" defaultChecked />
              Remember me
            </label>
            <a href="#" className="text-primary hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-primary text-white rounded-xl py-2.5 font-medium shadow-glow hover:opacity-95 inline-flex items-center justify-center gap-2"
          >
            Sign in <ArrowRight className="h-4 w-4" />
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center"><span className="glass px-3 text-xs text-muted-foreground rounded-full">or</span></div>
          </div>

          <button type="button" className="w-full glass rounded-xl py-2.5 text-sm font-medium hover:bg-white/10 inline-flex items-center justify-center gap-3">
            <svg className="h-4 w-4" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.5 6.3 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.5 6.3 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.4l-6.5-5.5C29.5 34.7 26.9 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.6 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.7l6.5 5.5C41.4 36.1 44 30.5 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
            Continue with Google
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Don't have an account? <a href="#" className="text-primary hover:underline">Sign up</a>
        </p>
      </motion.div>
    </div>
  );
}
