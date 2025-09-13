import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Phone,
  Camera,
  Building,
  Stethoscope,
  Users,
  Star,
} from "lucide-react";

export const metadata = {
  title: "Galeria - Alldent Częstochowa",
  description:
    "Zobacz zdjęcia naszego nowoczesnego gabinetu stomatologicznego w Częstochowie, sprzętu medycznego i efektów leczenia.",
};

// Sample gallery data - in a real app, this would come from a CMS or database
const galleryCategories = {
  office: {
    name: "Nasze wnętrza",
    description: "Nowoczesny i przyjazny gabinet stomatologiczny",
    icon: Building,
    images: [
      {
        id: "office-1",
        alt: "Recepcja gabinetu",
        caption: "Przestronna recepcja z wygodną strefą oczekiwania",
      },
      {
        id: "office-2",
        alt: "Gabinet zabiegowy",
        caption: "Nowoczesny gabinet zabiegowy z najnowszym sprzętem",
      },
      {
        id: "office-3",
        alt: "Poczekalnia",
        caption: "Komfortowa poczekalnia dla pacjentów",
      },
      {
        id: "office-4",
        alt: "Sterylizatornia",
        caption:
          "Profesjonalna sterylizatornia zgodna z najwyższymi standardami",
      },
    ],
  },
  equipment: {
    name: "Nowoczesny sprzęt",
    description: "Najnowocześniejsze technologie stomatologiczne",
    icon: Stethoscope,
    images: [
      {
        id: "equipment-1",
        alt: "Aparat RTG",
        caption: "Cyfrowy aparat rentgenowski",
      },
      {
        id: "equipment-2",
        alt: "Mikroskop",
        caption: "Mikroskop operacyjny do precyzyjnych zabiegów",
      },
      {
        id: "equipment-3",
        alt: "Laser",
        caption: "Laser terapeutyczny do leczenia dziąseł",
      },
      {
        id: "equipment-4",
        alt: "Scanner",
        caption: "Scanner wewnątrzustny do cyfrowych wycisków",
      },
    ],
  },
  team: {
    name: "Nasz zespół",
    description: "Profesjonalni specjaliści w działaniu",
    icon: Users,
    images: [
      {
        id: "team-1",
        alt: "Dr Anna Kowalska",
        caption: "Dr Anna Kowalska podczas konsultacji",
      },
      {
        id: "team-2",
        alt: "Dr Michał Nowak",
        caption: "Dr Michał Nowak w trakcie zabiegu implantologicznego",
      },
      {
        id: "team-3",
        alt: "Dr Katarzyna Wiśniewska",
        caption: "Dr Katarzyna Wiśniewska z małym pacjentem",
      },
      { id: "team-4", alt: "Cały zespół", caption: "Nasz zespół specjalistów" },
    ],
  },
};

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-12 md:py-16">
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Powrót do strony głównej
              </Link>
            </Button>

            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Galeria
            </h1>
            <p className="text-lg text-muted-foreground">
              Zobacz nasze nowoczesne wnętrza, profesjonalny sprzęt medyczny i
              poznaj zespół specjalistów Alldent w Częstochowie.
            </p>

            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Najnowsze zdjęcia</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium">
                  5-gwiazdkowy gabinet
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Categories */}
      <section className="py-12 md:py-20">
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 space-y-16">
          {Object.entries(galleryCategories).map(([categoryKey, category]) => (
            <div key={categoryKey} className="space-y-8">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-3">
                  <category.icon className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                    {category.name}
                  </h2>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {category.images.map((image) => (
                  <Card
                    key={image.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <CardContent className="p-0">
                      {/* Image Placeholder */}
                      <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:from-slate-200 group-hover:to-slate-300 transition-colors">
                        <div className="text-center space-y-2">
                          <Camera className="w-12 h-12 mx-auto text-slate-400 group-hover:text-slate-500 transition-colors" />
                          <p className="text-xs text-slate-500 px-2">
                            {image.alt}
                          </p>
                        </div>
                      </div>

                      {/* Caption */}
                      <div className="p-3">
                        <p className="text-sm font-medium text-center">
                          {image.caption}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tighter mb-4">
                Dlaczego warto nas odwiedzić?
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Nowoczesne wnętrza</h3>
                  <p className="text-sm text-muted-foreground">
                    Przestronne i komfortowe gabinety zaprojektowane z myślą o
                    komforcie pacjentów
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Stethoscope className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Najnowszy sprzęt</h3>
                  <p className="text-sm text-muted-foreground">
                    Wykorzystujemy najnowocześniejsze technologie
                    stomatologiczne
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Doświadczony zespół</h3>
                  <p className="text-sm text-muted-foreground">
                    Wykwalifikowani specjaliści z wieloletnim doświadczeniem
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Policy Section */}
      <section className="py-8 border-t">
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-lg font-semibold">Polityka zdjęć</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                Wszystkie zdjęcia prezentowane w galerii zostały wykonane za
                zgodą pacjentów i personelu. Szanujemy prywatność naszych
                pacjentów.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Badge variant="outline" className="text-xs">
                  Zgodne z RODO
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Zgoda pacjentów
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Aktualne zdjęcia
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Przekonaj się osobiście
            </h2>
            <p className="text-lg opacity-90">
              Umów wizytę i zobacz na własne oczy nasze nowoczesne wnętrza oraz
              poznaj nasz profesjonalny zespół.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/umow-wizyte">
                  <Calendar className="w-5 h-5 mr-2" />
                  Umów wizytę
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+48123456789">
                  <Phone className="w-5 h-5 mr-2" />
                  Zadzwoń teraz
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
