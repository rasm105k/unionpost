import { supabase, createSlug } from './supabase';

export interface Club {
  id: number;
  name: string;
  slug: string;
  email: string;
  password_hash: string;
  banner_image: string | null;
  created_at: string;
}

export async function createClub(name: string, email: string, passwordHash: string, bannerImage?: string) {
  const slug = createSlug(name);
  
  const { data, error } = await supabase
    .from('clubs')
    .insert({ name, slug, email, password_hash: bannerImage || null })
    .select()
    .single();
  
  if (error) throw error;
  
  await supabase.from('standings').insert({ club_id: data.id });
  
  return { id: data.id, name: data.name, slug: data.slug, email: data.email, banner_image: data.banner_image };
}

export async function getClubs(): Promise<Club[]> {
  const { data } = await supabase.from('clubs').select('*').order('name');
  return data || [];
}

export async function getClubBySlug(slug: string): Promise<Club | null> {
  const { data } = await supabase.from('clubs').select('*').eq('slug', slug).single();
  return data;
}

export async function getClubById(id: number): Promise<Club | null> {
  const { data } = await supabase.from('clubs').select('*').eq('id', id).single();
  return data;
}

export async function verifyClub(email: string, passwordHash: string): Promise<Club | null> {
  const { data } = await supabase
    .from('clubs')
    .select('*')
    .eq('email', email)
    .eq('password_hash', passwordHash)
    .single();
  return data;
}

export async function updateBannerImage(clubId: number, bannerImage: string) {
  await supabase.from('clubs').update({ banner_image: bannerImage }).eq('id', clubId);
}