/**
 * Email API using Supabase Edge Function
 * Sends emails via Resend through a secure backend endpoint
 */

export async function sendMatchEmail(
  to: string,
  subject: string,
  text: string,
  html: string
): Promise<{ success: boolean; error?: string }> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

  if (!supabaseUrl) {
    console.error('VITE_SUPABASE_URL not configured in .env.local')
    return { 
      success: false, 
      error: 'Supabase URL not configured. Add VITE_SUPABASE_URL to .env.local' 
    }
  }

  // Construct Edge Function URL
  const functionUrl = `${supabaseUrl}/functions/v1/send-match-email`

  try {
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: to,
        subject: subject,
        text: text,
        html: html,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Edge Function error:', data)
      return { 
        success: false, 
        error: data.error || 'Failed to send email' 
      }
    }

    console.log('✅ Email sent successfully:', data.id || 'sent')
    return { success: true }

  } catch (error: any) {
    console.error('Email send error:', error)
    return { 
      success: false, 
      error: error.message || 'Unknown error sending email' 
    }
  }
}

