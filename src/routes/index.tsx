import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Mail, FileText, ListChecks, Search, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Workplace AI" },
      { name: "description", content: "AI tools to automate everyday workplace tasks." },
      { property: "og:title", content: "Workplace AI Dashboard" },
      { property: "og:description", content: "AI tools to automate everyday workplace tasks." },
    ],
  }),
  component: Dashboard,
});

const tools = [
  { title: "Smart Email Generator", desc: "Draft professional emails in seconds.", url: "/email", icon: Mail, color: "from-blue-500 to-indigo-600" },
  { title: "Meeting Notes Summarizer", desc: "Turn transcripts into concise summaries.", url: "/meetings", icon: FileText, color: "from-purple-500 to-pink-600" },
  { title: "AI Task Planner", desc: "Break goals into actionable steps.", url: "/tasks", icon: ListChecks, color: "from-emerald-500 to-teal-600" },
  { title: "AI Research Assistant", desc: "Get structured research on any topic.", url: "/research", icon: Search, color: "from-amber-500 to-orange-600" },
  { title: "AI Chatbot", desc: "Ask anything, get instant answers.", url: "/chat", icon: MessageSquare, color: "from-rose-500 to-red-600" },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 p-6 md:p-10">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-[image:var(--gradient-subtle)] p-8 md:p-12 shadow-[var(--shadow-soft)]">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[image:var(--gradient-primary)] opacity-10 blur-3xl" />
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" /> Powered by Lovable AI
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Your AI workplace, all in one place.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Generate emails, summarize meetings, plan projects, and research topics — with AI
            built for professionals.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.url} to={t.url} className="group">
              <Card className="h-full p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]">
                <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${t.color} text-white shadow-sm`}>
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open <ArrowRight className="h-3 w-3" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-accent/30 p-5 text-sm text-muted-foreground">
        <p>
          <span className="font-semibold text-foreground">Responsible AI Notice:</span> All
          outputs are AI-generated and may contain errors or biases. Review and edit before
          using in production. Do not share sensitive or confidential information.
        </p>
      </section>
    </div>
  );
}
