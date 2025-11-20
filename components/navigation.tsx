"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navItems = [
  { title: "Strona główna", href: "/" },
  { title: "Usługi", href: "/uslugi" },
  { title: "Cennik", href: "/cennik" },
  { title: "Zespół", href: "/zespol" },
  { title: "Kontakt", href: "/kontakt" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-[100] bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium transition-all"
      >
        Przejdź do treści głównej
      </a>

      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center justify-between px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo/logo.png"
              alt="Logo Alldent - nowoczesny napis gabinetu stomatologicznego z graficznym elementem zęba"
              width={160}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
            <div className="hidden sm:block">
              <p className="text-xs text-muted-foreground">
                Gabinet Stomatologiczny
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Button asChild>
              <Link href="/umow-wizyte">
                <Calendar className="w-4 h-4 mr-2" />
                Umów wizytę
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
            <Button variant="outline" size="icon" asChild className="h-11 w-11">
              <a
                href="tel:+48663333787"
                aria-label="Zadzwoń do gabinet - +48 663 333 787"
              >
                <Phone className="w-4 h-4" />
              </a>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-11 w-11">
                  <Menu className="w-4 h-4" />
                  <span className="sr-only">Otwórz menu nawigacyjne</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(80vw,320px)]">
                <div className="flex flex-col space-y-4 px-4 py-2 text-center">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium hover:text-primary transition-colors focus:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-3 text-center"
                    >
                      {item.title}
                    </Link>
                  ))}

                  <Button asChild className="w-full mt-6">
                    <Link href="/umow-wizyte" onClick={() => setIsOpen(false)}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Umów wizytę
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
