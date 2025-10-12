module.exports  = {
    aa: [
        {
            name_module: "Config",
            path_browser: '/frm',
            name_layout: 'LayoutFrm',
            children: [
                {
                    path_browser: "config",
                    name_module: "Grupo Formulario",
                    name_controller: "GFrmView"
                },
                {
                    path_browser: "asignar",
                    name_module: "Asignar Formulario",
                    name_controller: "AsignGFrmView"
                },
                {
                    path_browser: "tmp",
                    name_module: "Temporal",
                    name_controller: "Tmp"
                }
            ]
        }
    ],
    bb: [
        {
            name_module: "Grupo Gripe",
            path_browser: '/gg',
            name_layout: 'LayoutFrm',
            children: [
               {
                    path_browser: "101",
                    name_module: "Tuberculosis",
                    name_controller: "ESaludView"
                },
                {
                    path_browser: "102",
                    name_module: "Covid",
                    name_controller: "ESaludView4"
                }
            ]
        }, {
            name_module: "Grupo Vinchuca",
            path_browser: '/gv',
            name_layout: 'LayoutFrm',
            children: [
                {
                    path_browser: "200",
                    name_module: "Dengue",
                    name_controller: "ESaludView1"
                },
                {
                    path_browser: "201",
                    name_module: "Chikungunya",
                    name_controller: "ESaludView2"
                },
                {
                    path_browser: "202",
                    name_module: "Zika",
                    name_controller: "ESaludView3"
                }
            ]
        }
    ],
    cc:[
        {
            name_module: "Usuarios",
            path_browser: '/usr',
            name_layout: 'LayoutFrm',
            children: [
              {
                path_browser: "p1",
                name_module: "Crear usuario",
                name_controller: "Tmp"
              },
              {
                path_browser: "p2",
                name_module: "usuarios Hospital",
                name_controller: "AboutView"
              },
              
            ]
          }
    ],
}


