import { db } from './lib/db';

db.prepare(`UPDATE clubs SET banner_image = 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?w=800' WHERE slug = 'manchester-united'`).run();
db.prepare(`UPDATE clubs SET banner_image = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800' WHERE slug = 'liverpool-fc'`).run();
db.prepare(`UPDATE clubs SET banner_image = 'https://images.unsplash.com/photo-1431324155629-1a371cafe2de?w=800' WHERE slug = 'arsenal-fc'`).run();

console.log('Banners added');