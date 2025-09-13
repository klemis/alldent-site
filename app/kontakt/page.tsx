import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Bus,
  Navigation,
  Calendar,
} from "lucide-react";

export const metadata = {
  title: "Kontakt - Alldent Gabinet Stomatologiczny Częstochowa",
  description:
    "Skontaktuj się z Alldent w Częstochowie. Adres, telefon, godziny otwarcia. Umów wizytę online lub telefonicznie.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main id="main-content">
        {/* Header */}
        <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-12 md:py-16">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <Button variant="ghost" asChild className="mb-4">
                  <Link
                    href="/"
                    className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Powrót do strony głównej
                  </Link>
                </Button>

                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Kontakt
                </h1>
                <p className="text-lg text-muted-foreground">
                  Skontaktuj się z nami lub umów wizytę. Jesteśmy tu, aby pomóc
                  w każdej kwestii dotyczącej Twojego zdrowia stomatologicznego.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12 md:py-20">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                {/* Contact Details */}
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold tracking-tighter">
                    Informacje kontaktowe
                  </h2>

                  <div className="space-y-6">
                    {/* Address */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-3 text-lg">
                          <MapPin className="w-5 h-5 text-primary" />
                          Adres gabinetu
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="font-medium">
                          Alldent - Gabinet Stomatologiczny
                        </p>
                        <p className="text-muted-foreground">
                          ul. Sabinowska 8
                          <br />
                          42-200 Częstochowa
                        </p>
                        <div className="pt-2">
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href="https://www.google.com/maps/search/?api=1&query=ul.+Sabinowska+8+Częstochowa"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                              <Navigation className="w-4 h-4 mr-2" />
                              Otwórz w mapach
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Phone */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-3 text-lg">
                          <Phone className="w-5 h-5 text-primary" />
                          Telefon
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="font-medium">
                            Rejestracja i informacje:
                          </p>
                          <a
                            href="tel:+48123456789"
                            aria-label="Zadzwoń do gabinetu - +48 123 456 789"
                            className="text-lg font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
                          >
                            +48 123 456 789
                          </a>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Email */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-3 text-lg">
                          <Mail className="w-5 h-5 text-primary" />
                          Email
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <a
                          href="mailto:kontakt@Alldent-czestochowa.pl"
                          className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
                        >
                          kontakt@Alldent-czestochowa.pl
                        </a>
                      </CardContent>
                    </Card>

                    {/* Opening Hours */}
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-3 text-lg">
                          <Clock className="w-5 h-5 text-primary" />
                          Godziny otwarcia
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Poniedziałek - Piątek:</span>
                            <span className="font-medium">8:00 - 20:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sobota:</span>
                            <span className="font-medium">9:00 - 15:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Niedziela:</span>
                            <span className="text-muted-foreground">
                              zamknięte
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Map and Transport */}
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold tracking-tighter">
                    Lokalizacja
                  </h2>

                  {/* Google Maps */}
                  <Card>
                    <CardContent className="p-0">
                      <div className="aspect-[4/3] rounded-t-lg overflow-hidden">
                        <iframe
                          src="https://maps.google.com/maps?q=ul.+Sabinowska+8,+Częstochowa,+Poland&t=&z=16&ie=UTF8&iwloc=&output=embed"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Interaktywna mapa pokazująca lokalizację gabinetu AllDent przy ulicy Sabinowskiej 8 w Częstochowie"
                          aria-label="Mapa z lokalizacją gabinetu stomatologicznego AllDent"
                        ></iframe>
                      </div>
                      <div className="p-4">
                        <Button variant="outline" className="w-full" asChild>
                          <a
                            href="https://www.google.com/maps/search/?api=1&query=ul.+Sabinowska+8+Częstochowa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          >
                            <Navigation className="w-4 h-4 mr-2" />
                            Wyznacz trasę
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Transport */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Jak do nas dotrzeć?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Car className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Samochodem</p>
                          <p className="text-sm text-muted-foreground">
                            Darmowy parking dla pacjentów. Wjazd od ul.
                            Sabinowskiej.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Bus className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">
                            Komunikacją miejską
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Przystanek &ldquo;Przykładowa&rdquo; - linie
                            autobusowe: 12, 15, 23
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Online Booking Section */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-4xl mx-auto">
                <div className="text-center space-y-4 mb-8">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                    Umów wizytę online
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Skorzystaj z wygodnego systemu rezerwacji online dostępnego
                    24/7
                  </p>
                </div>

                {/* ZnanyLekarz Widget Placeholder */}
                <Card className="bg-white">
                  <CardContent className="p-8">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Calendar className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">
                        Widget rezerwacji ZnanyLekarz
                      </h3>
                      <p className="text-muted-foreground">
                        Tutaj zostanie umieszczony widget ZnanyLekarz
                        umożliwiający rezerwację wizyt online. Widget będzie
                        zintegrowany z systemem zarządzania terminami gabinetu.
                      </p>

                      {/* Placeholder for actual widget implementation */}
                      <div className="bg-slate-100 p-8 rounded-lg border-2 border-dashed border-slate-300">
                        <p className="text-sm text-slate-600 italic">
                          [Miejsce na widget ZnanyLekarz]
                          <br />
                          Integracja wymaga wstawienia kodu HTML z panelu
                          ZnanyLekarz
                        </p>
                      </div>

                      <div className="pt-4">
                        <Button size="lg" asChild>
                          <a
                            href="https://www.znanylekarz.pl"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          >
                            <Calendar className="w-5 h-5 mr-2" />
                            Przejdź do ZnanyLekarz
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Alternative Contact Methods */}
        <section className="py-12 md:py-16">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-2xl mx-auto text-center space-y-8">
                <h2 className="text-2xl font-bold tracking-tighter">
                  Inne sposoby kontaktu
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href="tel:+48123456789"
                      aria-label="Zadzwoń do gabinetu - +48 123 456 789"
                      className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Zadzwoń teraz
                    </a>
                  </Button>

                  <Button size="lg" variant="outline" asChild>
                    <a
                      href="mailto:kontakt@Alldent-czestochowa.pl"
                      className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Napisz email
                    </a>
                  </Button>
                </div>

                <div className="pt-4 text-sm text-muted-foreground space-y-2">
                  <p>
                    <strong>Czas odpowiedzi na email:</strong> do 24 godzin w
                    dni robocze
                  </p>
                  <p>
                    <strong>Potwierdzenie wizyty:</strong> SMS lub telefon dzień
                    przed wizytą
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
