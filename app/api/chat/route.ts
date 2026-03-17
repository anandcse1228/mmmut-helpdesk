const SYSTEM_PROMPT = `You are a campus help desk assistant for MMMUT (Madan Mohan Malviya University Of Technology). You are friendly, helpful, and knowledgeable about student-related matters.

You answer queries about:
- Academic matters (exams, courses, registration, deadlines)
- Fees and financial assistance (fee payment, scholarships, financial aid)
- Hostel and accommodation
- Campus notices and announcements
- Student services and resources
- Academic calendar and important dates

Keep responses concise, friendly, and student-focused.`

export async function POST(request: Request) {

  try {

    const { messages } = await request.json()

    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return Response.json(
        { error: "Gemini API key missing" },
        { status: 500 }
      )
    }

    const lastUserMessage =
      messages?.[messages.length - 1]?.content || "Hello"

    const apiUrl =
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`

    const geminiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${SYSTEM_PROMPT}

Student question: ${lastUserMessage}`
              }
            ]
          }
        ]
      }),
    })

    if (!geminiResponse.ok) {

      const errorText = await geminiResponse.text()

      console.error("Gemini error:", errorText)

      return Response.json(
        { error: "AI response failed" },
        { status: 500 }
      )

    }

    const data = await geminiResponse.json()

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response."

    return Response.json({
      choices: [
        {
          message: {
            role: "assistant",
            content: text,
          },
        },
      ],
    })

  } catch (error) {

    console.error("Chat API error:", error)

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    )

  }

}