import { EntrySkeletonType, createClient } from "contentful";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { convertEntry } from "@utils/data";

const client = createClient({
  accessToken: process.env.CONTENTFUL_API_KEY!,
  space: process.env.CONTENTFUL_SPACE_ID!,
  environment: process.env.CONTENTFUL_ENVIRONMENT_ID!,
});


export const fetchQuery = async <T extends EntrySkeletonType>(
  id: string
): Promise<T> => convertEntry(await client.getEntry<T>(id, { include: 10 }));