export interface TenantConfig {
  slug: string;               // e.g. "maple-homes"
  name: string;               // e.g. "Maple Homestay Inc."
  logoUrl: string;            // e.g. "https://cdn.yoursite.com/logos/maple.png"
  faviconUrl: string;         // e.g. "https://cdn.yoursite.com/favicons/maple.ico"
  heroText: string;           // e.g. "Welcome home!"
  heroImageUrl: string;       // e.g. "https://cdn.yoursite.com/images/hero.jpg"
  themeColor: string;         // e.g. "#F3F4F6"
  welcomeMessage: string;     // e.g. "Welcome to your home in Canada"
  websiteTitle: string;       // e.g. "Maple Homestays"
  contactEmail?: string;      // e.g. "support@maple.com"
  showNewsletterSignup?: boolean;
}
