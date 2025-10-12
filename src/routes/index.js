const fs = require("fs")
const express = require("express")

const router = express.Router()

const PATH_LOCAL = __dirname


const eraseExtension = (filename)=>{
    return filename.split('.').shift()
}
 fs.readdirSync(PATH_LOCAL).filter((file) =>{
    const name_file = eraseExtension(file)
    const skip = ['index'].includes(name_file)
    if (!skip){
        router.use(`/${name_file}`, require(`./${file}`))
    }
 })

 router.get('/', (req, res)=>{ res.render("index.html")})

 router.get('/test', (req, res)=>{ res.send("Acceso de prueba")})

 router.get('*', (req, res)=>{
   res.status(404) 

   res.send({error: 'Not Found'})
 })

 module.exports = router