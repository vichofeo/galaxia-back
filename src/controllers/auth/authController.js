

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config/config.cnf')
const credencialModel = require('../../models').apu_credencial

async function ingresar(req, res) {
  const usr = await credencialModel.findOne({
    where: { usuario: req.body.usuario }
  })
  if (!usr) 
  res.json({ mensaje: 'Usuario incorrecto', error: true })

  else if (await bcrypt.compare(req.body.password, usr.password)) {
    const payload = {
      username: usr.usuario, //usr.usuario
      id: usr.id, //usr._id
      time: new Date(),
    }

    let token = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_TIME,
    })

    res.json({
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
    })
  } else {
    res.json({ mensaje: 'Contraseña incorrecto', error: true })
  }
}

module.exports = {
  ingresar,
}
