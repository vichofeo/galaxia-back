const listar = (req, res)=>{
res.send("Luistanbdo")
}

const guardar = (req, res)=>{
    const datos = req.body
    res.send("guardando")
}

const modificar =(req,res)=>{
    const id = req.params.id
    res.send("modificando")
}
//exporta metodos
module.exports = {
    listar,
    guardar,
    modificar
}