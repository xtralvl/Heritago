export const Pages = [
    "home",
    "search",
    "details",
    "my-account",
    "personal-details",
    "security-settings",
    "customization-preferences",
    "saved-destinations",
    "about",
    "help",
    "faq",
    "newsletter",
  ] as const;
  
  export type Pages = typeof Pages[number];