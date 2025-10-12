// utils/tokenManager.js
const axios = require('axios');
//const https = require('https');
require('dotenv').config();

/*const httpsAgent = new https.Agent({
  rejectUnauthorized: false // 🔥 Ignora la validación del certificado
});-**/

let cachedToken = null;
let tokenExpiresAt = null;

async function getToken() {
  const now = Math.floor(Date.now() / 1000); // en segundos

  // ¿Token válido aún?
  if (cachedToken && tokenExpiresAt && now < tokenExpiresAt - process.env.TOKEN_EXPIRATION_BUFFER) {
    return cachedToken;
  }
  /*if (cachedToken && tokenExpiresAt && now < tokenExpiresAt - 300) {
    return cachedToken;
  }*/

  // Solicitar nuevo token
  try {
    const urls = `${process.env.EXTERNAL_API_BASE_URL}/login`
    console.log("dir::", urls)
    const response = await axios.post(urls, {
      username: process.env.EXTERNAL_API_LOGIN,
      password: process.env.EXTERNAL_API_PASSWORD
    });

    cachedToken = response.data.access_token;
    const expiresIn = response.data.expires_in || 21600; // por defecto 6 horas
    tokenExpiresAt = now + expiresIn;


    console.log("token devuelto::", response)

    return cachedToken;
  } catch (error) {
    console.log("eerro en el token:::", error)
    console.error("Error al obtener token:", error.response?.data || error.message);
    throw new Error("Fallo al autenticar con el servicio externo.");
  }
}

module.exports = { getToken };
