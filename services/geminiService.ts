
import { GoogleGenAI, Type } from "@google/genai";
import { ScriptBreakdown } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const prompt = `
You are an expert film director and script analyst. Your task is to break down a video script into a detailed, scene-by-scene production plan in JSON format. Maintain strict consistency for characters and environments across all scenes.

Analyze the following script and generate a JSON object containing an array of scenes. For each scene, provide:
1.  **scene_number**: An integer for the scene sequence.
2.  **scene_summary**: A brief one-sentence overview of what happens in the scene.
3.  **image_prompt**: A highly detailed, cinematic, and realistic description suitable for an image generation AI. It must be at least 3-5 sentences long. Include specifics on lighting (e.g., 'golden hour lighting casting long shadows'), mood ('tense and suspenseful'), environment, character appearance (ensure faces, costumes, and props are consistent with previous scenes), camera angle (e.g., 'low-angle shot looking up at the character'), and any key actions.
4.  **motion_prompt**: A detailed description of all camera and character movements, at least 3-5 sentences long. Be specific (e.g., 'The camera dollies backward slowly as the character walks towards it, maintaining a medium close-up. A subtle handheld shake adds to the tension.').
5.  **voiceover_prompt**: An array of objects for each line of dialogue. For each line, identify the speaking character, provide the exact dialogue, and infer a suitable 'voice_style' (e.g., 'Whispering, urgent tone', 'Confident, booming voice'). Automatically assign consistent voice characteristics (gender, accent, general tone) to each character throughout the script.
`;

const schema = {
  type: Type.OBJECT,
  properties: {
    scenes: {
      type: Type.ARRAY,
      description: "An array of scene breakdowns.",
      items: {
        type: Type.OBJECT,
        properties: {
          scene_number: {
            type: Type.INTEGER,
            description: "The sequential number of the scene.",
          },
          scene_summary: {
            type: Type.STRING,
            description: "A short overview of what happens in the scene.",
          },
          image_prompt: {
            type: Type.STRING,
            description:
              "A highly detailed cinematic realistic description of the visuals, including lighting, mood, environment, characters, costumes, camera angle, and action. Maintain visual and character consistency across all scenes.",
          },
          motion_prompt: {
            type: Type.STRING,
            description:
              "A detailed description of how the camera and characters move (e.g., camera pans left, close-up on the actor’s face, slow motion, drone shot, emotional tone).",
          },
          voiceover_prompt: {
            type: Type.ARRAY,
            description: "Voice lines for each speaking character.",
            items: {
              type: Type.OBJECT,
              properties: {
                character: {
                  type: Type.STRING,
                  description: "Name of the character or inferred role.",
                },
                dialogue: {
                  type: Type.STRING,
                  description: "The actual line of dialogue.",
                },
                voice_style: {
                  type: Type.STRING,
                  description:
                    "The inferred voice style (e.g., Calm, serious, or emotional tone).",
                },
              },
              required: ["character", "dialogue", "voice_style"],
            },
          },
        },
        required: [
          "scene_number",
          "scene_summary",
          "image_prompt",
          "motion_prompt",
          "voiceover_prompt",
        ],
      },
    },
  },
  required: ["scenes"],
};

export const generateScenePrompts = async (script: string): Promise<ScriptBreakdown> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: `${prompt}\n\n---\n\nSCRIPT:\n\n${script}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating scene prompts:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate scene prompts: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating scene prompts.");
  }
};
