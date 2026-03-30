import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { teamMembers } from "@/lib/data/team";
import {
  ArrowLeft,
  Calendar,
  Phone,
  GraduationCap,
  Award,
  Heart,
  Users,
} from "lucide-react";
import { FadeInOnScroll } from "@/components/motion";
import { JsonLd, breadcrumbSchema, personSchema } from "@/components/structured-data";

export const metadata = {
  title: "Nasz zespół - Alldent Częstochowa",
  description:
    "Poznaj doświadczony zespół stomatologów i higienistek Alldent w Częstochowie. Wykwalifikowani specjaliści z wieloletnim doświadczeniem.",
};

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main id="main-content">
        <JsonLd data={breadcrumbSchema([
          { name: "Strona główna", href: "/" },
          { name: "Zespół", href: "/zespol" },
        ])} />
        {teamMembers.map((member, index) => (
          <JsonLd key={index} data={personSchema(member)} />
        ))}
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
                  Nasz zespół
                </h1>
                <p className="text-lg text-muted-foreground">
                  Poznaj doświadczonych specjalistów, którzy z pasją dbają o
                  zdrowie Twoich zębów i piękny uśmiech całej rodziny.
                </p>

                <div className="flex flex-wrap justify-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">
                      Certyfikowani specjaliści
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-accent-foreground" />
                    <span className="text-sm font-medium">
                      Indywidualne podejście
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">
                      Ciągłe doskonalenie
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Photo */}
        <section className="py-8 md:py-12">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-5xl mx-auto">
              <div className="aspect-[21/9] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
                <div className="text-center space-y-2">
                  <Users className="w-12 h-12 text-slate-400 mx-auto" />
                  <p className="text-slate-500 font-medium">Zdjęcie zespołu</p>
                  <p className="text-sm text-slate-400">/images/team/zespol.jpg</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-12 md:py-16">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-6 md:grid-cols-2">
                {teamMembers.map((member, index) => (
                  <FadeInOnScroll key={index} delay={index * 0.1}>
                    <Card className="overflow-hidden">
                      <div className="flex gap-4 p-4">
                        {/* Photo */}
                        <div className="flex-shrink-0">
                          <Avatar className="w-20 h-20">
                            <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <div>
                            <h3 className="font-semibold text-lg leading-tight">
                              {member.name}
                            </h3>
                            <p className="text-sm font-medium text-primary">
                              {member.title}
                            </p>
                          </div>

                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {member.bio}
                          </p>

                          <div className="flex flex-wrap gap-1.5">
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
                      </div>
                    </Card>
                  </FadeInOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 md:py-16 bg-stone-50">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <FadeInOnScroll>
                <div className="max-w-4xl mx-auto text-center space-y-8">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                    Nasze wartości
                  </h2>

                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Heart className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold">Empatia i zrozumienie</h3>
                      <p className="text-sm text-muted-foreground">
                        Rozumiemy lęki pacjentów i zawsze podchodzimy z
                        cierpliwością i zrozumieniem
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                        <Award className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <h3 className="font-semibold">Profesjonalizm</h3>
                      <p className="text-sm text-muted-foreground">
                        Najwyższa jakość usług dzięki ciągłemu dokształcaniu i
                        nowoczesnym technologiom
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-primary/15 rounded-full flex items-center justify-center mx-auto">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold">Rozwój i edukacja</h3>
                      <p className="text-sm text-muted-foreground">
                        Regularnie uczestniczymy w kursach i szkoleniach, aby być
                        na bieżąco z nowościami
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInOnScroll>
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
