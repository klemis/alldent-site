import { Service } from "../types";
import {
  Smile,
  Shield,
  Zap,
  Heart,
  Baby,
  Stethoscope,
  Sparkles,
  Crown,
  Scissors,
  AlertTriangle
} from "lucide-react";

export const services: Service[] = [
  {
    id: "general-dentistry",
    name: "General Dentistry",
    description: "Comprehensive oral health care including routine checkups, cleanings, and preventive treatments to maintain your dental health.",
    benefits: [
      "Regular oral health monitoring",
      "Early problem detection",
      "Professional teeth cleaning",
      "Personalized oral hygiene guidance",
      "Fluoride treatments for cavity prevention"
    ],
    icon: Stethoscope,
    featured: true,
    duration: "30-60 minutes",
    price: "From 150 PLN"
  },
  {
    id: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    description: "Transform your smile with our aesthetic dental treatments including teeth whitening, veneers, and smile makeovers.",
    benefits: [
      "Enhanced smile confidence",
      "Natural-looking results",
      "Stain and discoloration removal",
      "Improved tooth shape and alignment",
      "Long-lasting aesthetic improvements"
    ],
    icon: Sparkles,
    featured: true,
    duration: "1-3 hours",
    price: "From 500 PLN"
  },
  {
    id: "teeth-whitening",
    name: "Professional Teeth Whitening",
    description: "Safe and effective teeth whitening treatments that brighten your smile by several shades in just one visit.",
    benefits: [
      "Immediate visible results",
      "Safe professional-grade whitening",
      "Up to 8 shades whiter",
      "Long-lasting brightness",
      "Comfortable treatment process"
    ],
    icon: Smile,
    featured: true,
    duration: "60-90 minutes",
    price: "From 800 PLN"
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    description: "Replace missing teeth with permanent, natural-looking implants that restore both function and appearance.",
    benefits: [
      "Permanent tooth replacement",
      "Natural look and feel",
      "Preserves jawbone health",
      "No damage to adjacent teeth",
      "Improved chewing and speaking"
    ],
    icon: Crown,
    featured: true,
    duration: "2-6 months process",
    price: "From 3500 PLN"
  },
  {
    id: "preventive-care",
    name: "Preventive Care",
    description: "Proactive dental care to prevent problems before they start, including sealants, fluoride treatments, and oral cancer screening.",
    benefits: [
      "Prevents serious dental problems",
      "Cost-effective long-term care",
      "Early disease detection",
      "Maintains optimal oral health",
      "Reduces need for complex treatments"
    ],
    icon: Shield,
    featured: false,
    duration: "30-45 minutes",
    price: "From 100 PLN"
  },
  {
    id: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    description: "Gentle, child-friendly dental care designed to create positive experiences and healthy habits for young patients.",
    benefits: [
      "Child-friendly environment",
      "Gentle, patient approach",
      "Education on proper oral hygiene",
      "Early intervention for problems",
      "Building positive dental experiences"
    ],
    icon: Baby,
    featured: false,
    duration: "30-45 minutes",
    price: "From 120 PLN"
  },
  {
    id: "root-canal",
    name: "Root Canal Therapy",
    description: "Save infected or severely damaged teeth with our gentle, pain-free root canal treatments using modern techniques.",
    benefits: [
      "Saves your natural tooth",
      "Eliminates tooth pain",
      "Prevents spread of infection",
      "Modern pain-free techniques",
      "High success rate"
    ],
    icon: Heart,
    featured: false,
    duration: "60-90 minutes",
    price: "From 600 PLN"
  },
  {
    id: "emergency-care",
    name: "Emergency Dental Care",
    description: "Immediate relief for dental emergencies including severe pain, broken teeth, and urgent dental problems.",
    benefits: [
      "Same-day emergency appointments",
      "Immediate pain relief",
      "Expert emergency treatment",
      "Available outside regular hours",
      "Comprehensive emergency care"
    ],
    icon: AlertTriangle,
    featured: false,
    duration: "30-120 minutes",
    price: "From 200 PLN"
  },
  {
    id: "oral-surgery",
    name: "Oral Surgery",
    description: "Advanced surgical procedures including wisdom tooth extraction, jaw surgery, and complex dental extractions.",
    benefits: [
      "Expert surgical care",
      "Minimally invasive techniques",
      "Comprehensive pain management",
      "Fast healing protocols",
      "Post-operative support"
    ],
    icon: Scissors,
    featured: false,
    duration: "30-180 minutes",
    price: "From 300 PLN"
  }
];

// Featured services for homepage display
export const featuredServices = services.filter(service => service.featured);

// Service categories for organization
export const serviceCategories = [
  {
    name: "Preventive Care",
    services: services.filter(s => ['general-dentistry', 'preventive-care'].includes(s.id))
  },
  {
    name: "Cosmetic Treatments",
    services: services.filter(s => ['cosmetic-dentistry', 'teeth-whitening'].includes(s.id))
  },
  {
    name: "Restorative Care",
    services: services.filter(s => ['dental-implants', 'root-canal'].includes(s.id))
  },
  {
    name: "Specialized Care",
    services: services.filter(s => ['pediatric-dentistry', 'emergency-care', 'oral-surgery'].includes(s.id))
  }
];
