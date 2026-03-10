import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Shield, Heart, Info } from "lucide-react";

export const metadata = {
  title: "Karta Praw Pacjenta - Alldent Częstochowa",
  description:
    "Karta praw pacjenta w gabinecie stomatologicznym Alldent w Częstochowie. Poznaj swoje prawa podczas leczenia stomatologicznego.",
};

export default function PatientRightsPage() {
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
                  <FileText className="w-10 h-10 text-primary" />
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Karta Praw Pacjenta
                  </h1>
                </div>

                <p className="text-lg text-muted-foreground">
                  W gabinecie Alldent szanujemy prawa pacjentów i dokładamy
                  wszelkich starań, aby zapewnić najwyższą jakość opieki
                  stomatologicznej.
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
                    <Info className="w-5 h-5 text-primary" />
                    Prawo do informacji
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>Pacjent ma prawo do:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      Uzyskania przystępnej informacji o stanie zdrowia jamy
                      ustnej
                    </li>
                    <li>
                      Informacji o proponowanych oraz możliwych metodach
                      leczenia
                    </li>
                    <li>
                      Informacji o przewidywanych skutkach ich zastosowania lub
                      zaniechania
                    </li>
                    <li>Informacji o kosztach leczenia</li>
                    <li>
                      Informacji o wynikach leczenia oraz rokowaniu dotyczącym
                      dalszego stanu zdrowia
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Prawo do świadczeń zdrowotnych
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>Pacjent ma prawo do:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      Świadczeń stomatologicznych odpowiadających wymaganiom
                      aktualnej wiedzy medycznej
                    </li>
                    <li>
                      Opieki stomatologicznej w warunkach odpowiadających
                      zasadom profesjonalizmu
                    </li>
                    <li>Żądania, aby lekarz uzyskał zgodę na zabieg</li>
                    <li>
                      Poszanowania intymności i godności podczas leczenia
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Prawo do dokumentacji medycznej
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>Pacjent ma prawo do:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Dostępu do dokumentacji medycznej dotyczącej leczenia</li>
                    <li>Uzyskania kopii dokumentacji medycznej</li>
                    <li>
                      Żądania sprostowania, uzupełnienia lub usunięcia danych
                    </li>
                    <li>
                      Wskazania osoby upoważnionej do wglądu w dokumentację po
                      śmierci pacjenta
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Prawo do poufności
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p>Pacjent ma prawo do:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      Zachowania w tajemnicy przez osoby wykonujące zawód
                      medyczny informacji z nim związanych
                    </li>
                    <li>
                      Ochrony danych osobowych zgodnie z przepisami o ochronie
                      danych osobowych (RODO)
                    </li>
                    <li>
                      Wyrażenia zgody lub odmowy na obecność innych osób przy
                      udzielaniu świadczeń
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">
                    Prawa nieletnich pacjentów
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    W przypadku pacjentów nieletnich, wszystkie powyższe prawa
                    przysługują rodzicom lub opiekunom prawnym. Jednocześnie
                    dbamy o to, aby młodzi pacjenci czuli się komfortowo i
                    bezpiecznie podczas wizyt. Szczegółowe informacje znajdują
                    się w dokumencie{" "}
                    <Link
                      href="/ochrona-maloletnich"
                      className="text-primary hover:underline font-medium"
                    >
                      Standardy i procedury ochrony małoletnich
                    </Link>
                    .
                  </p>
                </CardContent>
              </Card>

              <div className="text-center pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  W przypadku pytań dotyczących praw pacjenta, prosimy o
                  kontakt z naszym gabinetem.
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
