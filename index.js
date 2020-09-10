const debug = require('debug')('app:startup');
const config = require('config');
const peticiones = require('./routes/peticion');
const archivodeterminacion = require('./routes/asignaradeterminacion');
const abogado = require('./routes/asignarabogado');
const resolucionconvenios = require('./routes/rconvenio');
const notificacionembargos = require('./routes/nembargo');
const mandamientopago = require('./routes/mandamientopago');
const resolucionembargo = require('./routes/rembargo');
const resolucion = require('./routes/resoluciones');
const runoydos = require('./routes/runoydos');
const scontribuyente = require('./routes/scontribuyente');
const sabogado = require('./routes/sabogado');
const sarchivo = require('./routes/sarchivo');


const auth = require('./routes/auth');
const users = require('./routes/users');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');

app.use(express.json());
app.use(helmet());
app.use('/api/peticiones', peticiones);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/abogados', abogado);
app.use('/api/archivodeterminaciones', archivodeterminacion);
app.use('/api/resolucionconvenios', resolucionconvenios);
app.use('/api/notificacionembargos', notificacionembargos);
app.use('/api/mandamientopago', mandamientopago);
app.use('/api/resolucionembargo', resolucionembargo);
app.use('/api/resoluciones', resolucion);
app.use('/api/resolucionunoydos', runoydos);
app.use('/api/scontribuyente', scontribuyente);
app.use('/api/sabogado', sabogado);
app.use('/api/sarchivo', sarchivo);


console.log("prueba ", config.get('name'))
if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey no está definido');
    process.exit(1);
}

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug("Morgan enabled...");
}


const port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost/adeterminacion', { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => {
        app.listen(port, () => console.log(`Listening on port ${port}`)); 
    })
    .catch( err => console.error('no se pudo conectar a la base de datos...', err))