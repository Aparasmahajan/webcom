"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface NewsItem {
  id: string;
  name: string;
  description: string;
  date: string;
  orderBy: number;
}

interface NewsFeedProps {
  showViewAll?: boolean;
  limit?: number;
  variant?: "carousel" | "list";
}

const cardStyle = {
  border: "1px solid #ece9e0",
  background: "#ffffff",
};

const descriptionClampStyle: React.CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 5,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  whiteSpace: "normal",
  wordBreak: "break-word",
  overflowWrap: "anywhere",
};

const descriptionWrapStyle: React.CSSProperties = {
  whiteSpace: "normal",
  wordBreak: "break-word",
  overflowWrap: "anywhere",
};

const NewsFeed: React.FC<NewsFeedProps> = ({
  showViewAll = false,
  limit,
  variant = "carousel",
}) => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Failed with status ${res.status}`);
        }

        const data = (await res.json()) as NewsItem[];
        setItems(limit ? data.slice(0, limit) : data);
        setError("");
      } catch (fetchError) {
        console.error(fetchError);
        setError("Unable to load news right now.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [limit]);

  const scrollCards = (direction: "left" | "right") => {
    const container = document.getElementById("news-scroll-container");
    if (!container) return;

    const amount = Math.min(container.clientWidth * 0.85, 420);
    container.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: "#f7f5f0", border: "1px solid #ece9e0" }}
      >
        <p className="text-sm" style={{ color: "#9a9aaa" }}>
          Loading news...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: "#fdf0f0", border: "1px solid #f5c0c0" }}
      >
        <p className="text-sm" style={{ color: "#a32d2d" }}>
          {error}
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: "#f7f5f0", border: "1px solid #ece9e0" }}
      >
        <p className="text-sm" style={{ color: "#9a9aaa" }}>
          No news available yet.
        </p>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-2xl p-6"
            style={cardStyle}
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span
                className="inline-block text-xs font-medium uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: "#fff4cc", color: "#8a6200" }}
              >
                Update {item.id}
              </span>
              {item.date && (
                <span className="text-xs" style={{ color: "#9a9aaa" }}>
                  {item.date}
                </span>
              )}
            </div>
            <h3
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "'Playfair Display', serif", color: "#12113a" }}
            >
              {item.name}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#5a5a72", ...descriptionWrapStyle }}
            >
              {item.description}
            </p>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <div
          id="news-scroll-container"
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="w-[280px] sm:w-[340px] md:w-[380px] rounded-2xl p-6 shrink-0"
              style={cardStyle}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="inline-block text-xs font-medium uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: "#fff4cc", color: "#8a6200" }}
                >
                  Update {item.id}
                </span>
                {item.date && (
                  <span className="text-xs" style={{ color: "#9a9aaa" }}>
                    {item.date}
                  </span>
                )}
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: "#12113a" }}
              >
                {item.name}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#5a5a72", ...descriptionClampStyle }}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollCards("left")}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ border: "1px solid #ece9e0", background: "#ffffff" }}
            >
              <ChevronLeft className="h-4 w-4" style={{ color: "#12113a" }} />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollCards("right")}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ border: "1px solid #ece9e0", background: "#ffffff" }}
            >
              <ChevronRight className="h-4 w-4" style={{ color: "#12113a" }} />
            </button>
          </div>

          {showViewAll && (
            <Link
              href="/news"
              className="text-sm font-medium"
              style={{ color: "#c47f00" }}
            >
              View All
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
