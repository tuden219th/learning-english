import type { Module } from "@/types/learning";

export const modules: Module[] = [
  {
    id: "cafe-customers",
    courseId: "english-cafe-beginner",
    title: "Meeting Customers",
    description:
      "Greetings, introductions, and basic customer interaction.",
    order: 1,
    isActive: true,
  },
  {
    id: "cafe-orders",
    courseId: "english-cafe-beginner",
    title: "Taking Orders",
    description:
      "Understand and respond to customer orders.",
    order: 2,
    isActive: true,
  },
  {
    id: "cafe-coffee-food",
    courseId: "english-cafe-beginner",
    title: "Coffee & Food",
    description:
      "Talk about coffee, food, ingredients, and recommendations.",
    order: 3,
    isActive: true,
  },
  {
    id: "cafe-payment",
    courseId: "english-cafe-beginner",
    title: "Payment",
    description:
      "Handle prices, payment, receipts, and basic transactions.",
    order: 4,
    isActive: true,
  },
  {
    id: "cafe-problems",
    courseId: "english-cafe-beginner",
    title: "Customer Problems",
    description:
      "Handle questions, mistakes, complaints, and solutions.",
    order: 5,
    isActive: true,
  },
  {
    id: "cafe-small-talk",
    courseId: "english-cafe-beginner",
    title: "Small Talk",
    description:
      "Have simple and natural conversations with customers.",
    order: 6,
    isActive: true,
  },
];