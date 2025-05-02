export interface TenantConfig {
    slug: string;               // e.g., "maple-homes"
    name: string;               // e.g., "Maple Homestay Inc."
    logoUrl: string;            // e.g., "https://cdn.yoursite.com/logos/maple.png"
    themeColor: string;         // e.g., "#F3F4F6"
    welcomeMessage: string;     // e.g., "Welcome to your home in Canada"
    featuredHomes: string[];    // array of home IDs or names
    contactEmail?: string;
    showNewsletterSignup?: boolean;
  }
  