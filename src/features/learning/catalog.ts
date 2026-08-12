import type {
  Activity,
  Course,
  Language,
  LearningPath,
  Lesson,
  Module,
} from "@/types/learning";

export const languages: Language[] = [
  {
    id: "english",
    code: "en",
    name: "English",
    nativeName: "English",
    isActive: true,
  },
  {
    id: "korean",
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    isActive: false,
  },
  {
    id: "french",
    code: "fr",
    name: "French",
    nativeName: "Français",
    isActive: false,
  },
  {
    id: "vietnamese",
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    isActive: false,
  },
];

export const learningPaths: LearningPath[] = [
  {
    id: "english-singapore-cafe-owner",
    languageId: "english",
    goal: "travel",
    title: "English for Café Owner in Singapore",
    description:
      "Practical English for a café owner preparing to travel, communicate, and operate in Singapore.",
    isActive: true,
  },
];

export const courses: Course[] = [
  {
    id: "english-cafe-beginner",
    pathId: "english-singapore-cafe-owner",
    title: "English for Café",
    description:
      "A practical beginner course focused on real café situations.",
    level: "Beginner",
    order: 1,
    isActive: true,
  },
];

export const modules: Module[] = [
  {
    id: "cafe-customers",
    courseId: "english-cafe-beginner",
    title: "Meeting Customers",
    description: "Greetings, introductions, and basic customer interaction.",
    order: 1,
    isActive: true,
  },
  {
    id: "cafe-orders",
    courseId: "english-cafe-beginner",
    title: "Taking Orders",
    description: "Understand and respond to customer orders.",
    order: 2,
    isActive: true,
  },
  {
    id: "cafe-coffee-food",
    courseId: "english-cafe-beginner",
    title: "Coffee & Food",
    description: "Talk about coffee, food, ingredients, and recommendations.",
    order: 3,
    isActive: true,
  },
  {
    id: "cafe-payment",
    courseId: "english-cafe-beginner",
    title: "Payment",
    description: "Handle prices, payment, receipts, and basic transactions.",
    order: 4,
    isActive: true,
  },
  {
    id: "cafe-problems",
    courseId: "english-cafe-beginner",
    title: "Customer Problems",
    description: "Handle questions, mistakes, complaints, and solutions.",
    order: 5,
    isActive: true,
  },
  {
    id: "cafe-small-talk",
    courseId: "english-cafe-beginner",
    title: "Small Talk",
    description: "Have simple and natural conversations with customers.",
    order: 6,
    isActive: true,
  },
];

export const lessons: Lesson[] = [
  {
    id: "lesson-greeting-customers",
    moduleId: "cafe-customers",
    title: "Greeting Customers",
    description: "Learn how to welcome customers naturally.",
    order: 1,
    activities: [],
    isActive: true,
  },
  {
    id: "lesson-taking-an-order",
    moduleId: "cafe-orders",
    title: "Taking an Order",
    description: "Practice taking a simple café order.",
    order: 1,
    activities: [],
    isActive: true,
  },
];

export const activities: Activity[] = [
  {
    id: "greeting-vocabulary-01",
    lessonId: "lesson-greeting-customers",
    type: "vocabulary",
    title: "Welcome",
    instructions: "Learn this useful word for welcoming customers.",
    order: 1,
    isRequired: true,
    content: {
      kind: "vocabulary",
      word: "welcome",
      meaning: "chào mừng",
      example: "Welcome to our café.",
      pronunciation: "WEL-kəm",
    },
  },
  {
    id: "greeting-vocabulary-02",
    lessonId: "lesson-greeting-customers",
    type: "vocabulary",
    title: "Customer",
    instructions: "Learn this word for a person who buys something.",
    order: 2,
    isRequired: true,
    content: {
      kind: "vocabulary",
      word: "customer",
      meaning: "khách hàng",
      example: "The customer is waiting for an order.",
      pronunciation: "KUS-tə-mər",
    },
  },
  {
    id: "greeting-listening-01",
    lessonId: "lesson-greeting-customers",
    type: "listening",
    title: "Listen and Understand",
    instructions: "Read the sentence and practice listening to it.",
    order: 3,
    isRequired: true,
    content: {
    kind: "listening",
    transcript: "Good morning. Welcome to our café.",
    audioUrl: "/audio/lessons/greeting-01.mp3",
    },
  },
  {
    id: "greeting-speaking-01",
    lessonId: "lesson-greeting-customers",
    type: "speaking",
    title: "Say It",
    instructions: "Practice saying this sentence aloud.",
    order: 4,
    isRequired: true,
    content: {
      kind: "speaking",
      prompt: "Good morning. Welcome to our café.",
      expectedAnswer: "Good morning. Welcome to our café.",
    },
  },
  {
    id: "greeting-practice-01",
    lessonId: "lesson-greeting-customers",
    type: "practice",
    title: "Choose the Correct Word",
    instructions: "Complete the sentence with the correct word.",
    order: 5,
    isRequired: true,
    content: {
      kind: "practice",
      question: "_____ to our café.",
      options: ["Welcome", "Customer", "Order"],
      answer: "Welcome",
    },
  },
];

export function getLessonActivities(lessonId: string) {
  return activities
    .filter((activity) => activity.lessonId === lessonId)
    .sort((a, b) => a.order - b.order);
}