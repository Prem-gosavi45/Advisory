import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

const getAiInstance = () => {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "") {
      throw new Error("GEMINI_API_KEY is missing. Please set it in your .env file or AI Studio secrets.");
    }
    aiInstance = new GoogleGenAI({ apiKey: key });
  }
  return aiInstance;
};

export interface AdvisoryResponse {
  advice: string;
  recommendedPaths: {
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  }[];
  resources: {
    name: string;
    url: string;
  }[];
}

export async function getEducationalAdvice(prompt: string): Promise<AdvisoryResponse> {
  const ai = getAiInstance();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are an expert educational advisor. Provide structured advice for students. Return the response in JSON format.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          advice: { type: Type.STRING, description: "General advisory text" },
          recommendedPaths: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                difficulty: { type: Type.STRING, enum: ["Beginner", "Intermediate", "Advanced"] }
              },
              required: ["title", "description", "difficulty"]
            }
          },
          resources: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                url: { type: Type.STRING }
              },
              required: ["name", "url"]
            }
          }
        },
        required: ["advice", "recommendedPaths", "resources"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Invalid response from advisor");
  }
}

export interface QuizQuestion {
  question: string;
  options: {
    id: string;
    text: string;
  }[];
}

export async function generateQuizQuestions(userData: { selectedClass: string; selectedInterests: string[] }): Promise<QuizQuestion[]> {
  const ai = getAiInstance();
  const prompt = `Generate 5 career aptitude questions for a student in ${userData.selectedClass} class with interests in ${userData.selectedInterests.join(', ')}. 
  Each question should help determine their career fit. 
  Return as a JSON array of objects with 'question' and 'options' (array of {id, text} objects).`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  text: { type: Type.STRING }
                },
                required: ["id", "text"]
              }
            }
          },
          required: ["question", "options"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse Quiz response", e);
    return [
      {
        question: "Do you feel more energized when working...",
        options: [
          { id: "A", text: "With people" },
          { id: "B", text: "With ideas/data" },
          { id: "C", text: "Both equally" }
        ]
      }
    ];
  }
}
