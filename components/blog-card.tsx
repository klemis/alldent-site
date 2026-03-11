import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { HoverScale } from "@/components/motion";

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogCard({ slug, title, description, date }: BlogCardProps) {
  return (
    <HoverScale>
      <Link href={`/blog/${slug}`} className="block">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <CalendarDays className="w-4 h-4" />
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
            <CardTitle className="text-xl leading-tight">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      </Link>
    </HoverScale>
  );
}
