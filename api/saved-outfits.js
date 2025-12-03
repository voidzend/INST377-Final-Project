// api/saved-outfits.js
import { supabase } from '../lib/supabaseClient.js';

export async function POST(request) {
  try {
    const body = await request.json();
    const { place, temp_f, context, advice, observed_at } = body;

    const { data, error } = await supabase
      .from('saved_outfits')
      .insert([{ place, temp_f, context, advice, observed_at }]);

    if (error) {
      console.error("Insert error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Unexpected server error:", err);
    return new Response(JSON.stringify({ error: "Unexpected server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
