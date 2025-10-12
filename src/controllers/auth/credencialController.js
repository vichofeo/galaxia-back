const {matchedData} = require("express-validator")
const credencialService = require('./../../services/CredencialService')

const HandleErrors = require('./../../utils/handleErrors')
const handleError = new HandleErrors()
//const requestIp = require('request-ip')

const login = async (req, res) => {
  handleError.setRes(res)
  const body =  matchedData(req)
  const usrDTO = body//req.body
  //usrDTO.ip = requestIp.getClientIp(req).toString()
  
  const user = await credencialService.login(usrDTO, handleError)
  handleError.handleResponse(user)
}

const guardar = async (req, res) => {
  handleError.setRes(res)
  const usrDto = req.body
  const result = await credencialService.guardar(usrDto, handleError)
  handleError.handleResponse(result)
  
}

const getLogin = async (req, res) => {
  handleError.setRes(res)
  const token = req.headers.authorization
  const usrDTO = { token: token }
  const user = await credencialService.getLogin(usrDTO, handleError)  
  handleError.handleResponse(user)
  //res.json(user)
}

const getLoginApp = async (req, res) => {
  handleError.setRes(res)
  const token = req.headers.authorization
  const usrDTO = { token: token }
  const user = await credencialService.getLoginApp(usrDTO, handleError)  
  handleError.handleResponse(user)
  //res.json(user)
}

const listar = async (req, res) => {
  const result = await credencialService.listar()

  res.json(result)
}



const modify = async (req, res) => {
  const token = req.headers.authorization
  const usrDto = { token: token, ...req.body }
  const result = await credencialService.modify(usrDto, handleError)
  handleError.handleResponse(result)
  //res.json(result)
}

module.exports = {
  login,
  getLogin,
  listar,
  guardar,
  modify,
  getLoginApp
}
