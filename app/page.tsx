"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { featuredServices } from "@/lib/data/services";
import {
  Calendar,
  Phone,
  Clock,
  MapPin,
  Shield,
  Heart,
  CheckCircle,
  Users,
  Award,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/office/dental-office.png"
              alt="Nowoczesny gabinet stomatologiczny Alldent"
              fill
              className="object-cover object-bottom"
              priority
              quality={100}
            />
          </div>

          {/* Overlay - gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/30"></div>

          {/* Content */}
          <div className="relative z-10 w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-2xl space-y-6 text-white">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl [text-shadow:_2px_2px_12px_rgb(0_0_0_/_80%)]">
                    Twój uśmiech w{" "}
                    <span className="text-yellow-400 [text-shadow:_2px_2px_12px_rgb(0_0_0_/_90%)]">
                      dobrych rękach
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl font-medium [text-shadow:_1px_1px_8px_rgb(0_0_0_/_70%)]">
                    Nowoczesny gabinet stomatologiczny w sercu Częstochowy.
                    Oferujemy kompleksową opiekę dla całej rodziny w przyjaznej
                    atmosferze.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    asChild
                    className="text-base bg-primary hover:bg-primary/90"
                  >
                    <Link href="/umow-wizyte">
                      <Calendar className="w-5 h-5 mr-2" />
                      Umów wizytę online
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="text-base text-primary bg-white hover:bg-primary hover:text-white"
                  >
                    <a href="tel:+48663333787">
                      <Phone className="w-5 h-5 mr-2" />
                      Zadzwoń teraz
                    </a>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap gap-6 pt-6">
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-semibold [text-shadow:_1px_1px_4px_rgb(0_0_0_/_60%)]">
                      Nowoczesny sprzęt
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <Award className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-semibold [text-shadow:_1px_1px_4px_rgb(0_0_0_/_60%)]">
                      Doświadczenie 30+ lat
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <Users className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-semibold [text-shadow:_1px_1px_4px_rgb(0_0_0_/_60%)]">
                      Rodzinny gabinet
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={() => {
              document.querySelector("#featured-services")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white animate-bounce hover:scale-110 transition-all focus:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
            aria-label="Przewiń w dół do usług"
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </button>
        </section>

        {/* Featured Services */}
        <section id="featured-services" className="py-12 md:py-20">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Nasze główne usługi
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Kompleksowa opieka stomatologiczna dla całej rodziny - od
                  profilaktyki po zaawansowane zabiegi estetyczne
                </p>
              </div>

              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
                {featuredServices.map((service) => (
                  <Card
                    key={service.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <service.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {service.name}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base mb-4">
                        {service.description}
                      </CardDescription>
                      <ul className="space-y-1">
                        {service.benefits.slice(0, 3).map((benefit, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button asChild variant="outline" size="lg">
                  <Link href="/uslugi">Zobacz wszystkie usługi</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-teal-50">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Najnowocześniejszy sprzęt
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Inwestujemy w najnowsze technologie, aby zapewnić Ci najlepszą
                  opiekę stomatologiczną
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">
                      CBCT - Tomograf stomatologiczny
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Trójwymiarowa diagnostyka z przystawką cefalometryczną.
                      Precyzyjne zdjęcia cefalometryczne dla ortodoncji i
                      implantologii.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <Award className="w-8 h-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">
                      Rentgen stomatologiczny
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Cyfrowy system rentgenowski zapewniający szybką i dokładną
                      diagnostykę przy minimalnym promieniowaniu.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <Heart className="w-8 h-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">
                      Mikroskop stomatologiczny
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Precyzja endodoncji pod mikroskopem - leczenie kanałowe na
                      najwyższym poziomie z doskonałą wizualizacją.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-orange-600" />
                    </div>
                    <CardTitle className="text-xl">Piaskarka GBT</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Guided Biofilm Therapy - najnowocześniejsza metoda higieny
                      stomatologicznej dla maksymalnego komfortu i efektywności.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-4 mb-10">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Dlaczego Alldent?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Zaufało nam już ponad 2000 pacjentów w Częstochowie
                </p>
              </div>

              {/* ZnanyLekarz Reviews Widget */}
              <div className="flex justify-center mb-16">
                <div
                  className="inline-block"
                  dangerouslySetInnerHTML={{
                    __html: `<a class="zl-facility-url" href="https://www.znanylekarz.pl/placowki/alldent-centrum-stomatologiczne-anna-lemisz" rel="nofollow" data-zlw-facility="alldent-centrum-stomatologiczne-anna-lemisz" data-zlw-type="certificate" data-zlw-saas-only="true" data-zlw-a11y-title="Widget umówienia wizyty lekarskiej">Alldent Centrum Stomatologiczne Anna Lemisz</a><script>!function($_x,_s,id){var js,fjs=$_x.getElementsByTagName(_s)[0];if(!$_x.getElementById(id)){js = $_x.createElement(_s);js.id = id;js.src = "//platform.docplanner.com/js/widget.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","zl-widget-s");</script>`,
                  }}
                />
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Bezpieczeństwo</h3>
                  <p className="text-sm text-muted-foreground">
                    Najwyższe standardy sterylizacji i nowoczesny sprzęt
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Łagodne podejście</h3>
                  <p className="text-sm text-muted-foreground">
                    Szczególnie dbamy o komfort i spokój naszych pacjentów
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Dla całej rodziny</h3>
                  <p className="text-sm text-muted-foreground">
                    Specjalizujemy się w opiece nad dziećmi i dorosłymi
                  </p>
                </div>

                <div className="text-center space-y-3">
                  <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold">Punktualność</h3>
                  <p className="text-sm text-muted-foreground">
                    Szanujemy Twój czas - wizyty zgodnie z umówionymi godzinami
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Location */}
        <section className="py-12 md:py-20">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-8">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                    Skontaktuj się z nami
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Adres</h3>
                        <p className="text-muted-foreground">
                          ul. Sabinowska 8
                          <br />
                          42-200 Częstochowa
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Telefon</h3>
                        <a
                          href="tel:+48663333787"
                          className="text-muted-foreground hover:text-primary"
                        >
                          +48 663 333 787
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">Godziny otwarcia</h3>
                        <div className="text-muted-foreground space-y-1">
                          <p>Poniedziałek: 8:00 - 19:00</p>
                          <p>Wtorek: 12:00 - 19:00</p>
                          <p>Środa: 12:00 - 19:00</p>
                          <p>Czwartek: 8:00 - 19:00</p>
                          <p>Piątek: 8:00 - 15:00</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button size="lg" asChild>
                    <Link href="/kontakt">Zobacz szczegóły kontaktu</Link>
                  </Button>
                </div>

                {/* Google Maps */}
                <div className="aspect-[4/3] bg-slate-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://maps.google.com/maps?q=ul.+Sabinowska+8,+Częstochowa,+Poland&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Interaktywna mapa pokazująca lokalizację gabinetu Alldent przy ulicy Sabinowskiej 8 w Częstochowie"
                    className="w-full h-full rounded-lg"
                    aria-label="Mapa z lokalizacją gabinetu stomatologicznego Alldent"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
