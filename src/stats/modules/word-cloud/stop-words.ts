const STOP_WORDS_ES = [
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'y', 'o', 'u', 'e', 'ni', 'pero', 'sino', 'aunque', 'porque',
  'que', 'qué', 'quien', 'quién', 'quienes', 'cual', 'cuál', 'cuales',
  'cuando', 'cuándo', 'donde', 'dónde', 'como', 'cómo', 'cuanto', 'cuánto',
  'de', 'del', 'en', 'a', 'al', 'con', 'por', 'para', 'sin', 'sobre', 'tras',
  'desde', 'hasta', 'entre', 'hacia', 'segun', 'según', 'ante',
  'mi', 'mí', 'tu', 'tú', 'el', 'él', 'ella', 'ellos', 'ellas',
  'nosotros', 'nosotras', 'vosotros', 'vosotras', 'usted', 'ustedes',
  'me', 'te', 'se', 'le', 'lo', 'los', 'las', 'les', 'nos', 'os',
  'mis', 'tus', 'sus', 'su', 'nuestro', 'nuestra', 'nuestros', 'nuestras',
  'vuestro', 'vuestra', 'vuestros', 'vuestras',
  'este', 'esta', 'esto', 'estos', 'estas', 'ese', 'esa', 'eso', 'esos', 'esas',
  'aquel', 'aquella', 'aquello', 'aquellos', 'aquellas',
  'si', 'sí', 'no', 'ya', 'aun', 'aún', 'tan', 'tanto', 'tampoco',
  'muy', 'mucho', 'mucha', 'muchos', 'muchas', 'poco', 'poca', 'pocos', 'pocas',
  'mas', 'más', 'menos', 'tambien', 'también', 'solo', 'sólo', 'todo', 'toda', 'todos', 'todas',
  'algo', 'algun', 'algún', 'alguna', 'alguno', 'algunos', 'algunas',
  'nada', 'ningun', 'ningún', 'ninguna', 'ninguno',
  'ser', 'es', 'son', 'soy', 'eres', 'somos', 'sois',
  'era', 'eras', 'eran', 'eramos', 'éramos', 'erais',
  'fue', 'fui', 'fuiste', 'fuimos', 'fuisteis', 'fueron',
  'sea', 'seas', 'seamos', 'sean', 'seais', 'seáis',
  'sera', 'será', 'seras', 'serás', 'seran', 'serán', 'seria', 'sería',
  'estar', 'estoy', 'estas', 'estás', 'esta', 'está', 'estamos', 'estais', 'estáis', 'estan', 'están',
  'estaba', 'estabas', 'estabamos', 'estábamos', 'estaban', 'estuve', 'estuviste', 'estuvo',
  'estuvimos', 'estuvieron',
  'haber', 'he', 'has', 'ha', 'hemos', 'habeis', 'habéis', 'han',
  'habia', 'había', 'habias', 'habías', 'habiamos', 'habíamos', 'habian', 'habían',
  'hay', 'habra', 'habrá', 'habran', 'habrán',
  'tener', 'tengo', 'tienes', 'tiene', 'tenemos', 'teneis', 'tenéis', 'tienen',
  'tenia', 'tenía', 'tenias', 'tenías', 'teniamos', 'teníamos', 'tenian', 'tenían',
  'tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvieron',
  'hacer', 'hago', 'haces', 'hace', 'hacemos', 'hacen', 'hacia', 'hacía', 'hice', 'hiciste', 'hizo',
  'ir', 'voy', 'vas', 'va', 'vamos', 'vais', 'van', 'iba', 'ibas', 'iban',
  'decir', 'digo', 'dice', 'dices', 'decimos', 'dicen', 'dije', 'dijo', 'dijiste',
  'ver', 'veo', 'ves', 've', 'vemos', 'veis', 'ven',
  'dar', 'doy', 'das', 'da', 'damos', 'dan',
  'poder', 'puedo', 'puedes', 'puede', 'podemos', 'pueden',
  'querer', 'quiero', 'quieres', 'quiere', 'queremos', 'quieren',
  'asi', 'así', 'entonces', 'pues', 'igual', 'vale', 'bueno', 'bien', 'mal',
  'jaja', 'jajaja', 'jajajaja', 'jajajajaja', 'jajajajajaja', 'jeje', 'jejeje',
  'jiji', 'jijiji', 'xd', 'xdd', 'xddd', 'xdddd',
  'ok', 'oki', 'okey', 'okay',
  'eh', 'ah', 'oh', 'uy', 'ay', 'ey',
  'ja', 'je', 'ji', 'jo', 'ju',
  'q', 'k', 'pq', 'xq', 'd', 'm', 't', 'x', 's', 'n',
];

const STOP_WORDS_WHATSAPP = [
  'multimedia', 'omitido', 'omitida', 'mensaje', 'eliminado', 'eliminada',
  'sticker', 'imagen', 'imagenes', 'imágenes', 'video', 'vídeo', 'videos', 'vídeos',
  'audio', 'audios', 'gif', 'documento', 'documentos',
  'http', 'https', 'www', 'com', 'org', 'es', 'net',
];

export const STOP_WORDS = new Set<string>(
  [...STOP_WORDS_ES, ...STOP_WORDS_WHATSAPP].map((w) => normalize(w)),
);

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}
