"use client";

import { FormEvent, useState } from "react";
import {
  Bot,
  ChevronDown,
  LoaderCircle,
  MessageCircle,
  Send,
  Sparkles,
  Truck,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePublicAISupport } from "@/hooks/public-ai-support.hooks";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "What services does SwiftDrop offer?",
  "How do I track a shipment?",
  "Explain PAYMENT_CONFIRMED",
];

export default function PublicAIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [trackingId, setTrackingId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { mutate, isPending } = usePublicAISupport();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanQuestion = question.trim();
    const cleanTrackingId = trackingId.trim();

    if (!cleanQuestion || isPending) return;

    setMessages((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: cleanQuestion,
      },
    ]);

    setQuestion("");

    mutate(
      {
        question: cleanQuestion,
        ...(cleanTrackingId ? { trackingId: cleanTrackingId } : {}),
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
          toast.error(error.message || "Unable to get a response.");

          setMessages((previous) => [
            ...previous,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content:
                "Sorry, I couldn't answer that right now. Please try again.",
            },
          ]);
        },
      },
    );
  };

  const handleSuggestion = (suggestion: string) => {
    setQuestion(suggestion);
  };

  return (
    <>
      {/* Floating launcher */}
      {!isOpen && (
        <Button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open SwiftDrop AI support"
          className="fixed bottom-5 right-5 z-50 size-14 rounded-full shadow-xl transition-transform hover:scale-105 sm:bottom-6 sm:right-6"
        >
          <MessageCircle className="size-6" />
        </Button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <section
          aria-label="SwiftDrop public AI support chat"
          className="fixed inset-x-3 bottom-3 z-50 flex h-[min(680px,calc(100dvh-24px))] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[600px] sm:w-[390px]"
        >
          {/* Header */}
          <header className="flex items-center gap-3 bg-primary px-4 py-4 text-primary-foreground">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <Bot className="size-6" />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="font-semibold">SwiftDrop AI</h2>
              <p className="text-xs text-primary-foreground/75">
                How can we help you today?
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Minimize chat"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-white/15 hover:text-primary-foreground"
            >
              <ChevronDown className="size-5" />
            </Button>
          </header>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex min-h-full flex-col items-center justify-center text-center">
                <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="size-6" />
                </div>

                <h3 className="font-semibold">Welcome to SwiftDrop!</h3>

                <p className="mt-1 max-w-[270px] text-sm leading-5 text-muted-foreground">
                  Ask us about delivery services or get help tracking a
                  shipment.
                </p>

                <div className="mt-5 flex w-full flex-col gap-2">
                  {suggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      type="button"
                      variant="outline"
                      disabled={isPending}
                      onClick={() => handleSuggestion(suggestion)}
                      className="h-auto justify-start whitespace-normal rounded-xl px-3 py-2.5 text-left text-xs"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => {
                const isAssistant = message.role === "assistant";

                return (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${
                      isAssistant ? "justify-start" : "justify-end"
                    }`}
                  >
                    {isAssistant && (
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Bot className="size-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] break-words rounded-2xl px-3 py-2.5 text-sm ${
                        isAssistant
                          ? "rounded-tl-sm bg-muted text-foreground"
                          : "rounded-tr-sm bg-primary text-primary-foreground"
                      }`}
                    >
                      {isAssistant ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {isPending && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Bot className="size-4" />
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5">
                  <LoaderCircle className="size-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={handleSubmit}
            className="space-y-2 border-t bg-background p-3"
          >
            <div className="flex items-center gap-2">
              <Truck className="size-4 shrink-0 text-muted-foreground" />
              <Input
                value={trackingId}
                onChange={(event) => setTrackingId(event.target.value)}
                placeholder="Tracking ID (optional)"
                aria-label="Shipment tracking ID"
                maxLength={100}
                disabled={isPending}
                className="h-9 text-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              <Input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Type your message..."
                aria-label="Your message"
                maxLength={1000}
                disabled={isPending}
              />

              <Button
                type="submit"
                size="icon"
                aria-label="Send message"
                disabled={isPending || !question.trim()}
                className="shrink-0"
              >
                {isPending ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </Button>
            </div>

            <p className="text-center text-[10px] text-muted-foreground">
              AI can make mistakes. Avoid sharing sensitive personal
              information.
            </p>
          </form>
        </section>
      )}
    </>
  );
}
