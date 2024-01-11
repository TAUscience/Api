const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const taskRoutes = require('./routes/tasks');

const app = express();
app.set('puerto', 3000);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: 3306, 
    database: 'crud_db'
};

app.use(myconnection(mysql, dbOptions, 'single'));

app.use(function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) {
            console.error('Error de conexión a la base de datos:', err);
            return next(err);
        }
        console.log('Conexión a la base de datos establecida');
        req.db = connection;
        next();
    });
});

app.use(express.static(path.join(__dirname, 'proyecto-tdaw')));
app.get('/Historial', (req, res) => {
    res.render('index');
});

/*para ir a inicio */
app.get('/inicio', (req, res) => {
    res.sendFile(path.join(__dirname, 'Proyecto-tdaw/index.html'));
});

//directorio de las vistas y el motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use('/', taskRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
    res.render('index');
});

// Iniciar servidor
app.listen(app.get('puerto'), () => {
    console.log('El servidor está escuchando en el puerto', app.get('puerto'));
});