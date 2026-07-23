import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, BookOpen, ClipboardList, BarChart3,
  Calendar, MessageSquare, Settings, TrendingUp, TrendingDown, ArrowRight,
} from "lucide-react";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";

export const Route = createFileRoute("/teacher")({
  component: TeacherDashboard,
});

const perf = [
  { m: "Wk 1", a: 62, b: 71 }, { m: "Wk 2", a: 68, b: 74 },
  { m: "Wk 3", a: 74, b: 78 }, { m: "Wk 4", a: 71, b: 82 },
  { m: "Wk 5", a: 79, b: 85 }, { m: "Wk 6", a: 83, b: 88 },
];

const students = [
  { n: "Ava Chen", course: "ML Foundations", p: 92, s: "up" },
  { n: "Marcus Reid", course: "Deep Learning", p: 78, s: "up" },
  { n: "Priya Natarajan", course: "System Design", p: 65, s: "down" },
  { n: "Leo Park", course: "ML Foundations", p: 88, s: "up" },
  { n: "Sara Nolan", course: "Statistics", p: 54, s: "down" },
];

function TeacherDashboard() {
  const items = [
    { icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard", active: true },
    { icon: <Users className="h-4 w-4" />, label: "Students" },
    { icon: <BookOpen className="h-4 w-4" />, label: "Courses" },
    { icon: <ClipboardList className="h-4 w-4" />, label: "Assignments" },
    { icon: <BarChart3 className="h-4 w-4" />, label: "Analytics" },
    { icon: <Calendar className="h-4 w-4" />, label: "Attendance" },
    { icon: <MessageSquare className="h-4 w-4" />, label: "Messages" },
    { icon: <Settings className="h-4 w-4" />, label: "Settings" },
  ];

  return (
    <div className="min-h-screen">
      <Sidebar items={items} title="Teacher" />
      <main className="lg:ml-64 p-4 pt-20 lg:pt-6 lg:p-8">
        <Topbar name="Prof. Kim" role="Teacher" />

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Good afternoon, Prof. Kim</h1>
          <p className="mt-1 text-sm text-muted-foreground">Here's how your classes are performing this week.</p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Students" value="248" delta="+12" trend="up" />
          <StatCard label="Active Courses" value="6" delta="+1" trend="up" />
          <StatCard label="Assignments Due" value="17" delta="-3" trend="down" />
          <StatCard label="Avg. Performance" value="83%" delta="+4%" trend="up" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Performance chart */}
          <div className="glass rounded-3xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs text-muted-foreground">Performance</div>
                <div className="text-lg font-semibold">Class average vs. Top decile</div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Class avg</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" /> Top 10%</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={perf}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="m" stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "rgba(20,20,30,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                  <Bar dataKey="a" fill="oklch(0.64 0.19 258)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="b" fill="oklch(0.62 0.22 300)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Assignment status */}
          <div className="glass rounded-3xl p-6">
            <div className="text-lg font-semibold mb-4">Assignment status</div>
            <div className="space-y-4">
              {[
                { label: "Submitted", value: 184, total: 248, color: "oklch(0.64 0.19 258)" },
                { label: "In progress", value: 42, total: 248, color: "oklch(0.62 0.22 300)" },
                { label: "Not started", value: 22, total: 248, color: "rgba(255,255,255,0.2)" },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span>{s.label}</span>
                    <span className="text-muted-foreground">{s.value}/{s.total}</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(s.value / s.total) * 100}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-xs text-muted-foreground">On-time submission rate</div>
              <div className="mt-1 text-3xl font-semibold text-gradient">74%</div>
            </div>
          </div>

          {/* Student progress table */}
          <div className="glass rounded-3xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold">Student progress</div>
              <a href="#" className="text-xs text-primary hover:underline">View all</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground border-b border-white/10">
                    <th className="pb-3 font-normal">Student</th>
                    <th className="pb-3 font-normal">Course</th>
                    <th className="pb-3 font-normal">Progress</th>
                    <th className="pb-3 font-normal">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.n} className="border-b border-white/5 last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-lg bg-gradient-primary grid place-items-center text-xs font-semibold">{s.n[0]}</div>
                          <span className="truncate">{s.n}</span>
                        </div>
                      </td>
                      <td className="py-3 text-muted-foreground">{s.course}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2 min-w-[120px]">
                          <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-gradient-primary" style={{ width: `${s.p}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground w-8">{s.p}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        {s.s === "up"
                          ? <TrendingUp className="h-4 w-4 text-primary" />
                          : <TrendingDown className="h-4 w-4 text-destructive" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent activity */}
          <div className="glass rounded-3xl p-6">
            <div className="text-lg font-semibold mb-4">Recent activity</div>
            <ol className="space-y-4 relative border-l border-white/10 ml-2">
              {[
                { t: "Marcus submitted Assignment 3", time: "10m" },
                { t: "You published Quiz: Backprop", time: "1h" },
                { t: "Ava earned 'Consistency' badge", time: "3h" },
                { t: "6 new enrollments in ML Foundations", time: "Yesterday" },
              ].map((e, i) => (
                <li key={i} className="pl-5 relative">
                  <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-gradient-primary" />
                  <div className="text-sm">{e.t}</div>
                  <div className="text-xs text-muted-foreground">{e.time} ago</div>
                </li>
              ))}
            </ol>
          </div>

          {/* Courses */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold">Your courses</div>
              <a href="#" className="text-xs text-primary hover:underline inline-flex items-center gap-1">Manage <ArrowRight className="h-3 w-3" /></a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { t: "ML Foundations", s: 82, a: 92 },
                { t: "Deep Learning", s: 54, a: 78 },
                { t: "System Design", s: 41, a: 71 },
              ].map(c => (
                <div key={c.t} className="glass rounded-2xl p-5 hover:bg-white/[0.08] transition-all group cursor-pointer">
                  <div className="h-24 rounded-xl bg-gradient-primary opacity-80 mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 grid place-items-center"><BookOpen className="h-8 w-8 text-white/70" /></div>
                  </div>
                  <div className="font-medium">{c.t}</div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{c.s} students</span>
                    <span>Avg {c.a}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, delta, trend }: { label: string; value: string; delta: string; trend: "up" | "down" }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-baseline justify-between">
        <div className="text-3xl font-semibold">{value}</div>
        <div className={`text-xs flex items-center gap-1 ${trend === "up" ? "text-primary" : "text-destructive"}`}>
          {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {delta}
        </div>
      </div>
    </div>
  );
}
