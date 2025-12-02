// api/saved-outfits.js (Vercel ESM API Route)
import { supabase } from "../lib/supabaseClient.js";

export async function POST(request) {
  try {
    const body = await request.json();

    const { place, temp_f, context, advice, observed_at } = body;

    if (!place || !temp_f || !context || !advice || !observed_at) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("saved_outfits")
      .insert([
        {
          place,
          temp_f,
          context,
          advice,
          observed_at,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error("Supabase error in /api/saved-outfits:", error);
      return new Response(
        JSON.stringify({ error: "Database insert failed", detail: error.message }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Unexpected error in /api/saved-outfits:", err);
    return new Response(
      JSON.stringify({ error: "Server error", detail: String(err) }),
      { status: 500 }
    );
  }
}

