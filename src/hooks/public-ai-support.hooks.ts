
import { askPublicAIQuestion } from "@/api/public-ai-support.api";
import { useMutation } from "@tanstack/react-query";

export function usePublicAISupport() {
  return useMutation({
    mutationFn: askPublicAIQuestion,
  });
}