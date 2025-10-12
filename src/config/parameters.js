//[label, editable, requerido, <T?:texto, C:combo, R:Radio, H:checkBox, F: fecha>, tamanio]
/**
 * objeto de configuracion para diversas pantallas
 * campos:[label, editable, requerido, <T?:texto, C:combo, R:Radio, H:checkBox, F: fecha>, tamanio, Reservado]
 * T?->TT: texto, TN: texto numero entero, TM: TextMail, TD: Texto decimal, TA: Text Area
 * use-se la opcion dual cuando la interaccion y la insercion es con tablas de bd
 */
"use strict"

const { evaluacion } = require("../services/acrehab/parameters");

const PARAMETROS = {
    eess: {
        table: 'r_institucion_salud',
        alias: 'Ubicacion',
        cardinalidad: "1",
        dual:['eess','institucion'],
        campos: {
            
            ciudad: ['Ciudad', true, true, 'TT', 64],
            zona_barrio: ['Zona / Barrio', true, true, 'TT',128],
            avenida_calle: ['Avenida / Calle', true, true, 'TT', 128],
            cod_municipio: ['Localidad', true, true, 'C'],
            latitud: ['Latitud', false, true, 'TD'],
            longitud: ['Longitud', false, true, 'TD'],
                        
            accesibilidad_eess: ['Accesibilidad', true, false, 'C'],
            carretera_eess: ['Via de Acceso', true, false, 'C'],
        },
        key: ['institucion_id'],
        keyDual:['institucion_id','institucion_id'],
        update: [],
        referer: [
            //{ ref: 'institucion', camporef: 'institucion_id', camporefForeign: 'ente_gestor', campos: ['nombre_institucion'], alias: 'ente_gestor', condicion: { institucion_id: 'xx' } },
            
            { ref: 'institucion', camporef: 'institucion_id', camporefForeign: 'ciudad', campoLink:'institucion_id' ,campos: ['ciudad'], alias: null, condicion: null },
            { ref: 'institucion', camporef: 'institucion_id', camporefForeign: 'zona_barrio', campoLink:'institucion_id', campos: ['zona_barrio'], alias: null, condicion: null },
            { ref: 'institucion', camporef: 'institucion_id', camporefForeign: 'avenida_calle', campoLink:'institucion_id', campos: ['avenida_calle'], alias: null, condicion: null },

            { ref: 'localidad', camporef: 'cod_dpto', camporefForeign: 'cod_municipio', campoLink:'cod_dpto', alias: 'cod_pais', campos: ['cod_municipio', 'nombre_municipio'], condicion: 'BO' },

            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'accesibilidad_eess', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: '06ACCESIBILIDAD' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'carretera_eess', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: '06CARRETERA' },
        ],
    },
    institucion: {
        table: 'r_institucion_salud',
        alias: 'Identificacion',
        cardinalidad: "1",
        dual: ['institucion','eess'],
        campos: {
            codigo: ['Codigo Institucion', false, true, 'TT',16],

            nombre_institucion: ['Nombre del Establecimiento de Salud', false, true, 'TT', 80],
            nombre_corto: ['Nombre Corto o Abrev.', false, true, 'TT',10],
            urbano_rural: ['Area', true, true, 'C'],

            tipo_red_id: ['Red', true, false, 'C'],

            subsector: ['Sub Sector', false, true, 'C'],
            ente_gestor: ['Institucion', false, true, 'TT',80],
            nivel_atencion: ['Nivel de Atencion', false, true, 'C'],
            clase: ['Clase', true, true, 'C'],
            
            nit: ['NIT', true, false, 'TT',24],
            no_ra: ['No. Resolucion Administrativa', true, false, 'TT',24],

            fecha_creacion: ['Fecha de Creacion', true, true, 'F'],
            fecha_actividades: ['Fecha inicio Actidades', true, true, 'F'],
            direccion_web: ['Direccion web', true, true, 'TT',128],
            correo_electronico: ['Correo electronico', true, true, 'TM',64],
            telefono: ['Telefono', true, true, 'TN',24],
            fax: ['Fax', true, true, 'TN',24],
            telefono_emergencia: ['Telefono emergencias', true, true, 'TN',24],
        },
        key: ['institucion_id'],
        keyDual:['institucion_id','institucion_id'],
        update: [],
        referer: [
            { ref: 'institucion', camporef: 'institucion_id', camporefForeign: 'ente_gestor', campoLink:'ente_gestor_id' ,campos: ['nombre_institucion'], alias: null, condicion: null },
            
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'urbano_rural', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AREA' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'subsector', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'SUBSECTOR' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'nivel_atencion', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'NIVELATENCION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'clase', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'CLASE' },
            
            
            
            
        ],
    },
    propietario: {
        table: 'r_institucion_salud',
        alias: 'Propietario',
        cardinalidad: "1",
        campos: {
            pro_nit: ['NIT', true, false, 'TT',24],
            pro_razon_social: ['Razon Social', true, true, 'TT',128],
            pro_direccion: ['Direccion Completa', true, true, 'TA',3500],
            pro_telefono: ['Telefono', true, true, 'TN',24],
            pro_fax: ['Fax', true, false, 'TN',24],
            pro_pag_web: ['Pagina Web', true, false, 'TT',128],
            pro_correo_electronico: ['Correo Electronico', true, false, 'TM',64],

        },
        key: ['institucion_id'],
        update: [],
        referer: [],
    },
    responsable: {
        table: 'r_institucion_salud_responsable',
        alias: 'Responsable',
        dual: ['responsable','personal'],
        cardinalidad: "1",
        campos: {
            tipo_dni: ['Tido de identificacion', false, true, 'C'],
            dni: ['Numero Documento', false, true, 'TN',24],
            dni_complemento: ['Complemento', false, true, 'TT',2],

            primer_apellido: ['Primer Apellido', true, true, 'TT',24],
            segundo_apellido: ['Segundo Apellido', true, false, 'TT',24],
            nombres: ['Nombres', true, true, 'TT',128],

            genero: ['Genero', true, true, 'C'],
            nacionalidad: ['Nacionalidad', true, true, 'C'],
            mail: ['Correo Electronico', true, true, 'TM',64],
            profesion_ocupacion: ['Profesion Ocupacion', true, true, 'C'],
            matricula_profesional: ['Nro Matricula Profesional', true, true, 'TT',64],

        },
        key: ['responsable_id'],
        keyDual:['dni_persona', 'responsable_id'],
        update: [],
        referer: [
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'tipo_dni', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERDNITIPO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'genero', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERGENERO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'nacionalidad', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERNACIONALIDAD' },

            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'profesion_ocupacion', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERGRUPOPROFESION' },

        ],
    },
    responsablen: {
        table: 'r_institucion_salud_responsable isr',
        alias: 'Responsables',
        cardinalidad: "n",
        linked: 'responsable',
        campos: `isr.responsable_id as idx, 'responsable' as linked,
        au.dni_persona, au.tipo_dni, au.dni, au.dni_complemento,
        au.primer_apellido, au.segundo_apellido, au.casada_apellido, au.nombres,
        au.estado_civil, au.genero, au.nacionalidad, au.discapacidad,
        isr.profesion_ocupacion, isr.matricula_profesional
        `,

        camposView: [{ value: "dni_persona", text: "CI" },
        { value: "primer_apellido", text: "Apellido" }, { value: "nombres", text: "Nombres" },
        { value: "desc_profesion_ocupacion", text: "Profesion/ocupacion" },
        { value: "desc_nacionalidad", text: "Nacionalidad" },
        { value: "matricula_profesional", text: "Matricula Profesional" },
        ],
        key: ['isr.institucion_id'], //llave de busqueda
        precondicion: ["au.dni_persona = isr.dni_persona", "isr.activo='Y'"],
        update: [],
        referer: [

            { ref: 'r_is_atributo as atr6', camporef: 'atr6.atributo_id', camporefForeign: 'isr.profesion_ocupacion', alias: 'grupo_atributo', campos: 'atr6.atributo as desc_profesion_ocupacion', condicion: 'PERGRUPOPROFESION' },

            { tabla: 'au_persona au' },
            { ref: 'r_is_atributo as atr1', camporef: 'atr1.atributo_id', camporefForeign: 'au.estado_civil', alias: 'grupo_atributo', campos: 'atr1.atributo as desc_estado_civil', condicion: 'PERESTADOCIVIL' },
            { ref: 'r_is_atributo as atr2', camporef: 'atr2.atributo_id', camporefForeign: 'au.genero', alias: 'grupo_atributo', campos: 'atr2.atributo as desc_genero', condicion: 'PERGENERO' },
            { ref: 'r_is_atributo as atr3', camporef: 'atr3.atributo_id', camporefForeign: 'au.nacionalidad', alias: 'grupo_atributo', campos: 'atr3.atributo as desc_nacionalidad', condicion: 'PERNACIONALIDAD' },
            { ref: 'r_is_atributo as atr33', camporef: 'atr33.atributo_id', camporefForeign: 'au.discapacidad', alias: 'grupo_atributo', campos: 'atr33.atributo as desc_discapacidad', condicion: 'AFIRMACION' },
        ],
    },

    servicios_basicos: {
        table: 'r_institucion_salud',
        alias: 'Servicios Basicos',
        cardinalidad: "1",
        campos: {
            //servicios basicos
            cableado_red: ['Cableado de Red de Computadoras', true, true, 'C'],
            internet: ['Cuenta con Internet', true, true, 'C'],
            empresa_internet: ['Empresa que provee Internet', true, true, 'C'],
            financiamiento_internet: ['Financiamiento del Internet por', true, true, 'C'],
            tipo_internet: ['Tipo de Internet', true, true, 'C'],

            con_energia: ['Cuenta con Energia Electrica', true, true, 'C'],
            energia_electrica: ['Energia Electrica', true, true, 'C'],
            tipo_energia: ['Tipo de Energia', true, true, 'C'],
            sistema_iluminacion: ['Sistema de Iluminacion', true, true, 'C'],

            conexion_gas: ['Conexion a gas', true, true, 'C'],
            agua: ['Agua', true, true, 'C'],
            tratamiento_agua: ['Instalaciones para el tratamiento de Agua', true, true, 'C'],
            alcantarillado: ['Alcantarillado conectado a la Red', true, true, 'C'],
            del_excretas: ['Eliminacion de Excretas', true, true, 'C'],

            telefonia_fija: ['Telefonia Fija', true, true, 'C'],
            telefonia_movil: ['Telefonia Movil', true, true, 'C'],

            central_oxigeno: ['Central de Oxigeno', true, true, 'C'],
            gas_medicinal: ['Gases Medicinales', true, true, 'C'],
            filtro_aire: ['Filtro de Aire Estandar de Eficiencia(HEPA)', true, true, 'C'],
            climatizacion: ['Climatizacion', true, true, 'C'],

            taller_mantenimiento: ['Taller de manteniento', true, true, 'C'],
            taller_reparacion: ['Taller de Reparacion de Equipos Medicos', true, true, 'C'],
            deposito_combustible: ['Depositos de Combustible', true, true, 'C'],

            otras_instalaciones: ['Otras Instalaciones', true, true, 'T'],
        },
        key: ['institucion_id'],
        update: [],
        referer: [
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'cableado_red', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'CALIFICACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'internet', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'AFIRMACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'empresa_internet', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'INTERNETEMP' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'financiamiento_internet', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'FINANCIAMIENTO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'tipo_internet', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'INTERNETTIPO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'con_energia', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'AFIRMACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'energia_electrica', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'ENERGIA' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'tipo_energia', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'ENERGIATIPO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'sistema_iluminacion', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'CALIFICACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'conexion_gas', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'CALIFICACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'agua', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'AGUA' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'tratamiento_agua', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'CALIFICACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'alcantarillado', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'AFIRMACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'del_excretas', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'DELEXCRETA' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'telefonia_fija', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'CALIFICACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'telefonia_movil', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'CALIFICACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'central_oxigeno', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'CALIFICACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'gas_medicinal', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'CALIFICACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'filtro_aire', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'CALIFICACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'climatizacion', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'CALIFICACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'taller_mantenimiento', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'CALIFICACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'taller_reparacion', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'CALIFICACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'deposito_combustible', campos: ['atributo_id', 'atributo'], alias: 'grupo_atributo', condicion: 'CALIFICACION' },
        ],
    },

    atencion: {
        table: 'r_institucion_salud',
        alias: 'Tipo Atencion',
        cardinalidad: "1",
        campos: {

            camilla_emergencia: ['Nro. de Camillas en Emergencia', true, true, 'TN',3],
            camas_obs_emergencia: ['Nro. de Camas Obs. Emergencia', true, true, 'TN',3],
            camas_obs_preparto: ['Nro. de Camas - Preparto', true, true, 'TN',3],
            camas_internacion: ['Nro. de Camas - Internacion', true, true, 'TN', 3],
            camas_uti: ['Nro. de Camas - UTI', true, true, 'TN', 3],
            camas_uti_neonatal: ['Nro. de Camas - UTI Neonatal', true, true, 'TN', 3],
            camas_uci: ['Nro. de Camas - UCI', true, true, 'TN'],
            camas_uci_neonatal: ['Nro. de Camas - Neonatal', true, true, 'TN'],
            atencion_horario: ['Horario Atencion', true, true, 'C'],
            atencion_horas: ['Cantidad Horas de Atencion', true, true, 'C'],
        },
        key: ['institucion_id'],
        update: [],
        referer: [
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'atencion_horario', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ATENCIONHORARIO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'atencion_horas', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ATENCIONHORAS' }
        ],
    },
