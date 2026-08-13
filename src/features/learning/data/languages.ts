import type { Language } from "@/types/learning";

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
