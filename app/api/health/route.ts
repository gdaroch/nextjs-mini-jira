import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/db/mongoose";

export async function GET() {
  await connectMongo();
  
  return NextResponse.json(
    {
      status: "ok",
      service: "mini-jira",
      time: new Date().toISOString(),
    },
    { status: 200 }
  );
}
