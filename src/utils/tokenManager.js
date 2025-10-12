// src/utils/tokenManager.js
const axios = require('axios');
const https = require('https');
require('dotenv').config();

const stHeaders = {
  "Access-Control-Allow-Origin": "*",
  'Accept': 'application/json',
  "Content-Type": "application/json",
  "Referrer-Policy": "no-referrer, strict-origin-when-cross-origin"
};

// 👇 Agente HTTPS que ignora validación del certificado (solo para pruebas)
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

let cachedToken = null;
let tokenExpiresAt = null;

async function getToken() {
  const now = Math.floor(Date.now() / 1000);

  if (cachedToken && tokenExpiresAt && now < tokenExpiresAt - 300) {
    return cachedToken;
  }

  try {
    const link = `${process.env.EXTERNAL_API_BASE_URL}/login`
    let credencial = {
      username: process.env.EXTERNAL_API_LOGIN,
      password: process.env.EXTERNAL_API_PASSWORD
    }
    console.log("\nCREDENCIALES", credencial)
    const response = await axios.post(link,
      credencial,
      {
        headers: stHeaders,
        timeout: 120000,
        httpsAgent
      }
    );
    console.log("resoyesta,", response.data)
    cachedToken = response.data.token;
    const expiresIn = response.data.expires_in || 21600;
    tokenExpiresAt = now + expiresIn;

    return cachedToken;
  } catch (error) {
    console.error("Error al obtener token:", error);
    throw new Error("Fallo al autenticar con el servicio externo.");
  }
}

module.exports = { getToken };
