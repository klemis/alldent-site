export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const SITE_URL = "https://alldent-stomatologia.pl";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "MedicalBusiness"],
  name: "Alldent - Centrum Stomatologiczne",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo/logo.png`,
  image: `${SITE_URL}/images/office/zabki4.png`,
  description:
    "Nowoczesny gabinet stomatologiczny w Częstochowie. Kompleksowa opieka stomatologiczna dla całej rodziny.",
  telephone: "+48663333787",
  email: "alldent@onet.eu",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Sabinowska 8",
    addressLocality: "Częstochowa",
    postalCode: "42-200",
    addressCountry: "PL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.8118,
    longitude: 19.1203,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "08:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Tuesday",
      opens: "12:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Wednesday",
      opens: "12:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "08:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "08:00",
      closes: "15:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/p/Alldent-Centrum-Stomatologiczne-100057586025488",
    "https://www.instagram.com/alldent_stomatologia_lemisz",
    "https://www.znanylekarz.pl/placowki/alldent-centrum-stomatologiczne-anna-lemisz",
  ],
  priceRange: "$$",
  currenciesAccepted: "PLN",
  paymentAccepted: "Cash, Credit Card, BLIK",
  areaServed: {
    "@type": "City",
    name: "Częstochowa",
  },
  medicalSpecialty: [
    "Dentistry",
    "Orthodontics",
    "Pediatric Dentistry",
    "Oral Surgery",
    "Endodontics",
    "Prosthodontics",
  ],
};

export function breadcrumbSchema(
  items: { name: string; href: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}
