
export type AskAIQuestionPayload = {
  question: string;
  trackingId?: string;
};

export type AISupportResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    answer: string;
  };
};