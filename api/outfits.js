// api/outfits.js (Vercel ESM handler)
import { supabase } from "../lib/supabaseClient.js";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const temp = searchParams.get("temp");
    const context = searchParams.get("context") || "casual";

    const tempF = parseInt(temp, 10);
    const ctx = context.toLowerCase();

    if (!Number.isFinite(tempF)) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid temp query parameter" }),
        { status: 400 }
      );
    }

    // Query Supabase for rules
    let query = supabase
      .from("outfit_rules")
      .select("*")
      .lte("min_temp", tempF)
      .gte("max_temp", tempF);

    if (ctx !== "casual") {
      query = query.eq("context", ctx);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error:", error);
      return new Response(
        JSON.stringify({ error: "Database error", detail: error.message }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify(data || []), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Server error", detail: String(err) }),
      { status: 500 }
    );
  }
}
