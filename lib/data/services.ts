import {
  Shield,
  Sparkles,
  Wrench,
  Stethoscope,
  Heart,
  Crown,
  UserCheck,
  Smile,
  Zap,
  Syringe,
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
    featured: false,
  },
  {
    id: "orthodontics",
    name: "Ortodoncja",
    description:
      "Cyfrowa ortodoncja dla dzieci i dorosłych - aparaty stałe, ruchome i nakładki ortodontyczne z wykorzystaniem skanera wewnątrzustnego i cyfrowej mapy okluzji",
    benefits: [
      "Cyfrowy wycisk zamiast tradycyjnych",
      "Bezpłatny przegląd dla pacjentów ortodontycznych",
      "Aparaty stałe, ruchome i nakładki",
      "Leczenie dzieci i dorosłych",
    ],
    icon: Smile,
    featured: true,
  },
  {
    id: "cleaning",
    name: "Higiena stomatologiczna",
    description:
      "Profesjonalne czyszczenie zębów przy użyciu najnowocześniejszego sprzętu GBT (Guided Biofilm Therapy) - innowacyjnej metody usuwania biofilmu bakteryjnego i kamienia nazębnego",
    benefits: [
      "Najnowocześniejszy sprzęt GBT",
      "Usunięcie kamienia i płytki bakteryjnej",
      "Polerowanie zębów",
      "Instruktaż higieny",
    ],
    icon: Sparkles,
    featured: true,
  },

  // Cosmetic Treatments
  {
    id: "teeth-whitening",
    name: "Wybielanie zębów",
    description: "Profesjonalne wybielanie zębów metodą nakładkową lub lampą",
    benefits: [
      "Zęby jaśniejsze o 2-8 tonów",
      "Bezpieczna metoda",
      "Długotrwały efekt",
      "Naturalny wygląd",
    ],
    icon: Sparkles,
    featured: true,
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
  },
  {
    id: "bonding",
    name: "Rekonstrukcja kompozytowa (Bonding)",
    description: "Odbudowa ubytków zębów materiałem kompozytowym",
    benefits: [
      "Przywrócenie kształtu",
      "Dopasowanie koloru",
      "Jeden zabieg",
      "Oszczędność tkanek",
    ],
    icon: Wrench,
    featured: false,
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
  },
  {
    id: "root-canal",
    name: "Leczenie kanałowe",
    description:
      "Endodoncja pod mikroskopem - precyzyjne leczenie zakażonych kanałów korzeniowych i zmian okołowierzchołkowych",
    benefits: [
      "Leczenie pod mikroskopem",
      "Leczenie zmian okołowierzchołkowych",
      "Zachowanie zęba",
      "Eliminacja bólu",
    ],
    icon: Heart,
    featured: false,
  },
  {
    id: "crowns",
    name: "Protetyka",
    description:
      "Kompleksowa odbudowa protetyczna: korony, mosty, uzupełnienia protetyczne i protezy dostosowane do indywidualnych potrzeb",
    benefits: [
      "Korony i mosty ceramiczne",
      "Uzupełnienia protetyczne",
      "Protezy dopasowane indywidualnie",
      "Przywrócenie funkcji i estetyki",
    ],
    icon: Crown,
    featured: false,
  },

  // Specialized Care
  {
    id: "pediatric",
    name: "Stomatologia dziecięca",
    description:
      "Specjalistyczna opieka stomatologiczna dla dzieci w przyjaznej atmosferze",
    benefits: [
      "Łagodne podejście",
      "Nauka higieny",
      "Profilaktyka próchnicy",
      "Pozytywne skojarzenia",
    ],
    icon: UserCheck,
    featured: true,
  },
  {
    id: "oral-surgery",
    name: "Chirurgia stomatologiczna",
    description:
      "Nowoczesne zabiegi chirurgiczne w obrębie jamy ustnej z zastosowaniem najnowszych metod",
    benefits: [
      "Usuwanie zębów",
      "Podcinanie wędzidełek",
      "Zabiegi periodontologiczne",
      "Minimalna inwazyjność",
    ],
    icon: Stethoscope,
    featured: false,
  },
  {
    id: "laser-therapy",
    name: "Laseroterapia",
    description:
      "Nowoczesna terapia laserowa: laser diodowy i biostymulacyjny w leczeniu i wspomaganiu gojenia",
    benefits: [
      "Laser diodowy",
      "Laser biostymulacyjny",
      "Przyspieszenie gojenia",
      "Minimalna inwazyjność",
    ],
    icon: Zap,
    featured: false,
  },
  {
    id: "flow-injection",
    name: "Flow injection",
    description:
      "Innowacyjna metoda odbudowy zębów przy użyciu płynnego materiału kompozytowego zapewniającego doskonałą adaptację i estetykę",
    benefits: [
      "Doskonała adaptacja materiału",
      "Wysoka estetyka wypełnień",
      "Minimalna inwazyjność",
      "Długotrwały rezultat",
    ],
    icon: Syringe,
    featured: false,
  },
  {
    id: "implant-prosthetics",
    name: "Implantoprotetyka",
    description:
      "Kompleksowa odbudowa protetyczna na implantach - od pojedynczych koron po pełne uzupełnienia wspomagane implantami",
    benefits: [
      "Korony na implantach",
      "Mosty wspomagane implantami",
      "Protezy na implantach",
      "Trwałe i stabilne rozwiązanie",
    ],
    icon: Wrench,
    featured: false,
  },
  {
    id: "conservative-dentistry",
    name: "Stomatologia zachowawcza",
    description:
      "Kompleksowa opieka zachowawcza - leczenie próchnicy, odbudowy zębów i profilaktyka chorób jamy ustnej",
    benefits: [
      "Leczenie próchnicy",
      "Wypełnienia kompozytowe",
      "Profilaktyka chorób jamy ustnej",
      "Zachowanie naturalnych zębów",
    ],
    icon: Shield,
    featured: false,
  },
];

export const serviceCategories = {
  preventive: {
    name: "Stomatologia zachowawcza",
    description: "Profilaktyka i podstawowa opieka stomatologiczna",
    services: services.filter((s) =>
      ["general-checkup", "cleaning"].includes(s.id),
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
      ["orthodontics", "pediatric", "oral-surgery", "laser-therapy"].includes(
        s.id,
      ),
    ),
  },
};

export const featuredServices = services.filter((service) => service.featured);
