

"use client";

import { FormEvent, useState } from "react";
import { Bot, LoaderCircle, Send, Sparkles, Truck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage from "./ChatMessage";
import { useAISupport } from "@/hooks/ai-support.hooks";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "How can I track my shipment?",
  "Explain my shipment status",
  "What happens after payment confirmation?",
];

export default function AISupportChat() {
  const [question, setQuestion] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const { mutate, isPending } = useAISupport();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuestion = question.trim();
    const trimmedTrackingId = trackingId.trim();

    if (!trimmedQuestion || isPending) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((previous) => [...previous, userMessage]);
    setQuestion("");

    mutate(
      {
        question: trimmedQuestion,
        ...(trimmedTrackingId
          ? { trackingId: trimmedTrackingId }
          : {}),
      },
      {
        onSuccess: (response) => {
          setMessages((previous) => [
            ...previous,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content: response.data.answer,
            },
          ]);
        },
        onError: (error) => {
          toast.error(error.message || "Unable to get an AI response.");

          setMessages((previous) => [
            ...previous,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content:
                "Sorry, I couldn't process your question. Please try again.",
            },
          ]);
        },
      },
    );
  };

  return (
    <section className="mx-auto flex h-[min(760px,calc(100dvh-8rem))] min-h-[480px] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border bg-background shadow-sm">
      <header className="flex items-center gap-3 border-b p-4 sm:p-5">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Bot className="size-6" />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="font-semibold tracking-tight">
            SwiftDrop AI Support
          </h1>
          <p className="text-sm text-muted-foreground">
            Shipment guidance, powered by AI
          </p>
        </div>

        <div className="hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs text-muted-foreground sm:flex">
          <span className="size-2 rounded-full bg-emerald-500" />
          AI Assistant
        </div>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
        {messages.length === 0 ? (
          <div className="flex min-h-full flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="size-8" />
            </div>

            <h2 className="text-xl font-semibold tracking-tight">
              How can I help with your delivery?
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Ask about shipment tracking, parcel status, or what to expect
              next in the delivery process.
            </p>

            <div className="mt-6 flex w-full max-w-lg flex-wrap justify-center gap-2">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-auto whitespace-normal rounded-xl px-3 py-2"
                  disabled={isPending}
                  onClick={() => setQuestion(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))
        )}

        {isPending && (
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Bot className="size-5" />
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
              <LoaderCircle className="size-4 animate-spin" />
              Analyzing your question...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 border-t bg-muted/20 p-4 sm:p-5">
        <div className="flex gap-2">
          <Truck className="mt-2.5 size-4 shrink-0 text-muted-foreground" />

          <Input
            value={trackingId}
            onChange={(event) => setTrackingId(event.target.value)}
            placeholder="Tracking ID (optional)"
            aria-label="Shipment tracking ID"
            maxLength={100}
            disabled={isPending}
          />
        </div>

        <div className="flex items-end gap-2">
          <Input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask about your shipment..."
            aria-label="Your question"
            maxLength={1000}
            disabled={isPending}
          />

          <Button
            type="submit"
            size="icon"
            aria-label="Send question"
            disabled={isPending || !question.trim()}
          >
            {isPending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          AI responses may be inaccurate. Verify important shipment details
          against your tracking information.
        </p>
      </form>
    </section>
  );
}
