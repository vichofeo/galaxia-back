const jwt = require('jsonwebtoken')

const tokenSign = async (payloadData) => {
  //console.log("\n\n sacando token ", process.env.JWT_SECRET, " ----------- carga:", payloadData, "\n\n")
  
  return jwt.sign(
    {
      usr: payloadData.login, //usr.usuario
      dni: payloadData.dni_persona, //usr._id
      app: payloadData.aplicacion_id,
      inst: payloadData.institucion_id,
      type: payloadData.tipo_institucion,
      time: new Date(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_TIME,
    }
  )
}

const filterHeaderTokenVerify=  (headerToken)=>{
  try {
    const token =  headerToken.split(" ").pop()
    return  verifyToken(token)
  } catch (error) {
    return null
  }

}

const verifyToken =  (token) =>{
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}
 
const decodeSign =  (token)=>{
    return jwt.decode(token, null)
}

module.exports = {
    tokenSign,
    verifyToken,
    filterHeaderTokenVerify,
    decodeSign
}