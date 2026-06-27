import { TeamMember } from "@/lib/types";

// UWAGA: opisy (bio) oraz kwalifikacje większości osób są tymczasowo
// zakomentowane / pominięte — zostaną uzupełnione później.
// Tagi (specialties) zostawione tylko tam, gdzie wynikają wprost ze stanowiska.

export const teamMembers: TeamMember[] = [
  // --- Lekarze ---
  {
    name: "Anna Lemisz",
    title: "Ortodonta, właścicielka centrum",
    image: "/images/team/anna-lemisz.jpg",
    specialties: ["Ortodoncja"],
    // qualifications: "",
    // bio: "",
  },
  {
    name: "Olga Lemisz",
    title: "Lekarz dentysta",
    image: "/images/team/olga-lemisz.jpg",
    specialties: ["Stomatologia ogólna"],
    // qualifications: "",
    // bio: "",
  },
  {
    name: "Daria Kciuk",
    title: "Lekarz dentysta",
    image: "/images/team/daria-kciuk.jpg",
    specialties: ["Stomatologia ogólna"],
    // qualifications: "",
    // bio: "",
  },
  {
    name: "Patrycja Gołdon",
    title: "Endodonta",
    // brak zdjęcia — zostanie dodane później
    specialties: ["Endodoncja"],
    // qualifications: "",
    // bio: "",
  },
  {
    name: "Beata Jeziorska",
    title: "Ortodonta",
    // brak zdjęcia — zostanie dodane później
    specialties: ["Ortodoncja"],
    // qualifications: "",
    // bio: "",
  },
  {
    name: "Marcin Jarmołowicz",
    title: "Lekarz dentysta",
    // brak zdjęcia — zostanie dodane później
    specialties: ["Stomatologia ogólna"],
    // qualifications: "",
    // bio: "",
  },
  {
    name: "Jan Bzdęga",
    title: "Periodontolog",
    image: "/images/team/jan-bzdega.jpg",
    specialties: ["Periodontologia"],
    // qualifications: "",
    // bio: "",
  },
  // --- Higienistki ---
  {
    name: "Anna Zalewska",
    title: "Higienistka stomatologiczna",
    image: "/images/team/anna-zalewska.jpg",
    specialties: ["Higiena stomatologiczna"],
    // qualifications: "",
    // bio: "",
  },
  {
    name: "Magdalena Banach",
    title: "Higienistka stomatologiczna",
    image: "/images/team/magdalena-banach.jpg",
    specialties: ["Higiena stomatologiczna"],
    // qualifications: "",
    // bio: "",
  },
  {
    name: "Elżbieta Stolarska",
    title: "Higienistka stomatologiczna",
    // brak zdjęcia — zostanie dodane później
    specialties: ["Higiena stomatologiczna"],
    // qualifications: "",
    // bio: "",
  },
  // --- Asystentki ---
  {
    name: "Magdalena Mrozińska",
    title: "Asystentka stomatologiczna",
    image: "/images/team/magdalena-mrozinska.jpg",
    specialties: [],
    // qualifications: "",
    // bio: "",
  },
  {
    name: "Marta Trenda",
    title: "Asystentka stomatologiczna",
    image: "/images/team/marta-trenda.jpg",
    specialties: [],
    // qualifications: "",
    // bio: "",
  },
  // --- Rejestracja ---
  {
    name: "Klaudia Nabiałkowska",
    title: "Rejestracja",
    image: "/images/team/klaudia-nabialkowska.jpg",
    specialties: [],
    // qualifications: "",
    // bio: "",
  },
];
