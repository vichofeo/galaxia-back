const usrModel = require('./../utils/queries/auPersonaQueries')

const jwt = require('jsonwebtoken')
const config = require('./../config/config.cnf')
const bcrypt = require('bcrypt')

const listar = async () => await usrModel.list()

const login = async (usr) => {
  const result = await usrModel.findUser(usr)

  if (!result) return { mensaje: 'Usuario incorrecto', error: true }
  else {
    const aux = await bcrypt.compare(usr.password, result.password)
    if (aux) {
      const payload = {
        username: usr.usuario, //usr.usuario
        id: usr.id, //usr._id
        time: new Date(),
      }

      let token = jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_TIME,
      })

      return {
        mensaje: 'Bienvenido Al Sistema',
        access_token: token,
        pages: [],
        usuario: {
          id: usr.id,
          usuario: usr.usuario,
          email: usr.email,
          fecha: new Date(),
        },
        error: false,
      }
    } else {
      return { mensaje: 'Contraseña incorrecto', error: true }
    }
  }
}

const guardar = async (usr) => {
  //verifica si esta registrado
  const result = await usrModel.find(usr)
  
  if (result.length>0) {
    return { ok: false, mensaje: 'El usuario Introducido ya esta registrado' }
  } else {
    try {
      const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS)
      usr.password = await bcrypt.hash(usr.password, BCRYPT_SALT_ROUNDS)

      const user = await usrModel.Create(usr)

      return {
        ok: true,
        datos: user,
        mensaje: 'Usuario Registrado exitosamente',
      }
    } catch (error) {
      return {
        ok: false,
        mensaje: error,
      }
    }
  }
}
module.exports = {
  listar,
  login,
  guardar,
}
