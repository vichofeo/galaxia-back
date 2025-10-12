const usrService = require('./../../services/UsrService')

const login = async (req, res) =>{
  const usrDTO = req.body

  const user = await usrService.login(usrDTO)

  res.json(user)
}

const listar = async (req, res)=>{
  const result = await usrService.listar()  
  
  res.json(result)
}

const guardar = async (req,res) =>{
  const usrDto = req.body
const result = await usrService.guardar(usrDto)
res.json(result)
}

module.exports = {
  login,
  listar,
  guardar
}