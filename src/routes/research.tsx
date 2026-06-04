import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AITool } from "@/components/ai-tool";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Workplace AI" },
      { name: "description", content: "Get structured research briefings on any topic." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <AITool
      title="AI Research Assistant"
      description="Get a structured briefing on any business or technical topic."
      icon={<Search className="h-5 w-5" />}
      cta="Research Topic"
      systemPrompt="You are a senior research analyst. Produce a structured research briefing in markdown with: ## Overview, ## Key Concepts, ## Current Landscape (with notable players or trends), ## Pros & Cons, ## Practical Applications, ## Recommended Next Steps. Be objective. Where you are uncertain, clearly mark it. Note that your knowledge has a cutoff date and may not reflect the latest developments."
      inputs={[
        { name: "topic", label: "Research topic", placeholder: "e.g. Vector databases for enterprise RAG", rows: 2 },
        { name: "angle", label: "Specific questions or angle", placeholder: "e.g. Compare top 3 options for a 50-person company", rows: 3 },
      ]}
      buildPrompt={(v) => `Topic: ${v.topic}\n\nSpecific angle/questions: ${v.angle}`}
    />
  );
}