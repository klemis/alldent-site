import { LucideIcon } from "lucide-react";

/**
 * Service content model for dental services
 */
export interface Service {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
  featured: boolean;
}

/**
 * Team member model for dental staff
 */
export interface TeamMember {
  name: string;
  title: string;
  qualifications: string;
  bio: string;
  image: string;
  specialties: string[];
  experience?: string;
  languages?: string[];
}

/**
 * Contact information structure
 */
export interface ContactInfo {
  phone: string;
  emergencyPhone: string;
  email: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

/**
 * Gallery image structure
 */
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'office' | 'equipment' | 'before-after' | 'team';
  caption?: string;
}

/**
 * Navigation item structure
 */
export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
}

/**
 * Testimonial structure
 */
export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

/**
 * FAQ item structure
 */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'procedures' | 'insurance' | 'emergency';
}

/**
 * SEO metadata structure
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}
