import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { AITool } from "@/components/ai-tool";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Workplace AI" },
      { name: "description", content: "Break goals into actionable tasks with AI." },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  return (
    <AITool
      title="AI Task Planner"
      description="Break any goal into a clear, prioritized action plan."
      icon={<ListChecks className="h-5 w-5" />}
      cta="Generate Plan"
      systemPrompt="You are an expert project planner. Break the user's goal into a clear, sequenced plan formatted in markdown. Structure: ## Goal, ## Milestones (numbered), ## Detailed Tasks (table with #, Task, Priority [High/Med/Low], Estimated Time, Dependencies), ## Risks & Mitigations, ## Success Metrics. Be realistic and specific."
      inputs={[
        { name: "goal", label: "Goal or project", placeholder: "e.g. Launch a customer onboarding email sequence", rows: 2 },
        { name: "context", label: "Constraints & context", placeholder: "e.g. 2-week deadline, team of 3, limited budget", rows: 3 },
      ]}
      buildPrompt={(v) => `Goal: ${v.goal}\n\nContext & constraints: ${v.context}`}
    />
  );
}