const SHEET_URL =
  "https://opensheet.elk.sh/1CvnNvrwaaHpA1w9acXdNQnYkuv7Ia5RGAmGwcITvPPI/Certificate";

type RawCertificate = Record<string, string | undefined>;

const normalizeKey = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const pick = (row: RawCertificate, keys: string[]) => {
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

export async function GET() {
  try {
    const res = await fetch(SHEET_URL, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch certificate data" },
        { status: 502 },
      );
    }

    const data = (await res.json()) as RawCertificate[];

    const normalized = data.map((row) => ({
      certificate_number: pick(row, [
        "certificate_number",
        "Certificate Number",
        "certificate number",
        "certificateNumber",
        "certificate no",
      ]),
      name: pick(row, ["name", "Name", "student_name", "Student Name"]),
      father_name: pick(row, [
        "father_name",
        "Father Name",
        "father name",
        "Father's Name",
      ]),
      duration: pick(row, ["duration", "Duration"]),
      join_date: pick(row, [
        "join_date",
        "Join Date",
        "join date",
        "joining date",
        "Joining Date",
      ]),
      complete_date: pick(row, [
        "complete_date",
        "Complete Date",
        "complete date",
        "completion date",
        "Completion Date",
      ]),
      course: pick(row, ["course", "Course", "course name", "Course Name"]),
      issued: pick(row, [
        "issued",
        "Issued",
        "Issue Date",
        "issue_date",
        "issued date",
        "Issued Date",
      ]),
    }))
      .filter((row) => row.certificate_number);

    return Response.json(normalized);
  } catch {
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
