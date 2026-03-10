import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Shield, Users, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Standardy ochrony małoletnich - Alldent Częstochowa",
  description:
    "Standardy i procedury ochrony małoletnich pacjentów w gabinecie stomatologicznym Alldent w Częstochowie.",
};

export default function ChildProtectionPage() {
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

                <div className="flex items-center justify-center gap-3 mb-4">
                  <Heart className="w-10 h-10 text-primary" />
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ochrona małoletnich pacjentów
                  </h1>
                </div>

                <p className="text-lg text-muted-foreground">
                  Bezpieczeństwo i komfort naszych najmłodszych pacjentów jest
                  dla nas najważniejszy. Stosujemy najwyższe standardy ochrony
                  dzieci podczas wizyt stomatologicznych.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-20">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-4xl mx-auto space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Ogólne zasady bezpieczeństwa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      Wszystkie zabiegi u pacjentów nieletnich odbywają się w
                      obecności rodzica lub opiekuna prawnego
                    </li>
                    <li>
                      Gabinet zabiegowy jest tak zorganizowany, aby rodzic miał
                      stały kontakt wzrokowy z dzieckiem
                    </li>
                    <li>
                      Personel przeszedł szkolenie w zakresie pracy z dziećmi i
                      komunikacji dostosowanej do wieku
                    </li>
                    <li>
                      Stosujemy podejście przyjazne dziecku - wyjaśniamy każdy
                      etap zabiegu w zrozumiały sposób
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Obecność rodziców/opiekunów
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Wymagana obecność:</h4>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>
                        Rodzic lub opiekun prawny musi być obecny podczas wizyty
                        dziecka poniżej 18. roku życia
                      </li>
                      <li>
                        Rodzic ma prawo być obecny w gabinecie zabiegowym podczas
                        wszystkich procedur
                      </li>
                      <li>
                        W przypadku braku możliwości obecności rodzica,
                        wymagane jest pisemne upoważnienie dla innej osoby
                        dorosłej
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Zgoda na leczenie
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      Przed rozpoczęciem leczenia uzyskujemy świadomą zgodę
                      rodzica/opiekuna
                    </li>
                    <li>
                      Szczegółowo wyjaśniamy planowane zabiegi, ich przebieg i
                      możliwe skutki
                    </li>
                    <li>
                      Rodzic ma prawo zadawać pytania i w każdej chwili wycofać
                      zgodę
                    </li>
                    <li>
                      W przypadku zabiegów bardziej skomplikowanych, zgoda jest
                      dokumentowana pisemnie
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Komfort psychiczny dziecka</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    Dbamy o pozytywne doświadczenia wizyt stomatologicznych:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      Stosujemy łagodne podejście i pozytywną komunikację
                    </li>
                    <li>
                      Gabinet jest wyposażony w elementy przyjazne dzieciom
                    </li>
                    <li>
                      Dzieci mogą przynieść ulubioną zabawkę dla komfortu
                    </li>
                    <li>
                      Zabiegi są dostosowane do możliwości psychicznych dziecka
                    </li>
                    <li>
                      W razie potrzeby stosujemy techniki redukcji lęku
                      (sedacja wziewna)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dokumentacja i prywatność</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      Dokumentacja medyczna dzieci jest przechowywana z
                      zachowaniem szczególnej poufności
                    </li>
                    <li>
                      Dostęp do dokumentacji mają tylko upoważnione osoby
                    </li>
                    <li>
                      Informacje o małoletnim pacjencie udostępniamy tylko
                      rodzicom/opiekunom prawnym
                    </li>
                    <li>
                      Stosujemy zasady RODO w zakresie danych osobowych dzieci
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    Reagowanie na niepokojące sytuacje
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    Personel gabinetu jest przeszkolony w zakresie rozpoznawania
                    sygnałów krzywdzenia dzieci:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      W przypadku podejrzenia krzywdzenia dziecka, postępujemy
                      zgodnie z obowiązującymi przepisami prawa
                    </li>
                    <li>
                      Współpracujemy z właściwymi instytucjami w celu ochrony
                      dziecka
                    </li>
                    <li>
                      Dokumentujemy wszelkie niepokojące objawy zgodnie z
                      procedurami medycznymi
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">
                    Pytania lub wątpliwości?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Jeśli mają Państwo jakiekolwiek pytania dotyczące
                    bezpieczeństwa i komfortu Państwa dziecka podczas wizyt w
                    naszym gabinecie, prosimy o kontakt. Chętnie rozwiejemy
                    wszelkie wątpliwości.
                  </p>
                  <Button asChild>
                    <Link href="/kontakt">Skontaktuj się z nami</Link>
                  </Button>
                </CardContent>
              </Card>

              <div className="border-t pt-6 mt-8">
                <h3 className="font-semibold text-lg mb-3">
                  Związane dokumenty
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" asChild>
                    <Link href="/karta-praw-pacjenta">
                      Karta praw pacjenta
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/polityka-prywatnosci">
                      Polityka prywatności
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
