import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { AITool } from "@/components/ai-tool";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Workplace AI" },
      { name: "description", content: "Generate professional emails with AI." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <AITool
      title="Smart Email Generator"
      description="Draft professional emails in seconds."
      icon={<Mail className="h-5 w-5" />}
      cta="Generate Email"
      systemPrompt="You are an expert professional email writer. Write clear, concise, well-structured emails appropriate for a workplace context. Always include a subject line, greeting, body, and sign-off. Match the requested tone exactly. Output only the email text — no commentary."
      inputs={[
        { name: "recipient", label: "Recipient & context", placeholder: "e.g. My manager Sarah, about the Q4 roadmap delay", rows: 2 },
        { name: "purpose", label: "Purpose / key points", placeholder: "What do you want to communicate? Include any key facts.", rows: 4 },
        { name: "tone", label: "Tone", placeholder: "e.g. formal, friendly, apologetic, assertive", rows: 1 },
      ]}
      buildPrompt={(v) =>
        `Write an email with these details:\n\nRecipient/context: ${v.recipient}\n\nPurpose & key points: ${v.purpose}\n\nTone: ${v.tone}`
      }
    />
  );
}