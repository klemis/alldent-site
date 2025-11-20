import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PriceInfo } from "@/components/price-info";
import { serviceCategories } from "@/lib/data/services";
import { Calendar, CheckCircle, ArrowLeft, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Usługi stomatologiczne - Alldent Częstochowa",
  description:
    "Kompleksowe usługi stomatologiczne w Częstochowie: profilaktyka, leczenie, implantologia, stomatologia estetyczna. Sprawdź nasze ceny i umów wizytę.",
};

export default function ServicesPage() {
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
                  Nasze usługi stomatologiczne
                </h1>
                <p className="text-lg text-muted-foreground">
                  Oferujemy pełny zakres usług stomatologicznych dla całej
                  rodziny. Wszystkie zabiegi wykonujemy z wykorzystaniem
                  nowoczesnego sprzętu w przyjaznej atmosferze.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services by Category */}
        <section className="py-12 md:py-20">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto space-y-16">
              {Object.entries(serviceCategories).map(
                ([categoryKey, category]) => (
                  <div key={categoryKey} className="space-y-8">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                        {category.name}
                      </h2>
                      <p className="text-muted-foreground max-w-2xl mx-auto">
                        {category.description}
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {category.services.map((service) => (
                        <Card
                          key={service.id}
                          className="hover:shadow-lg transition-shadow h-full"
                        >
                          <CardHeader>
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                                <service.icon className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-lg leading-tight">
                                  {service.name}
                                </CardTitle>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="space-y-4">
                            <CardDescription className="text-base">
                              {service.description}
                            </CardDescription>

                            <div className="space-y-3">
                              <h4 className="font-semibold text-sm">
                                Korzyści:
                              </h4>
                              <ul className="space-y-2">
                                {service.benefits.map((benefit, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2 text-sm"
                                  >
                                    <CheckCircle className="w-4 h-4 text-accent-foreground flex-shrink-0 mt-0.5" />
                                    <span>{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Add separator between categories except for the last one */}
                    {categoryKey !==
                      Object.keys(serviceCategories)[
                        Object.keys(serviceCategories).length - 1
                      ] && <Separator className="my-12" />}
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  Gotowy na wizytę?
                </h2>
                <p className="text-lg opacity-90">
                  Umów się na konsultację i poznaj plan leczenia dostosowany do
                  Twoich potrzeb.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link
                      href="/umow-wizyte"
                      className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Umów wizytę online
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="text-primary"
                  >
                    <a
                      href="tel:+48663333787"
                      aria-label="Zadzwoń do gabinetu - +48 663 333 787"
                      className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Zadzwoń teraz
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Price Information */}
        <PriceInfo />
      </main>
    </div>
  );
}
