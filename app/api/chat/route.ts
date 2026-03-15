const SYSTEM_PROMPT = `You are a campus help desk assistant for MMMUT (Madan Mohan Malviya University Of Technology). You are friendly, helpful, and knowledgeable about student-related matters.

You answer queries about:
- Academic matters (exams, courses, registration, deadlines)
- Fees and financial assistance (fee payment, scholarships, financial aid)
- Hostel and accommodation
- Campus notices and announcements
- Student services and resources
- Academic calendar and important dates

Keep responses concise, friendly, and student-focused. If a question is outside your scope (not related to student/campus matters), politely redirect the user back to campus-related topics.`

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const apiKey = process.env.GEMINI_API_KEY?.trim()

    if (!apiKey) {
      console.error("[chat] GEMINI_API_KEY missing")

      return new Response(
        JSON.stringify({ error: "Chatbot configuration error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      )
    }

    const lastUserMessage =
      messages?.[messages.length - 1]?.content || "Hello"

    const apiUrl =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`

    const body = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${SYSTEM_PROMPT}

Student question: ${lastUserMessage}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512
      }
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("[chat] Gemini API error:", data)

      return new Response(
        JSON.stringify({
          error: "Failed to get response from AI",
          details: data
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" }
        }
      )
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response."

    return new Response(
      JSON.stringify({
        choices: [
          {
            message: {
              role: "assistant",
              content: text
            }
          }
        ]
      }),
      {
        headers: { "Content-Type": "application/json" }
      }
    )
  } catch (error) {
    console.error("[chat] Internal error:", error)

    return new Response(
      JSON.stringify({
        error: "Internal server error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    )
  }
}
