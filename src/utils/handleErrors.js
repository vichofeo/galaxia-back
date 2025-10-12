const { error } = require('winston')
const error_messages=[]
error_messages[4001] = '4001: Modelo de datos no definido. Error de Diseño'

module.exports = class HandleErrors {
    #_res
    #_message
    #_code
    #_objResponse
    #_logger
    constructor(res=null){
        if(HandleErrors.instance)
        return HandleErrors.instance

        this.#_res =  res
        this.#_code =  401
        this.#_message = "Existe un Error que impide continuar el proceso"
        this.#_logger = require('../config/logger')
        HandleErrors.instance =  this
    }

    setCode(code){
        this.#_code =  code        
    }
    setRes(res){
        this.#_res = res
    }
    setMessage(message){
        this.#_message = message
    }
     
    #setObjResponse(obj){
        this.#_objResponse= obj
    }
    handleHttpError(error){
        console.log("\n\n************Error para logs HANDLE-> INGRESO:\n\n", error)
        this.#_res.status(500) //condicion inesperada
        this.#_res.send({error: "ERROR", ok:false, message: this.#_message }) 
        this.#_logger.error(this.#_message+ '\n' + error)       
        return;    
    }
    setHttpError(error){
        console.log("\n\n************Error para logs SETHTTP-> INGRESO:\n\n", error)
        this.setCode(500)
        this.#setObjResponse({error: "ERROR", ok:false, message: this.#_message })
        this.#_logger.error(this.#_message + '\n' + error)
    }
    handleErrorResponse(payload={}){
        console.log("\n\n****Error pa log RESPONSE handleError\n\n", payload)
        this.#_res.json({ok: false,error: this.#_message, ...payload})
        this.#_logger.warn(this.#_message + '\n' + JSON.stringify(payload))
        return;
    }

    setHttpErrorResponse(payload={}){
        console.log("\n\n****Error pa log RESPONSE sethttpError\n\n", payload)
        this.setCode(203)
        this.#setObjResponse({error: this.#_message, ...payload})
        this.#_logger.error(this.#_message, +'\n'+ JSON.stringify(payload))
    }

    handleResponse(payload){
        //console.log("************************payload*************************", payload)
        try {
            if(payload){
                if(payload?.ok){
                    //console.log("\n\n************************POR ENVIAR*************************\n\n", payload.data)

                    this.#_res.json(payload)
                    //console.log("\n\n************************ENVIADO*************************\n\n")
                    return;
                }else{
                    console.log("\n\n  QUERIENDO ENVIAR ALGO \n\n")
                    this.handleErrorResponse(payload)
                }    
            }else return
            
        } catch (error) {
            console.log("************************HORRROR*************************", error)
            this.handleHttpError(error.message)
        }        
    }
    setResponse(payload){        
        try {
            if(payload){
                if(payload?.ok){
                    this.setCode(200)
                    this.#setObjResponse(payload)                    
                }else{                   
                                 
                    this.setHttpErrorResponse(payload)
                }    
            }else {                
                
                if(error_messages[this.#_message]){
                    this.setCode(200)
                    this.#setObjResponse({ok:false, message:error_messages[this.#_message]})
                }else{
                    this.setCode(409)
                    this.#setObjResponse({ok:false, message:"Conflicto"})
                }
                    
            }
            
        } catch (error) {            
            this.handleHttpError(error.message)
            this.setHttpError(error.message)
        }        
    }

    getCode() {return this.#_code}
    getResponse(){ return this.#_objResponse}
}