const multer = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./public/images")
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({
    storage
}).single('imagen')

/* Controllers */
const  authMiddleWare = require('./../middlewares/authMiddleware')

const  credencialController = require('./../controllers/auth/credencialController')
const moduloController = require('../controllers/admin/adminController')

const menuController =  require('../controllers/admin/menuController')
const egController = require('../controllers/georef/egController')
const reportController =  require('../controllers/georef/reportsController')

const snis =  require('../controllers/fsnis/fsnisController')

const frmsController = require('../controllers/frms/frmsController')

//const hl7 = require('../controllers/hl7Controller')

//define rutas de la aplicacion en una sola funcion 
const rutas = (app) => {
   app.get('/', (req, res)=>{ res.render("index.html")})

   app.get('/api/test', (req, res)=>{ res.send("Acceso de prueba")})
   //inicio de session
   app.post('/api/login', credencialController.login)
   app.post('/api/getUsrLgn',authMiddleWare.verifyAuth , credencialController.getLogin )

   // ****opciones para prototipo de control de usuario, deprecated
   //usrOptions
   app.get('/api/usr', authMiddleWare.verifyAuth ,credencialController.listar)
   app.post('/api/usr', credencialController.guardar)
   app.put('/api/usr', authMiddleWare.verifyAuth,  credencialController.modify)

   //admin
   app.get("/api/admin/module", authMiddleWare.verifyAuth, moduloController.listar)
   app.post("/api/admin/module", authMiddleWare.verifyAuth, moduloController.guardar)
   //controller
   app.get("/api/admin/submodule", authMiddleWare.verifyAuth, moduloController.sblistar)
   app.post("/api/admin/submodule", authMiddleWare.verifyAuth, moduloController.sbguardar)

   //cnf mod
   app.post("/api/admin/mca", authMiddleWare.verifyAuth, moduloController.cnfListar)
   app.post("/api/admin/mcai", authMiddleWare.verifyAuth, moduloController.cnfGuardar)

   //rol
   app.get("/api/admin/croles", authMiddleWare.verifyAuth, moduloController.rollistar)
   app.post("/api/admin/croles", authMiddleWare.verifyAuth, moduloController.rolGuardar)

   //config rol
   app.post("/api/admin/rolemod", authMiddleWare.verifyAuth, moduloController.rolCnfListar)

    //usuarios
  app.post("/api/admin/people", authMiddleWare.verifyAuth, moduloController.peopleSearch)
  app.post("/api/admin/getDataConfigCre", authMiddleWare.verifyAuth, moduloController.peopleDataCredencial)
  //app.post("/api/admin/saveConfigCre", authMiddleWare.verifyAuth, moduloController.peopleDataCredencialSave)

  //PAIS DPTO MUN
  app.post("/api/admin/pais", authMiddleWare.verifyAuth, moduloController.getPais)
  app.post("/api/admin/dpto", authMiddleWare.verifyAuth, moduloController.getDpto)
  app.post("/api/admin/muni", authMiddleWare.verifyAuth, moduloController.getMuni)

  //app.post("/gestores", productoController.getGestor)
  //app.post("/establecimientos", productoController.getESalud)

  //datos para menu de opciones segun: ASSUS, EG, EESS
  app.get("/api/geo/menu", authMiddleWare.verifyAuth, menuController.menuGeoreferencia)

  //datos para modulo de georeferencia e informacion de establecimiento
  app.get("/api/geo/ssepi/:idx", authMiddleWare.verifyAuth, egController.dataEESS)
  app.put("/api/geo/ssepi", authMiddleWare.verifyAuth, egController.saveDataEESS)
  app.get("/api/geo/ssepi/:idx/:modelo", authMiddleWare.verifyAuth, egController.getDataFrmGroupModel)
  
  //mi establecimiento: para usuario de un solo establecimiento
  app.get("/api/geo/eess/:modelo", authMiddleWare.verifyAuth, egController.getDataModelParam)
  app.get("/api/geo/eess/:idx/:modelo", authMiddleWare.verifyAuth, egController.getDataFrmByModel)
  app.post("/api/geo/eess/get", authMiddleWare.verifyAuth, egController.getDataModelByIdxParam)
  
  //llama comboxs personalizado con dependientes de acreditacion/habilitacion, datos para combodependencias
  app.post("/api/geo/eess/cbox", authMiddleWare.verifyAuth, egController.cbxUtil)
  app.post("/api/geo/eess/cboxAcre", authMiddleWare.verifyAuth, egController.cbxUtilAcreHab)

  app.post("/api/geo/eess", authMiddleWare.verifyAuth, egController.saveDataModelByIdxParam)
  app.post("/api/geo/eess/save", authMiddleWare.verifyAuth, egController.saveDataModifyInsertByModel)

  //opciones submodulo de usuarios: pide datos de todos, individual y guarda datos
  app.get("/api/geo/weusers", authMiddleWare.verifyAuth, egController.weUsersget)
  app.get("/api/geo/weusers/:idx", authMiddleWare.verifyAuth, egController.weUserget)
  app.post("/api/geo/weuser", authMiddleWare.verifyAuth, egController.weUserSave)
  
  //mis establecimientos: servicio que entrega datos de los establecimientos segun tipo de usuario
  app.get("/api/geo/miseess", authMiddleWare.verifyAuth, egController.misEess)

   ///Repportes: dinamicos para todos los modulos
  app.get("/api/geo/reportgral/:model", authMiddleWare.verifyAuth, reportController.getReports)

  //Grupo para formularios SNIS
  app.post("/api/snis/f301", authMiddleWare.verifyAuth, snis.fsnisReportParams)

  //para fmormularios personalizado
  app.post("/api/frms/:modelo", authMiddleWare.verifyAuth, frmsController.getfrmsConstuct)
  app.get("/api/frms/:idx", authMiddleWare.verifyAuth, frmsController.getFrmsInfo)
  app.get("/api/cnffrms/:modelo", authMiddleWare.verifyAuth, frmsController.getCnfForms)
  app.get("/api/cnffrms/:idx/:modelo", authMiddleWare.verifyAuth, frmsController.getCnfFormswIdx)
  app.post("/api/cnffrms", authMiddleWare.verifyAuth, frmsController.saveCnfForms)

/*
  app.post('/api/hl7', hl7.recibe)
  //app.get('/api/hl7', hl7.muestra)
  app.get('/api/hl7', hl7.unouno)
  app.delete('/api/hl7', hl7.borrar)
  //app.post('/api/hl7', hl7.tmp2)
*/


};

module.exports={
    rutas
}
