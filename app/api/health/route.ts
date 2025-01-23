import * as fs from "node:fs";

export async function GET() {
  const files = fs.readdirSync(".");
  return Response.json({ cwd: process.cwd(), files });
}
