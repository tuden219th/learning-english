export type LanguageCode =
  | "en"
  | "ko"
  | "fr"
  | "vi";

export type LearningGoal =
  | "travel"
  | "career"
  | "business"
  | "academic"
  | "study-abroad"
  | "daily-life"
  | "specific-purpose";

export type EducationLevel =
  | "pre-school"
  | "primary"
  | "secondary"
  | "high-school"
  | "university"
  | "postgraduate"
  | "general";

export type ActivityType =
  | "vocabulary"
  | "listening"
  | "speaking"
  | "reading"
  | "writing"
  | "grammar"
  | "practice"
  | "ai-conversation";

export interface Language {
  id: string;
  code: LanguageCode;
  name: string;
  nativeName: string;
  isActive: boolean;
}

export interface LearningPath {
  id: string;
  languageId: string;
  goal: LearningGoal;
  title: string;
  description: string;
  educationLevel?: EducationLevel;
  isActive: boolean;
}

export interface Course {
  id: string;
  pathId: string;
  title: string;
  description: string;
  level: string;
  order: number;
  isActive: boolean;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  order: number;
  activities: Activity[];
  isActive: boolean;
}

export interface Activity {
  id: string;
  lessonId: string;
  type: ActivityType;
  title: string;
  instructions: string;
  order: number;
  content: ActivityContent;
  isRequired: boolean;
}

export type ActivityContent =
  | VocabularyContent
  | ListeningContent
  | SpeakingContent
  | PracticeContent
  | GenericActivityContent;

export interface VocabularyContent {
  kind: "vocabulary";
  word: string;
  meaning: string;
  example: string;
  pronunciation?: string;
}

export interface ListeningContent {
  kind: "listening";
  transcript: string;
  audioUrl?: string;
}

export interface SpeakingContent {
  kind: "speaking";
  prompt: string;
  expectedAnswer?: string;
}

export interface PracticeContent {
  kind: "practice";
  question: string;
  options?: string[];
  answer?: string;
}

export interface GenericActivityContent {
  kind: "generic";
  text?: string;
}