/*const redis = require('redis');
const { promisify } = require('util');

let client;
if (process.env.REDIS_URL) {
  client = redis.createClient(process.env.REDIS_URL);
} else {
  client = redis.createClient();
}

// Usa promesas en lugar de callbacks
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

module.exports = {
  get: getAsync,
  set: (key, value, ttl) => setAsync(key, value, 'EX', ttl),
  del: delAsync,
};*/

// Simulación de caché en memoria
let memoryCache = {};

// Función para limpiar entradas expiradas (opcional)
function cleanExpiredCache() {
  const now = Date.now();
  Object.keys(memoryCache).forEach(key => {
    if (memoryCache[key].expiry && memoryCache[key].expiry <= now) {
      delete memoryCache[key];
    }
  });
}

module.exports = {
  // Obtener valor
  get: (key) => {
    cleanExpiredCache(); // Limpiar antes de buscar
    const item = memoryCache[key];
    if (item && (!item.expiry || item.expiry > Date.now())) {
      return Promise.resolve(item.value);
    }
    return Promise.resolve(null); // No encontrado o expirado
  },

  // Guardar valor con tiempo de vida (TTL en segundos)
  set: (key, value, ttl) => {
    const expiry = ttl ? Date.now() + ttl * 1000 : null;
    memoryCache[key] = { value, expiry };
    return Promise.resolve('OK');
  },

  // Eliminar valor
  del: (key) => {
    const exists = memoryCache.hasOwnProperty(key);
    delete memoryCache[key];
    return Promise.resolve(exists ? 1 : 0);
  },
};