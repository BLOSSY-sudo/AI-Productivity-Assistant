import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { system, prompt } = (await request.json()) as {
            system: string;
            prompt: string;
          };
          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return Response.json({ error: "AI not configured" }, { status: 500 });
          }
          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                { role: "system", content: system },
                { role: "user", content: prompt },
              ],
            }),
          });
          if (!res.ok) {
            if (res.status === 429)
              return Response.json({ error: "Rate limit exceeded. Try again shortly." }, { status: 429 });
            if (res.status === 402)
              return Response.json({ error: "AI credits exhausted. Please add credits." }, { status: 402 });
            const t = await res.text();
            console.error("AI gateway error", res.status, t);
            return Response.json({ error: "AI request failed" }, { status: 500 });
          }
          const data = await res.json();
          const content = data.choices?.[0]?.message?.content ?? "";
          return Response.json({ content });
        } catch (e) {
          console.error(e);
          return Response.json({ error: "Unexpected error" }, { status: 500 });
        }
      },
    },
  },
});