//console.log("probando la importacion")
//console.log(require('./utils/tokenManager'))
// testToken.js
const { getToken } = require('./services/services/AuthService');

getToken().then(token => {
  console.log("TOKEN:", token);
}).catch(err => {
  console.error("Error:", err.message);
});