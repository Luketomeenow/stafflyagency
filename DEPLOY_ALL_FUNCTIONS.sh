#!/bin/bash

# Staffly - Deploy All Edge Functions
# This script deploys the chat and email functions to fix CORS issues

PROJECT_REF="gxtqhxtsanqeeaeifrrc"

echo "🚀 Deploying Staffly Edge Functions..."
echo ""

# Check if logged in
echo "1. Checking Supabase CLI..."
if ! command -v supabase &> /dev/null; then
    echo "   Installing Supabase CLI..."
    npm install -g supabase
fi

# Deploy chat function
echo ""
echo "2. Deploying chat function..."
supabase functions deploy chat --project-ref $PROJECT_REF --no-verify-jwt

# Deploy send-match-email function
echo ""
echo "3. Deploying send-match-email function..."
supabase functions deploy send-match-email --project-ref $PROJECT_REF --no-verify-jwt

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 IMPORTANT: Set your API keys as secrets:"
echo ""
echo "   supabase secrets set OPENAI_API_KEY=sk-your-key-here --project-ref $PROJECT_REF"
echo "   supabase secrets set RESEND_API_KEY=re_your-key-here --project-ref $PROJECT_REF"
echo ""
echo "🔄 After setting secrets, refresh your browser!"

