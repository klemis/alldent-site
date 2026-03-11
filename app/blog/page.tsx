import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { FadeInOnScroll, HoverScale } from "@/components/motion";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog - Alldent Gabinet Stomatologiczny Częstochowa",
  description:
    "Porady stomatologiczne, artykuły o zdrowiu jamy ustnej i nowości z gabinetu Alldent w Częstochowie.",
  openGraph: {
    title: "Blog - Alldent Gabinet Stomatologiczny",
    description:
      "Porady stomatologiczne i artykuły o zdrowiu jamy ustnej.",
    type: "website",
  },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col min-h-screen">
      <main id="main-content">
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
                  Blog
                </h1>
                <p className="text-lg text-muted-foreground">
                  Porady stomatologiczne, artykuły o zdrowiu jamy ustnej i
                  nowości z naszego gabinetu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Posts */}
        <section className="py-12 md:py-20">
          <div className="w-full px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="max-w-4xl mx-auto">
              {posts.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  Wkrótce pojawią się nowe artykuły.
                </p>
              ) : (
                <div className="grid gap-8">
                  {posts.map((post, index) => (
                    <FadeInOnScroll key={post.slug} delay={index * 0.1}>
                      <HoverScale>
                        <Link href={`/blog/${post.slug}`} className="block">
                          <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <CalendarDays className="w-4 h-4" />
                                <time dateTime={post.date}>
                                  {formatDate(post.date)}
                                </time>
                              </div>
                              <CardTitle className="text-xl leading-tight">
                                {post.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground">
                                {post.description}
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      </HoverScale>
                    </FadeInOnScroll>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
