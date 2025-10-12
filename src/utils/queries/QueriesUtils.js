const { where } = require("sequelize")
const { Op } = require('sequelize');

module.exports = class QueriesUtils {
  #table
  #sinDatoByCombo
  #initialByCombo
  constructor(table) {
    this.#table = table
    this.#sinDatoByCombo = { value: '-1', text: '-Sin Dato-' }
    this.#initialByCombo = { value: '-1', text: '-Todos-' }
  }
  /**
   * Insert data
   * @param {objDatos} dato 
   * @returns 
   */
  create(dato) {
    return this.#table
      .create(dato)
      .then((data) => data)
      /*.catch((error) => {
        console.log("Errr en la insercion ", error)
        console.log("Carga.......................... ", dato)*/

       // return false
     // })*/
  }
  /**
   * select * all
   * @returns Array
   */
  list() {
    return this.#table
      .findAll()
      .then((data) => data)
      .catch((error) => false)
  }
  /**
   * select * from where {}
   * @param {campo:valor, c2:v2 ....} whereObjDat 
   * @returns 
   */
  find(whereObjDat) {
    return this.#table
      .findAll({
        where: whereObjDat,
      })
      .then((data) => data)
      .catch((error) => false)
  }
  /**
   * select * from where id=??
   * @param {String} datoKey 
   * @returns 
   */
  findID(datoKey) {
    return this.#table
      .findByPk(datoKey)
      .then((data) => {
        //console.log("***********************************************************", data)
        return data ? data.dataValues : {}
      })
      .catch((e) => {
        console.log("%%%%%%%%%%%%%", e)
        return false
      })
  }
  /**
   * select ?? from where {..}
   * @param {attributes:[], where:{a:v, a2:v2 ....}} data 
   * @returns 
   */
  async findTune(data) {
    return this.#transformResultArray(await this.#table.findAll({
        attributes: data.attributes,
        where: data.where,
        order: data.order
      }))
      //.then((data) => this.#transformResultArray(data))
      //.catch((e) => e)
  }
  /**
   * select personalizado segun objeto de entrada
   * @param {attributes, where, includes, etc} data 
   * @returns 
   */
  async findTuneAdvanced(data) {
    return this.#transformResultArray(await this.#table.findAll(data))
      /*.then((data) => this.#transformResultArray(data))
      .catch((e) => {
        console.log("%%%%%%%%%%%%%", e)
        return false
      })*/
  }
  async findData1toNForCbx(dataCnf) {    
      const aux = await this.findTuneAdvanced(dataCnf)      
      const result = {}
      for (const element of aux) {        
        result[element.value] = element[dataCnf.alias]
      }
      return result
  }
  /**
   * update
   * @param {set:{a:v,a2:v2,....}, where:{a:v1,a2:v2...}} data 
   */
  async modify(data) {
    console.log("########### DATA MODIFY", data)
    /*this.#table.
      update(data.set, { where: data.where })
      .then((dato) => {
        console.log("=========== MODIFY(QUERYUTILS) eXITO:", dato)
        return dato
      })
      .catch((e) => {
        console.log("*****************MODIFICAN UUUUUUMall", e)
        return false
      })*/

      return await this.#table.update(data.set, { where: data.where })
  }
  /**
   * 
   * @param {'a1,a2'} textSeparatedComa 
   * @returns [[a1,value],[a2,text]]
   */
  transAttribByComboBox(textSeparatedComa) {
    try {
      const arr = textSeparatedComa.split(',')
      if (arr.length <= 0) return []
      else if (arr.length == 1)
        return [
          [arr[0], 'value'],
          [arr[0], 'text'],
        ]
      else
        return [
          [arr[0], 'value'],
          [arr[1], 'text'],
        ]
    } catch (error) {
      return []
    }
  }

  /**
   * transforma result a array normal
   * @param {results} datos 
   * @returns 
   */
  #transformResultArray(datos) {
    if (Array.isArray(datos))
      return datos.map((obj) => {
        if (obj.dataValues)
          return obj.dataValues
        else return obj
      })
    else return datos
  }



  /**
   * Busca opcion por defaul en coleccion de datos (value,text) para comboBox
   * @param {results} data 
   * @param {{value:xx, text:yy}} selected 
   * @returns 
   */
  searchBySelectedComboData(data, selected) {
    const datos = this.#transformResultArray(data)
    return this.searchBySelectedComboDataNotransform(datos, selected)
  }

  /**
   * Busca opcion por defaul en coleccion de datos (value,text) realizadas con query nativo para comboBox
   * @param {results} data 
   * @param {{value:xx, text:yy}} selected 
   * @returns 
   */
  searchBySelectedComboDataNotransform(data, selected) {
    try {
      const datos = data
      let i = 0
      let sw = 0
      for (const ii in datos) {
        sw = 1
        if (datos[ii].value == selected.value) {
          i = ii
          break
        }
      }

      if (sw) return datos[i]
      else return this.#sinDatoByCombo
    } catch (error) {
      console.log(error);
      return this.#sinDatoByCombo
    };


  }

  /**
   * devuelve los campos del cruce de datos usado con sequelice
   * @param {results} datos 
   * @param {String: alias tabla de cruce} campo 
   * @returns array[result]
   */
  modifyResultFindAdvanced(datos, campo) {
    return datos.map((obj) => {
      return obj[campo]
    })
  }

  modifyResultToArray(result) {
    return this.#transformResultArray(result)
  }

  OpOr(){
    return Op.or
  }
}
