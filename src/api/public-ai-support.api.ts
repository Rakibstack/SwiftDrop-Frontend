import apiClient from "@/lib/apiClient";
import type {
  AskPublicAIQuestionPayload,
  PublicAISupportResponse,
} from "@/types/public-ai-support.types";

export const askPublicAIQuestion = async (
  payload: AskPublicAIQuestionPayload,
): Promise<PublicAISupportResponse> => {
  return apiClient<PublicAISupportResponse>("/public/ai-support/ask", {
    method: "POST",
    body: payload,
  });
};
