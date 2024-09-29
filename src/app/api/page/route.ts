import { EntrySkeletonType, createClient } from "contentful";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { convertEntry } from "@utils/data";

const client = createClient({
  accessToken: process.env.CONTENTFUL_API_KEY!,
  space: process.env.CONTENTFUL_SPACE_ID!,
  environment: process.env.CONTENTFUL_ENVIRONMENT_ID!,
});

const CACHE_DURATION = 3600;

const fetchQuery = async <T extends EntrySkeletonType>(
  id: string
): Promise<T> => convertEntry(await client.getEntry<T>(id, { include: 10 }));

export async function GET(request: NextRequest) {
  const pageId = request.nextUrl.searchParams.get("id");
  console.log(process.env);
  if (!pageId) notFound();
  try {
    const pageData = await fetchQuery(pageId);
    console.log(pageData);
    return NextResponse.json(pageData, {
      status: 200,
      headers: {
        "Cache-Control": `s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error("Error fetching response from Contentful:", error);
    return NextResponse.json(
      { error: "Failed to fetch response" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
