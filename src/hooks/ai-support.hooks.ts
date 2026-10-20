
import { askAIQuestion } from "@/api/ai-support.api";
import { useMutation } from "@tanstack/react-query";


export function useAISupport() {
  return useMutation({
    mutationFn: askAIQuestion,
  });
}