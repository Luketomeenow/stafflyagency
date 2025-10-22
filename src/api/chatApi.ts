interface ChatRequest {
  message: string;
  apiKey: string;
  model?: string;
}

interface ChatResponse {
  response: string;
  error?: string;
}

export const sendChatMessage = async (request: ChatRequest): Promise<ChatResponse> => {
  try {
    // Use Vite proxy in dev, direct OpenAI in prod
    const apiUrl = import.meta.env.DEV
      ? '/api/openai/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions'

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${request.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: request.model || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are Staffly AI, a helpful virtual assistant specialist. You help businesses find and hire virtual assistants for various roles like:
            - Virtual Admin
            - Customer Support
            - Social Media Management
            - Data Entry
            - Project Management
            - Digital Marketing
            - Content Creation
            - Bookkeeping
            
            Be professional, helpful, and provide specific advice about virtual assistant services. Keep responses concise but informative. If someone asks about pricing, mention that Staffly offers competitive rates starting at $299/month and that you can connect them with a specialist for detailed pricing.`
          },
          {
            role: 'user',
            content: request.message
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      let details = ''
      const contentType = response.headers.get('content-type') || ''
      try {
        if (contentType.includes('application/json')) {
          const errorData = await response.json()
          details = errorData.error?.message || JSON.stringify(errorData)
        } else {
          details = await response.text()
        }
      } catch {}
      throw new Error(`OpenAI request failed (${response.status} ${response.statusText})${details ? ` - ${details}` : ''}`)
    }

    const data = await response.json();
    const botResponse = data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.';

    return {
      response: botResponse
    };

  } catch (error) {
    console.error('Chat API Error:', error);
    return {
      response: "I'm sorry, I'm experiencing technical difficulties. Please try again later or contact our support team.",
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Alternative implementation using a proxy server (for CORS issues)
export const sendChatMessageViaProxy = async (request: ChatRequest): Promise<ChatResponse> => {
  try {
    // This would be your backend API endpoint
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: request.message,
        model: request.model || 'gpt-3.5-turbo'
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from server');
    }

    const data = await response.json();
    return {
      response: data.response || 'I apologize, but I couldn\'t generate a response. Please try again.'
    };

  } catch (error) {
    console.error('Chat API Error:', error);
    return {
      response: "I'm sorry, I'm experiencing technical difficulties. Please try again later or contact our support team.",
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
