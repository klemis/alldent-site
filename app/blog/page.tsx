import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FadeInOnScroll } from "@/components/motion";
import { BlogCard } from "@/components/blog-card";
import { getAllPosts } from "@/lib/blog";
import { JsonLd, breadcrumbSchema } from "@/components/structured-data";

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

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col min-h-screen">
      <main id="main-content">
        <JsonLd data={breadcrumbSchema([
          { name: "Strona główna", href: "/" },
          { name: "Blog", href: "/blog" },
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
        <section className="py-12 md:py-16">
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
                      <BlogCard
                        slug={post.slug}
                        title={post.title}
                        description={post.description}
                        date={post.date}
                      />
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
