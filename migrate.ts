import { db } from './lib/db';

db.exec(`ALTER TABLE clubs ADD COLUMN banner_image TEXT`);
console.log('Migration done');