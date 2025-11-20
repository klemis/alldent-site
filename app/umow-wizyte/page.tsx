import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Phone, Clock, CheckCircle } from "lucide-react";

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
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Online Booking */}
                <Card className="border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <Calendar className="w-6 h-6 text-primary" />
                      Rezerwacja online przez ZnanyLekarz
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 text-green-700 bg-green-50 p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">
                          Zalecany sposób rezerwacji
                        </p>
                        <p className="text-sm">
                          Dostępny 24/7, natychmiastowe potwierdzenie, widok
                          wolnych terminów
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border bg-background">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: `<a class="zl-facility-url" href="https://www.znanylekarz.pl/placowki/alldent-centrum-stomatologiczne-anna-lemisz" rel="nofollow" data-zlw-facility="alldent-centrum-stomatologiczne-anna-lemisz" data-zlw-type="facility-big-with-saas-only" data-zlw-saas-only="true" data-zlw-a11y-title="Widget umówienia wizyty lekarskiej">Alldent Centrum Stomatologiczne Anna Lemisz</a><script>!function($_x,_s,id){var js,fjs=$_x.getElementsByTagName(_s)[0];if(!$_x.getElementById(id)){js = $_x.createElement(_s);js.id = id;js.src = "//platform.docplanner.com/js/widget.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","zl-widget-s");</script>`,
                        }}
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Dostępność 24/7</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Natychmiastowe potwierdzenie</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Przypomnienia SMS/email</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Możliwość przełożenia wizyty</span>
                      </div>
                    </div>
                  </CardContent>
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

                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <div>
                          <p>
                            <strong>Pon-Pt:</strong> 8:00 - 20:00
                          </p>
                          <p>
                            <strong>Sobota:</strong> 9:00 - 15:00
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Tips */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
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
                      <p>• Skorzystaj z ZnanyLekarz lub zadzwoń</p>
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
                      <p>• Płatności ratalne (dla dużych zabiegów)</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
