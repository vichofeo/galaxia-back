
const db = require('../../models/index')
const personaModel = db.au_persona


module.exports = {
    Create(user) {
       return personaModel.create (user)
           .then(usr => usr)
           .catch(error => false)
    },
    list() {
        return personaModel.findAll()
           .then(usr => usr)
           .catch(error => false)
    },
    find (user) {
        return personaModel.findAll({
            where: {
                dni_persona: user.dni_persona,
            }
        })
        .then(usr => usr)
        .catch(error => false)
     },
     findUser(usr){
        return personaModel.findOne({where: {dni_persona: user.dni_persona}})
        .then(usr=>usr)
        .catch(e=>false)
     }
   };