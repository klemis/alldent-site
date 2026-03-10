import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Lock, Eye, Database } from "lucide-react";

export const metadata = {
  title: "Polityka Prywatności - Alldent Częstochowa",
  description:
    "Polityka prywatności i ochrony danych osobowych w gabinecie stomatologicznym Alldent w Częstochowie. Informacje o RODO.",
};

export default function PrivacyPolicyPage() {
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
                  <Shield className="w-10 h-10 text-primary" />
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Polityka Prywatności
                  </h1>
                </div>

                <p className="text-lg text-muted-foreground">
                  Ochrona danych osobowych pacjentów jest dla nas priorytetem.
                  Poniżej przedstawiamy informacje o przetwarzaniu danych
                  zgodnie z RODO.
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
                    <Database className="w-5 h-5 text-primary" />
                    Administrator danych
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>
                    Administratorem danych osobowych jest gabinet
                    stomatologiczny Alldent:
                  </p>
                  <div className="bg-stone-50 p-4 rounded-lg text-sm">
                    <p>
                      <strong>Alldent</strong>
                    </p>
                    <p>ul. Sabinowska 8</p>
                    <p>42-200 Częstochowa</p>
                    <p className="mt-2">
                      Kontakt:{" "}
                      <a
                        href="mailto:alldent@onet.eu"
                        className="text-primary hover:underline"
                      >
                        alldent@onet.eu
                      </a>
                    </p>
                    <p>Tel: +48 663 333 787</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Cel i podstawa przetwarzania danych
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      Dane przetwarzamy w celu:
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>
                        Udzielania świadczeń stomatologicznych (podstawa prawna:
                        art. 6 ust. 1 lit. c RODO)
                      </li>
                      <li>
                        Prowadzenia dokumentacji medycznej (podstawa prawna:
                        przepisy ustawy o prawach pacjenta)
                      </li>
                      <li>
                        Kontaktu z pacjentami - przypomnienia o wizytach
                        (podstawa prawna: zgoda - art. 6 ust. 1 lit. a RODO)
                      </li>
                      <li>
                        Rozliczeń finansowych (podstawa prawna: art. 6 ust. 1
                        lit. b RODO)
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    Zakres przetwarzanych danych
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>Przetwarzamy następujące kategorie danych:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Dane identyfikacyjne (imię, nazwisko, PESEL)</li>
                    <li>Dane kontaktowe (adres, numer telefonu, e-mail)</li>
                    <li>
                      Dane dotyczące stanu zdrowia (dokumentacja medyczna,
                      historia leczenia)
                    </li>
                    <li>
                      Dane dotyczące rozliczeń (informacje o płatnościach)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Okres przechowywania danych</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      Dokumentacja medyczna: przez okres wskazany w przepisach
                      prawa (minimum 20 lat od ostatniego wpisu)
                    </li>
                    <li>
                      Dane kontaktowe: do momentu wycofania zgody lub ustania
                      celowości ich przetwarzania
                    </li>
                    <li>
                      Dane finansowe: przez okres wymagany przepisami
                      podatkowymi (5 lat)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prawa pacjenta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>Pacjent ma prawo do:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Dostępu do swoich danych osobowych</li>
                    <li>Sprostowania (poprawiania) danych</li>
                    <li>
                      Usunięcia danych (w zakresie, w jakim pozwalają na to
                      przepisy prawa)
                    </li>
                    <li>Ograniczenia przetwarzania danych</li>
                    <li>Wniesienia sprzeciwu wobec przetwarzania danych</li>
                    <li>Przenoszenia danych</li>
                    <li>
                      Cofnięcia zgody na przetwarzanie danych (w każdej chwili)
                    </li>
                    <li>
                      Wniesienia skargi do organu nadzorczego (Prezes Urzędu
                      Ochrony Danych Osobowych)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bezpieczeństwo danych</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    Stosujemy odpowiednie środki techniczne i organizacyjne
                    zapewniające bezpieczeństwo przetwarzanych danych osobowych,
                    w tym:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Zabezpieczenie serwerów i systemów informatycznych</li>
                    <li>Kontrola dostępu do danych osobowych</li>
                    <li>
                      Szkolenie personelu w zakresie ochrony danych osobowych
                    </li>
                    <li>Regularne tworzenie kopii zapasowych</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">
                    Pytania dotyczące przetwarzania danych?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    W przypadku pytań dotyczących przetwarzania danych osobowych
                    lub chęci skorzystania z przysługujących praw, prosimy o
                    kontakt:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>
                      E-mail:{" "}
                      <a
                        href="mailto:alldent@onet.eu"
                        className="text-primary hover:underline font-medium"
                      >
                        alldent@onet.eu
                      </a>
                    </p>
                    <p>Telefon: +48 663 333 787</p>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center pt-6">
                <p className="text-xs text-muted-foreground mb-4">
                  Ostatnia aktualizacja:{" "}
                  {new Date().toLocaleDateString("pl-PL")}
                </p>
                <Button asChild>
                  <Link href="/kontakt">Skontaktuj się z nami</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
