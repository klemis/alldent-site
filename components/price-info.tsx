export function PriceInfo() {
  return (
    <section className="py-8 bg-slate-50">
      <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Informacje o cenach
              </h3>
              <p className="text-sm text-muted-foreground">
                Podane ceny są orientacyjne. Dokładny koszt leczenia zostanie
                ustalony podczas konsultacji po przeprowadzeniu badania.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-center">
              <div className="space-y-1">
                <p className="font-medium text-sm">Konsultacja</p>
                <p className="text-xs text-muted-foreground">
                  Pierwsza wizyta bezpłatna
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-sm">Znieczulenie</p>
                <p className="text-xs text-muted-foreground">
                  Wliczone w cenę zabiegu
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-sm">Nowoczesny sprzęt</p>
                <p className="text-xs text-muted-foreground">
                  Diagnostyka cyfrowa
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-sm">Kontrola</p>
                <p className="text-xs text-muted-foreground">
                  Bezpłatna przez 6 miesięcy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
