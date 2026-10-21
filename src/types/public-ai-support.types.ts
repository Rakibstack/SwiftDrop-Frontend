
export type AskPublicAIQuestionPayload = {
  question: string;
  trackingId?: string;
};

export type PublicAISupportResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    answer: string;
  };
};