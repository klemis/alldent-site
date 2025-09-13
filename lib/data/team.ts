import { TeamMember } from "@/lib/types";

export const teamMembers: TeamMember[] = [
  {
    name: "Dr Anna Kowalska",
    title: "Lekarz dentysta, właścicielka gabinetu",
    qualifications: "Absolwentka Warszawskiego Uniwersytetu Medycznego",
    bio: "Ponad 15 lat doświadczenia w stomatologii zachowawczej i estetycznej. Specjalizuje się w leczeniu kanałowym oraz rekonstrukcjach estetycznych. Regularnie uczestniczy w kursach doskonalących, aby oferować pacjentom najnowocześniejsze metody leczenia.",
    image: "/images/team/dr-anna-kowalska.jpg",
    specialties: [
      "Stomatologia zachowawcza",
      "Leczenie kanałowe",
      "Stomatologia estetyczna",
      "Rekonstrukcje kompozytowe"
    ],
    experience: "15+ lat",
    languages: ["Polski", "Angielski"]
  },
  {
    name: "Dr Michał Nowak",
    title: "Lekarz dentysta, chirurg stomatologiczny",
    qualifications: "Specjalista chirurgii stomatologicznej, Uniwersytet Śląski",
    bio: "Doktor z wieloletnim doświadczeniem w chirurgii stomatologicznej i implantologii. Wykonuje zabiegi implantologiczne oraz chirurgię okresową. Znany z delikatnego podejścia do pacjentów i bezbolesnych zabiegów.",
    image: "/images/team/dr-michal-nowak.jpg",
    specialties: [
      "Chirurgia stomatologiczna",
      "Implantologia",
      "Usuwanie zębów",
      "Chirurgia periodontalna"
    ],
    experience: "12+ lat",
    languages: ["Polski", "Niemiecki"]
  },
  {
    name: "Dr Katarzyna Wiśniewska",
    title: "Lekarz dentysta, specjalista stomatologii dziecięcej",
    qualifications: "Specjalizacja w stomatologii dziecięcej, Uniwersytet Jagielloński",
    bio: "Pasjonatka pracy z dziećmi, która potrafi stworzyć przyjazną atmosferę podczas wizyt. Specjalizuje się w leczeniu zębów mlecznych oraz profilaktyce próchnicy u najmłodszych pacjentów.",
    image: "/images/team/dr-katarzyna-wisniewska.jpg",
    specialties: [
      "Stomatologia dziecięca",
      "Profilaktyka próchnicy",
      "Leczenie zębów mlecznych",
      "Edukacja higieniczna dzieci"
    ],
    experience: "8+ lat",
    languages: ["Polski", "Angielski"]
  },
  {
    name: "Aleksandra Mazur",
    title: "Higienistka stomatologiczna",
    qualifications: "Certyfikowana higienistka stomatologiczna",
    bio: "Doświadczona higienistka, która dba o kompleksową profilaktykę stomatologiczną naszych pacjentów. Prowadzi profesjonalne czyszczenie zębów oraz edukuje pacjentów w zakresie prawidłowej higieny jamy ustnej.",
    image: "/images/team/aleksandra-mazur.jpg",
    specialties: [
      "Higiena stomatologiczna",
      "Usuwanie kamienia nazębnego",
      "Fluoryzacja",
      "Instruktaż higieny"
    ],
    experience: "6+ lat",
    languages: ["Polski"]
  }
];
