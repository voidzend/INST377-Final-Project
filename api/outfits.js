// api/outfits.js
import { supabase } from '../lib/supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { temp, context } = req.query;

  const tempF = parseInt(temp, 10);
  const ctx = (context || 'casual').toLowerCase();

  if (!Number.isFinite(tempF)) {
    return res.status(400).json({ error: 'Missing or invalid temp query parameter' });
  }

  try {
    // Find rules where min_temp <= tempF <= max_temp
    let query = supabase
      .from('outfit_rules')
      .select('*')
      .lte('min_temp', tempF)
      .gte('max_temp', tempF);

    if (ctx && ctx !== 'casual') {
      query = query.eq('context', ctx);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error in /api/outfits:', error);
      return res.status(500).json({ error: 'Database error', detail: error.message });
    }

    // Front-end expects an array
    return res.status(200).json(data || []);
  } catch (err) {
    console.error('Unexpected error in /api/outfits:', err);
    return res.status(500).json({ error: 'Server error', detail: String(err) });
  }
}
