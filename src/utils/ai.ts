export const analyzeJournal = async (story: string) => {
  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // ✅ correct Groq model
          messages: [
            {
              role: "system",
              content:
                "You are a travel journal AI. Return ONLY this format:\nMood: <one word + emoji>\nSummary: <2-3 lines>",
            },
            {
              role: "user",
              content: story,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    console.log("RAW AI RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data?.error?.message || "Groq API failed");
    }

    const text = data?.choices?.[0]?.message?.content;

    return text || "Mood: Unknown\nSummary: No summary";
  } catch (error) {
    console.error("AI ERROR:", error);
    return "Mood: Error\nSummary: Failed";
  }
};