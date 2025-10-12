const { QueryTypes } = require("sequelize");
const db = require('../models/index');
const QueriesUtils = require("../utils/queries/QueriesUtils");
const sequelize = db.sequelize

const recibe = async (req, res) => {
    let data = req.body
console.log("#############", data)
    
data = JSON.stringify(data)

//data={nombre:"juanito", apellido:"pedrito"}
//    console.log("datppppppp", data)


    let query = `INSERT INTO hl7 (hl7)
VALUES ('${data}')`

    await sequelize.query(query, { mapToModel: true, type: QueryTypes.INSERT, raw: false, });

    res.json({
        ok: true,
        message: "exito"
    })
}



const muestra = async (req, res) => {

    const query = `select hl7 from hl7`

    const result =  await sequelize.query(query, {mapToModel: true, type: QueryTypes.SELECT, raw: false})

    res.json({
        ok:true,
        message: result
    })
    
}

const borrar = async (req, res) => {

    const query = `delete from hl7`

    await sequelize.query(query, {mapToModel: true, type: QueryTypes.DELETE, raw: false})

    res.json({
        ok:true,
        message: "borrado exitoso"
    })
    
}
const tmp = async (req, res) =>{

    try{let query = `SELECT * FROM tmp`
    let result =  await sequelize.query(query, {mapToModel: true, type: QueryTypes.SELECT, raw: false})

    for (const key in result) {
        
        query = `SELECT * FROM au_persona where dni_persona= '${result[key].dni_persona}'`
        let r =  await sequelize.query(query, {mapToModel: true, type: QueryTypes.SELECT, raw: false})
        if(r.length<=0){
            //inserta
            query = ` INSERT INTO  au_persona(dni_persona, dni, dni_complemento, fecha_nacimiento,
                primer_apellido, segundo_apellido, casada_apellido, nombres,
                estado_civil, genero, nacionalidad
                ) values ('${result[key].dni_persona}', '${result[key].dni}', 
                ${result[key].dni_complemento? "'"+result[key].dni_complemento+"'": null }, 
                '${result[key].fecha_nacimiento}',
                    '${result[key].primer_apellido}', 
                    '${result[key].segundo_apellido}', 
                    '${result[key].casada_apellido}', 
                    '${result[key].nombres}',
                    ${result[key].estado_civil? "'"+result[key].estado_civil+"'":null }, 
                    ${result[key].genero? "'"+result[key].genero+"'":null}, 
                    ${result[key].nacionalidad? "'"+result[key].nacionalidad+"'": null}
                    )`
        await sequelize.query(query, { mapToModel: true, type: QueryTypes.INSERT, raw: false, });       
        }
    }

    res.json({
        ok: realizado
    })
}catch(e){
    res.json({
        e: e
    })
    }
    
    

}

const tmp2 = async (req, res) =>{

    try{let query = `SELECT * FROM dr04_responsables`
    let result =  await sequelize.query(query, {mapToModel: true, type: QueryTypes.SELECT, raw: false})

    for (const key in result) {
        
        query = `SELECT * FROM au_persona where dni_persona= '${result[key].ci}'`
        let r =  await sequelize.query(query, {mapToModel: true, type: QueryTypes.SELECT, raw: false})
        if(r.length<=0){
            //inserta
            query = ` INSERT INTO  au_persona(dni_persona, dni,
                primer_apellido, segundo_apellido,  nombres,
                nacionalidad
                ) values ('${result[key].ci}', '${result[key].ci}',                 
                    '${result[key].primer_apellido}', 
                    '${result[key].segundo_apellido}',                     
                    '${result[key].nombres}',                    
                    'NAL017'
                    )`
        await sequelize.query(query, { mapToModel: true, type: QueryTypes.INSERT, raw: false, });       
        }
    }

    res.json({
        ok: realizado
    })
}catch(e){
    console.log(e)
    res.json({
        e: e
    })
    }
    
    

}

const unouno = async (req, res) =>{
    const modelo =  db.r_is_atributo
    const pp = new QueriesUtils(modelo)
    const cnf = {
        attributes: [['atributo_id','VALUE']],        
        include: [{
            model: modelo,
            as: 'grplinkn',
            attributes: pp.transAttribByComboBox('atributo_id,atributo'), 
            where:{grupo_atributo: 'PERGRUPOPROFESPECIFICA'},
          }]
          
    }

    const results =  await pp.findTuneAdvanced(cnf)

    res.json({
        results: results
    })
}
module.exports = {
    recibe, muestra, borrar, tmp, tmp2,
    unouno,
}