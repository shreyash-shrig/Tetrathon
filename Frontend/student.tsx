import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, BookOpen, ClipboardList, HelpCircle, TrendingUp,
  MessageSquare, User, Settings, Flame, Trophy, Clock, ArrowRight, Play, CheckCircle2,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";

export const Route = createFileRoute("/student")({
  component: StudentDashboard,
});

const progressData = [
  { d: "Mon", v: 40 }, { d: "Tue", v: 65 }, { d: "Wed", v: 52 },
  { d: "Thu", v: 78 }, { d: "Fri", v: 84 }, { d: "Sat", v: 62 }, { d: "Sun", v: 92 },
];

function StudentDashboard() {
  const items = [
    { icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard", active: true },
    { icon: <BookOpen className="h-4 w-4" />, label: "My Courses" },
    { icon: <ClipboardList className="h-4 w-4" />, label: "Assignments" },
    { icon: <HelpCircle className="h-4 w-4" />, label: "Quiz" },
    { icon: <TrendingUp className="h-4 w-4" />, label: "Progress" },
    { icon: <MessageSquare className="h-4 w-4" />, label: "AI Tutor" },
    { icon: <User className="h-4 w-4" />, label: "Profile" },
    { icon: <Settings className="h-4 w-4" />, label: "Settings" },
  ];

  return (
    <div className="min-h-screen">
      <Sidebar items={items} title="Student" />
      <main className="lg:ml-64 p-4 pt-20 lg:pt-6 lg:p-8">
        <Topbar name="Ava" role="Student" />

        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-3xl p-6 md:p-8 relative overflow-hidden mb-6">
          <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-xs text-muted-foreground">Welcome back</div>
              <h1 className="mt-1 text-3xl md:text-4xl font-semibold tracking-tight">Hi Ava, ready to learn?</h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-lg">You're on a 28-day streak. Your next best step: finish "Backpropagation".</p>
              <button className="mt-5 inline-flex items-center gap-2 bg-gradient-primary text-white px-5 py-2.5 rounded-xl font-medium shadow-glow hover:opacity-95">
                <Play className="h-4 w-4" /> Resume learning
              </button>
            </div>
            <div className="flex gap-3">
              <StatMini icon={<Flame className="h-4 w-4 text-orange-400" />} value="28" label="Day streak" />
              <StatMini icon={<Trophy className="h-4 w-4 text-primary" />} value="147" label="Mastered" />
              <StatMini icon={<Clock className="h-4 w-4 text-accent" />} value="18h" label="This week" />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress chart */}
          <div className="glass rounded-3xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-muted-foreground">Weekly progress</div>
                <div className="text-lg font-semibold">Learning minutes</div>
              </div>
              <div className="text-xs text-muted-foreground">Last 7 days</div>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData}>
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.64 0.19 258)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="oklch(0.62 0.22 300)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="d" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "rgba(20,20,30,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                  <Area type="monotone" dataKey="v" stroke="oklch(0.64 0.19 258)" strokeWidth={2} fill="url(#grad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Overall progress radial */}
          <div className="glass rounded-3xl p-6 flex flex-col">
            <div className="text-xs text-muted-foreground">Overall progress</div>
            <div className="text-lg font-semibold mb-2">Semester mastery</div>
            <div className="flex-1 grid place-items-center">
              <div className="h-48 w-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart innerRadius="72%" outerRadius="100%" data={[{ v: 74 }]} startAngle={90} endAngle={-270}>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar dataKey="v" cornerRadius={20} fill="url(#radial)" background={{ fill: "rgba(255,255,255,0.05)" }} />
                    <defs>
                      <linearGradient id="radial" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="oklch(0.64 0.19 258)" />
                        <stop offset="100%" stopColor="oklch(0.62 0.22 300)" />
                      </linearGradient>
                    </defs>
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="text-4xl font-semibold text-gradient">74%</div>
                    <div className="text-xs text-muted-foreground">Mastery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming assignments */}
          <div className="glass rounded-3xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold">Upcoming assignments</div>
              <a href="#" className="text-xs text-primary hover:underline">View all</a>
            </div>
            <div className="space-y-3">
              {[
                { t: "Linear Algebra — Problem Set 4", c: "Math 210", due: "Tomorrow", p: "High" },
                { t: "Essay: The Ethics of AI", c: "Philosophy 101", due: "Fri", p: "Med" },
                { t: "Backprop coding challenge", c: "ML Foundations", due: "Next Mon", p: "Low" },
              ].map(a => (
                <div key={a.t} className="glass rounded-xl p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-primary grid place-items-center shrink-0"><ClipboardList className="h-4 w-4 text-white" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{a.t}</div>
                    <div className="text-xs text-muted-foreground">{a.c}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-muted-foreground">Due</div>
                    <div className="text-sm font-medium">{a.due}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full shrink-0 ${a.p === "High" ? "bg-destructive/20 text-destructive" : a.p === "Med" ? "bg-primary/20 text-primary" : "bg-white/10 text-muted-foreground"}`}>{a.p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="glass rounded-3xl p-6">
            <div className="text-lg font-semibold mb-4">Recent activity</div>
            <ol className="space-y-4 relative border-l border-white/10 ml-2">
              {[
                { t: "Completed 'Gradient Descent' quiz", s: "Score 92%", time: "2h ago" },
                { t: "Started 'Backpropagation'", s: "Module 3", time: "5h ago" },
                { t: "AI Tutor session", s: "20 min", time: "Yesterday" },
                { t: "Earned badge: Consistency", s: "28-day streak", time: "2d ago" },
              ].map((e, i) => (
                <li key={i} className="pl-5 relative">
                  <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-gradient-primary" />
                  <div className="text-sm font-medium">{e.t}</div>
                  <div className="text-xs text-muted-foreground">{e.s} · {e.time}</div>
                </li>
              ))}
            </ol>
          </div>

          {/* Recommended courses */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold">Recommended for you</div>
              <a href="#" className="text-xs text-primary hover:underline inline-flex items-center gap-1">Browse all <ArrowRight className="h-3 w-3" /></a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { t: "Deep Learning Foundations", cat: "AI", lvl: "Intermediate", p: 0 },
                { t: "System Design", cat: "Engineering", lvl: "Advanced", p: 24 },
                { t: "Statistics Refresher", cat: "Math", lvl: "Beginner", p: 60 },
                { t: "Product Thinking", cat: "Design", lvl: "All levels", p: 12 },
              ].map(c => (
                <div key={c.t} className="glass rounded-2xl p-5 hover:bg-white/[0.08] transition-all group cursor-pointer">
                  <div className="h-24 rounded-xl bg-gradient-primary opacity-80 mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 grid place-items-center">
                      <BookOpen className="h-8 w-8 text-white/70" />
                    </div>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-primary">{c.cat}</div>
                  <div className="mt-1 font-medium text-sm">{c.t}</div>
                  <div className="text-xs text-muted-foreground">{c.lvl}</div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-primary rounded-full" style={{ width: `${c.p}%` }} />
                  </div>
                  <div className="mt-1 text-[10px] text-muted-foreground">{c.p}% complete</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatMini({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="glass rounded-2xl px-4 py-3 min-w-[100px]">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">{icon} {label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}
void CheckCircle2;