//adecuado a R3
    superficie: {
        table: 'r_institucion_salud',
        alias: 'Caracteristicas y Superficie',
        cardinalidad: "1",
        campos: {
            ccaracteristicas_terreno: ['Propiedad del Territorio', true, true, 'C'],
            //csuperficie_construida: ['Superficie Construida', true, true, 'TD',],
            //csuperficie_circulacion: ['Superficie de Circulacion', true, true, 'TD'],
            canio_construccion:['Año de Construccion', true, true, 'TN'], 
            csuperficie_total: ['Superficie Total Construida', true, true, 'TD'],
            //aumentados xR3
            csuperficie_terreno:['Superficie Terreno', true, true, 'TD'], 
            cpisos: ['Pisos', true, true, 'TN'],  
            cascensor:['Ascensor', true, true, 'R'],  
            crampas: ['Rampas', true, true, 'R'],  
            cplano_aprobado: ['Plano Aprobado', true, true, 'R'],  
            cplan_mantenimiento: ['Plan Mantenimiento Preventivo', true, true, 'R'], 
            cescalera_emergencia: ['Escaleras de Emergencia', true, true, 'R'], 
            cparqueo: ['Parqueos', true, true, 'R'], 
            
        },
        key: ['institucion_id'],
        update: [],
        referer: [
            {ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'ccaracteristicas_terreno', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'TERRENO'},
            {ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'cascensor', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AFIRMACION'},
            {ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'crampas', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AFIRMACION'},
            {ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'cplano_aprobado', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AFIRMACION'},
            {ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'cplan_mantenimiento', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AFIRMACION'},
            {ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'cescalera_emergencia', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AFIRMACION'},
            {ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'cparqueo', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AFIRMACION'}
        ],
    },

    estructura: {
        table: 'r_institucion_salud',
        alias: 'Estructura',
        cardinalidad: "1",
        campos: {
            estructura_estado: ['Estado Actual de Estructura', true, true, 'C'],
            estructura_base: ['Estructura Base', true, true, 'C'],
            estructura_techo: ['Techo', true, true, 'C'],
            estructura_piso: ['Piso', true, true, 'C'],
            estructura_tipo_pared: ['Tipo de Pared', true, true, 'TA',1000],
            estructura_acabado_exterior: ['Acabado Exterior', true, true, 'C'],
            estructura_acabado_interior: ['Acabado Interior', true, true, 'C'],

        },
        key: ['institucion_id'],
        update: [],
        referer: [
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estructura_estado', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ESTRUCTURAESTADO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estructura_base', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ESTRUCTURABASE' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estructura_techo', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ESTRUCTURATECHO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estructura_piso', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ESTRUCTURAPISO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estructura_acabado_exterior', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ESTRUCTURAACABADO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estructura_acabado_interior', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ESTRUCTURAACABADO' },
        ],
    },

    infraestructuran: {
        table: 'r_institucion_salud_infraestructura',
        alias: 'Infraestructuras',
        cardinalidad: "n",
        linked: 'infraestructura',
        campos: "infraestructura_id as idx, 'infraestructura' as linked, servicio, descripcion, cantidad, estado, funcionamiento, observaciones",
        camposView: [{ value: "desc_servicio", text: "Servicio" }, { value: "desc_descripcion", text: "Descripcion" },
        { value: "cantidad", text: "Cantidad" }, { value: "desc_estado", text: "Estado" }, { value: "desc_funcionamiento", text: "Funcionamiento" },
        ],
        key: ['institucion_id'],
        update: [],
        referer: [
            { ref: 'r_is_atributo as atr1', camporef: 'atr1.atributo_id', camporefForeign: 'servicio', alias: 'grupo_atributo', campos: 'atr1.atributo as desc_servicio', condicion: 'SERVICIOMEDICO' },
            { ref: 'r_is_atributo as atr2', camporef: 'atr2.atributo_id', camporefForeign: 'descripcion', alias: 'grupo_atributo', campos: 'atr2.atributo as desc_descripcion', condicion: 'SERVICIODESCMEDICO' },
            { ref: 'r_is_atributo as atr3', camporef: 'atr3.atributo_id', camporefForeign: 'estado', alias: 'grupo_atributo', campos: 'atr3.atributo as desc_estado', condicion: 'ESTRUCTURAESTADO' },
            { ref: 'r_is_atributo as atr4', camporef: 'atr4.atributo_id', camporefForeign: 'funcionamiento', alias: 'grupo_atributo', campos: 'atr4.atributo as desc_funcionamiento', condicion: 'FUNCIONA' },
        ],
    },

    infraestructura: {
        table: 'r_institucion_salud_infraestructura',
        alias: 'Infraestructura',
        cardinalidad: "1",
        campos: {
            servicio: ['Servicio', true, true, 'C'],
            descripcion: ['Descripcion', true, true, 'C'],
            cantidad: ['Cantidad', true, true, 'TN',3],
            estado: ['Estado', true, true, 'C'],
            funcionamiento: ['Funcionamiento', true, true, 'C'],
            observaciones: ['Observaciones', true, false, 'TA',1000],
        },         
        key: ['infraestructura_id'],
        update: [],
        referer: [
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'servicio', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'SERVICIOMEDICO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'descripcion', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'SERVICIODESCMEDICO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estado', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ESTRUCTURAESTADO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'funcionamiento', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'FUNCIONA' },
        ],
    },
    mobiliarion: {
        table: 'r_institucion_salud_mobiliario',
        alias: 'Mobiliarios',
        cardinalidad: "n",
        linked: 'mobiliario',
        campos: "registro_id as idx, 'mobiliario' as linked, servicio, descripcion, cantidad, estado, funcionamiento, anio_compra, fuente_financiamiento, observaciones, tipo_registro",
        camposView: [{ value: "desc_servicio", text: "Servicio" }, { value: "descripcion", text: "Descripcion" },
        { value: "cantidad", text: "Cantidad" }, { value: "desc_estado", text: "Estado" }, { value: "desc_funcionamiento", text: "Funcionamiento" },
        { value: "anio_compra", text: "Año Compra" }, { value: "desc_fuente_financiamiento", text: "Fuente Fin." }
        ],
        key: ['institucion_id'],
        precondicion: ["tipo_registro='MOBILIARIO'", "activo='Y'"],
        update: [],
        referer: [
            { ref: 'r_is_atributo as atr1', camporef: 'atr1.atributo_id', camporefForeign: 'servicio', alias: 'grupo_atributo', campos: 'atr1.atributo as desc_servicio', condicion: 'SERVICIOMEDICO' },
            { ref: 'r_is_atributo as atr2', camporef: 'atr2.atributo_id', camporefForeign: 'estado', alias: 'grupo_atributo', campos: 'atr2.atributo as desc_estado', condicion: 'ESTRUCTURAESTADO' },
            { ref: 'r_is_atributo as atr3', camporef: 'atr3.atributo_id', camporefForeign: 'funcionamiento', alias: 'grupo_atributo', campos: 'atr3.atributo as desc_funcionamiento', condicion: 'FUNCIONA' },
            { ref: 'r_is_atributo as atr4', camporef: 'atr4.atributo_id', camporefForeign: 'fuente_financiamiento', alias: 'grupo_atributo', campos: 'atr4.atributo as desc_fuente_financiamiento', condicion: 'FINANCIAMIENTOFUENTE' },
        ],
    },
    
    mobiliario:{
        table: 'r_institucion_salud_mobiliario',
        alias: 'Mobiliario',
        cardinalidad: "1",
        campos: {
            servicio: ['Servicio', true, true, 'C'],
            descripcion: ['Descripcion', true, true, 'TA',1500],
            cantidad: ['Cantidad', true, true, 'TN',3],
            estado: ['Estado', true, true, 'C'],
            funcionamiento: ['Funcionamiento', true, true, 'C'],
            fuente_financiamiento: ['Fuente de Financiamiento', true, true, 'C'],            
            anio_compra: ['Año de Compra', true, false, 'TN',4],
            observaciones: ['Observaciones', true, false, 'TA',1500],            

        },         
        key: ['registro_id'],
        update: [],
        referer: [
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'servicio', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'SERVICIOMEDICO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estado', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ESTRUCTURAESTADO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'funcionamiento', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'FUNCIONA' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'fuente_financiamiento', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'FINANCIAMIENTOFUENTE' },
        ],
    },

    equipamiento:{
        table: 'r_institucion_salud_mobiliario',
        alias: 'Equipamiento',
        cardinalidad: "1",
        campos: {
            servicio: ['Servicio', true, true, 'C'],
            descripcion: ['Descripcion', true, true, 'TA',1500],
            cantidad: ['Cantidad', true, true, 'TN',3],
            estado: ['Estado', true, true, 'C'],
            funcionamiento: ['Funcionamiento', true, true, 'C'],
            fuente_financiamiento: ['Fuente de Financiamiento', true, true, 'C'],            
            anio_compra: ['Año de Compra', true, false, 'TN',4],
            observaciones: ['Observaciones', true, false, 'TA', 1500],            

        },         
        key: ['registro_id'],
        update: [],
        referer: [
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'servicio', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'SERVICIOMEDICO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estado', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ESTRUCTURAESTADO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'funcionamiento', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'FUNCIONA' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'fuente_financiamiento', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'FINANCIAMIENTOFUENTE' },
        ],
    },
    equipamienton: {
        table: 'r_institucion_salud_mobiliario',
        alias: 'Equipamientos',
        cardinalidad: "n",
        linked: 'equipamiento',
        campos: "registro_id as idx, 'equipamiento' as linked, servicio, descripcion, cantidad, estado, funcionamiento, anio_compra, fuente_financiamiento, observaciones, tipo_registro",
        camposView: [{ value: "desc_servicio", text: "Servicio" }, { value: "descripcion", text: "Descripcion" },
        { value: "cantidad", text: "Cantidad" }, { value: "desc_estado", text: "Estado" }, { value: "desc_funcionamiento", text: "Funcionamiento" },
        { value: "anio_compra", text: "Año Compra" }, { value: "desc_fuente_financiamiento", text: "Fuente Fin." }
        ],
        key: ['institucion_id'],
        precondicion: ["tipo_registro='EQUIPAMIENTO'", "activo='Y'"],
        update: [],
        referer: [
            { ref: 'r_is_atributo as atr1', camporef: 'atr1.atributo_id', camporefForeign: 'servicio', alias: 'grupo_atributo', campos: 'atr1.atributo as desc_servicio', condicion: 'SERVICIOMEDICO' },
            { ref: 'r_is_atributo as atr2', camporef: 'atr2.atributo_id', camporefForeign: 'estado', alias: 'grupo_atributo', campos: 'atr2.atributo as desc_estado', condicion: 'ESTRUCTURAESTADO' },
            { ref: 'r_is_atributo as atr3', camporef: 'atr3.atributo_id', camporefForeign: 'funcionamiento', alias: 'grupo_atributo', campos: 'atr3.atributo as desc_funcionamiento', condicion: 'FUNCIONA' },
            { ref: 'r_is_atributo as atr4', camporef: 'atr4.atributo_id', camporefForeign: 'fuente_financiamiento', alias: 'grupo_atributo', campos: 'atr4.atributo as desc_fuente_financiamiento', condicion: 'FINANCIAMIENTOFUENTE' },
        ],
    },

    personaln: {
        table: 'r_institucion_salud_personal isp',
        alias: 'Personals',
        cardinalidad: "n",
        linked:"personal_is",
        campos: `isp.personal_id as idx, 'personal_is' as linked, au.tipo_dni, au.dni, au.dni_complemento,
        au.primer_apellido, au.segundo_apellido, au.casada_apellido, au.nombres,
        au.estado_civil, au.genero, au.nacionalidad, au.discapacidad,
        isp.nivel_instruccion, isp.item_contrato, isp.item_contrato_desc, isp.profesion_ocupacion, isp.profesion_ocupacion_especifica,
        isp.fuente_financiamiento, isp.descripcion_cargo, isp.carga_laboral, isp.personal_rotatorio, isp.item_desc_text`,

        camposView: [{ value: "desc_item_contrato", text: "Item/Contrato" }, { value: "primer_apellido", text: "Apellido" }, { value: "nombres", text: "Nombres" },
        { value: "dni_persona", text: "CI" }, { value: "desc_nivel_instruccion", text: "Nivel de Instruccion" }, { value: "desc_profesion_ocupacion", text: "Profesion/ocupacion" },
        { value: "desc_nacionalidad", text: "Nacionalidad" }
        ],
        key: ['isp.institucion_id'],
        precondicion: ["au.dni_persona = isp.dni_persona", "isp.activo='Y'"],
        update: [],
        referer: [
            { ref: 'r_is_atributo as atr44', camporef: 'atr44.atributo_id', camporefForeign: 'isp.nivel_instruccion', alias: 'grupo_atributo', campos: 'atr44.atributo as desc_nivel_instruccion', condicion: 'PERNIVELINSTRUCCION' },
            { ref: 'r_is_atributo as atr4', camporef: 'atr4.atributo_id', camporefForeign: 'isp.item_contrato', alias: 'grupo_atributo', campos: 'atr4.atributo as desc_item_contrato', condicion: 'PERITEMCONTRATO' },
            { ref: 'r_is_atributo as atr5', camporef: 'atr5.atributo_id', camporefForeign: 'isp.item_contrato_desc', alias: 'grupo_atributo', campos: 'atr5.atributo as desc_item_contrato_desc', condicion: 'PERITEMCONTRATODESC' },
            { ref: 'r_is_atributo as atr6', camporef: 'atr6.atributo_id', camporefForeign: 'isp.profesion_ocupacion', alias: 'grupo_atributo', campos: 'atr6.atributo as desc_profesion_ocupacion', condicion: 'PERGRUPOPROFESION' },
            { ref: 'r_is_atributo as atr7', camporef: 'atr7.atributo_id', camporefForeign: 'isp.profesion_ocupacion_especifica', alias: 'grupo_atributo', campos: 'atr7.atributo as desc_profesion_ocupacion_especifica', condicion: 'PERGRUPOPROFESPECIFICA' },

            { ref: 'r_is_atributo as atr8', camporef: 'atr8.atributo_id', camporefForeign: 'isp.fuente_financiamiento', alias: 'grupo_atributo', campos: 'atr8.atributo as desc_fuente_financiamiento', condicion: 'FINANCIAMIENTOFUENTE' },
            { ref: 'r_is_atributo as atr9', camporef: 'atr9.atributo_id', camporefForeign: 'isp.descripcion_cargo', alias: 'grupo_atributo', campos: 'atr9.atributo as desc_descripcion_cargo', condicion: 'PERGRUPOPROFESION' },
            { ref: 'r_is_atributo as atr10', camporef: 'atr10.atributo_id', camporefForeign: 'isp.carga_laboral', alias: 'grupo_atributo', campos: 'atr10.atributo as desc_carga_laboral', condicion: 'PERCARGAHORARIA' },
            { ref: 'r_is_atributo as atr11', camporef: 'atr11.atributo_id', camporefForeign: 'isp.personal_rotatorio', alias: 'grupo_atributo', campos: 'atr11.atributo as desc_personal_rotatorio', condicion: 'AFIRMACION' },

            { tabla: 'au_persona au' },

            { ref: 'r_is_atributo as atr1', camporef: 'atr1.atributo_id', camporefForeign: 'au.estado_civil', alias: 'grupo_atributo', campos: 'atr1.atributo as desc_estado_civil', condicion: 'PERESTADOCIVIL' },
            { ref: 'r_is_atributo as atr2', camporef: 'atr2.atributo_id', camporefForeign: 'au.genero', alias: 'grupo_atributo', campos: 'atr2.atributo as desc_genero', condicion: 'PERGENERO' },
            { ref: 'r_is_atributo as atr3', camporef: 'atr3.atributo_id', camporefForeign: 'au.nacionalidad', alias: 'grupo_atributo', campos: 'atr3.atributo as desc_nacionalidad', condicion: 'PERNACIONALIDAD' },
            { ref: 'r_is_atributo as atr33', camporef: 'atr33.atributo_id', camporefForeign: 'au.discapacidad', alias: 'grupo_atributo', campos: 'atr33.atributo as desc_discapacidad', condicion: 'AFIRMACION' },

            

        ],
    },
    personal_is: {
        table: 'r_institucion_salud_personal',
        alias: 'Personal',
        dual: ['personal_is','personal'],
        cardinalidad: "1",
        campos: {
            item_contrato: ['Item / Contrato', true, true, 'C'],
            item_contrato_desc: ['Descripcion Item', true, true, 'C'],
            item_desc_text: ['Descripcion Contrato', true, true, 'TA',1500],

            tipo_dni: ['Tido de identificacion', false, true, 'C'],
            dni: ['Numero Documento', false, true, 'TN',24],            
            dni_complemento: ['Complemento', false, true, 'TT',2],
            fecha_nacimiento: ['Fecha Nacimiento', false, true, 'F'],
            primer_apellido: ['Primer Apellido', true, true, 'TT',24],
            segundo_apellido: ['Segundo Apellido', true, false, 'TT',24],
            casada_apellido: ['AP. Casada', true, false, 'TT',24],
            nombres: ['Nombres', true, true, 'TT',64],
            
            estado_civil: ['Estado Civil', true, true, 'C'],
            genero: ['Genero', true, true, 'C'],
            nacionalidad: ['Nacionalidad', true, true, 'C'],
            nivel_instruccion: ['Nivel de Instruccion', true, true, 'C'],            
            discapacidad: ['Tiene Discapacidad', true, true, 'C'],

            //profesion vs ocupacion dependencia
            profesion_ocupacion: ['Profesion Ocupacion', true, true, 'C'],
            profesion_ocupacion_especifica: ['Profesion / Ocupacion Especifica', true, true, 'C'],

            fuente_financiamiento: ['Fuente Financiamiento', true, true, 'C'],
            descripcion_cargo: ['Descripcion cargo segun Memorandum o contrato', true, true, 'C'],
            carga_laboral: ['Carga Laboral en el EESS', true, true, 'C'],
            personal_rotatorio: ['Personal Rotatorio (No Permanente en el EESS)', true, true, 'C'],

        },
        key: ['personal_id'],
        keyDual:['dni_persona', 'personal_id'],
        update: [],
        referer: [
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'item_contrato', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERITEMCONTRATO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'item_contrato_desc', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERITEMCONTRATODESC' },
            //au
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'tipo_dni', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERDNITIPO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estado_civil', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERESTADOCIVIL' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'genero', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERGENERO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'nacionalidad', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERNACIONALIDAD' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'nivel_instruccion', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERNIVELINSTRUCCION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'discapacidad', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AFIRMACION' },
//isp       
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'profesion_ocupacion', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERGRUPOPROFESION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'profesion_ocupacion_especifica', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERGRUPOPROFESPECIFICA', linked:{campos:[['atributo_id','value']],ref:'atributos', alias:'grplinkn', dependency:'profesion_ocupacion' }},

            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'fuente_financiamiento', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'FINANCIAMIENTOFUENTE' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'descripcion_cargo', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERGRUPOPROFESION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'carga_laboral', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERCARGAHORARIA' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'personal_rotatorio', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AFIRMACION' },

        ],
    },
    personal: {
        table: 'au_persona',
        alias: 'Personal',
        cardinalidad: "1",
        campos: {
            tipo_dni: ['Tido de identificacion', false, true, 'TP'],
            dni: ['Numero Documento', false, true, 'TP',24],
            dni_complemento: ['Complemento', false, true, 'TP',2],
            fecha_nacimiento: ['Fecha Nacimiento', true, true, 'TP'],
            primer_apellido: ['Primer Apellido', true, true, 'TP',24],
            segundo_apellido: ['Segundo Apellido', true, false, 'TP',24],
            nombres: ['Nombres', true, true, 'TP',64],
            estado_civil: ['Estado Civil', true, true, 'C'],
            genero: ['Genero', true, true, 'C'],
            nacionalidad: ['Nacionalidad', true, true, 'C'],
            discapacidad: ['Alguna Discapacidad', true, true, 'C'],
            telefono: ['Telefono', true, true, 'TN',24],

        },
        key: ['dni_persona'],
        update: [],
        referer: [
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'tipo_dni', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERDNITIPO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estado_civil', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERESTADOCIVIL' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'genero', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERGENERO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'nacionalidad', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'PERNACIONALIDAD' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'discapacidad', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AFIRMACION' },



        ],
    },
    //parametros cortosss de leve uso
    eess_corto: {
        table: 'r_institucion_salud',
        alias: 'Identificacion',
        dual: ['institucion','eess'],
        cardinalidad: "1",
        campos: {
            nombre_institucion: ['Nombre de la institucion', true, true, 'TT', 80],
            nombre_corto: ['Nombre Corto o Abrev.', true, true, 'TT',10],
            fecha_creacion: ['Fecha de Creacion', true, true, 'F'],
            fecha_actividades: ['Fecha inicio Actidades', true, true, 'F'],
            correo_electronico: ['Correo electronico', true, true, 'TM',64],
            telefono: ['Telefono', true, true, 'TN',24],

            codigo: ['Codigo Institucion/Rues', true, true, 'TT',10],
            clase: ['Clase Institucion', true, true, 'C'],
            nivel_atencion: ['Nivel de Atencion', true, true, 'C'],
            subsector: ['Sub Sector', false, true, 'C'],
            urbano_rural: ['Area', true, true, 'C'],
            snis: ['Cuenta con CodRues', true, true, 'C'],
        },
        key: ['institucion_id'],
        keyDual: ['institucion_id', 'institucion_id'],
        update: [],
        referer: [
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'clase', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'CLASE' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'nivel_atencion', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'NIVELATENCION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'subsector', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'SUBSECTOR' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'urbano_rural', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AREA' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'snis', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ACTIVE' },
        ],
    },

    acreditacion:{
        table: 'r_institucion_salud_acrehab',
        alias: 'Acreditacion',        
        cardinalidad: "1",
        //dual:['acreditacion','institucion'],
        campos: {
            
            eess_nombre: ['Establecimiento', true, true, 'TT', 128],
            estado_acrehab: ['Estado', true, false, 'C'],
            gestion_registro: ['Gestion registro', true, true, 'TN',4],

            nro_ra: ['Numero R.A.', true, true, 'TT',64],
            fecha_ra: ['Fecha R.A.', true, true, 'F'],
            vigencia_anios: ['Años de vigencia', true, true, 'TN',2],
            puntaje: ['Puntaje %', true, true, 'TD'],
            activo:['Estado de Vigencia', false, true, 'C']
            

        },
        key: ['acrehab_id'], 
        //keyDual:['institucion_id','acrehab_id'],       
        update: [],
        referer: [
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estado_acrehab', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AHACREDITACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'activo', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ACTIVE' },
        ],
    },
    acreditacionn:{
        table: 'al_departamento dpto, ae_institucion isap ,r_institucion_salud isa,  ae_institucion eg, r_institucion_salud_acrehab r',
        alias: 'Acreditaciones',
        cardinalidad: "n",
        linked: 'acreditacion',
        campos: `r.acrehab_id as idx, 'acreditacion' as linked,r.institucion_id,         
        eg.nombre_corto, dpto.nombre_dpto,
        isap.nombre_institucion,
        r.eess_nombre, r.estado_acrehab, r.gestion_registro, 
        r.nro_ra, r.fecha_ra, r.vigencia_anios, r.puntaje, r.tipo_registro, r.activo
        `,

        camposView: [
            { value: "nombre_corto", text: "Ente Gestor" }, { value: "nombre_dpto", text: "Dpto" },
            { value: "nombre_institucion", text: "Establecimiento" } ,   
        { value: "eess_nombre", text: "Nombre Registrado" }, { value: "desc_estado", text: "Estado" },
        { value: "gestion_registro", text: "Gestion registro" },
        { value: "nro_ra", text: "Nro R.A." },
        { value: "fecha_ra", text: "Fecha R.A." },
        { value: "vigencia_anios", text: "Vigencia en Anios" },
        { value: "puntaje", text: "Puntaje" },
        { value: "activo", text: "Vigente" }
        ],
        //key: ['isap.root'], //llave de busqueda
        key: [], //llave de busqueda
        precondicion: ["dpto.cod_pais = isap.cod_pais" ,"dpto.cod_dpto=isap.cod_dpto",
            "isap.institucion_id =  isa.institucion_id", "isa.ente_gestor_id =  eg.institucion_id",
            "isa.institucion_id =  r.institucion_id","tipo_registro='ACREDITACION'"],
        update: [],
        referer: [
            { ref: 'r_is_atributo as atr1', camporef: 'atr1.atributo_id', camporefForeign: 'r.estado_acrehab', alias: 'grupo_atributo', campos: 'atr1.atributo as desc_estado', condicion: 'AHACREDITACION' },
            
        ],
    },
    habilitacion:{
        table: 'r_institucion_salud_acrehab',
        alias: 'Habilitacion',        
        cardinalidad: "1",
        //dual:['acreditacion','institucion'],
        campos: {
            
            eess_nombre: ['Establecimiento', true, true, 'TT',128],
            estado_acrehab: ['Estado', true, false, 'C'],
            gestion_registro: ['Gestion registro', true, true, 'TN',4],

            nro_ra: ['Numero R.A.', true, true, 'TT',64],
            fecha_ra: ['Fecha R.A.', true, true, 'F'],
            vigencia_anios: ['Años de vigencia', true, true, 'TN',2],
            puntaje: ['Puntaje %', true, true, 'TD'],
            activo:['Estado de Vigencia', false, true, 'C']
            

        },
        key: ['acrehab_id'], 
        //keyDual:['institucion_id','acrehab_id'],       
        update: [],
        referer: [
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estado_acrehab', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AHHABILITACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'activo', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ACTIVE' },
        ],
    },
    habilitacionn:{
        table: 'al_departamento dpto, ae_institucion isap ,r_institucion_salud isa,  ae_institucion eg, r_institucion_salud_acrehab r',
        alias: 'Habilitaciones',
        cardinalidad: "n",
        linked: 'habilitacion',
        campos: `r.acrehab_id as idx, 'habilitacion' as linked,r.institucion_id,         
        eg.nombre_corto, dpto.nombre_dpto,
        isap.nombre_institucion,
        r.eess_nombre, r.estado_acrehab, r.gestion_registro, 
        r.nro_ra, r.fecha_ra, r.vigencia_anios, r.puntaje, r.tipo_registro, r.activo
        `,

        camposView: [
            { value: "nombre_corto", text: "Ente Gestor" }, { value: "nombre_dpto", text: "Dpto" },
            { value: "nombre_institucion", text: "Establecimiento" } ,   
        { value: "eess_nombre", text: "Nombre Registrado" }, { value: "desc_estado", text: "Estado" },
        { value: "gestion_registro", text: "Gestion registro" },
        { value: "nro_ra", text: "Nro R.A." },
        { value: "fecha_ra", text: "Fecha R.A." },
        { value: "vigencia_anios", text: "Vigencia en Anios" },
        { value: "puntaje", text: "Puntaje" },
        { value: "activo", text: "Vigente" }
        ],
        //key: ['isap.root'], //llave de busqueda
        key: [],
        precondicion: ["dpto.cod_pais = isap.cod_pais" ,"dpto.cod_dpto=isap.cod_dpto",
            "isap.institucion_id =  isa.institucion_id", "isa.ente_gestor_id =  eg.institucion_id",
            "isa.institucion_id =  r.institucion_id","tipo_registro='HABILITACION'"],
        update: [],
        referer: [
            { ref: 'r_is_atributo as atr1', camporef: 'atr1.atributo_id', camporefForeign: 'r.estado_acrehab', alias: 'grupo_atributo', campos: 'atr1.atributo as desc_estado', condicion: 'AHHABILITACION' },
            
        ],
    },

    repo_acrehab:{
        alias: 'Reporte',
    },
    evaluacionn:{
        alias: 'Evaluaciones',
    },
    repo_pac:{
        alias: 'Reportes PAC'
    },
    dashboard:{alias: 'Dashboard Evaluaciones'},
    dash_ames:{alias: 'Dash. UFAM - AMES'},
    dash_inas:{alias: 'Dash. UFAM - INAS'},
    dash_rrame:{alias: 'Dash. UFAM - RRAME'},
    dash_hemofilia:{alias: 'Dash. AEB - HEMOFILIA'},
    dash_carmelo:{alias: 'Dash. AEB - CARMELO'},
    dash_pai:{alias: 'Dash. AEB - PAI'},
    dash_cancer:{alias: 'Dash. AEB - CANCER'},
    dash_mt_control:{alias: 'Dash. MEDTRAB - CONTROL FORMULARIOS'},
    dash_mt_frms:{alias: 'Dash. MEDTRAB - FORMULARIOS E.G.'},
    dash_mt_frmdpto: {alias: 'Dash. MEDTRAB - FORMULARIOS DPTO.'},
    dash_mt_egdpto: {alias: 'Dash. MEDTRAB - FORMULARIOS E.G. - DPTO.'},
    dash_mt_dptoeg: {alias: 'Dash. MEDTRAB - FORMULARIOS DPTO. - E.G.'},
    dash_mt_frmnr: {alias: 'Dash. MEDTRAB - FORMULARIOS N/R'},
    dash_neumonia:{alias: 'Canal Endemico - Neumonia'},
    dash_iras:{alias: "Canal Endemico - IRA´s"},
    dash_edas:{alias: 'Canal Endemico - EDA´s'},

    //modulos segun estructura RUES 3
    r3estucturan: {
        table: 'r_institucion_salud_estructura',
        alias: 'Estructuras',
        cardinalidad: "n",
        linked: 'r3estuctura',
        campos: "estructura_id as idx, 'r3estuctura' as linked, estructura, material, estado, observacion",
        camposView: [{ value: "desc_estructura", text: "Clasificador" }, { value: "desc_material", text: "Material" },
         { value: "desc_estado", text: "Estado" }, { value: "observacion", text: "Observacion" },
        ],
        key: ['institucion_id'],
        update: [],
        referer: [
            { ref: 'r_is_atributo as atr1', camporef: 'atr1.atributo_id', camporefForeign: 'estructura', alias: 'grupo_atributo', campos: 'atr1.atributo as desc_estructura', condicion: 'R3ESTRUCTURA' },
            { ref: 'r_is_atributo as atr2', camporef: 'atr2.atributo_id', camporefForeign: 'material', alias: 'grupo_atributo', campos: 'atr2.atributo as desc_material', condicion: 'R3ESTRUCTURAMATERIAL' },            
            { ref: 'r_is_atributo as atr3', camporef: 'atr3.atributo_id', camporefForeign: 'estado', alias: 'grupo_atributo', campos: 'atr3.atributo as desc_estado', condicion: 'ESTRUCTURAESTADO' },
            
        ],
    },

    r3estuctura: {
        table: 'r_institucion_salud_estructura',
        alias: 'Estructura',
        cardinalidad: "1",
        campos: {                
            estructura: ['Clasificador', true, true, 'C'],
            material: ['Material', true, true, 'C'],
            estado: ['Estado', true, true, 'C'],
            observacion:['Observaciones', true, false, 'TA',1000],
        },         
        key: ['estructura_id'],
        update: [],
        referer: [
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estructura', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'R3ESTRUCTURA' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'material', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'R3ESTRUCTURAMATERIAL', linked:{campos:[['atributo_id','value']],ref:'atributos', alias:'grplinkn', dependency:'estructura' }},

            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estado', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ESTRUCTURAESTADO' },
            
        ],
    },

    r3areasn: {
        table: 'r_institucion_salud_areas',
        alias: 'Areas',
        cardinalidad: "n",
        linked: 'r3areas',
        campos: "area_id as idx, 'r3areas' as linked, area, ambiente, estado, superficie,nro_camas,nro_camillas,  observacion",
        camposView: [{ value: "desc_area", text: "Area" }, { value: "desc_ambiente", text: "Ambiente" },
         { value: "desc_estado", text: "Estado" }, 
         { value: "nro_camas", text: "Nro Camas" }, { value: "nro_camillas", text: "Nro Camillas" },
         { value: "observacion", text: "Observacion" }
        ],
        key: ['institucion_id'],
        update: [],
        referer: [
            { ref: 'r_is_atributo as atr1', camporef: 'atr1.atributo_id', camporefForeign: 'area', alias: 'grupo_atributo', campos: 'atr1.atributo as desc_area', condicion: 'R3AREA' },
            { ref: 'r_is_atributo as atr2', camporef: 'atr2.atributo_id', camporefForeign: 'ambiente', alias: 'grupo_atributo', campos: 'atr2.atributo as desc_ambiente', condicion: 'R3AREAAMBIENTE' },            
            { ref: 'r_is_atributo as atr3', camporef: 'atr3.atributo_id', camporefForeign: 'estado', alias: 'grupo_atributo', campos: 'atr3.atributo as desc_estado', condicion: 'ESTRUCTURAESTADO' },
            
        ],
    },

    r3areas: {
        table: 'r_institucion_salud_areas',
        alias: 'Estructura',
        cardinalidad: "1",
        campos: {                
            area: ['Clasificador', true, true, 'C'],
            ambiente: ['Material', true, true, 'C'],
            estado: ['Estado', true, true, 'C'],
            superficie: ['Superficie', true, true, 'TD'],
            nro_camas:['Nro de Camas', true, true, 'TN'],
            nro_camillas:['Nro de Camillas', true, true, 'TN'],
            observacion:['Observaciones', true, false, 'TA',1000],
        },         
        key: ['area_id'],
        update: [],
        referer: [
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'area', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'R3AREA' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'ambiente', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'R3AREAAMBIENTE', linked:{campos:[['atributo_id','value']],ref:'atributos', alias:'grplinkn', dependency:'area' }},
            
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estado', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ESTRUCTURAESTADO' },
            
        ],
    },

    r3mobiliarion: {
        table: 'r_is_atributo area, r_is_atributo amb, r_institucion_salud_areas ias, r_institucion_salud_areas_mobequi iasmq',
        alias: 'Mobiliarios',
        cardinalidad: "n",
        linked: 'r3mobiliario',
        campos: "registro_id as idx, 'r3mobiliario' as linked, area.atributo as area, amb.atributo as ambiente, iasmq.tipo, iasmq.descripcion as mobiliario,iasmq.estado, iasmq.funcionamiento, iasmq.financiamiento, iasmq.cantidad, iasmq.anio_compra, iasmq.observacion, iasmq.tipo_registro",
        camposView: [{ value: "area", text: "Area" }, { value: "ambiente", text: "Ambiente" },
        { value: "desc_desc", text: "mobiliario" }, { value: "desc_estado", text: "Estado" }, 
        { value: "desc_funcionamiento", text: "Funcionamiento" }, { value: "desc_financiamiento", text: "Financiamiento" },
        { value: "anio_compra", text: "Año Compra" }, { value: "observacion", text: "Observacion" }
        ],
        key: ['institucion_id'],
        precondicion: ["area.atributo_id=ias.area", "amb.atributo_id=ambiente",
                        "ias.area_id=iasmq.area_id",
                        "iasmq.tipo_registro='MOBILIARIO'", "activo='Y'"],
        update: [],       
        referer: [
            { ref: 'r_is_atributo as atr1', camporef: 'atr1.atributo_id', camporefForeign: 'tipo', alias: 'grupo_atributo', campos: 'atr1.atributo as desc_tipo', condicion: 'R3MOBITIPO' },
            { ref: 'r_is_atributo as atr2', camporef: 'atr2.atributo_id', camporefForeign: 'descripcion', alias: 'grupo_atributo', campos: 'atr2.atributo as desc_desc', condicion: 'REMOBITIPODESC' },
            { ref: 'r_is_atributo as atr3', camporef: 'atr3.atributo_id', camporefForeign: 'estado', alias: 'grupo_atributo', campos: 'atr3.atributo as desc_estado', condicion: 'ESTRUCTURAESTADO' },
            { ref: 'r_is_atributo as atr4', camporef: 'atr4.atributo_id', camporefForeign: 'financiamiento', alias: 'grupo_atributo', campos: 'atr4.atributo as desc_financiamiento', condicion: 'FINANCIAMIENTOFUENTE' },
            { ref: 'r_is_atributo as atr5', camporef: 'atr5.atributo_id', camporefForeign: 'funcionamiento', alias: 'grupo_atributo', campos: 'atr5.atributo as desc_funcionamiento', condicion: 'FUNCIONA' },
            { ref: 'r_is_atributo as atr6', camporef: 'atr6.atributo_id', camporefForeign: 'en_mantenimiento', alias: 'grupo_atributo', campos: 'atr6.atributo as desc_mantenimiento', condicion: 'AFIRMACION' },
            { ref: 'r_is_atributo as atr7', camporef: 'atr7.atributo_id', camporefForeign: 'en_uso', alias: 'grupo_atributo', campos: 'atr7.atributo as desc_uso', condicion: 'AFIRMACION' },
        ],
    },
    
    r3mobiliario:{
        table: 'r_institucion_salud_areas_mobequi',
        alias: 'Mobiliario',
        cardinalidad: "1",        
        campos: {
            area_id: ['Area/Ambiente', false, true, 'C'],
            tipo: ['Tipo Mobiliario', true, true, 'C'],
            descripcion: ['Mobiliario', true, true, 'C'],
            estado: ['Estado', true, true, 'C'],
            financiamiento: ['Finaciamiento', true, true, 'C'],
            funcionamiento: ['Funcionamiento', true, true, 'C'],            
            cantidad: ['Cantidad', true, false, 'TN',3],
            anio_compra: ['Año de Compra', true, false, 'TN',4],
            observaciones: ['Observaciones', true, false, 'TA',1500],  
            en_mantenimiento: ['En Mantenimiento', true, true, 'R'],
            en_uso: ['En Uso', true, true, 'R'],                       
        },         
        key: ['registro_id'],
        update: [],
        ilogic:{area_id:"SELECT area_id AS value, ar.atributo||'/'||am.atributo as text FROM r_institucion_salud_areas a, r_is_atributo ar, r_is_atributo am WHERE a.area=ar.atributo_id AND a.ambiente=am.atributo_id AND institucion_id='idxLogin' ORDER BY 2"},
        referer: [
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'tipo', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'R3MOBITIPO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'descripcion', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'REMOBITIPODESC', linked:{campos:[['atributo_id','value']],ref:'atributos', alias:'grplinkn', dependency:'tipo' } },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estado', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ESTRUCTURAESTADO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'financiamiento', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'FINANCIAMIENTOFUENTE' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'funcionamiento', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'FUNCIONA' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'en_mantenimiento', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AFIRMACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'en_uso', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AFIRMACION' },
        ],
    },

    r3equipamienton: {
        table: 'r_is_atributo area, r_is_atributo amb, r_institucion_salud_areas ias, r_institucion_salud_areas_mobequi iasmq',
        alias: 'Equipamientos',
        cardinalidad: "n",
        linked: 'r3equipamiento',
        campos: "registro_id as idx, 'r3equipamiento' as linked, area.atributo as area, amb.atributo as ambiente, iasmq.tipo, iasmq.descripcion as mobiliario,iasmq.estado, iasmq.funcionamiento, iasmq.financiamiento, iasmq.cantidad, iasmq.anio_compra, iasmq.observacion, iasmq.tipo_registro",
        camposView: [{ value: "area", text: "Area" }, { value: "ambiente", text: "Ambiente" },
        { value: "desc_desc", text: "Equipamiento" }, { value: "desc_estado", text: "Estado" }, 
        { value: "desc_funcionamiento", text: "Funcionamiento" }, { value: "desc_financiamiento", text: "Financiamiento" },
        { value: "anio_compra", text: "Año Compra" }, { value: "observacion", text: "Observacion" }
        ],
        key: ['institucion_id'],
        precondicion: ["area.atributo_id=ias.area", "amb.atributo_id=ambiente",
                        "ias.area_id=iasmq.area_id",
                        "iasmq.tipo_registro='EQUIPAMIENTO'", "activo='Y'"],
        update: [],       
        referer: [
            { ref: 'r_is_atributo as atr1', camporef: 'atr1.atributo_id', camporefForeign: 'tipo', alias: 'grupo_atributo', campos: 'atr1.atributo as desc_tipo', condicion: 'R3EQUITIPO' },
            { ref: 'r_is_atributo as atr2', camporef: 'atr2.atributo_id', camporefForeign: 'descripcion', alias: 'grupo_atributo', campos: 'atr2.atributo as desc_desc', condicion: 'R3EQUITIPODESC' },
            { ref: 'r_is_atributo as atr3', camporef: 'atr3.atributo_id', camporefForeign: 'estado', alias: 'grupo_atributo', campos: 'atr3.atributo as desc_estado', condicion: 'ESTRUCTURAESTADO' },
            { ref: 'r_is_atributo as atr4', camporef: 'atr4.atributo_id', camporefForeign: 'financiamiento', alias: 'grupo_atributo', campos: 'atr4.atributo as desc_financiamiento', condicion: 'FINANCIAMIENTOFUENTE' },
            { ref: 'r_is_atributo as atr5', camporef: 'atr5.atributo_id', camporefForeign: 'funcionamiento', alias: 'grupo_atributo', campos: 'atr5.atributo as desc_funcionamiento', condicion: 'FUNCIONA' },
            { ref: 'r_is_atributo as atr6', camporef: 'atr6.atributo_id', camporefForeign: 'en_mantenimiento', alias: 'grupo_atributo', campos: 'atr6.atributo as desc_mantenimiento', condicion: 'AFIRMACION' },
            { ref: 'r_is_atributo as atr7', camporef: 'atr7.atributo_id', camporefForeign: 'en_uso', alias: 'grupo_atributo', campos: 'atr7.atributo as desc_uso', condicion: 'AFIRMACION' },
        ],
    },
    
    r3equipamiento:{
        table: 'r_institucion_salud_areas_mobequi',
        alias: 'Equipamiento',
        cardinalidad: "1",        
        campos: {
            area_id: ['Area/Ambiente', false, true, 'C'],
            tipo: ['Tipo Equipamiento', true, true, 'C'],
            descripcion: ['Equipamiento', true, true, 'C'],
            estado: ['Estado', true, true, 'C'],
            financiamiento: ['Finaciamiento', true, true, 'C'],
            funcionamiento: ['Funcionamiento', true, true, 'C'],            
            cantidad: ['Cantidad', true, false, 'TN',3],
            anio_compra: ['Año de Compra', true, false, 'TN',4],
            observaciones: ['Observaciones', true, false, 'TA',1500],  
            en_mantenimiento: ['En Mantenimiento', true, true, 'R'],
            en_uso: ['En Uso', true, true, 'R'],                       
        },         
        key: ['registro_id'],
        update: [],
        ilogic:{area_id:"SELECT area_id AS value, ar.atributo||'/'||am.atributo as text FROM r_institucion_salud_areas a, r_is_atributo ar, r_is_atributo am WHERE a.area=ar.atributo_id AND a.ambiente=am.atributo_id AND institucion_id='idxLogin' ORDER BY 2"},
        referer: [        
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'tipo', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'R3EQUITIPO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'descripcion', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'R3EQUITIPODESC', linked:{campos:[['atributo_id','value']],ref:'atributos', alias:'grplinkn', dependency:'tipo' } },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'estado', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'ESTRUCTURAESTADO' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'financiamiento', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'FINANCIAMIENTOFUENTE' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'funcionamiento', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'FUNCIONA' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'en_mantenimiento', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AFIRMACION' },
            { ref: 'atributos', camporef: 'atributo_id', camporefForeign: 'en_uso', alias: 'grupo_atributo', campos: ['atributo_id', 'atributo'], condicion: 'AFIRMACION' },
        ],
    },

}

const immutableObject = (obj) =>
  typeof obj === 'object' ?  Object.values (obj).forEach (immutableObject) || Object.freeze (obj) : obj;

  //immutableObject(PARAMETROS)

module.exports = PARAMETROS
