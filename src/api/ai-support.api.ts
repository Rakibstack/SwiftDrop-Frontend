import apiClient from "@/lib/apiClient";
import type {
  AISupportResponse,
  AskAIQuestionPayload,
} from "@/types/ai-support.types";

export const askAIQuestion = async (
  payload: AskAIQuestionPayload,
): Promise<AISupportResponse> => {
  return apiClient<AISupportResponse>("/ai-support/ask", {
    method: "POST",
    body: payload,
  });
};
