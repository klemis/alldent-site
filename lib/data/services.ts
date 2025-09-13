import {
  Shield,
  Sparkles,
  Wrench,
  Stethoscope,
  Heart,
  Crown,
  UserCheck,
  Phone,
} from "lucide-react";
import { Service } from "@/lib/types";

export const services: Service[] = [
  // Preventive Care
  {
    id: "general-checkup",
    name: "Badanie ogólne",
    description:
      "Kompleksowe badanie stomatologiczne z oceną stanu zdrowia jamy ustnej i planem leczenia",
    benefits: [
      "Wczesne wykrycie problemów",
      "Profesjonalna ocena stanu uzębienia",
      "Indywidualny plan leczenia",
      "Porady dotyczące higieny",
    ],
    icon: Shield,
    featured: true,
    duration: "30 min",
    price: "120 zł",
  },
  {
    id: "cleaning",
    name: "Higiena stomatologiczna",
    description:
      "Profesjonalne usuwanie kamienia nazębnego i płytki bakteryjnej",
    benefits: [
      "Usunięcie kamienia i płytki",
      "Polerowanie zębów",
      "Fluoryzacja",
      "Instruktaż higieny",
    ],
    icon: Sparkles,
    featured: true,
    duration: "45 min",
    price: "180 zł",
  },
  {
    id: "fluoride-treatment",
    name: "Fluoryzacja",
    description: "Wzmacnianie szkliwa zębowego preparatami fluoru",
    benefits: [
      "Wzmocnienie szkliwa",
      "Ochrona przed próchnicą",
      "Zmniejszenie wrażliwości",
      "Długotrwały efekt ochronny",
    ],
    icon: Shield,
    featured: false,
    duration: "15 min",
    price: "80 zł",
  },

  // Cosmetic Treatments
  {
    id: "teeth-whitening",
    name: "Wybielanie zębów",
    description: "Profesjonalne wybielanie zębów metodą nakładkową lub lampową",
    benefits: [
      "Zęby jaśniejsze o 2-8 tonów",
      "Bezpieczna metoda",
      "Długotrwały efekt",
      "Naturalny wygląd",
    ],
    icon: Sparkles,
    featured: true,
    duration: "90 min",
    price: "800 zł",
  },
  {
    id: "veneers",
    name: "Licówki porcelanowe",
    description: "Cienkie płatki porcelany nakładane na przednie zęby",
    benefits: [
      "Idealny kształt i kolor",
      "Długotrwałość",
      "Naturalny wygląd",
      "Minimalna inwazyjność",
    ],
    icon: Crown,
    featured: true,
    duration: "120 min",
    price: "1200 zł/ząb",
  },
  {
    id: "bonding",
    name: "Rekonstrukcja kompozytowa",
    description: "Odbudowa ubytków zębów materiałem kompozytowym",
    benefits: [
      "Przywrócenie kształtu",
      "Dopasowanie koloru",
      "Jeden zabieg",
      "Oszczędność tkanek",
    ],
    icon: Wrench,
    featured: false,
    duration: "60 min",
    price: "300 zł",
  },

  // Restorative Care
  {
    id: "dental-implants",
    name: "Implanty stomatologiczne",
    description: "Trwałe zastąpienie utraconych zębów implantami tytanowymi",
    benefits: [
      "Trwałe rozwiązanie",
      "Zachowanie kości",
      "Komfort użytkowania",
      "Naturalny wygląd",
    ],
    icon: Wrench,
    featured: true,
    duration: "90 min",
    price: "3500 zł",
  },
  {
    id: "root-canal",
    name: "Leczenie kanałowe",
    description:
      "Usuwanie martwej miazgi i leczenie zakażonych kanałów korzeniowych",
    benefits: [
      "Zachowanie zęba",
      "Eliminacja bólu",
      "Trwałe rozwiązanie",
      "Nowoczesne techniki",
    ],
    icon: Heart,
    featured: false,
    duration: "90 min",
    price: "600 zł",
  },
  {
    id: "crowns",
    name: "Korony protetyczne",
    description: "Odbudowa mocno uszkodzonych zębów koronami ceramicznymi",
    benefits: [
      "Przywrócenie funkcji",
      "Estetyczny wygląd",
      "Długotrwałość",
      "Wzmocnienie zęba",
    ],
    icon: Crown,
    featured: false,
    duration: "120 min",
    price: "1000 zł",
  },

  // Specialized Care
  {
    id: "pediatric",
    name: "Stomatologia dziecięca",
    description: "Specialized dental care dla dzieci w przyjaznej atmosferze",
    benefits: [
      "Łagodne podejście",
      "Nauka higieny",
      "Profilaktyka próchnicy",
      "Pozytywne skojarzenia",
    ],
    icon: UserCheck,
    featured: true,
    duration: "45 min",
    price: "150 zł",
  },
  {
    id: "emergency",
    name: "Stomatologia pilne przypadki",
    description: "Natychmiastowa pomoc w nagłych przypadkach bólowych",
    benefits: [
      "Dostępność 24/7",
      "Szybkie uśmierzenie bólu",
      "Profesjonalna diagnoza",
      "Pilne interwencje",
    ],
    icon: Phone,
    featured: false,
    duration: "30 min",
    price: "200 zł",
  },
  {
    id: "oral-surgery",
    name: "Chirurgia stomatologiczna",
    description: "Zabiegi chirurgiczne w obrębie jamy ustnej",
    benefits: [
      "Usuwanie zębów",
      "Zabiegi periodontologiczne",
      "Nowoczesny sprzęt",
      "Minimalna inwazyjność",
    ],
    icon: Stethoscope,
    featured: false,
    duration: "60 min",
    price: "400 zł",
  },
];

export const serviceCategories = {
  preventive: {
    name: "Stomatologia zachowawcza",
    description: "Profilaktyka i podstawowa opieka stomatologiczana",
    services: services.filter((s) =>
      ["general-checkup", "cleaning", "fluoride-treatment"].includes(s.id),
    ),
  },
  cosmetic: {
    name: "Stomatologia estetyczna",
    description: "Zabiegi poprawiające wygląd uśmiechu",
    services: services.filter((s) =>
      ["teeth-whitening", "veneers", "bonding"].includes(s.id),
    ),
  },
  restorative: {
    name: "Stomatologia odtwórcza",
    description: "Odbudowa i zastępowanie utraconych zębów",
    services: services.filter((s) =>
      ["dental-implants", "root-canal", "crowns"].includes(s.id),
    ),
  },
  specialized: {
    name: "Stomatologia specjalistyczna",
    description: "Specjalistyczna opieka dla różnych grup pacjentów",
    services: services.filter((s) =>
      ["pediatric", "emergency", "oral-surgery"].includes(s.id),
    ),
  },
};

export const featuredServices = services.filter((service) => service.featured);
