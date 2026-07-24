import { Link } from "@tanstack/react-router";
import { Brain, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type NavItem = { icon: ReactNode; label: string; href?: string; active?: boolean };

export function Sidebar({ items, title }: { items: NavItem[]; title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 glass-strong px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center shadow-glow"><Brain className="h-4 w-4 text-white" /></div>
          <span className="font-semibold">AdaptLearn</span>
        </Link>
        <button onClick={() => setOpen(v => !v)} className="p-2">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 glass-strong p-4 pt-20"
          >
            <SidebarContent items={items} title={title} onNav={() => setOpen(false)} />
          </motion.aside>
        )}
      </AnimatePresence>
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 glass-strong flex-col p-4">
        <Link to="/" className="flex items-center gap-2 px-2 py-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center shadow-glow"><Brain className="h-4 w-4 text-white" /></div>
          <span className="font-semibold tracking-tight">AdaptLearn</span>
        </Link>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground px-3 mb-2">{title}</div>
        <SidebarContent items={items} title={title} />
      </aside>
    </>
  );
}

function SidebarContent({ items, onNav }: { items: NavItem[]; title: string; onNav?: () => void }) {
  return (
    <nav className="flex-1 space-y-1">
      {items.map((it) => (
        <a
          key={it.label}
          href={it.href ?? "#"}
          onClick={onNav}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
            it.active
              ? "bg-gradient-primary text-white shadow-glow"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          }`}
        >
          <span className="shrink-0">{it.icon}</span>
          <span className="truncate">{it.label}</span>
        </a>
      ))}
    </nav>
  );
}
