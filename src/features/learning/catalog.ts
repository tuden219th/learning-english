import type { Activity, Lesson } from "@/types/learning";

export { languages } from "./data/languages";
export { learningPaths } from "./data/learning-paths";
export { courses } from "./data/courses";
export { modules } from "./data/modules";

export {
  greetingCustomersLesson,
  greetingCustomersActivities,
} from "./data/lessons/greeting-customers";

import {
  greetingCustomersLesson,
  greetingCustomersActivities,
} from "./data/lessons/greeting-customers";

export const lessons: Lesson[] = [
  greetingCustomersLesson,
];

export const activities: Activity[] = [
  ...greetingCustomersActivities,
];

export function getLessonActivities(lessonId: string): Activity[] {
  return activities
    .filter((activity) => activity.lessonId === lessonId)
    .sort((a, b) => a.order - b.order);
}