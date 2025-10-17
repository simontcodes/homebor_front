export interface BedroomInput {
  size: string;
  bed_type: string;
}

export interface ResidentInput {
  full_name: string;
  age: number | string;
  occupation: string;
  // Frontend may keep File separately; keep optional for metadata-only cases
  background_check?: File | null;
}

export interface NewHomePayload {
  phone: string;
  address: string;

  pets: string;
  food_service: string;
  special_diet: string;
  age_preference: string;
  gender_preference: string;

  room_count: number;
  bedrooms: BedroomInput[];

  residents: ResidentInput[];

  signatureDataUrl?: string; // base64 data URL
}
