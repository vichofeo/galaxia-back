/**
 * Servicio de utilitarios q participan de forma generica en los otros servicios
 */
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const config = require("./../config/config.cnf");

/**
 * Obtiene datos de la session 
 * @param String token 
 * @returns {}
 */
const getCnfApp = (token) => {
    let tk = token.split(' ')[1];
    const ops = jwt.verify(tk, config.JWT_SECRET)
    return ops
}

/**
 * Genera password 
 * @param String login 
 * @param String pass 
 * @returns password: encryotado
 */
const genPass = async (login, pass) => {

    const passs = pass //login + pass    
    const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS)
    const hash = await bcrypt.hash(passs, BCRYPT_SALT_ROUNDS)
    return hash
}

module.exports = {
    getCnfApp, genPass
}