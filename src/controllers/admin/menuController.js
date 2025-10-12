const menuGeoRef = require('../../services/admin/MenuService')
const HandleErrors = require('../../utils/handleErrors')
const handleError  = new HandleErrors()

const menuGeoreferencia = async (req, res) => {
  try {
    handleError.setRes(res)
    const token = req.headers.authorization    
    const result = await menuGeoRef.menuGeoreferencia(token, handleError)
    res.json(result)
   //handleError.handleResponse(result)  
  } catch (error) {
    console.log("-------------------ERROR-------------------", error.message)
  }
  
}
const menuOpsRole = async (req, res)=>{
  handleError.setRes(res)
    const token = req.headers.authorization

    const result = await menuGeoRef.getMenuOpsRole({token:token}, handleError)
    handleError.setResponse(result)
    res.status(handleError.getCode()).json(handleError.getResponse())
}
module.exports = {
  menuGeoreferencia,
  menuOpsRole
}
