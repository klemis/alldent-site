import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Logo and Description */}
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/logo/logo-cropped.png"
                  alt="Logo AllDent"
                  width={120}
                  height={30}
                  className="h-6 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <p className="text-slate-300 text-sm">
                Nowoczesny gabinet stomatologiczny w Częstochowie. Kompleksowa
                opieka dla całej rodziny w przyjaznej atmosferze.
              </p>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-10 w-10 text-slate-300 hover:text-white hover:bg-blue-600"
                >
                  <a
                    href="https://www.facebook.com/p/Alldent-Centrum-Stomatologiczne-100057586025488"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Odwiedź naszą stronę na Facebooku"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-10 w-10 text-slate-300 hover:text-white hover:bg-pink-600"
                >
                  <a
                    href="https://www.instagram.com/alldent_stomatologia_lemisz"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Śledź nas na Instagramie"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Nawigacja</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    Strona główna
                  </Link>
                </li>
                <li>
                  <Link
                    href="/uslugi"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    Usługi
                  </Link>
                </li>
                <li>
                  <Link
                    href="/zespol"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    Zespół
                  </Link>
                </li>
                <li>
                  <Link
                    href="/galeria"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    Galeria
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kontakt"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Usługi</h3>
              <ul className="space-y-2">
                <li className="text-slate-300 text-sm">Profilaktyka</li>
                <li className="text-slate-300 text-sm">
                  Stomatologia estetyczna
                </li>
                <li className="text-slate-300 text-sm">Implantologia</li>
                <li className="text-slate-300 text-sm">Endodoncja</li>
                <li className="text-slate-300 text-sm">
                  Stomatologia dziecięca
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Kontakt</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0" />
                  <div className="text-slate-300 text-sm">
                    <p>ul. Sabinowska 8</p>
                    <p>42-200 Częstochowa</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-300 flex-shrink-0" />
                  <a
                    href="tel:+48123456789"
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    +48 123 456 789
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0" />
                  <div className="text-slate-300 text-sm">
                    <p>Pon-Pt: 8:00 - 20:00</p>
                    <p>Sobota: 9:00 - 15:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-slate-700" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} AllDent. Wszystkie prawa
              zastrzeżone.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/polityka-prywatnosci"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Polityka prywatności
              </Link>
              <Link
                href="/regulamin"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Regulamin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
