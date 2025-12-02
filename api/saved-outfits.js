// pages/api/saved-outfits.js
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { place, temp_f, context, advice } = req.body;

    const { data, error } = await supabase
      .from('saved_outfits')
      .insert([{ place, temp_f, context, advice }]);

    if (error) return res.status(500).json({ error: error.message });

    return res.status(201).json({ message: 'Saved outfit successfully', data });
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('saved_outfits')
      .select('place, temp_f, context, advice')
      .order('observed_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

