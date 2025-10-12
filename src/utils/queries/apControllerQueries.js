const db = require('../../models/index')
const { v4: uuidv4 } = require('uuid');
const submoduloModel = db.ap_controller

module.exports = {
    Create(dato) {
        
       return submoduloModel.create(dato)
           .then(data => data)
           .catch(error => false)
    },
    list() {
        return submoduloModel.findAll()
           .then(data => data)
           .catch(error => false)
    },
    find (dato) {
        return submoduloModel.findAll({
            where: {
                nombre_submodulo: dato.nombre_submodulo,
            }
        })
        .then(data => data)
        .catch(error => false)
     },
     findDataOne(dato){
        return submoduloModel.findByPk(dato.controller)
        .then(data=>data)
        .catch(e=>false)
     }
   };