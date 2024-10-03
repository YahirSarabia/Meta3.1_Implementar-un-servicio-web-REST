const estudiantes = [
    {
        id: 1,
        nombre: 'Juan Camaney',
        matricula: 123456,
        semestreIngreso: '2016-2'
        ,
        creditosCursados: 200
    },
    {
        id: 2,
        nombre: 'Lupita López',
        matricula: 654321,
        semestreIngreso: '2017-2'
        ,
        creditosCursados: 100
    },
    {
        id: 3,
        nombre: 'Pepe Toño',
        matricula: 234561,
        semestreIngreso: '2018-2'
        ,
        creditosCursados: 50
    },
    {
        id: 4,
        nombre: 'Marco Gonzales',
        matricula: 345612,
        semestreIngreso: '2019-2'
        ,
        creditosCursados: 25
    },
    {
        id: 5,
        nombre: 'Luis Cuevas',
        matricula: 456123,
        semestreIngreso: '2020-2'
        ,
        creditosCursados: 13
    }
];

const findById = function (id) {
    return estudiantes.find((e) => {
        return e.id == id;
    });
};

const findByMatricula = function
    (matricula) {
    return estudiantes.find((e) => {
        return e.matricula == matricula;
    });
};

const findAll = function () {
    return estudiantes;
};

const save = function (id, data) {
    let registro = estudiantes.find((e) => {
        return e.id == id;
    });
    if (registro) {
        for (let [llave, valor] of Object.entries(data)) {
            registro[llave] = valor;
        }
    }
    return registro;
}

exports.save = save;
exports.findById = findById;
exports.findByMatricula = findByMatricula;
exports.findAll = findAll;
