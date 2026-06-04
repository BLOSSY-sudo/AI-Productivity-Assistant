import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { AITool } from "@/components/ai-tool";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Workplace AI" },
      { name: "description", content: "Turn meeting transcripts into clear summaries." },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  return (
    <AITool
      title="Meeting Notes Summarizer"
      description="Turn transcripts or rough notes into structured summaries."
      icon={<FileText className="h-5 w-5" />}
      cta="Summarize Meeting"
      systemPrompt="You are an executive meeting analyst. Summarize meeting content into a structured markdown document with these sections: ## Summary (2-3 sentences), ## Key Discussion Points (bullets), ## Decisions Made (bullets), ## Action Items (table with Owner, Task, Due Date), ## Open Questions (bullets). Be precise and concise. If a section has no content, write 'None'."
      inputs={[
        { name: "transcript", label: "Meeting transcript or notes", placeholder: "Paste raw notes, transcript, or chat log...", rows: 12 },
        { name: "context", label: "Optional context", placeholder: "e.g. Weekly product sync; attendees: Alex, Jordan, Sam", rows: 2 },
      ]}
      buildPrompt={(v) =>
        `Context: ${v.context || "Not provided"}\n\nMeeting content:\n${v.transcript}`
      }
    />
  );
}