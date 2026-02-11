// in frontend use this
// async function generatePlan() {
//   const response = await fetch("/api/gemini", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       numberOfDays: 7,
//       influencerType: "fitness influencer",
//       userPrompt: "Focus on beginner fat loss workouts",
//     }),
//   });

//   const data = await response.json();
//   console.log(data);
// }

import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export async function POST(req) {
    try {
        const body = await req.json();

        const { numberOfDays, influencerType, userPrompt } = body;

        if (!numberOfDays || !influencerType || !userPrompt) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const prompt = `
You are a professional social media strategist.

Create a ${numberOfDays}-day content plan for a ${influencerType} influencer.

User's additional request:
"${userPrompt}"

Return ONLY valid JSON.
No explanation.
No markdown.
No extra text.

Format strictly like this:

{
  "days": [
    {
      "day": 1,
      "idea": "...",
      "caption": "...",
      "type": "reel"
    }
  ]
}


Rules:
- Include exactly ${numberOfDays} days.
- Mix post and reel strategically.
- Make captions engaging and platform-ready.
- Keep ideas specific and actionable.
`;

        const response = await fetch(
            `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }],
                        },
                    ],
                    generationConfig: {
                        temperature: 0.8,
                        response_mime_type: "application/json",
                    },
                }),
            }
        );

        const data = await response.json();
        console.log("FULL GEMINI RESPONSE:", JSON.stringify(data, null, 2));

        if (!response.ok) {
            console.error("Gemini API Error:", data);
            return NextResponse.json(
                { error: data.error?.message || "Gemini quota exceeded" },
                { status: 429 }
            );
        }

        if (!data.candidates?.length) {
            return NextResponse.json(
                { error: "No content returned from Gemini" },
                { status: 500 }
            );
        }

        const text = data.candidates[0].content.parts[0].text;
        const parsed = JSON.parse(text);

        return NextResponse.json(parsed);
    } catch (error) {
        console.error("Gemini Error:", error);
        return NextResponse.json(
            { error: "Failed to generate plan" },
            { status: 500 }
        );
    }
}
