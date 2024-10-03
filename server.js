const express = require('express');
const estudiantes = require('./estudiantes.js');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.status(200).send('Uso: GET /estudiantes GET /estudiantes/:id POST /estudiantes')
});

/*
    Obtener todos los estudiantes (GET):
    curl http://localhost:4000/estudiantes
*/
app.get('/estudiantes', (req, res) => {
    //res.send('Consultando todos los registros de estudiantes');
    if (req.query.matricula) {
        return res.status(200).json(estudiantes.findByMatricula(req.query.matricula));
    }
    res.status(200).json(estudiantes.findAll());
});

/*
    Obtener un estudiante por id (GET):
    curl http://localhost:4000/estudiantes/1
*/
app.get('/estudiantes/:id', (req, res) => {
    //res.send('Consultando el registro del estudiante ' + req.params.id);
    datos = estudiantes.findById(req.params.id);
    if (datos) {
        res.status(200).
            json(datos);
    } else {
        res.status(404).
            json({ error: 'Not found' });
    }
});

/*
    Agrega un estudiante
*/
app.use(express.json()); // Necesario para leer el cuerpo de la solicitud en JSON
app.post('/estudiantes', (req, res) => {
    const nuevoEstudiante = req.body;

    // Verificar que los campos necesarios estén presentes
    if (!nuevoEstudiante.nombre || !nuevoEstudiante.matricula || !nuevoEstudiante.semestreIngreso || !nuevoEstudiante.creditosCursados) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Asignar un nuevo id automáticamente
    const nuevoId = estudiantes.length ? estudiantes[estudiantes.length - 1].id + 1 : 1;
    nuevoEstudiante.id = nuevoId;

    // Agregar el nuevo estudiante al array
    estudiantes.push(nuevoEstudiante);

    res.status(201).json(nuevoEstudiante);
});

/*
    Modifica un estudiante
*/
app.put('/estudiantes/:id', (req, res) => {
    //res.send('Modificando el registro del estudiante ' + req.params.id);
    let registro = estudiantes.update(req.params.id);
    if (registro) {
        res.status(200).json(registro);
    } else {
        res.status(404).json({
            type: "error",
            msg: "Id no encontrado"
        });
    }
});

/*
    Modificar parcialmente un recurso existente
*/
app.patch('/estudiantes/:id', (req, res) => {
    //res.send('Modificando atributos del estudiante ' + req.params.id);
    let resultado =
        estudiantes.save(req.params.id, req.body);
    if (resultado) {
        res.status(200).
            json(resultado);
    } else {
        res.status(404).
            json({ error: 'id not found' });
    }
});

/*
    Eliminar un estudiante (DELETE):
*/
app.delete('/estudiantes/:id', (req, res) => {
    res.end('Borrando los datos del estudiante ' + req.params.id);
    const id = parseInt(req.params.id);

    // Buscar el índice del estudiante en el array
    const index = estudiantes.findIndex(e => e.id === id);

    if (index !== -1) {
        // Eliminar el estudiante del array
        const estudianteEliminado = estudiantes.splice(index, 1);

        res.status(200).json({
            message: 'Estudiante eliminado exitosamente',
            estudiante: estudianteEliminado
        });
    } else {
        res.status(404).json({ error: 'Estudiante no encontrado' });
    }
});

app.listen(port, () => {
    console.log('Servidor escuchando por el puerto:', port);
}).on('error', err => {
    console.log('Error al iniciar el servidor:', err);
});
