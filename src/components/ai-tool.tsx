import { useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, Loader2, Copy, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export interface AIToolProps {
  title: string;
  description: string;
  icon: ReactNode;
  systemPrompt: string;
  inputs: Array<{
    name: string;
    label: string;
    placeholder: string;
    rows?: number;
  }>;
  buildPrompt: (values: Record<string, string>) => string;
  cta?: string;
}

export function AITool({
  title,
  description,
  icon,
  systemPrompt,
  inputs,
  buildPrompt,
  cta = "Generate",
}: AIToolProps) {
  const [values, setValues] = useState<Record<string, string>>(
    () => Object.fromEntries(inputs.map((i) => [i.name, ""])),
  );
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const run = async () => {
    if (inputs.some((i) => !values[i.name]?.trim())) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: systemPrompt, prompt: buildPrompt(values) }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to generate");
        return;
      }
      setOutput(data.content || "");
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 md:p-10">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4 p-5 shadow-[var(--shadow-soft)]">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Input
          </h2>
          {inputs.map((i) => (
            <div key={i.name} className="space-y-2">
              <label className="text-sm font-medium text-foreground">{i.label}</label>
              <Textarea
                placeholder={i.placeholder}
                rows={i.rows ?? 4}
                value={values[i.name]}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [i.name]: e.target.value }))
                }
                className="resize-none"
              />
            </div>
          ))}
          <Button onClick={run} disabled={loading} className="w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> {cta}
              </>
            )}
          </Button>
        </Card>

        <Card className="flex flex-col p-5 shadow-[var(--shadow-soft)]">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Output
            </h2>
            {output && (
              <Button variant="ghost" size="sm" onClick={copy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            )}
          </div>
          {output ? (
            <Textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="min-h-[400px] flex-1 resize-none font-mono text-sm"
            />
          ) : (
            <div className="flex min-h-[400px] flex-1 items-center justify-center rounded-md border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
              {loading
                ? "Thinking..."
                : "Your AI-generated output will appear here. You can edit it freely before using."}
            </div>
          )}
          {output && (
            <div className="prose prose-sm mt-4 max-w-none rounded-md bg-muted/40 p-4 text-foreground">
              <ReactMarkdown>{output}</ReactMarkdown>
            </div>
          )}
        </Card>
      </div>

      <div className="flex items-start gap-2 rounded-lg border border-border bg-accent/40 p-3 text-xs text-muted-foreground">
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-foreground" />
        <p>
          <span className="font-medium text-foreground">Responsible AI:</span> Outputs are
          AI-generated and may contain inaccuracies or bias. Always review, verify facts, and
          edit before sending or sharing externally.
        </p>
      </div>
    </div>
  );
}