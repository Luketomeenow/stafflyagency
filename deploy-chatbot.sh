#!/bin/bash

# Chatbot Edge Function Deployment Script

echo "🚀 Deploying Staffly Chatbot Edge Function..."
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null
then
    echo "❌ Supabase CLI not found!"
    echo ""
    echo "Install it with:"
    echo "  npm install -g supabase"
    echo ""
    exit 1
fi

echo "✅ Supabase CLI found"
echo ""

# Check if logged in
echo "🔐 Checking authentication..."
if ! supabase projects list &> /dev/null
then
    echo "❌ Not logged in to Supabase"
    echo ""
    echo "Please run: supabase login"
    echo ""
    exit 1
fi

echo "✅ Authenticated"
echo ""

# Deploy the function
echo "📦 Deploying chat function..."
echo ""

supabase functions deploy chat --no-verify-jwt

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Chat function deployed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Set your OpenAI API key (if not done already):"
    echo "   supabase secrets set OPENAI_API_KEY=sk-your-key"
    echo ""
    echo "2. Test the function:"
    echo "   curl -X POST https://YOUR_PROJECT.functions.supabase.co/chat \\"
    echo "     -H \"Authorization: Bearer YOUR_ANON_KEY\" \\"
    echo "     -H \"Content-Type: application/json\" \\"
    echo "     -d '{\"message\": \"Hello\"}'"
    echo ""
    echo "3. Your chatbot should now work! 🎉"
else
    echo ""
    echo "❌ Deployment failed"
    echo ""
    echo "Troubleshooting:"
    echo "1. Make sure you're linked to a project: supabase link"
    echo "2. Check project status: supabase projects list"
    echo "3. View logs: supabase functions logs chat"
fi


