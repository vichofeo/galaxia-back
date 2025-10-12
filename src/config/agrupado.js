const AGRUPADO = {
    //all : ['institucion', 'eess', 'propietario', 'responsablen', 'servicios_basicos', 'atencion', 'superficie', 'estructura', 'infraestructuran', 'mobiliarion', 'equipamienton', 'personaln'],
    all : ['institucion', 'eess', 'propietario', 'responsablen', 'servicios_basicos', 'r3areasn', 'superficie', 'r3estucturan', 'infraestructuran', 'r3mobiliarion', 'r3equipamienton', 'personaln'],
    eesseg: ['eess_corto', 'propietario', 'responsable'],
    acre_hab: ['evaluacionn','acreditacionn','habilitacionn','repo_acrehab'],

    //componentes equivalente a db
    acrehab: ['dashboard','evaluacionn','repo_pac','acreditacionn','habilitacionn','repo_acrehab'],
    acrehab_icons: ['mdi-view-dashboard','mdi-altimeter','mdi-file-check','mdi-grease-pencil','mdi-key-change','mdi-clipboard-text'],

    //report:['eess', 'servbas', 'tipoatcn', 'equipamiento', 'personal', 'acrehab'],
    //report_icons:['mdi-hospital-building','mdi-ambulance', 'mdi-snowman', 'mdi-cart-plus', 'mdi-human-male-female', 'mdi-certificate'],

    report:['eess','servbas','tipoatcn','r3area','estructura','infraestructura','mobiliario','equipamiento','r3mobiliario','r3equipamiento','personal','snis310','acrehab'],
    report_icons:['mdi-hospital-building','mdi-ambulance', 'mdi-snowman','mdi-chemical-weapon', 'mdi-highway', 'mdi-help-network', 'mdi-home-assistant', 'mdi-home-assistant', 'mdi-home-assistant', 'mdi-theater', 'mdi-human-male-female', 'mdi-cart-plus', 'mdi-certificate'],

    eess : ['institucion','eess','propietario','responsablen','servicios_basicos','estructura','r3areasn','superficie','r3estucturan','infraestructuran','mobiliarion','r3mobiliarion','r3equipamienton', 'personaln'],
    eess_icons : ['mdi-hospital-building','mdi-ambulance','mdi-snowman','mdi-highway','mdi-help-network','mdi-home-assistant','mdi-home-assistant','mdi-theater','mdi-home-assistant','mdi-sitemap','mdi-cart-plus','mdi-cart-plus','mdi-certificate','mdi-human-male-female'],

    ufamreport: ['dash_ames', 'dash_inas','dash_rrame'],
    ufamreport_icons:['mdi-chart-bar-stacked', 'mdi-chart-line','mdi-chart-pie'],

    aebreport: ['dash_cancer','dash_hemofilia', 'dash_carmelo', 'dash_pai'],
    aebreport_icons:['mdi-medical-bag','mdi-chart-bubble', 'mdi-nature-people','mdi-chart-donut-variant'],

    aebcereport:['dash_neumonia','dash_iras','dash_edas'],
    aebcereport_icons:['mdi-format-wrap-inline','mdi-format-wrap-square','mdi-format-wrap-tight'],

    medtrabreport: ['dash_mt_control', 'dash_mt_frms', 'dash_mt_frmdpto','dash_mt_egdpto', 'dash_mt_dptoeg', 'dash_mt_frmnr'],
    medtrabreport_icons:['mdi-move-resize','mdi-flask','mdi-flask-outline','mdi-flask-empty','mdi-flask-empty-outline','mdi-blur-off'],
}

module.exports = {
    AGRUPADO,
}