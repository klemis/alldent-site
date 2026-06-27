// Detailed price list mirroring docs/cennik.pdf (Alldent Częstochowa).
// Kept separate from the marketing `serviceCategories` taxonomy in services.ts
// because the official cennik has its own structure, price ranges and notes.

export interface PriceItem {
  name: string;
  price: string;
  /** Optional qualifier shown under the price, e.g. "+ koszt wypełnienia". */
  note?: string;
}

export interface PriceCategory {
  name: string;
  anchor: string;
  items: PriceItem[];
}

export const priceList: PriceCategory[] = [
  {
    name: "Stomatologia zachowawcza",
    anchor: "stomatologia-zachowawcza",
    items: [
      { name: "Konsultacja stomatologiczna – pierwsza wizyta", price: "150 zł" },
      { name: "Kontrola stałych pacjentów", price: "Bezpłatnie" },
      { name: "Wypełnienie ubytku zęba", price: "400–500 zł" },
      { name: "Odbudowa zęba na włóknie szklanym", price: "500 zł" },
      { name: "Znieczulenie", price: "50 zł" },
      { name: "Infiltracja ICON", price: "300 zł", note: "za ząb" },
      {
        name: "Estetyczna odbudowa zębów przednich (bonding / licówka kompozytowa)",
        price: "600–900 zł",
        note: "za ząb",
      },
    ],
  },
  {
    name: "Stomatologia zachowawcza dziecięca",
    anchor: "stomatologia-dziecieca",
    items: [
      { name: "Wizyta adaptacyjna dzieci", price: "100 zł" },
      { name: "Konsultacja stomatologiczna", price: "150 zł" },
      { name: "Wypełnienie zęba mlecznego", price: "300 zł" },
      { name: "Usunięcie zęba mlecznego", price: "200–300 zł" },
    ],
  },
  {
    name: "Ortodoncja",
    anchor: "ortodoncja",
    items: [
      { name: "Konsultacja ortodontyczna", price: "200 zł" },
      {
        name: "Konsultacja ortodontyczna diagnostyczna (skan, zdjęcie panoramiczne, zdjęcie cefalometryczne)",
        price: "500 zł",
      },
      {
        name: "Konsultacja ortodontyczna diagnostyczna (skan, tomografia, zdjęcie cefalometryczne)",
        price: "650 zł",
      },
      { name: "Plan i kosztorys leczenia", price: "200 zł" },
      { name: "Aparat stały metalowy", price: "3000 zł" },
      { name: "Aparat stały samoligaturujący", price: "3500 zł" },
      { name: "Aparat stały samoligaturujący Damon Ultima", price: "3900 zł" },
      { name: "Aparat zdejmowany jednoszczękowy", price: "1200 zł" },
      {
        name: "Wizyta kontrolna z aparatem stałym",
        price: "300 / 350 zł",
        note: "1 łuk / 2 łuki",
      },
      {
        name: "Wizyta kontrolna z aparatem samoligaturującym",
        price: "400 / 450 zł",
        note: "1 łuk / 2 łuki",
      },
      {
        name: "Wizyta kontrolna z aparatem zdejmowanym",
        price: "200 / 250 zł",
        note: "1 aparat / 2 aparaty",
      },
      { name: "Wizyta awaryjna", price: "150 zł" },
    ],
  },
  {
    name: "Endodoncja",
    anchor: "endodoncja",
    items: [
      { name: "Konsultacja endodontyczna", price: "200 zł" },
      {
        name: "Leczenie endodontyczne pod mikroskopem – ząb 1-kanałowy",
        price: "800 zł",
        note: "+ koszt wypełnienia",
      },
      {
        name: "Leczenie endodontyczne pod mikroskopem – ząb 2-kanałowy",
        price: "1000 zł",
        note: "+ koszt wypełnienia",
      },
      {
        name: "Leczenie endodontyczne pod mikroskopem – ząb 3-kanałowy",
        price: "1300 zł",
        note: "+ koszt wypełnienia",
      },
      {
        name: "Leczenie endodontyczne pod mikroskopem – ząb 4-kanałowy",
        price: "1600 zł",
        note: "+ koszt wypełnienia",
      },
      {
        name: "Reendo pod mikroskopem – ząb 1-kanałowy",
        price: "1100 zł",
        note: "+ koszt odbudowy",
      },
      {
        name: "Reendo pod mikroskopem – ząb 2-kanałowy",
        price: "1300 zł",
        note: "+ koszt odbudowy",
      },
      {
        name: "Reendo pod mikroskopem – ząb 3-kanałowy",
        price: "1600 zł",
        note: "+ koszt odbudowy",
      },
      {
        name: "Reendo pod mikroskopem – ząb 4-kanałowy",
        price: "2000 zł",
        note: "+ koszt odbudowy",
      },
      { name: "Odbudowa zęba po leczeniu endodontycznym", price: "400–500 zł" },
    ],
  },
  {
    name: "Protetyka",
    anchor: "protetyka",
    items: [
      { name: "Konsultacja protetyczna + skan", price: "200 zł" },
      { name: "Opracowanie planu leczenia", price: "200 zł" },
      { name: "Korona porcelanowa na metalu", price: "1800 zł" },
      { name: "Korona pojedyncza cyrkon", price: "2200 zł" },
      { name: "Korona tymczasowa", price: "50 zł" },
      { name: "Licówka porcelanowa", price: "2200 zł" },
      { name: "Proteza całkowita akrylowa", price: "2400 zł" },
      { name: "Proteza częściowa akrylowa", price: "2100 zł" },
      { name: "Proteza elastyczna", price: "3000 zł" },
      { name: "Proteza szkieletowa", price: "3500 zł" },
      { name: "Proteza szkieletowa z elementami estetycznymi", price: "4000 zł" },
      { name: "Proteza szkieletowa z zasuwami", price: "4500 zł" },
      { name: "Naprawa protezy", price: "od 400 zł" },
    ],
  },
  {
    name: "Chirurgia",
    anchor: "chirurgia",
    items: [
      { name: "Konsultacja chirurgiczna", price: "200 zł" },
      { name: "Usunięcie zęba stałego", price: "300–500 zł" },
      { name: "Usunięcie ósemki", price: "500–1000 zł" },
      { name: "Usunięcie zęba zatrzymanego", price: "1000–1500 zł" },
      { name: "Odsłonięcie zęba zatrzymanego", price: "1000–1200 zł" },
      { name: "Resekcja wierzchołka korzenia", price: "1200–1600 zł" },
      { name: "Podcięcie wędzidełka laserowo", price: "350 zł" },
      { name: "Miofrenuloplastyka języka", price: "700 zł" },
      { name: "Modelowanie laserem linii dziąseł", price: "250 zł", note: "za ząb" },
    ],
  },
  {
    name: "Periodontologia",
    anchor: "periodontologia",
    items: [
      { name: "Konsultacja periodontologiczna", price: "200 zł" },
      { name: "Kiretaż zamknięty", price: "od 300 zł" },
      { name: "Kiretaż otwarty", price: "300–600 zł" },
      { name: "Pokrycie recesji dziąsłowej", price: "od 500 zł" },
      { name: "Przeszczep dziąsła", price: "od 1000 zł" },
    ],
  },
  {
    name: "Implantologia",
    anchor: "implantologia",
    items: [
      { name: "Wszczepienie implantu", price: "3000 zł" },
      { name: "Śruba gojąca", price: "400 zł" },
      { name: "Łącznik", price: "400 zł" },
      { name: "Augmentacja kości przy implantacji", price: "2000–3000 zł" },
      { name: "Odbudowa protetyczna na implancie", price: "od 2500 zł" },
    ],
  },
  {
    name: "Profilaktyka stomatologiczna",
    anchor: "profilaktyka",
    items: [
      {
        name: "Higienizacja GBT (skaling, piaskowanie, instruktaż szczotkowania)",
        price: "380 zł",
      },
      { name: "Higienizacja dla pacjentów ortodontycznych", price: "320 zł" },
      { name: "Higienizacja dla dzieci do 10 r.ż.", price: "250 zł" },
      { name: "Piaskowanie", price: "200 zł" },
      { name: "Fluoryzacja", price: "100 zł" },
      { name: "Wybielanie nakładkowe + higienizacja", price: "1500 zł" },
      { name: "Wybielanie BlancOne + higienizacja", price: "1400 zł" },
      { name: "Rozjaśnienie zębów + higienizacja", price: "650 zł" },
    ],
  },
  {
    name: "Diagnostyka",
    anchor: "diagnostyka",
    items: [
      { name: "Zdjęcie panoramiczne", price: "120 zł" },
      { name: "Zdjęcie cefalometryczne", price: "120 zł" },
      { name: "Tomografia komputerowa szczęka + żuchwa", price: "350 zł" },
      { name: "Tomografia komputerowa szczęka", price: "200 zł" },
      { name: "Tomografia komputerowa żuchwa", price: "200 zł" },
      { name: "Tomografia komputerowa punktowa", price: "150 zł" },
    ],
  },
];
