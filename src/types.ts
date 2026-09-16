export type Language = "ml" | "en";
export interface Word {
  text: string;
  x: number;
  y: number;
  meaning_ml: string;
}
export interface Lesson {
  safe: true;
  sentence: string;
  teaching_tokens: string[];
  dimensions: {
    name_ml: string;
    name_en: string;
    meaning_ml?: string;
    meaning_en?: string;
  }[];
  words: Word[];
  focus_word: string;
  insight_ml: string;
  insight_en?: string;
  next_word_options: { text: string; percent: number }[];
  source?: "demo" | "live";
  id?: string;
}
export interface Model {
  name: string;
  displayName: string;
  supportedGenerationMethods: string[];
}
export interface Config {
  key: string;
  remember: boolean;
  models: Model[];
  textModel: string;
  embeddingModel: string;
}
