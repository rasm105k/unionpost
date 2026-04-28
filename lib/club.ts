import { db, createSlug } from './db';

export interface Club {
  id: number;
  name: string;
  slug: string;
  email: string;
  password_hash: string;
  banner_image: string | null;
  created_at: string;
}

export function createClub(name: string, email: string, passwordHash: string, bannerImage?: string) {
  const slug = createSlug(name);
  const stmt = db.prepare('INSERT INTO clubs (name, slug, email, password_hash, banner_image) VALUES (?, ?, ?, ?, ?)');
  const result = stmt.run(name, slug, email, passwordHash, bannerImage || null);
  
  const id = Number(result.lastInsertRowid);
  db.prepare('INSERT INTO standings (club_id) VALUES (?)').run(id);
  
  return { id, name, slug, email, banner_image: bannerImage || null };
}

export function getClubs(): Club[] {
  return db.prepare('SELECT id, name, slug, email, banner_image, created_at FROM clubs ORDER BY name').all() as Club[];
}

export function getClubBySlug(slug: string): Club | undefined {
  return db.prepare('SELECT * FROM clubs WHERE slug = ?').get(slug) as Club | undefined;
}

export function getClubById(id: number): Club | undefined {
  return db.prepare('SELECT * FROM clubs WHERE id = ?').get(id) as Club | undefined;
}

export function verifyClub(email: string, passwordHash: string): Club | undefined {
  return db.prepare('SELECT * FROM clubs WHERE email = ? AND password_hash = ?').get(email, passwordHash) as Club | undefined;
}

export function updateBannerImage(clubId: number, bannerImage: string) {
  db.prepare('UPDATE clubs SET banner_image = ? WHERE id = ?').run(bannerImage, clubId);
}