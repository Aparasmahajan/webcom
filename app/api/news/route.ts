const SHEET_URL =
  "https://opensheet.elk.sh/1CvnNvrwaaHpA1w9acXdNQnYkuv7Ia5RGAmGwcITvPPI/News";

export const dynamic = "force-dynamic";

type RawNews = Record<string, string | undefined>;
type NewsItem = {
  id: string;
  name: string;
  description: string;
  date: string;
  orderBy: number;
};

const normalizeKey = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const pick = (row: RawNews, keys: string[]) => {
  const normalizedRow = Object.fromEntries(
    Object.entries(row).map(([key, value]) => [normalizeKey(key), value]),
  );

  for (const key of keys) {
    const value = normalizedRow[normalizeKey(key)];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
};

const parseDate = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return 0;

  const parts = trimmed.split(/[/-]/).map((part) => Number(part));
  if (parts.length === 3 && parts.every((part) => Number.isFinite(part))) {
    const [day, month, year] = parts;
    return new Date(year, month - 1, day).getTime();
  }

  const timestamp = Date.parse(trimmed);
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

export async function GET() {
  try {
    const res = await fetch(SHEET_URL, {
      cache: "no-store",
    });

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch news data" },
        { status: 502 },
      );
    }

    const data = (await res.json()) as RawNews[];

    const normalized: NewsItem[] = data
      .map((row, index) => ({
        id: pick(row, ["id", "ID"]) || String(index + 1),
        name: pick(row, [
          "name",
          "Name",
          "title",
          "Title",
          "heading",
          "Heading",
        ]),
        description: pick(row, ["description", "Description", "desc"]),
        date: pick(row, ["date", "Date", "news date", "News Date"]),
        orderBy: Number(
          pick(row, ["order by", "Order By", "orderby", "sort order"]) ||
            Number.MAX_SAFE_INTEGER,
        ),
      }))
      .filter((item) => item.name || item.description);

    normalized.sort((a, b) => {
      if (a.orderBy !== b.orderBy) {
        return a.orderBy - b.orderBy;
      }

      return parseDate(b.date) - parseDate(a.date);
    });

    return Response.json(normalized);
  } catch {
    return Response.json({ error: "Failed to fetch news data" }, { status: 500 });
  }
}
