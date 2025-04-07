
import { useState, useCallback } from "react";

interface GroqClientOptions {
  apiKey?: string;
  model?: string;
}

const DEFAULT_MODEL = "qwen-2.5-32b";

export const useGroqClient = (options: GroqClientOptions = {}) => {
  const [apiKey, setApiKey] = useState<string>(options.apiKey || "");
  const [model, setModel] = useState<string>(options.model || DEFAULT_MODEL);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = useCallback(async (
    prompt: string,
    systemPrompt?: string,
    temperature: number = 0.7
  ) => {
    if (!apiKey) {
      setError("API key is required. Please set an API key.");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real application, this would be a call to the Groq API
      // This is a mock implementation for demo purposes
      console.log(`Making request to Groq API with model: ${model}`);
      console.log(`System prompt: ${systemPrompt}`);
      console.log(`User prompt: ${prompt}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      const mockResponse = {
        choices: [
          {
            message: {
              content: `This is a simulated response from Groq API using the ${model} model. In a real implementation, this would be an actual response from the API based on your prompt: "${prompt}".`,
            },
          },
        ],
      };
      
      setIsLoading(false);
      return mockResponse;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setIsLoading(false);
      return null;
    }
  }, [apiKey, model]);

  return {
    makeRequest,
    setApiKey,
    setModel,
    isLoading,
    error,
    currentModel: model,
  };
};
