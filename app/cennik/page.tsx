import Link from "next/link";
import React from "react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PriceInfo } from "@/components/price-info";
import { FadeInOnScroll } from "@/components/motion";
import { serviceCategories } from "@/lib/data/services";
import { ArrowLeft, Calendar, Phone, Info } from "lucide-react";
import { JsonLd, breadcrumbSchema } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Cennik - Alldent Częstochowa",
  description:
    "Cennik usług stomatologicznych w gabinecie Alldent w Częstochowie. Przejrzyste ceny zabiegów dentystycznych.",
};

// Pricing data mapped to services
const servicePricing: Record<string, string> = {
  "general-checkup": "od 120 zł",
  cleaning: "od 180 zł",
  "teeth-whitening": "od 800 zł",
  veneers: "od 1200 zł/ząb",
  bonding: "od 300 zł",
  "dental-implants": "od 3500 zł",
  "root-canal": "od 600 zł",
  crowns: "od 1000 zł",
  pediatric: "od 150 zł",
  "oral-surgery": "od 400 zł",
  orthodontics: "od 3000 zł",
  "laser-therapy": "od 200 zł",
  "flow-injection": "od 400 zł",
  "implant-prosthetics": "od 5000 zł",
  "conservative-dentistry": "od 200 zł",
};

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main id="main-content">
        <JsonLd data={breadcrumbSchema([
          { name: "Strona główna", href: "/" },
          { name: "Cennik", href: "/cennik" },
        ])} />
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
                  Cennik usług
                </h1>
                <p className="text-lg text-muted-foreground">
                  Przejrzyste ceny naszych usług stomatologicznych. Podane ceny
                  są cenami orientacyjnymi - dokładna kwota ustalana jest po
                  konsultacji.
                </p>

                <div className="flex items-center justify-center gap-2 p-4 bg-blue-100 rounded-lg">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <p className="text-sm text-blue-900">
                    Pierwsza konsultacja pozwoli ustalić szczegółowy plan
                    leczenia i dokładny koszt zabiegów
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="py-16 md:py-24">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-5xl mx-auto">
              <FadeInOnScroll>
                <Card className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-white border-b hover:bg-white">
                        <TableHead className="h-12 px-6 text-base font-semibold">
                          Usługa
                        </TableHead>
                        <TableHead className="text-right w-[180px] h-12 px-6 text-base font-semibold">
                          Cena
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(serviceCategories).map(
                        ([categoryKey, category]) => (
                          <React.Fragment key={categoryKey}>
                            {/* Category Header Row */}
                            <TableRow className="bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/10 hover:to-primary/5">
                              <TableCell
                                colSpan={2}
                                className="font-bold text-base py-4 px-6 text-primary"
                              >
                                {category.name}
                              </TableCell>
                            </TableRow>

                            {/* Service Rows */}
                            {category.services.map((service) => (
                              <TableRow
                                key={service.id}
                                className="hover:bg-muted/50 transition-colors"
                              >
                                <TableCell className="py-4 px-6">
                                  <div className="font-medium text-base">
                                    {service.name}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right py-4 px-6">
                                  <Badge
                                    variant="secondary"
                                    className="text-sm font-semibold px-3 py-1.5"
                                  >
                                    {servicePricing[service.id] ||
                                      "Cena do ustalenia"}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </React.Fragment>
                        ),
                      )}
                    </TableBody>
                  </Table>
                </Card>
              </FadeInOnScroll>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  Pytania o cenę konkretnego zabiegu?
                </h2>
                <p className="text-lg opacity-90">
                  Skontaktuj się z nami telefonicznie lub umów wizytę - chętnie
                  odpowiemy na wszystkie pytania
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link
                      href="/umow-wizyte"
                      className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Umów konsultację
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
