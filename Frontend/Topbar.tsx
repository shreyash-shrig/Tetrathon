import { Bell, Search, ChevronDown, LogOut, User, Settings as SettingsIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";

export function Topbar({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="glass rounded-xl px-3 py-2 flex items-center gap-2 flex-1 max-w-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input placeholder="Search courses, lessons, students..." className="bg-transparent outline-none text-sm w-full placeholder:text-muted-foreground" />
      </div>
      <div className="flex-1" />
      <NotificationDropdown />
      <ProfileDropdown name={name} role={role} />
    </div>
  );
}

function useClickOutside(ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onClose]);
}

function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));
  const notifs = [
    { title: "New quiz available", body: "Neural Networks: Backprop quiz is ready.", time: "2m" },
    { title: "Assignment due tomorrow", body: "Linear Algebra Problem Set 4", time: "1h" },
    { title: "AI Tutor insight", body: "You're 74% through today's plan.", time: "3h" },
  ];
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(v => !v)} className="glass h-10 w-10 rounded-xl grid place-items-center hover:bg-white/10 relative">
        <Bell className="h-4 w-4" />
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 glass-strong rounded-2xl p-2 shadow-elegant z-50">
          <div className="px-3 py-2 text-xs text-muted-foreground">Notifications</div>
          {notifs.map(n => (
            <div key={n.title} className="p-3 rounded-xl hover:bg-white/5 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{n.title}</div>
                <div className="text-[10px] text-muted-foreground">{n.time}</div>
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{n.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProfileDropdown({ name, role }: { name: string; role: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(v => !v)} className="glass rounded-xl pl-1 pr-3 py-1 flex items-center gap-2 hover:bg-white/10">
        <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center text-white text-sm font-semibold">{name[0]}</div>
        <div className="hidden sm:block text-left">
          <div className="text-xs font-medium leading-tight">{name}</div>
          <div className="text-[10px] text-muted-foreground leading-tight">{role}</div>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 glass-strong rounded-2xl p-2 shadow-elegant z-50">
          <MenuItem icon={<User className="h-4 w-4" />} label="Profile" />
          <MenuItem icon={<SettingsIcon className="h-4 w-4" />} label="Settings" />
          <div className="my-1 border-t border-white/10" />
          <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5">
            <LogOut className="h-4 w-4" /> Sign out
          </Link>
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/5">
      {icon} {label}
    </button>
  );
}
