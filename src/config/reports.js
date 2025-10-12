const { estructura } = require("./parameters")

const REPORTS = {
  eess: {
    table:
      'ae_institucion aei, al_departamento dpto , ae_institucion ges,  r_institucion_salud ins',
    alias: 'Establecimiento',
    tipo: 'Count',
    campos: `dpto.nombre_dpto as "Departamento",   ges.nombre_corto AS "Ente Gestor", aei.nombre_institucion AS "Establecimiento", ins.snis AS "Con RUES" `,
    camposOcultos: [],
    rows: ['Departamento'],
    cols: ['Nivel Atencion'],
    mdi: 'mdi-hospital-building',
    key: ['ins.institucion_id'],
    precondicion: [
      'aei.institucion_id =  ins.institucion_id',
      'ges.institucion_id =  ins.ente_gestor_id',
      '(aei.cod_pais=dpto.cod_pais AND aei.cod_dpto= dpto.cod_dpto)',
      "aei.tipo_institucion_id = 'EESS'",
    ],

    referer: [
      { ref: 'r_is_atributo as ur', camporef: 'ur.atributo_id', camporefForeign: 'ins.urbano_rural', campos: 'ur.atributo AS ambito',},
      { ref: 'r_is_atributo as cla', camporef: 'cla.atributo_id', camporefForeign: 'ins.clase', campos: 'cla.atributo AS clase',},
      { ref: 'r_is_atributo as na', camporef: 'na.atributo_id', camporefForeign: 'ins.nivel_atencion', campos: 'na.atributo AS "Nivel Atencion"',},

      //{ ref: 'r_is_atributo as ha', camporef: 'ha.atributo_id', camporefForeign: 'ins.atencion_horario', campos: 'ha.atributo AS "Horario Atencion"',},
      //{ ref: 'r_is_atributo as cha', camporef: 'cha.atributo_id', camporefForeign: 'ins.atencion_horas', campos: 'cha.atributo AS "Horas Atencion"',},

      { ref: 'r_is_atributo as acc', camporef: 'acc.atributo_id', camporefForeign: 'ins.accesibilidad_eess', campos: 'acc.atributo AS "Accesibilidad"',},
      { ref: 'r_is_atributo as car', camporef: 'car.atributo_id', camporefForeign: 'ins.carretera_eess', campos: 'car.atributo AS "Carretera Acceso"',},

      //{ ref: 'r_is_atributo as crtr', camporef: 'crtr.atributo_id', camporefForeign: 'ins.ccaracteristicas_terreno', campos: 'crtr.atributo AS "Terreno"',},

      //por R3
      {ref: 'r_is_atributo as car01', camporef: 'car01.atributo_id', camporefForeign: 'ins.cascensor', campos: 'car01.atributo AS "Ascensor"'},
      {ref: 'r_is_atributo as car02', camporef: 'car02.atributo_id', camporefForeign: 'ins.crampas', campos: 'car02.atributo AS "Rampas"'},
      {ref: 'r_is_atributo as car03', camporef: 'car03.atributo_id', camporefForeign: 'ins.cplano_aprobado', campos: 'car03.atributo AS "Plano Aprobado"'},
      {ref: 'r_is_atributo as car04', camporef: 'car04.atributo_id', camporefForeign: 'ins.cplan_mantenimiento', campos: 'car04.atributo AS "Plan Mantenimiento"'},
      {ref: 'r_is_atributo as car05', camporef: 'car05.atributo_id', camporefForeign: 'ins.cescalera_emergencia', campos: 'car05.atributo AS "Escaleras Emergencia"'},
      {ref: 'r_is_atributo as car06', camporef: 'car06.atributo_id', camporefForeign: 'ins.cparqueo', campos: 'car06.atributo AS "Paqueo"'},

     // { ref: 'r_is_atributo as est', camporef: 'est.atributo_id', camporefForeign: 'ins.estructura_estado', campos: 'est.atributo AS "Estado Estructura"',},
      //{ ref: 'r_is_atributo as ebs', camporef: 'ebs.atributo_id', camporefForeign: 'ins.estructura_base', campos: 'ebs.atributo AS "Estructura Base"',},
      //{ ref: 'r_is_atributo as et', camporef: 'et.atributo_id', camporefForeign: 'ins.estructura_techo', campos: 'et.atributo AS "Tipo techo"',},
      //{ ref: 'r_is_atributo as ep', camporef: 'ep.atributo_id', camporefForeign: 'ins.estructura_piso', campos: 'ep.atributo AS "Tipo Piso"',},
      //{ ref: 'r_is_atributo as eae', camporef: 'eae.atributo_id', camporefForeign: 'ins.estructura_acabado_exterior', campos: 'eae.atributo AS "Acabado Exterior"',},
      //{ ref: 'r_is_atributo as eai', camporef: 'eai.atributo_id', camporefForeign: 'ins.estructura_acabado_interior', campos: 'eai.atributo AS "Acabado Interior"',},
    ],
  },
  servbas: {
    table:
      'ae_institucion aei, al_departamento dpto , ae_institucion ges,  r_institucion_salud ins',
    alias: 'Servicios Basicos',
    tipo: 'Count',
    campos: `dpto.nombre_dpto as "Departamento",   ges.nombre_corto AS "Ente Gestor", aei.nombre_institucion AS "Establecimiento", ins.snis AS "Con RUES" `,
    camposOcultos: [],
    rows: ['Departamento', 'Nivel Atencion'],
    cols: ['Internet', 'Empresa Internet', 'Financiamiento Internet'],
    mdi: 'mdi-ambulance',
    key: ['ins.institucion_id'],
    precondicion: [
      'aei.institucion_id =  ins.institucion_id',
      'ges.institucion_id =  ins.ente_gestor_id',
      '(aei.cod_pais=dpto.cod_pais AND aei.cod_dpto= dpto.cod_dpto)',
      "aei.tipo_institucion_id = 'EESS'",
    ],

    referer: [
      { ref: 'r_is_atributo as ur', camporef: 'ur.atributo_id', camporefForeign: 'ins.urbano_rural', campos: 'ur.atributo AS "Ambito"',},
      { ref: 'r_is_atributo as cla', camporef: 'cla.atributo_id', camporefForeign: 'ins.clase', campos: 'cla.atributo AS "Clase"',},
      { ref: 'r_is_atributo as na', camporef: 'na.atributo_id', camporefForeign: 'ins.nivel_atencion', campos: 'na.atributo AS "Nivel Atencion"',},

      { ref: 'r_is_atributo as cred', camporef: 'cred.atributo_id', camporefForeign: 'ins.cableado_red', campos: 'cred.atributo AS "Cableado Red"',},
      { ref: 'r_is_atributo as inter', camporef: 'inter.atributo_id', camporefForeign: 'ins.internet', campos: 'inter.atributo AS "Internet"',},
      { ref: 'r_is_atributo as einter', camporef: 'einter.atributo_id', camporefForeign: 'ins.empresa_internet', campos: 'einter.atributo AS "Empresa Internet"',},
      { ref: 'r_is_atributo as finter', camporef: 'finter.atributo_id', camporefForeign: 'ins.financiamiento_internet', campos: 'finter.atributo AS "Financiamiento Internet"',},
      { ref: 'r_is_atributo as tinter', camporef: 'tinter.atributo_id', camporefForeign: 'ins.tipo_internet', campos: 'tinter.atributo AS "Tipo Internet"',},

      { ref: 'r_is_atributo as cener', camporef: 'cener.atributo_id', camporefForeign: 'ins.con_energia', campos: 'cener.atributo AS "Cuenta con Energia"',},
      { ref: 'r_is_atributo as ener', camporef: 'ener.atributo_id', camporefForeign: 'ins.energia_electrica', campos: 'ener.atributo AS "Energia Electrica"',},
      { ref: 'r_is_atributo as tener', camporef: 'tener.atributo_id', camporefForeign: 'ins.tipo_energia', campos: 'tener.atributo AS "Tipo Energia Electrica"',},
      { ref: 'r_is_atributo as ilu', camporef: 'ilu.atributo_id', camporefForeign: 'ins.sistema_iluminacion', campos: 'ilu.atributo AS "Sistema Iluminacion"',},

      { ref: 'r_is_atributo as gas', camporef: 'gas.atributo_id', camporefForeign: 'ins.conexion_gas', campos: 'gas.atributo AS "Conexion Gas"',},

      { ref: 'r_is_atributo as agua', camporef: 'agua.atributo_id', camporefForeign: 'ins.agua', campos: 'agua.atributo AS "Agua"',},
      { ref: 'r_is_atributo as tagua', camporef: 'tagua.atributo_id', camporefForeign: 'ins.tratamiento_agua', campos: 'tagua.atributo AS "Tratamiento Agua"',},
      { ref: 'r_is_atributo as alca', camporef: 'alca.atributo_id', camporefForeign: 'ins.alcantarillado', campos: 'alca.atributo AS "Alcantarillado"',},
      { ref: 'r_is_atributo as dele', camporef: 'dele.atributo_id', camporefForeign: 'ins.del_excretas', campos: 'dele.atributo AS "Eliminacion de Excretas"',},

      { ref: 'r_is_atributo as tfija', camporef: 'tfija.atributo_id', camporefForeign: 'ins.telefonia_fija', campos: 'tfija.atributo AS "Telefonia Fija"',},
      { ref: 'r_is_atributo as tmovil', camporef: 'tmovil.atributo_id', camporefForeign: 'ins.telefonia_movil', campos: 'tmovil.atributo AS "Telefonia Movil"',},

      { ref: 'r_is_atributo as co', camporef: 'co.atributo_id', camporefForeign: 'ins.central_oxigeno', campos: 'co.atributo AS "Central Oxigeno"',},
      { ref: 'r_is_atributo as gm', camporef: 'gm.atributo_id', camporefForeign: 'ins.gas_medicinal', campos: 'gm.atributo AS "Gas Medicinal"',},
      { ref: 'r_is_atributo as fa', camporef: 'fa.atributo_id', camporefForeign: 'ins.filtro_aire', campos: 'fa.atributo AS "Filtro Aire"',},
      { ref: 'r_is_atributo as cli', camporef: 'cli.atributo_id', camporefForeign: 'ins.climatizacion', campos: 'cli.atributo AS "Climatizacion"',},

      { ref: 'r_is_atributo as tm', camporef: 'tm.atributo_id', camporefForeign: 'ins.taller_mantenimiento', campos: 'tm.atributo AS "Taller Mantenimiento"',},
      { ref: 'r_is_atributo as tr', camporef: 'tr.atributo_id', camporefForeign: 'ins.taller_reparacion', campos: 'tr.atributo AS "Taller reparacion"',},
      { ref: 'r_is_atributo as dc', camporef: 'dc.atributo_id', camporefForeign: 'ins.deposito_combustible', campos: 'dc.atributo AS "Deposito Combustible"',},
      { ref: 'r_is_atributo as oi', camporef: 'oi.atributo_id', camporefForeign: 'ins.otras_instalaciones', campos: 'oi.atributo AS "Otras Instalaciones"',},
    ],
  },
  tipoatcn: {
    table:
      'ae_institucion aei, al_departamento dpto , ae_institucion ges,  r_institucion_salud ins',
    alias: 'xxxTipo Atencion clasical',
    tipo: 'Sum',
    campos: `dpto.nombre_dpto as "Departamento",   ges.nombre_corto AS "Ente Gestor", aei.nombre_institucion AS "Establecimiento", ins.snis AS "Con RUES",  ins.camas_obs_emergencia AS "Camillas Emergencia", ins.camas_obs_preparto AS "Camas Obs. Preparto", ins.camas_internacion AS "Camas Internacion", ins.camas_uti AS "Camas UTI", ins.camas_uti_neonatal AS "Camas UTI Neonatal", ins.camas_uci  AS "Camas UCI", ins.camas_uci_neonatal  AS "Camas UCI Neonatal"`,
    camposOcultos: [
      'Camillas Emergencia',
      'Camas Obs. Preparto',
      'Camas Internacion',
      'Camas UTI',
      'Camas UTI Neonatal',
      'Camas UCI',
      'Camas UCI Neonatal',
    ],
    rows: ['Ente Gestor', 'Departamento'],
    cols: ['Nivel Atencion'],
    mdi: 'mdi-snowman',
    key: ['ins.institucion_id'],
    precondicion: [
      'aei.institucion_id =  ins.institucion_id',
      'ges.institucion_id =  ins.ente_gestor_id',
      '(aei.cod_pais=dpto.cod_pais AND aei.cod_dpto= dpto.cod_dpto)',
      "aei.tipo_institucion_id = 'EESS'",
    ],

    referer: [
      { ref: 'r_is_atributo as ur', camporef: 'ur.atributo_id', camporefForeign: 'ins.urbano_rural', campos: 'ur.atributo AS "Ambito"',},
      { ref: 'r_is_atributo as cla', camporef: 'cla.atributo_id', camporefForeign: 'ins.clase', campos: 'cla.atributo AS "Clase"',},
      { ref: 'r_is_atributo as na', camporef: 'na.atributo_id', camporefForeign: 'ins.nivel_atencion', campos: 'na.atributo AS "Nivel Atencion"',},
    ],
  },
  r3area: {
    table:
      'ae_institucion aei, al_departamento dpto , ae_institucion ges,  r_institucion_salud ins',
    alias: 'Areas',
    tipo: 'Sum',
    campos: `dpto.nombre_dpto as "Departamento",   ges.nombre_corto AS "Ente Gestor", aei.nombre_institucion AS "Establecimiento", ins.snis AS "Con RUES",  
    stra.nro_camas as "Nro de Camas", stra.nro_camillas as "Nro Camillas"`,
    camposOcultos: [
      'Nro de Camas',
      'Nro Camillas'      
    ],
    rows: ['Ente Gestor', 'Departamento'],
    cols: ['Area'],
    mdi: 'mdi-snowman',
    key: ['ins.institucion_id'],
    precondicion: [
      'stra.institucion_id =  ins.institucion_id',
      'aei.institucion_id =  ins.institucion_id',
      'ges.institucion_id =  ins.ente_gestor_id',
      '(aei.cod_pais=dpto.cod_pais AND aei.cod_dpto= dpto.cod_dpto)',
      "aei.tipo_institucion_id = 'EESS'",
    ],

    referer: [
      { ref: 'r_is_atributo as ur', camporef: 'ur.atributo_id', camporefForeign: 'ins.urbano_rural', campos: 'ur.atributo AS "Ambito"',},
      { ref: 'r_is_atributo as cla', camporef: 'cla.atributo_id', camporefForeign: 'ins.clase', campos: 'cla.atributo AS "Clase"',},
      { ref: 'r_is_atributo as na', camporef: 'na.atributo_id', camporefForeign: 'ins.nivel_atencion', campos: 'na.atributo AS "Nivel Atencion"',},
      {tabla: 'r_institucion_salud_areas stra'},
      { ref: 'r_is_atributo as s01', camporef: 's01.atributo_id', camporefForeign: 'stra.area', campos: 's01.atributo AS "Area"',},
      { ref: 'r_is_atributo as s02', camporef: 's02.atributo_id', camporefForeign: 'stra.ambiente', campos: 's02.atributo AS "Ambiente"',},
      { ref: 'r_is_atributo as s03', camporef: 's03.atributo_id', camporefForeign: 'stra.estado', campos: 's03.atributo AS "Estado"',},
    ],
  },
  estructura: {
    table:
      'ae_institucion aei, al_departamento dpto , ae_institucion ges,  r_institucion_salud ins',
    alias: 'Estructura',
    tipo: 'Count',
    campos: `dpto.nombre_dpto as "Departamento",   ges.nombre_corto AS "Ente Gestor", 
    aei.nombre_institucion AS "Establecimiento", ins.snis AS "Con RUES"`,
    camposOcultos: [],
    rows: ['Ente Gestor', 'Departamento'],
    cols: ['Clasificador','Material'],
    mdi: 'mdi-snowman',
    key: ['ins.institucion_id'],
    precondicion: [
      'stra.institucion_id =  ins.institucion_id',
      'aei.institucion_id =  ins.institucion_id',
      'ges.institucion_id =  ins.ente_gestor_id',
      '(aei.cod_pais=dpto.cod_pais AND aei.cod_dpto= dpto.cod_dpto)',
      "aei.tipo_institucion_id = 'EESS'",
    ],

    referer: [
      { ref: 'r_is_atributo as ur', camporef: 'ur.atributo_id', camporefForeign: 'ins.urbano_rural', campos: 'ur.atributo AS "Ambito"',},
      { ref: 'r_is_atributo as cla', camporef: 'cla.atributo_id', camporefForeign: 'ins.clase', campos: 'cla.atributo AS "Clase"',},
      { ref: 'r_is_atributo as na', camporef: 'na.atributo_id', camporefForeign: 'ins.nivel_atencion', campos: 'na.atributo AS "Nivel Atencion"',},
      {tabla: 'r_institucion_salud_estructura stra'},
      { ref: 'r_is_atributo as s01', camporef: 's01.atributo_id', camporefForeign: 'stra.estructura', campos: 's01.atributo AS "Clasificador"',},
      { ref: 'r_is_atributo as s02', camporef: 's02.atributo_id', camporefForeign: 'stra.material', campos: 's02.atributo AS "Material"',},
      { ref: 'r_is_atributo as s03', camporef: 's03.atributo_id', camporefForeign: 'stra.estado', campos: 's03.atributo AS "Estado"',},

    ],
  },
  infraestructura: {
    table:
      'ae_institucion aei, al_departamento dpto , ae_institucion ges,  r_institucion_salud ins',
    alias: 'xxxInfraestructura',
    tipo: 'Sum',
    campos: `dpto.nombre_dpto as "Departamento",   ges.nombre_corto AS "Ente Gestor", aei.nombre_institucion AS "Establecimiento", infra.cantidad as "Cantidad"`,
    camposOcultos: ['Cantidad'],
    rows: ['Ente Gestor', 'Servicio'],
    cols: ['Descripcion'],
    mdi: 'mdi-developer-board',
    key: ['ins.institucion_id'],
    precondicion: [
      'infra.institucion_id =  ins.institucion_id',
      'aei.institucion_id =  ins.institucion_id',
      'ges.institucion_id =  ins.ente_gestor_id',
      '(aei.cod_pais=dpto.cod_pais AND aei.cod_dpto= dpto.cod_dpto)',
      "aei.tipo_institucion_id = 'EESS'",
    ],

    referer: [
      { ref: 'r_is_atributo as ur', camporef: 'ur.atributo_id', camporefForeign: 'ins.urbano_rural', campos: 'ur.atributo AS "Ambito"',},
      { ref: 'r_is_atributo as cla', camporef: 'cla.atributo_id', camporefForeign: 'ins.clase', campos: 'cla.atributo AS "Clase"',},
      { ref: 'r_is_atributo as na', camporef: 'na.atributo_id', camporefForeign: 'ins.nivel_atencion', campos: 'na.atributo AS "Nivel Atencion"',},

      { tabla: 'r_institucion_salud_infraestructura infra' },

      { ref: 'r_is_atributo as isrv', camporef: 'isrv.atributo_id', camporefForeign: 'infra.servicio', campos: 'isrv.atributo AS "Servicio"',},
      { ref: 'r_is_atributo as idescr', camporef: 'idescr.atributo_id', camporefForeign: 'infra.descripcion', campos: 'idescr.atributo AS "Descripcion"',},
      { ref: 'r_is_atributo as istd', camporef: 'istd.atributo_id', camporefForeign: 'infra.estado', campos: 'istd.atributo AS "Estado"',},
      { ref: 'r_is_atributo as ifunc', camporef: 'ifunc.atributo_id', camporefForeign: 'infra.funcionamiento', campos: 'ifunc.atributo AS "Funcionamiento"',},
    ],
  },
  mobiliario: {
    table:
      'ae_institucion aei, al_departamento dpto , ae_institucion ges,  r_institucion_salud ins',
    alias: 'xxxMobiliario',
    tipo: 'Sum',
    campos: `dpto.nombre_dpto as "Departamento",   ges.nombre_corto AS "Ente Gestor", aei.nombre_institucion AS "Establecimiento", mobi.anio_compra as "Año Compra", mobi.cantidad as "Cantidad"`,
    camposOcultos: ['Cantidad'],
    rows: ['Ente Gestor', 'Servicio'],
    cols: ['Estado', 'Funcionamiento'],
    mdi: 'mdi-engine-outline',
    key: ['ins.institucion_id'],
    precondicion: [
      'mobi.institucion_id =  ins.institucion_id',
      'aei.institucion_id =  ins.institucion_id',
      'ges.institucion_id =  ins.ente_gestor_id',
      '(aei.cod_pais=dpto.cod_pais AND aei.cod_dpto= dpto.cod_dpto)',
      "aei.tipo_institucion_id = 'EESS'",
      "mobi.tipo_registro='MOBILIARIO'",
    ],

    referer: [
      { ref: 'r_is_atributo as ur', camporef: 'ur.atributo_id', camporefForeign: 'ins.urbano_rural', campos: 'ur.atributo AS "Ambito"',},
      { ref: 'r_is_atributo as cla', camporef: 'cla.atributo_id', camporefForeign: 'ins.clase', campos: 'cla.atributo AS "Clase"',},
      { ref: 'r_is_atributo as na', camporef: 'na.atributo_id', camporefForeign: 'ins.nivel_atencion', campos: 'na.atributo AS "Nivel Atencion"',},

      { tabla: 'r_institucion_salud_mobiliario mobi' },

      { ref: 'r_is_atributo as msrv', camporef: 'msrv.atributo_id', camporefForeign: 'mobi.servicio', campos: 'msrv.atributo AS "Servicio"',},
      { ref: 'r_is_atributo as mstd', camporef: 'mstd.atributo_id', camporefForeign: 'mobi.estado', campos: 'mstd.atributo AS "Estado"',},
      { ref: 'r_is_atributo as mfunc', camporef: 'mfunc.atributo_id', camporefForeign: 'mobi.funcionamiento', campos: 'mfunc.atributo AS "Funcionamiento"',},
      { ref: 'r_is_atributo as mffina', camporef: 'mffina.atributo_id', camporefForeign: 'mobi.fuente_financiamiento', campos: 'mffina.atributo AS "Fuente Financiamiento"',},
    ],
  },
  equipamiento: {
    table:
      'ae_institucion aei, al_departamento dpto , ae_institucion ges,  r_institucion_salud ins',
    alias: 'xxx Equipamiento',
    tipo: 'Sum',
    campos: `dpto.nombre_dpto as "Departamento",   ges.nombre_corto AS "Ente Gestor", aei.nombre_institucion AS "Establecimiento", mobi.anio_compra as "Año Compra", mobi.cantidad as "Cantidad"`,
    camposOcultos: ['Cantidad'],
    rows: ['Ente Gestor', 'Servicio'],
    cols: ['Fuente Financiamiento'],
    mdi: 'mdi-cart-plus',
    key: ['ins.institucion_id'],
    precondicion: [
      'mobi.institucion_id =  ins.institucion_id',
      'aei.institucion_id =  ins.institucion_id',
      'ges.institucion_id =  ins.ente_gestor_id',
      '(aei.cod_pais=dpto.cod_pais AND aei.cod_dpto= dpto.cod_dpto)',
      "aei.tipo_institucion_id = 'EESS'",
      "mobi.tipo_registro='EQUIPAMIENTO'",
    ],

    referer: [
      { ref: 'r_is_atributo as ur', camporef: 'ur.atributo_id', camporefForeign: 'ins.urbano_rural', campos: 'ur.atributo AS "Ambito"',},
      { ref: 'r_is_atributo as cla', camporef: 'cla.atributo_id', camporefForeign: 'ins.clase', campos: 'cla.atributo AS "Clase"',},
      { ref: 'r_is_atributo as na', camporef: 'na.atributo_id', camporefForeign: 'ins.nivel_atencion', campos: 'na.atributo AS "Nivel Atencion"',},

      { tabla: 'r_institucion_salud_mobiliario mobi' },

      { ref: 'r_is_atributo as msrv', camporef: 'msrv.atributo_id', camporefForeign: 'mobi.servicio', campos: 'msrv.atributo AS "Servicio"',},
      { ref: 'r_is_atributo as mstd', camporef: 'mstd.atributo_id', camporefForeign: 'mobi.estado', campos: 'mstd.atributo AS "Estado"',},
      { ref: 'r_is_atributo as mfunc', camporef: 'mfunc.atributo_id', camporefForeign: 'mobi.funcionamiento', campos: 'mfunc.atributo AS "Funcionamiento"',},
      { ref: 'r_is_atributo as mffina', camporef: 'mffina.atributo_id', camporefForeign: 'mobi.fuente_financiamiento', campos: 'mffina.atributo AS "Fuente Financiamiento"',},
    ],
  },
  r3mobiliario: {
    table:'ae_institucion aei, al_departamento dpto , ae_institucion ges, r_institucion_salud ins',
    alias: 'Mobiliario',
    tipo: 'Sum',
    campos: `dpto.nombre_dpto as "Departamento",   ges.nombre_corto AS "Ente Gestor", aei.nombre_institucion AS "Establecimiento", ins.snis AS "Con RUES",     
    mobi.anio_compra as "Año Compra", mobi.cantidad as "Cantidad"`,
    camposOcultos: ['Cantidad'],
    rows: ['Ente Gestor', 'Area'],
    cols: ['Mobiliario'],
    mdi: 'mdi-engine-outline',
    key: ['ins.institucion_id'],
    precondicion: [
      'stra.area_id=mobi.area_id',
      'stra.institucion_id=ins.institucion_id',      
      'aei.institucion_id =  ins.institucion_id',
      'ges.institucion_id =  ins.ente_gestor_id',
      '(aei.cod_pais=dpto.cod_pais AND aei.cod_dpto= dpto.cod_dpto)',
      "aei.tipo_institucion_id = 'EESS'",
      "mobi.tipo_registro='MOBILIARIO'",
    ],

    referer: [
      { ref: 'r_is_atributo as ur', camporef: 'ur.atributo_id', camporefForeign: 'ins.urbano_rural', campos: 'ur.atributo AS "Ambito"',},
      { ref: 'r_is_atributo as cla', camporef: 'cla.atributo_id', camporefForeign: 'ins.clase', campos: 'cla.atributo AS "Clase"',},
      { ref: 'r_is_atributo as na', camporef: 'na.atributo_id', camporefForeign: 'ins.nivel_atencion', campos: 'na.atributo AS "Nivel Atencion"',},

      {tabla: 'r_institucion_salud_areas stra'},
      { ref: 'r_is_atributo as s01', camporef: 's01.atributo_id', camporefForeign: 'stra.area', campos: 's01.atributo AS "Area"',},
      { ref: 'r_is_atributo as s02', camporef: 's02.atributo_id', camporefForeign: 'stra.ambiente', campos: 's02.atributo AS "Ambiente"',},
      
      { tabla: 'r_institucion_salud_areas_mobequi mobi' },

      { ref: 'r_is_atributo as m01', camporef: 'm01.atributo_id', camporefForeign: 'mobi.tipo', campos: 'm01.atributo AS "Mobiliario"',},
      { ref: 'r_is_atributo as m02', camporef: 'm02.atributo_id', camporefForeign: 'mobi.descripcion', campos: 'm02.atributo AS "Detalle Mobiliario"',},
      { ref: 'r_is_atributo as m03', camporef: 'm03.atributo_id', camporefForeign: 'mobi.estado', campos: 'm03.atributo AS "Estado"',},
      { ref: 'r_is_atributo as m04', camporef: 'm04.atributo_id', camporefForeign: 'mobi.financiamiento', campos: 'm04.atributo AS "Fuente Financiamiento"',},
      { ref: 'r_is_atributo as m05', camporef: 'm05.atributo_id', camporefForeign: 'mobi.funcionamiento', campos: 'm05.atributo AS "Funcionamiento"',},
      { ref: 'r_is_atributo as m06', camporef: 'm06.atributo_id', camporefForeign: 'mobi.en_mantenimiento', campos: 'm06.atributo AS "En Manteniemiento"',},
      { ref: 'r_is_atributo as m07', camporef: 'm07.atributo_id', camporefForeign: 'mobi.en_uso', campos: 'm07.atributo AS "En Uso"',},

    ],
  },
  r3equipamiento: {
    table:'ae_institucion aei, al_departamento dpto , ae_institucion ges, r_institucion_salud ins',
    alias: 'Equipamiento',
    tipo: 'Sum',
    campos: `dpto.nombre_dpto as "Departamento",   ges.nombre_corto AS "Ente Gestor", aei.nombre_institucion AS "Establecimiento", ins.snis AS "Con RUES",     
    mobi.anio_compra as "Año Compra", mobi.cantidad as "Cantidad"`,
    camposOcultos: ['Cantidad'],
    rows: ['Ente Gestor', 'Area'],
    cols: ['Equipamiento'],
    mdi: 'mdi-engine-outline',
    key: ['ins.institucion_id'],
    precondicion: [
      'stra.area_id=mobi.area_id',
      'stra.institucion_id=ins.institucion_id',      
      'aei.institucion_id =  ins.institucion_id',
      'ges.institucion_id =  ins.ente_gestor_id',
      '(aei.cod_pais=dpto.cod_pais AND aei.cod_dpto= dpto.cod_dpto)',
      "aei.tipo_institucion_id = 'EESS'",
      "mobi.tipo_registro='EQUIPAMIENTO'",
    ],

    referer: [
      { ref: 'r_is_atributo as ur', camporef: 'ur.atributo_id', camporefForeign: 'ins.urbano_rural', campos: 'ur.atributo AS "Ambito"',},
      { ref: 'r_is_atributo as cla', camporef: 'cla.atributo_id', camporefForeign: 'ins.clase', campos: 'cla.atributo AS "Clase"',},
      { ref: 'r_is_atributo as na', camporef: 'na.atributo_id', camporefForeign: 'ins.nivel_atencion', campos: 'na.atributo AS "Nivel Atencion"',},

      {tabla: 'r_institucion_salud_areas stra'},
      { ref: 'r_is_atributo as s01', camporef: 's01.atributo_id', camporefForeign: 'stra.area', campos: 's01.atributo AS "Area"',},
      { ref: 'r_is_atributo as s02', camporef: 's02.atributo_id', camporefForeign: 'stra.ambiente', campos: 's02.atributo AS "Ambiente"',},
      
      { tabla: 'r_institucion_salud_areas_mobequi mobi' },

      { ref: 'r_is_atributo as m01', camporef: 'm01.atributo_id', camporefForeign: 'mobi.tipo', campos: 'm01.atributo AS "Equipamiento"',},
      { ref: 'r_is_atributo as m02', camporef: 'm02.atributo_id', camporefForeign: 'mobi.descripcion', campos: 'm02.atributo AS "Detalle Equipamiento"',},
      { ref: 'r_is_atributo as m03', camporef: 'm03.atributo_id', camporefForeign: 'mobi.estado', campos: 'm03.atributo AS "Estado"',},
      { ref: 'r_is_atributo as m04', camporef: 'm04.atributo_id', camporefForeign: 'mobi.financiamiento', campos: 'm04.atributo AS "Fuente Financiamiento"',},
      { ref: 'r_is_atributo as m05', camporef: 'm05.atributo_id', camporefForeign: 'mobi.funcionamiento', campos: 'm05.atributo AS "Funcionamiento"',},
      { ref: 'r_is_atributo as m06', camporef: 'm06.atributo_id', camporefForeign: 'mobi.en_mantenimiento', campos: 'm06.atributo AS "En Manteniemiento"',},
      { ref: 'r_is_atributo as m07', camporef: 'm07.atributo_id', camporefForeign: 'mobi.en_uso', campos: 'm07.atributo AS "En Uso"',},

    ],
  },
  personal: {
    table:
      'ae_institucion aei, al_departamento dpto , ae_institucion ges,  r_institucion_salud ins',
    alias: 'Personal',
    tipo: 'Count',
    campos: `dpto.nombre_dpto as "Departamento",   ges.nombre_corto AS "Ente Gestor", aei.nombre_institucion AS "Establecimiento", per.item_desc_text as "Contrato Descripcion" `,
    camposOcultos: [],
    rows: ['Ente Gestor', 'Departamento'],
    cols: ['Nivel Instruccion', 'Item o Contrato'],
    mdi: 'mdi-human-male-female',
    key: ['ins.institucion_id'],
    precondicion: [
      'per.institucion_id =  ins.institucion_id',
      'aei.institucion_id =  ins.institucion_id',
      'ges.institucion_id =  ins.ente_gestor_id',
      '(aei.cod_pais=dpto.cod_pais AND aei.cod_dpto= dpto.cod_dpto)',
      "aei.tipo_institucion_id = 'EESS'",
    ],

    referer: [
      { ref: 'r_is_atributo as ur', camporef: 'ur.atributo_id', camporefForeign: 'ins.urbano_rural', campos: 'ur.atributo AS "Ambito"',},
      { ref: 'r_is_atributo as cla', camporef: 'cla.atributo_id', camporefForeign: 'ins.clase', campos: 'cla.atributo AS "Clase"',},
      { ref: 'r_is_atributo as na', camporef: 'na.atributo_id', camporefForeign: 'ins.nivel_atencion', campos: 'na.atributo AS "Nivel Atencion"',},

      { tabla: 'r_institucion_salud_personal per' },

      { ref: 'r_is_atributo as pic', camporef: 'pic.atributo_id', camporefForeign: 'per.item_contrato', campos: 'pic.atributo AS "Item o Contrato"',},
      { ref: 'r_is_atributo as picd', camporef: 'picd.atributo_id', camporefForeign: 'per.item_contrato_desc', campos: 'picd.atributo AS "Item Descrcipcion "',},
      { ref: 'r_is_atributo as pam', camporef: 'pam.atributo_id', camporefForeign: 'per.ambito', campos: 'pam.atributo AS "Tipo Rural o Urbano"',},
      { ref: 'r_is_atributo as pni', camporef: 'pni.atributo_id', camporefForeign: 'per.nivel_instruccion', campos: 'pni.atributo AS "Nivel Instruccion"',},
      { ref: 'r_is_atributo as ppo', camporef: 'ppo.atributo_id', camporefForeign: 'per.profesion_ocupacion', campos: 'ppo.atributo AS "Profesion/Ocupacion"',},
      { ref: 'r_is_atributo as ppoi', camporef: 'ppoi.atributo_id', camporefForeign: 'per.profesion_ocupacion_especifica', campos: 'ppoi.atributo AS "Profesion/Ocupacion Especifica"',},
      { ref: 'r_is_atributo as pdcm', camporef: 'pdcm.atributo_id', camporefForeign: 'per.descripcion_cargo', campos: 'pdcm.atributo AS "Descripcion Cargo segun Memo"',},
      { ref: 'r_is_atributo as pcl', camporef: 'pcl.atributo_id', camporefForeign: 'per.carga_laboral', campos: 'pcl.atributo AS "Carga Laboral"',},
      { ref: 'r_is_atributo as ppr', camporef: 'ppr.atributo_id', camporefForeign: 'per.personal_rotatorio', campos: 'ppr.atributo AS "Personal Rotatorio"',},
    ],
  },
  snis310: {
    table:
      'ae_institucion aei, al_departamento dpto , ae_institucion ges, s301 as sn,  r_institucion_salud ins',
    alias: 'SNIS F.301',
    tipo: 'Sum',
    campos: `dpto.nombre_dpto as "Departamento",   ges.nombre_corto AS "Ente Gestor", aei.nombre_institucion AS "Establecimiento", ins.snis AS "Con RUES", sn.formulario, sn.grupo, sn.variable, sn.subvariable, sn.totalv as "Total Varones", sn.totalm as "Total Mujeres", sn.totalg as "Total total", gestion, mes_name as "Mes" `,
    camposOcultos: ['Total Varones', 'Total Mujeres', 'Total total'],
    rows: ['Departamento', 'Ente Gestor', 'formulario'],
    cols: ['grupo'],
    mdi: 'mdi-snowman',
    key: ['ins.institucion_id'],
    precondicion: [
      'sn.codigo= ins.codigo',
      'aei.institucion_id =  ins.institucion_id',
      'ges.institucion_id =  ins.ente_gestor_id',
      '(aei.cod_pais=dpto.cod_pais AND aei.cod_dpto= dpto.cod_dpto)',
      "aei.tipo_institucion_id = 'EESS'",
    ],

    referer: [
      { ref: 'r_is_atributo as ur', camporef: 'ur.atributo_id', camporefForeign: 'ins.urbano_rural', campos: 'ur.atributo AS "Ambito"',},
      { ref: 'r_is_atributo as cla', camporef: 'cla.atributo_id', camporefForeign: 'ins.clase', campos: 'cla.atributo AS "Clase"',},
      { ref: 'r_is_atributo as na', camporef: 'na.atributo_id', camporefForeign: 'ins.nivel_atencion', campos: 'na.atributo AS "Nivel Atencion"',},
    ],
  },
  acrehab: {
    table:
      'r_institucion_salud_acrehab ah, ae_institucion aei, ae_institucion eg,  al_departamento dpto, r_is_atributo a2, r_is_atributo a3, r_institucion_salud isld',
    alias: 'Acreditacion/habilitacion',
    tipo: 'Count',
    campos: ` eg.nombre_corto as "Ente Gestor", dpto.nombre_dpto as "Departamento", aei.nombre_institucion as "Establecimiento",    
    a2.atributo AS "Estado", 
    ah.gestion_registro as "Gestion Registro", 
    ah.nro_ra as "Numero R.A.", 
    ah.fecha_ra as "Fecha R.A.", 
    ah.vigencia_anios as "Vigencia en años", 
    ( ah.fecha_ra + (ah.vigencia_anios * '1 year'::INTERVAL))::date AS fecha_vencimiento,    
    CASE  WHEN (( ah.fecha_ra + (ah.vigencia_anios * '1 year'::INTERVAL))::DATE - NOW()::DATE)<0 THEN 'Periodo Vigencia CONCLUIDO'  ELSE 'Restan: '||(( ah.fecha_ra + (ah.vigencia_anios * '1 year'::INTERVAL))::DATE - NOW()::DATE) || ' dias.' END AS "Estado de Vigencia",  CASE  WHEN (( ah.fecha_ra + (ah.vigencia_anios * '1 year'::INTERVAL))::DATE - NOW()::DATE)>60  THEN 'Vigente'  WHEN (( ah.fecha_ra + (ah.vigencia_anios * '1 year'::INTERVAL))::DATE - NOW()::DATE)>0 and (( ah.fecha_ra + (ah.vigencia_anios * '1 year'::INTERVAL))::DATE - NOW()::DATE) <=60   THEN 'Vencimiento proximo'  WHEN (( ah.fecha_ra + (ah.vigencia_anios * '1 year'::INTERVAL))::DATE - NOW()::DATE)<0 THEN 'Vencido'  ELSE 'N/A' END  AS "Alerta", ah.puntaje, ah.tipo_registro as "Tipo de Registro",  a3.atributo AS "Estado Activo" ,        isld.snis AS "Con RUES" `,
    camposOcultos: [],
    rows: ['Departamento'],
    cols: ['Tipo de Registro', 'Alerta'],
    mdi: 'mdi-hospital-building',
    key: ['isld.institucion_id'],
    precondicion: [
      'ah.institucion_id =  isld.institucion_id',
      'isld.institucion_id =  aei.institucion_id',
      'isld.ente_gestor_id =  eg.institucion_id',
      'dpto.cod_pais= aei.cod_pais',
      'dpto.cod_dpto= aei.cod_dpto',
      'a2.atributo_id= ah.estado_acrehab ',
      'a3.atributo_id= ah.activo',
    ],

    referer: [
      { ref: 'r_is_atributo as ur', camporef: 'ur.atributo_id', camporefForeign: 'isld.urbano_rural', campos: 'ur.atributo AS Ambito',},
      { ref: 'r_is_atributo as cla', camporef: 'cla.atributo_id', camporefForeign: 'isld.clase', campos: 'cla.atributo AS clase',},
      { ref: 'r_is_atributo as na', camporef: 'na.atributo_id', camporefForeign: 'isld.nivel_atencion', campos: 'na.atributo AS "Nivel Atencion"',},
    ],
  },
 
}

module.exports = {
  REPORTS,
}
