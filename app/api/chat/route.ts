import Anthropic from "@anthropic-ai/sdk";
import systemPrompt from "@/lib/systemPrompt";
import { NextRequest } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages,
    });

    const textContent = response.content.find(
      (block) => block.type === "text"
    );

    const responseText =
      textContent && "text" in textContent
        ? textContent.text
        : "I could not find an answer. Please try again.";

    return Response.json({ message: responseText });
  } catch (error) {
    console.error("Claude API error:", error);
    return Response.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}