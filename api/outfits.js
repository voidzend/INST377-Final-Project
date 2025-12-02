// api/saved-outfits.js (Vercel ESM handler)
import { supabase } from '../lib/supabaseClient.js';

// GET  /api/saved-outfits
// Optional query param: ?context=work|school|casual|date|gym
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const context = searchParams.get('context');

    let query = supabase
      .from('saved_outfits')
      .select('*')
      .order('created_at', { ascending: false });

    if (context) {
      query = query.eq('context', context.toLowerCase());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error in GET /api/saved-outfits:', error);
      return new Response(
        JSON.stringify({ error: 'Database error', detail: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(data || []), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Unexpected error in GET /api/saved-outfits:', err);
    return new Response(
      JSON.stringify({ error: 'Server error', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// POST /api/saved-outfits
// Body JSON: { temp_f, context, advice, place, observed_at }
export async function POST(request) {
  try {
    const body = await request.json();

    const row = {
      temp_f: body.temp_f ?? null,
      context: body.context ? body.context.toLowerCase() : null,
      advice: body.advice ?? null,
      place: body.place ?? null,
      observed_at: body.observed_at ?? null
    };

    const { data, error } = await supabase
      .from('saved_outfits')
      .insert(row)
      .select()
      .single();

    if (error) {
      console.error('Supabase error in POST /api/saved-outfits:', error);
      return new Response(
        JSON.stringify({ error: 'Database insert error', detail: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Unexpected error in POST /api/saved-outfits:', err);
    return new Response(
      JSON.stringify({ error: 'Server error', detail: String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

