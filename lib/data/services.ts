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
  ScanLine,
  HeartPulse,
  Palette,
  Layers,
} from "lucide-react";
import { Service } from "@/lib/types";

export const services: Service[] = [
  // === Profilaktyka ===
  {
    id: "general-checkup",
    name: "Badanie ogólne",
    description:
      "Kompleksowe badanie stomatologiczne z oceną stanu zdrowia jamy ustnej i planem leczenia",
    benefits: [
      "Konsultacja i indywidualny plan leczenia",
      "Wczesne wykrycie próchnicy",
      "Szczegółowa ocena stanu uzębienia",
    ],
    icon: Shield,
  },
  {
    id: "cleaning",
    name: "Higienizacja zębów",
    description:
      "Profesjonalne czyszczenie zębów przy użyciu najnowocześniejszego sprzętu GBT (Guided Biofilm Therapy) - innowacyjnej metody usuwania biofilmu bakteryjnego i kamienia nazębnego",
    benefits: [
      "Najnowocześniejszy sprzęt GBT",
      "Usunięcie kamienia i płytki bakteryjnej",
      "Polerowanie zębów",
      "Instruktaż higieny i edukacja",
    ],
    icon: Sparkles,
  },
  {
    id: "digital-diagnostics",
    name: "Diagnostyka cyfrowa",
    description:
      "Nowoczesna diagnostyka obrazowa z wykorzystaniem najnowszych technologii cyfrowych",
    benefits: [
      "Kontrolne zdjęcia pantomograficzne",
      "CBCT",
      "Badanie kamerą wewnątrzustną i laserem diagnostycznym",
    ],
    icon: ScanLine,
  },

  // === Stomatologia specjalistyczna ===
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
  },
  {
    id: "periodontology",
    name: "Periodontologia",
    description:
      "Diagnostyka i leczenie chorób przyzębia — od gingivitis po zaawansowaną periodontitis",
    benefits: [
      "Leczenie chorób przyzębia",
      "Wzmocnienie i stabilizacja zębów",
      "Zmniejszenie ryzyka chorób ogólnoustrojowych",
      "Redukcja nadwrażliwości szyjek zębowych",
    ],
    icon: HeartPulse,
  },
  {
    id: "pediatric",
    name: "Stomatologia dziecięca",
    description:
      "Specjalistyczna opieka stomatologiczna dla dzieci w przyjaznej atmosferze",
    benefits: [
      "Wizyty adaptacyjne",
      "Indywidualne podejście",
      "Profilaktyka próchnicy",
    ],
    icon: UserCheck,
  },
  {
    id: "oral-surgery",
    name: "Chirurgia stomatologiczna",
    description:
      "Nowoczesne zabiegi chirurgiczne w obrębie jamy ustnej z zastosowaniem najnowszych metod",
    benefits: [
      "Usuwanie zębów",
      "Podcinanie wędzidełek",
      "Minimalna inwazyjność",
    ],
    icon: Stethoscope,
  },
  {
    id: "laser-therapy",
    name: "Laseroterapia",
    description:
      "Nowoczesna terapia laserowa w leczeniu i wspomaganiu gojenia",
    benefits: [
      "Przyspieszenie gojenia po zabiegach",
      "Modelowanie linii dziąseł",
      "Minimalna inwazyjność",
    ],
    icon: Zap,
  },
  {
    id: "root-canal",
    name: "Leczenie kanałowe",
    description:
      "Endodoncja pod mikroskopem - precyzyjne leczenie zakażonych kanałów korzeniowych i zmian okołowierzchołkowych",
    benefits: [
      "Leczenie pod mikroskopem",
      "Leczenie zmian okołowierzchołkowych",
      "Eliminacja bólu",
    ],
    icon: Heart,
  },

  // === Stomatologia estetyczna ===
  {
    id: "bonding",
    name: "Licówki kompozytowe (Bonding)",
    description: "Odbudowa ubytków zębów materiałem kompozytowym",
    benefits: [
      "Przywrócenie kształtu",
      "Dopasowanie koloru",
      "Jeden zabieg",
      "Oszczędność tkanek",
    ],
    icon: Wrench,
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
  },
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
  },
  {
    id: "discoloration-treatment",
    name: "Leczenie przebarwień zębów",
    description:
      "Diagnostyka i leczenie przebarwień zębów pochodzenia wewnętrznego i zewnętrznego — od profesjonalnego czyszczenia po mikroabrazję i wybielanie wewnętrzne",
    benefits: [
      "Indywidualna diagnostyka przyczyn przebarwień",
      "Skuteczne metody dopasowane do rodzaju przebarwienia",
      "Przywrócenie naturalnego koloru zębów",
      "Długotrwały efekt estetyczny",
    ],
    icon: Palette,
  },

  // === Stomatologia odtwórcza ===
  {
    id: "crowns",
    name: "Protetyka",
    description:
      "Kompleksowa odbudowa braków zębowych za pomocą koron, mostów i protez dopasowanych do indywidualnych potrzeb",
    benefits: [
      "Przywrócenie funkcji i estetyki",
      "Odbudowa startych zębów i wysokości zwarcia",
      "Odbudowa zębów po leczeniu kanałowym",
    ],
    icon: Crown,
  },
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
  },
  {
    id: "composite-restorations",
    name: "Odbudowy kompozytowe",
    description:
      "Estetyczna odbudowa uszkodzonych i zniszczonych zębów wysokiej jakości materiałami kompozytowymi z precyzyjnym dopasowaniem koloru i kształtu",
    benefits: [
      "Precyzyjne dopasowanie koloru do naturalnych zębów",
      "Odbudowa ubytków i złamań",
      "Zachowanie maksimum własnych tkanek zęba",
      "Natychmiastowy efekt w jednej wizycie",
    ],
    icon: Layers,
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
  },
];

export const serviceCategories = {
  preventive: {
    name: "Profilaktyka",
    anchor: "profilaktyka",
    description: "Profilaktyka i podstawowa opieka stomatologiczna",
    services: services.filter((s) =>
      ["general-checkup", "cleaning", "digital-diagnostics"].includes(s.id),
    ),
  },
  specialized: {
    name: "Stomatologia specjalistyczna",
    anchor: "specjalistyczna",
    description: "Specjalistyczna opieka dla różnych grup pacjentów",
    services: services.filter((s) =>
      [
        "orthodontics",
        "periodontology",
        "pediatric",
        "oral-surgery",
        "laser-therapy",
        "root-canal",
      ].includes(s.id),
    ),
  },
  cosmetic: {
    name: "Stomatologia estetyczna",
    anchor: "estetyczna",
    description: "Zabiegi poprawiające wygląd uśmiechu",
    services: services.filter((s) =>
      [
        "bonding",
        "veneers",
        "teeth-whitening",
        "discoloration-treatment",
      ].includes(s.id),
    ),
  },
  restorative: {
    name: "Stomatologia odtwórcza",
    anchor: "odtworcza",
    description: "Odbudowa i zastępowanie utraconych zębów",
    services: services.filter((s) =>
      [
        "crowns",
        "dental-implants",
        "composite-restorations",
        "implant-prosthetics",
        "flow-injection",
        "conservative-dentistry",
      ].includes(s.id),
    ),
  },
};
