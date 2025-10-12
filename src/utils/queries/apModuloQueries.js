const db = require('../../models/index')
const { v4: uuidv4 } = require('uuid');
const moduloModel = db.ap_modulo
 
module.exports = {
    Create(dato) {
        dato.modulo_id = uuidv4()
       return moduloModel.create(dato)
           .then(data => data)
           .catch(error => false)
    },
    list() {
        return moduloModel.findAll()
           .then(data => data)
           .catch(error => false)
    },
    find (dato) {
        return moduloModel.findAll({
            where: {
                nombre_modulo: dato.nombre_modulo,
            }
        })
        .then(data => data)
        .catch(error => false)
     },
     findDataOne(dato){
        return moduloModel.findByPk(dato.modulo_id)
        .then(data=>data)
        .catch(e=>false)
     }
   };