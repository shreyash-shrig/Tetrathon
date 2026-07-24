import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain, Sparkles, Target, Zap, BarChart3, BookOpen, ArrowRight, Check,
  Menu, X, Star, ChevronDown, Github, Twitter, Linkedin, GraduationCap,
  MessageSquare, Trophy,
} from "lucide-react";
import aiOrb from "@/assets/ai-orb.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#features", label: "Features" },
    { href: "#how", label: "How it works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#testimonials", label: "Testimonials" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <nav className="glass mx-auto max-w-6xl rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight">AdaptLearn</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2">Sign in</Link>
          <Link to="/student" className="text-sm bg-gradient-primary text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 shadow-glow">Get started</Link>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(v => !v)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden glass mx-auto max-w-6xl rounded-2xl mt-2 p-4 flex flex-col gap-2 animate-fade-up">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground py-2">{l.label}</a>
          ))}
          <Link to="/login" className="text-sm py-2">Sign in</Link>
          <Link to="/student" className="text-sm bg-gradient-primary text-white px-4 py-2 rounded-lg text-center font-medium">Get started</Link>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-40 pb-24 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Meet AdaptLearn — the adaptive AI tutor
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
            <span className="text-gradient">Learning that</span><br />
            <span className="text-foreground/90">adapts to you.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 text-lg text-muted-foreground max-w-xl">
            AdaptLearn builds a curriculum that evolves with every answer. An AI tutor for students, a signal-rich cockpit for teachers.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-wrap gap-3">
            <Link to="/student" className="group inline-flex items-center gap-2 bg-gradient-primary text-white px-6 py-3 rounded-xl font-medium shadow-glow hover:opacity-95">
              Start free <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/teacher" className="glass inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium hover:bg-white/10">
              For teachers
            </Link>
          </motion.div>
          <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> No credit card</div>
            <div className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> 14-day free trial</div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="relative">
          <div className="absolute inset-0 bg-gradient-primary opacity-40 blur-3xl rounded-full" />
          <motion.img
            src={aiOrb}
            width={1024}
            height={1024}
            alt="AI neural network orb"
            className="relative w-full max-w-lg mx-auto rounded-3xl animate-float"
          />
        </motion.div>
      </div>
      <div className="max-w-6xl mx-auto mt-20 opacity-70">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 text-center">Trusted by learners at</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-muted-foreground text-sm font-medium">
          {["Stanford", "MIT", "Google", "Airbnb", "Stripe", "Figma"].map(c => <span key={c}>{c}</span>)}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: <Brain className="h-5 w-5" />, title: "Adaptive intelligence", desc: "A knowledge graph models your understanding in real time." },
    { icon: <Target className="h-5 w-5" />, title: "Personal paths", desc: "Skip what you know. Focus on the gaps that matter." },
    { icon: <MessageSquare className="h-5 w-5" />, title: "AI tutor 24/7", desc: "Patient, expert explanations tailored to how you learn." },
    { icon: <BarChart3 className="h-5 w-5" />, title: "Insightful analytics", desc: "Progress you can trust — no vanity metrics." },
    { icon: <BookOpen className="h-5 w-5" />, title: "Any subject", desc: "From calculus to design, thousands of domains." },
    { icon: <Trophy className="h-5 w-5" />, title: "Mastery, proven", desc: "Projects and challenges that certify real skill." },
  ];
  return (
    <section id="features" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Features" title="Everything you need to master anything" subtitle="Deeply intelligent. Beautifully quiet. Built to disappear so learning takes the stage." />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-6 hover:bg-white/[0.08] transition-all group">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center text-white shadow-glow group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Tell us your goal", desc: "Pick a topic or paste a syllabus. AdaptLearn understands intent instantly." },
    { n: "02", title: "AI builds your path", desc: "A personalized curriculum tuned to your background and pace." },
    { n: "03", title: "Learn in flow", desc: "Bite-sized sessions with real-time feedback and spaced repetition." },
    { n: "04", title: "Master and apply", desc: "Prove mastery with projects. Watch your skills compound." },
  ];
  return (
    <section id="how" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="How it works" title="Curiosity to mastery in four steps" />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-6 relative overflow-hidden">
              <div className="text-xs font-mono text-primary/80">{s.n}</div>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-primary opacity-20 blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { quote: "AdaptLearn feels like a personal tutor who knows exactly what I need next.", name: "Ava Chen", role: "ML Engineer, Stripe" },
    { quote: "The interface disappears. All that's left is learning. This is the future.", name: "Marcus Reid", role: "Design Lead, Figma" },
    { quote: "I picked up systems design in three weeks. The adaptive path skipped everything I knew.", name: "Priya Natarajan", role: "Staff Eng, Airbnb" },
  ];
  return (
    <section id="testimonials" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Loved by learners" title="A quiet revolution in how we learn" />
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {items.map((t) => (
            <figure key={t.name} className="glass rounded-2xl p-6 flex flex-col">
              <div className="flex gap-0.5 text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-4 text-sm leading-relaxed flex-1">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-primary grid place-items-center text-white text-sm font-semibold">{t.name[0]}</div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "Starter", price: "Free", desc: "For curious learners", features: ["3 courses/mo", "AI tutor limited", "Basic analytics"], cta: "Start free" },
    { name: "Pro", price: "$18", per: "/mo", desc: "For serious learners", features: ["Unlimited courses", "Unlimited AI tutor", "Deep analytics", "Offline mode"], featured: true, cta: "Go Pro" },
    { name: "Teams", price: "$49", per: "/mo", desc: "For classrooms & teams", features: ["Everything in Pro", "Teacher dashboard", "Shared paths", "Admin controls"], cta: "Contact sales" },
  ];
  return (
    <section id="pricing" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Pricing" title="Simple, honest pricing" subtitle="Start free. Upgrade when you're ready." />
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div key={t.name} className={`rounded-2xl p-8 relative ${t.featured ? "glass-strong shadow-glow ring-1 ring-primary/40" : "glass"}`}>
              {t.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-gradient-primary text-white px-3 py-1 rounded-full font-medium">Most popular</div>}
              <div className="text-sm text-muted-foreground">{t.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <div className="text-4xl font-semibold">{t.price}</div>
                {t.per && <div className="text-sm text-muted-foreground">{t.per}</div>}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{t.desc}</div>
              <ul className="mt-6 space-y-3">
                {t.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/login" className={`mt-8 block text-center py-2.5 rounded-xl font-medium transition ${t.featured ? "bg-gradient-primary text-white shadow-glow" : "glass hover:bg-white/10"}`}>{t.cta}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto glass-strong rounded-3xl p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-4">
            <Sparkles className="h-3 w-3 text-primary" /> Join 200,000+ learners
          </div>
          <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-gradient">Start learning smarter, today.</h3>
          <p className="mt-3 text-muted-foreground">The AI tutor that meets you where you are.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/student" className="inline-flex items-center gap-2 bg-gradient-primary text-white px-6 py-3 rounded-xl font-medium shadow-glow">Get started free <ArrowRight className="h-4 w-4" /></Link>
            <a href="#pricing" className="glass inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium hover:bg-white/10">See pricing</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 mt-10 px-4">
      <div className="max-w-6xl mx-auto py-12 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center"><Brain className="h-4 w-4 text-white" /></div>
            <span className="font-semibold tracking-tight">AdaptLearn</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">Adaptive learning, personalized by AI.</p>
          <div className="mt-5 flex gap-3">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="glass h-9 w-9 rounded-lg grid place-items-center hover:bg-white/10"><Icon className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        {[
          { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
          { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
          { title: "Resources", links: ["Docs", "Guides", "Community", "Support"] },
        ].map(col => (
          <div key={col.title}>
            <div className="text-sm font-semibold">{col.title}</div>
            <ul className="mt-4 space-y-2.5">
              {col.links.map(l => <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} AdaptLearn, Inc.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="inline-block glass rounded-full px-3 py-1 text-xs text-muted-foreground">{eyebrow}</div>
      <h2 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-gradient">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground text-base md:text-lg">{subtitle}</p>}
    </div>
  );
}
// suppress unused warnings
void GraduationCap; void ChevronDown; void Zap;
