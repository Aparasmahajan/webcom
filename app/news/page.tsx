import NewsFeed from "../../src/components/NewsFeed";

export default function NewsPage() {
  return (
    <div
      className="min-h-screen py-12"
      style={{ background: "#f7f5f0", fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-medium uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{ background: "#fff4cc", color: "#8a6200", border: "1px solid #f0d060" }}
          >
            News
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "#12113a" }}
          >
            All News & Updates
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#5a5a72" }}>
            The latest announcements and updates from Webcom, sorted by priority and date.
          </p>
        </div>

        <NewsFeed variant="list" />
      </div>
    </div>
  );
}
