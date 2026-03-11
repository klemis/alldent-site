import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Phone, CheckCircle } from "lucide-react";
import { FadeInOnScroll } from "@/components/motion";
import { ZnanyLekarzWidget } from "@/components/znanylekarz-widget";

export const metadata = {
  title: "Umów wizytę online - Alldent Częstochowa",
  description:
    "Umów wizytę w Alldent Częstochowa online przez ZnanyLekarz lub telefonicznie. Dostępne terminy, łatwa rezerwacja.",
};

export default function BookAppointmentPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main id="main-content">
        {/* Header */}
        <section className="bg-gradient-to-br from-amber-50/40 to-teal-50/60 py-12 md:py-16">
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
                  Umów wizytę
                </h1>
                <p className="text-lg text-muted-foreground">
                  Wybierz najwygodniejszy dla Ciebie sposób umówienia wizyty.
                  Jesteśmy dostępni online 24/7 oraz telefonicznie w godzinach
                  pracy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Options */}
        <section className="py-12 md:py-20">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <FadeInOnScroll>
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Online Booking */}
                <Card className="shadow-lg overflow-hidden">
                  {/* Green header - builds trust */}
                  <div className="bg-green-50 border-b border-green-100 px-6 py-3">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-sm">
                          Zalecany sposób rezerwacji
                        </span>
                        <span className="hidden sm:inline text-sm">
                          {" "}
                          - Zarezerwuj termin w 30 sekund i otrzymaj
                          natychmiastowe potwierdzenie SMS
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* White body with instructional text */}
                  <div className="p-6 space-y-6">
                    <p className="text-center text-muted-foreground">
                      Wybierz specjalizację poniżej, aby odsłonić wolne terminy
                    </p>

                    {/* ZnanyLekarz Widget - seamless integration */}
                    <ZnanyLekarzWidget type="facility-calendar" />
                  </div>
                </Card>

                {/* Phone Booking */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <Phone className="w-6 h-6 text-primary" />
                      Rezerwacja telefoniczna
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Preferujesz osobisty kontakt? Zadzwoń do nas w godzinach
                      pracy i umów wizytę bezpośrednio z naszą recepcjonistką.
                    </p>

                    <div className="space-y-3">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">
                          Zadzwoń teraz
                        </p>
                        <a
                          href="tel:+48663333787"
                          aria-label="Zadzwoń do gabinetu - +48 663 333 787"
                          className="text-2xl font-bold text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
                        >
                          +48 663 333 787
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* RTG Booking */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <Phone className="w-6 h-6 text-primary" />
                      Badanie RTG
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Umów się na badanie RTG online. Nasz gabinet wyposażony jest
                      w tomograf CBCT z przystawką cefalometryczną.
                    </p>
                    <ZnanyLekarzWidget type="rtg-calendar" />
                  </CardContent>
                </Card>
              </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* Booking Tips */}
        <section className="py-12 md:py-16 bg-stone-50">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <FadeInOnScroll>
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-8">
                  Przydatne informacje przed wizytą
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pierwsza wizyta</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p>• Przyjdź 10 minut wcześniej na rejestrację</p>
                      <p>• Przynieś dowód tożsamości</p>
                      <p>• Przygotuj listę przyjmowanych leków</p>
                      <p>• Poinformuj o alergiach i schorzeniach</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Przygotowanie do zabiegu
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p>• Zjedz lekki posiłek przed wizytą</p>
                      <p>• Umyj zęby i użyj nici dentystycznej</p>
                      <p>• Unikaj alkoholu 24h przed zabiegiem</p>
                      <p>• W razie pytań - zadzwoń wcześniej</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Odwołanie wizyty
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p>• Powiadom nas minimum 24h wcześniej</p>
                      <p>• Skorzystaj ze ZnanyLekarz lub zadzwoń</p>
                      <p>• Pomożemy znaleźć nowy termin</p>
                      <p>• Szanujemy Twój czas - szanuj nasz</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Formy płatności</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <p>• Gotówka</p>
                      <p>• Karty płatnicze</p>
                      <p>• BLIK</p>
                      {/*<p>• Płatności ratalne (dla dużych zabiegów)</p>*/}
                    </CardContent>
                  </Card>
                </div>
              </div>
              </FadeInOnScroll>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
