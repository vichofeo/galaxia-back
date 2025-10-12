const moduloService = require('./../../services/admin/AdminModService')
const subModuloService = require('./../../services/admin/AdminSubModService')
const cnfMcaService = require('./../../services/admin/AdminConfigModService')
const rolService = require('./../../services/admin/AdminRolService')
const rolCnfService = require('./../../services/admin/AdminConfigRolModService')

const accesoService =  require('./../../services/admin/AdminAccessService')
const pdmService = require('./../../services/admin/AdminPDMService')

const listar = async (req, res) => {
  const result = await moduloService.listar()

  res.json(result)
}

const guardar = async (req, res) => {
  const dataDto = req.body

  const result = await moduloService.guardar(dataDto)
  res.json(result)
}

//submodulo
const sblistar = async (req, res) => {
  const result = await subModuloService.listar()

  res.json(result)
}
const sbguardar = async (req, res) => {
  const dataDto = req.body

  const result = await subModuloService.guardar(dataDto)
  res.json(result)
}

//config app-mod-controller
const cnfListar = async (req, res) => {
  const dataDto = req.body
  const result = await cnfMcaService.listar(dataDto)
  res.json(result)
}

const cnfGuardar = async() =>{
  const dataDto = req.body

  const result = await cnfMcaService.guardar(dataDto)
  res.json(result)
}

const rollistar = async (req, res) => {
  const result = await rolService.listar()

  res.json(result)
}

const rolGuardar = async (req, res) => {
  const dataDto = req.body
  const result = await rolService.guardar(dataDto)

  res.json(result)
}

//config rol

const rolCnfListar = async( req, res)=>{
  const datoDto = req.body
  const result = await rolCnfService.listar(datoDto)
  res.json(result)
}

/**
 * Opciones para modulo visual de persona-login-rol
 */
const peopleSearch =  async (req, res)=>{
  const datoDto = req.body
  const result = await accesoService.searchPeople(datoDto)
  res.json(result)
}

const peopleDataCredencial =  async (req, res)=>{
  const datoDto = req.body
  const result = await accesoService.getDataCredencial(datoDto)
  res.json(result)
}

const peopleDataCredencialSave =  async (req, res)=>{
  const datoDto = req.body
  const result = await accesoService.creGuardar(datoDto)
  res.json(result)
}

//PDM
const getPais =  async (req, res)=>{
  const datoDto = req.body
  const result = await pdmService.getPais(datoDto)
  res.json(result)
}

const getDpto =  async (req, res)=>{
  const datoDto = req.body
  const result = await pdmService.getDpto(datoDto)
  res.json(result)
}

const getMuni =  async (req, res)=>{
  const datoDto = req.body
  const result = await pdmService.getMuni(datoDto)
  res.json(result)
}

module.exports = {
  listar, guardar,

  sblistar,sbguardar,

  cnfListar, cnfGuardar, 

  rollistar, rolGuardar, 

  rolCnfListar,
  peopleSearch, peopleDataCredencial, peopleDataCredencialSave,

  getPais, getDpto, getMuni
}
