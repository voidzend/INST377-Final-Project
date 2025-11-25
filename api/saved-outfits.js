// api/saved-outfits.js
import { supabase } from '../lib/supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};

    const place = body.place || null;
    const tempF = body.temp_f;
    const context = body.context;
    const advice = body.advice;
    const observedAt = body.observed_at || null;

    if (!Number.isFinite(tempF) || !context || !advice) {
      return res.status(400).json({
        error: 'Missing required fields',
        detail: 'temp_f (number), context (string), advice (string) are required'
      });
    }

    const { data, error } = await supabase
      .from('saved_outfits')
      .insert({
        place,
        temp_f: tempF,
        context,
        advice,
        observed_at: observedAt
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error in /api/saved-outfits:', error);
      return res.status(500).json({ error: 'Database error', detail: error.message });
    }

    return res.status(201).json({ success: true, saved: data });
  } catch (err) {
    console.error('Unexpected error in /api/saved-outfits:', err);
    return res.status(500).json({ error: 'Server error', detail: String(err) });
  }
}
