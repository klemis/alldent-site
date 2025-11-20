import Link from "next/link";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
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
                            href="tel:+48663333787"
                            aria-label="Zadzwoń do gabinetu - +48 663 333 787"
                            className="text-lg font-semibold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
                          >
                            +48 663 333 787
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
                          href="mailto:alldent@onet.eu"
                          className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
                        >
                          alldent@onet.eu
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
                            <span>Poniedziałek</span>
                            <span className="font-medium">8:00 - 19:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Wtorek</span>
                            <span className="font-medium">12:00 - 19:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Środa</span>
                            <span className="font-medium">12:00 - 19:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Czwartek</span>
                            <span className="font-medium">8:00 - 19:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Piątek</span>
                            <span className="font-medium">8:00 - 15:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sobota - Niedziela</span>
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
                          title="Interaktywna mapa pokazująca lokalizację gabinetu Alldent przy ulicy Sabinowskiej 8 w Częstochowie"
                          aria-label="Mapa z lokalizacją gabinetu stomatologicznego Alldent"
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
                        <Car className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Samochodem</p>
                          <p className="text-sm text-muted-foreground">
                            Bezpłatny parking dla pacjentów. Wjazd od ul.
                            Sabinowskiej.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Bus className="w-5 h-5 text-accent-foreground mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">
                            Komunikacją miejską
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Przystanek &ldquo;Piastowska&rdquo; - linie
                            autobusowe: 14, 17, 19, 23, 32, 37
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

                {/* ZnanyLekarz Widget */}
                <Card className="bg-white">
                  <CardContent className="p-4 md:p-6">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<a href="https://www.znanylekarz.pl/placowki/alldent-centrum-stomatologiczne-anna-lemisz" data-zl-widget-facility="alldent-centrum-stomatologiczne-anna-lemisz" rel="nofollow" data-placement="inline" data-zlw-type="facility-calendar-listing-with-saas-only">Alldent Centrum Stomatologiczne Anna Lemisz</a><script id="zl-facility-widget" src="https://www.znanylekarz.pl/platform/js/widget.js"></script>`,
                      }}
                    />
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
                      href="tel:+48663333787"
                      aria-label="Zadzwoń do gabinetu - +48 663 333 787"
                      className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Zadzwoń teraz
                    </a>
                  </Button>

                  <Button size="lg" variant="outline" asChild>
                    <a
                      href="mailto:alldent@onet.eu"
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
