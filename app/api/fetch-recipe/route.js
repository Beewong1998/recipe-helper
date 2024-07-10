import { NextResponse } from "next/server";
import recipeScraper from "recipe-scraper";

export async function POST(req) {
  try {
    const { url } = await req.json();

    // Validate URL
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const recipe = await recipeScraper(url);
    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);

    let errorMessage = "Error fetching recipe data";
    if (error.response) {
      errorMessage = `Server responded with status ${error.response.status}`;
    } else if (error.request) {
      errorMessage = "No response received from the server";
    } else {
      errorMessage = `Request error: ${error.message}`;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
