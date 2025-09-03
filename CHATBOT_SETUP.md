# Staffly AI Chatbot Setup Guide

## Overview
The Staffly AI Chatbot is now integrated into your hero section and ready to help visitors find virtual assistants for their business needs.

## Features
- ✅ Real-time AI-powered conversations
- ✅ Quick response suggestions
- ✅ Professional virtual assistant expertise
- ✅ Seamless integration with OpenAI API
- ✅ Beautiful animations and UI

## Setup Requirements

### 1. Environment Variables
Make sure your `.env` file contains:
```bash
VITE_OPENAI_API_KEY=your_actual_openai_api_key_here
VITE_OPENAI_MODEL=gpt-3.5-turbo
```

### 2. OpenAI API Key
- Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- Replace `your_actual_openai_api_key_here` in the `.env` file
- Never commit your `.env` file to version control

## How It Works

### Frontend Component
- **Location**: `src/components/AIChatbot.tsx`
- **Integration**: Automatically imported and used in `src/pages/LandingPage.tsx`
- **Styling**: Uses Tailwind CSS with Framer Motion animations

### API Integration
- **Service**: `src/api/chatApi.ts`
- **Proxy**: Vite dev server proxies requests to OpenAI API
- **CORS**: Handled automatically through Vite proxy configuration

### Chat Flow
1. User types a message
2. Message sent to OpenAI API via proxy
3. AI generates contextual response
4. Response displayed with typing animation
5. Conversation history maintained

## Customization

### System Prompt
Edit the system prompt in `src/api/chatApi.ts` to change the AI's personality and expertise.

### Quick Responses
Modify the `quickResponses` array in `AIChatbot.tsx` to change suggested topics.

### Styling
Update Tailwind classes in the component to match your brand colors.

## Troubleshooting

### Common Issues

1. **"OpenAI API key not configured"**
   - Check your `.env` file
   - Ensure the key starts with `sk-`

2. **CORS errors**
   - Restart the Vite dev server
   - Check the proxy configuration in `vite.config.ts`

3. **API rate limits**
   - Check your OpenAI account usage
   - Consider upgrading your plan

### Development
- Chatbot works in development mode with Vite proxy
- For production, implement proper backend API endpoints
- Consider using environment-specific API configurations

## Security Notes
- API keys are exposed to the frontend (development only)
- In production, implement backend API routes
- Never expose API keys in client-side code for production apps

## Next Steps
1. Test the chatbot with various questions
2. Customize the system prompt for your business
3. Add more quick response suggestions
4. Consider adding conversation analytics
5. Implement user authentication for premium features

## Support
If you encounter issues:
1. Check the browser console for errors
2. Verify your OpenAI API key is valid
3. Ensure your `.env` file is properly configured
4. Restart the development server
