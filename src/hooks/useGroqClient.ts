
import { useState, useCallback, useEffect } from "react";

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

  // Load saved API key and model from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("groqApiKey");
    const savedModel = localStorage.getItem("groqModel");
    
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    
    if (savedModel) {
      setModel(savedModel);
    }
  }, []);

  const makeRequest = useCallback(async (
    prompt: string,
    systemPrompt?: string,
    temperature: number = 0.7
  ) => {
    // First check if we have an API key either from props or localStorage
    const currentApiKey = apiKey || localStorage.getItem("groqApiKey");
    const currentModel = model || localStorage.getItem("groqModel") || DEFAULT_MODEL;

    if (!currentApiKey) {
      setError("API key is required. Please set an API key in Settings.");
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would be a call to the Groq API
      // This is a mock implementation for demo purposes
      console.log(`Making request to Groq API with model: ${currentModel}`);
      console.log(`System prompt: ${systemPrompt}`);
      console.log(`User prompt: ${prompt}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      const mockResponse = {
        choices: [
          {
            message: {
              content: `This is a simulated response from Groq API using the ${currentModel} model. In a real implementation, this would be an actual response from the API based on your prompt: "${prompt}".`,
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
    hasApiKey: Boolean(apiKey || localStorage.getItem("groqApiKey")),
  };
};
