import { existsSync, readdirSync } from 'fs';
import { resolve } from 'path';

// Ein Set speichert Dateinamen und erlaubt blitzschnelle Abfragen
let imageCache = new Set();

export function refreshImageCache() {
  try {
    const dir = resolve('wwwroot/images/popup');
    // Wir lesen alle Dateinamen im popup-Ordner
    const files = readdirSync(dir);
    imageCache = new Set(files.map(f => f.toLowerCase()));
    console.log(`Image Cache refreshed: ${imageCache.size} images found.`);
  } catch (e) {
    console.error("Could not refresh image cache:", e.message);
  }
}

// Die neue, synchrone Prüfung
export function imageExistsInCache(filename) {
  if (!filename) return false;
  // Wir extrahieren den reinen Dateinamen aus dem Pfad /popup/Name.jpg
  const pureName = filename.split('/').pop().toLowerCase();
  return imageCache.has(pureName);
}
