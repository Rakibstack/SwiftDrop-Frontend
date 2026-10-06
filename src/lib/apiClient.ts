import { ofetch } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",

  onResponseError({ response }) {
    const data = response._data;

    const message =
      data?.message ||
      data?.error?.message ||
      "Something went wrong. Please try again.";

    throw new Error(message);
  },
});

export default apiClient;