
export interface Voiceover {
  character: string;
  dialogue: string;
  voice_style: string;
}

export interface Scene {
  scene_number: number;
  scene_summary: string;
  image_prompt: string;
  motion_prompt: string;
  voiceover_prompt: Voiceover[];
}

export interface ScriptBreakdown {
  scenes: Scene[];
}
