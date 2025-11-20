import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { teamMembers } from "@/lib/data/team";
import {
  ArrowLeft,
  Calendar,
  Phone,
  GraduationCap,
  Award,
  Languages,
  Heart,
} from "lucide-react";

export const metadata = {
  title: "Nasz zespół - Alldent Częstochowa",
  description:
    "Poznaj doświadczony zespół stomatologów i higienistek Alldent w Częstochowie. Wykwalifikowani specjaliści z wieloletnim doświadczeniem.",
};

export default function TeamPage() {
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
                  Nasz zespół
                </h1>
                <p className="text-lg text-muted-foreground">
                  Poznaj doświadczonych specjalistów, którzy z pasją dbają o
                  zdrowie Twoich zębów i piękny uśmiech całej rodziny.
                </p>

                <div className="flex flex-wrap justify-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium">
                      Certyfikowani specjaliści
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium">
                      Indywidualne podejście
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">
                      Ciągłe doskonalenie
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-12 md:py-20">
          <div className="w-full px-6 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-8 lg:gap-12">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8 p-4 md:p-6">
                      {/* Photo */}
                      <div className="md:col-span-1">
                        <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                          <Avatar className="w-32 h-32">
                            <AvatarFallback className="text-2xl font-semibold bg-primary text-primary-foreground">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="md:col-span-2 space-y-4">
                        <CardHeader className="p-0">
                          <CardTitle className="text-2xl">
                            {member.name}
                          </CardTitle>
                          <CardDescription className="text-lg font-medium text-primary">
                            {member.title}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="p-0 space-y-6">
                          {/* Qualifications */}
                          <div className="flex items-start gap-3">
                            <GraduationCap className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-sm">
                                Wykształcenie
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {member.qualifications}
                              </p>
                            </div>
                          </div>

                          {/* Bio */}
                          <p className="text-muted-foreground leading-relaxed">
                            {member.bio}
                          </p>

                          {/* Specialties */}
                          <div className="space-y-2">
                            <h3 className="font-semibold text-sm">
                              Specjalizacje
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {member.specialties.map((specialty, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Experience & Languages */}
                          <div className="flex flex-wrap gap-6 pt-2">
                            {member.experience && (
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-green-600" />
                                <span className="text-sm">
                                  <span className="font-medium">
                                    Doświadczenie:
                                  </span>{" "}
                                  {member.experience}
                                </span>
                              </div>
                            )}

                            {member.languages &&
                              member.languages.length > 0 && (
                                <div className="flex items-center gap-2">
                                  <Languages className="w-4 h-4 text-purple-600" />
                                  <span className="text-sm">
                                    <span className="font-medium">Języki:</span>{" "}
                                    {member.languages.join(", ")}
                                  </span>
                                </div>
                              )}
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  Nasze wartości
                </h2>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Heart className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">Empatia i zrozumienie</h3>
                    <p className="text-sm text-muted-foreground">
                      Rozumiemy lęki pacjentów i zawsze podchodzimy z
                      cierpliwością i zrozumieniem
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold">Profesjonalizm</h3>
                    <p className="text-sm text-muted-foreground">
                      Najwyższa jakość usług dzięki ciągłemu dokształcaniu i
                      nowoczesnym technologiom
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <GraduationCap className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold">Rozwój i edukacja</h3>
                    <p className="text-sm text-muted-foreground">
                      Regularnie uczestniczymy w kursach i szkoleniach, aby być
                      na bieżąco z nowościami
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-primary text-primary-foreground">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  Poznaj nasz zespół osobiście
                </h2>
                <p className="text-lg opacity-90">
                  Umów się na konsultację i przekonaj się, jak profesjonalna
                  opieka może wyglądać w przyjaznej atmosferze.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link
                      href="/umow-wizyte"
                      className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Umów wizytę
                    </Link>
                  </Button>
                  <Button size="lg" variant="secondary" asChild>
                    <a
                      href="tel:+48663333787"
                      aria-label="Zadzwoń do gabinetu - +48 663 333 787"
                      className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Zadzwoń do nas
                    </a>
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
