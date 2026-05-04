const SHEET_URL =
  "https://opensheet.elk.sh/1CvnNvrwaaHpA1w9acXdNQnYkuv7Ia5RGAmGwcITvPPI/Certificate";

type RawCertificate = Record<string, string | undefined>;

const pick = (row: RawCertificate, keys: string[]) => {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) return value.trim();
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
      ]),
      name: pick(row, ["name", "Name", "student_name", "Student Name"]),
      father_name: pick(row, [
        "father_name",
        "Father Name",
        "father name",
        "Father's Name",
      ]),
      duration: pick(row, ["duration", "Duration"]),
      join_date: pick(row, ["join_date", "Join Date", "join date"]),
      complete_date: pick(row, [
        "complete_date",
        "Complete Date",
        "complete date",
      ]),
      course: pick(row, ["course", "Course"]),
      issued: pick(row, ["issued", "Issued", "Issue Date", "issue_date"]),
    }));

    return Response.json(normalized);
  } catch {
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
