export const metadata = {
  title: "Brak połączenia - Alldent",
};

export default function OfflinePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main
        id="main-content"
        className="flex-1 flex items-center justify-center"
      >
        <div className="text-center space-y-4 p-8">
          <h1 className="text-3xl font-bold tracking-tighter">
            Brak połączenia z internetem
          </h1>
          <p className="text-muted-foreground">
            Sprawdź połączenie i spróbuj ponownie.
          </p>
          <p className="text-muted-foreground">
            Zadzwoń do nas:{" "}
            <a
              href="tel:+48663333787"
              className="font-medium text-primary underline underline-offset-4"
            >
              +48 663 333 787
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
