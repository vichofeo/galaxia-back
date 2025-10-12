module.exports = {
    apps: [
      {
        name: 'observatorio-sscp',
        script: 'src/app.js',       // Punto de entrada por defecto
        instances: 2,               // Número de instancias (cores)
        exec_mode: 'cluster',       // Modo cluster para usar múltiples cores
        env: {
          NODE_ENV: 'development', // Entorno por defecto (desarrollo)
        },
        env_production: {
          NODE_ENV: 'production',  // Entorno de producción
          //script: 'src/app.js',  // Punto de entrada en producción
        },
      },
    ],
  };

  //pm2 start ecosystem.config.js --env development