import type { MetadataRoute } from "next";
import {
  courses,
  modules,
  lessons,
} from "@/features/learning/catalog";

const BASE_URL = "https://english.tudencafe.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const coursePages: MetadataRoute.Sitemap = courses
    .filter((course) => course.isActive)
    .map((course) => ({
      url: `${BASE_URL}/course/${course.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

  const modulePages: MetadataRoute.Sitemap = modules
    .filter((module) => module.isActive)
    .map((module) => ({
      url: `${BASE_URL}/module/${module.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const lessonPages: MetadataRoute.Sitemap = lessons
    .filter((lesson) => lesson.isActive)
    .map((lesson) => ({
      url: `${BASE_URL}/lesson/${lesson.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [
    ...staticPages,
    ...coursePages,
    ...modulePages,
    ...lessonPages,
  ];
}