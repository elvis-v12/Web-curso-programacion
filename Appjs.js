const express = require('express');
const setupDatabase = require('./server/ServerLogin/dbConnection.js');
const App_cliente = require('./server/serverGatomontes/service/App_cliente.js');
const cors = require('cors');

const app = express();

// Configurar CORS antes de otras rutas y middlewares
app.use(cors({
        origin: 'http://127.0.0.1:3001'
}));

// Inicializar la base de datos y otras configuraciones
setupDatabase(app);

// Configurar las rutas
app.use('/api', App_cliente);

app.listen(3000, () => {
        console.log('Servidor iniciado en el puerto 3000');
});
