class Alumno {
    constructor(nombre, apellidoPaterno, apellidoMaterno, edad) {
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.edad = edad;
        this.materias = {};
    }

    inscribirMateria(materia) {
        if (!this.materias[materia]) {
            this.materias[materia] = [];
        }
    }

    asignarCalificacion(materia, calificacion) {
        if (this.materias[materia]) {
            this.materias[materia].push(calificacion);
        }
    }

    obtenerPromedio() {
        let totalCalificaciones = 0;
        let cantidadCalificaciones = 0;
        for (let materia in this.materias) {
            totalCalificaciones += this.materias[materia].reduce((a, b) => a + b, 0);
            cantidadCalificaciones += this.materias[materia].length;
        }
        return cantidadCalificaciones > 0 ? totalCalificaciones / cantidadCalificaciones : 0;
    }
}

const alumnos = [];

// Algoritmos de Búsqueda
function busquedaSecuencial(arr, prop, value) {
    return arr.filter(el => el[prop] && el[prop].includes(value));
}

function busquedaBinaria(arr, prop, value) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid][prop] === value) {
            return arr[mid];
        } else if (arr[mid][prop] < value) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return null;
}

// Algoritmos de Ordenamiento
function ordenarBurbuja(arr, prop, ascendente = true) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (ascendente ? arr[j][prop] > arr[j + 1][prop] : arr[j][prop] < arr[j + 1][prop]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

document.getElementById('form-alta').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellidoPaterno = document.getElementById('apellidoPaterno').value;
    const apellidoMaterno = document.getElementById('apellidoMaterno').value;
    const edad = document.getElementById('edad').value;
    
    const nuevoAlumno = new Alumno(nombre, apellidoPaterno, apellidoMaterno, edad);
    alumnos.push(nuevoAlumno);

    console.log('Alumno dado de alta:', nuevoAlumno);
    this.reset();
});

document.getElementById('form-inscribir-materia').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre-inscribir').value;
    const materia = document.getElementById('materia').value;
    
    const alumno = alumnos.find(al => al.nombre === nombre);
    if (alumno) {
        alumno.inscribirMateria(materia);
        console.log(`Materia ${materia} inscrita a ${nombre}`);
    } else {
        console.log('Alumno no encontrado');
    }
    this.reset();
});

document.getElementById('form-asignar-calificacion').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre-calificacion').value;
    const materia = document.getElementById('materia-calificacion').value;
    const calificacion = parseFloat(document.getElementById('calificacion').value);
    
    const alumno = alumnos.find(al => al.nombre === nombre);
    if (alumno) {
        alumno.asignarCalificacion(materia, calificacion);
        console.log(`Calificación ${calificacion} asignada a ${nombre} en la materia ${materia}`);
    } else {
        console.log('Alumno no encontrado');
    }
    this.reset();
});

document.getElementById('form-buscar-alumno').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('buscar-nombre').value;
    const apellido = document.getElementById('buscar-apellido').value;

    if (nombre) {
        const resultados = busquedaSecuencial(alumnos, 'nombre', nombre);
        console.log('Resultados de búsqueda por nombre:', resultados);
    } else if (apellido) {
        const resultados = busquedaSecuencial(alumnos, 'apellidoPaterno', apellido).concat(busquedaSecuencial(alumnos, 'apellidoMaterno', apellido));
        console.log('Resultados de búsqueda por apellido:', resultados);
    } else {
        console.log('Debe ingresar un nombre o un apellido para buscar');
    }
});

document.getElementById('btn-promedio-alumno').addEventListener('click', function() {
    const nombre = prompt("Ingrese el nombre del alumno para calcular su promedio:");
    const alumno = alumnos.find(al => al.nombre === nombre);
    if (alumno) {
        console.log(`El promedio de ${nombre} es: ${alumno.obtenerPromedio()}`);
    } else {
        console.log('Alumno no encontrado');
    }
});

document.getElementById('btn-promedio-grupo').addEventListener('click', function() {
    const totalPromedios = alumnos.reduce((acc, al) => acc + al.obtenerPromedio(), 0);
    const promedioGrupo = totalPromedios / alumnos.length;
    console.log(`El promedio del grupo es: ${promedioGrupo}`);
});

document.getElementById('btn-ordenar-asc').addEventListener('click', function() {
    const alumnosOrdenados = ordenarBurbuja(alumnos, 'nombre', true);
    console.log('Alumnos ordenados por nombre ascendente:', alumnosOrdenados);
});

document.getElementById('btn-ordenar-desc').addEventListener('click', function() {
    const alumnosOrdenados = ordenarBurbuja(alumnos, 'nombre', false);
    console.log('Alumnos ordenados por nombre descendente:', alumnosOrdenados);
});

function guardarDatos() {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

function cargarDatos() {
    const datos = localStorage.getItem('alumnos');
    if (datos) {
        const alumnosGuardados = JSON.parse(datos);
        alumnosGuardados.forEach(al => {
            const nuevoAlumno = new Alumno(al.nombre, al.apellidoPaterno, al.apellidoMaterno, al.edad);
            nuevoAlumno.materias = al.materias;
            alumnos.push(nuevoAlumno);
        });
    }
}

document.getElementById('btn-inicio').addEventListener('click', function() {
    document.getElementById('inicio').classList.add('hidden');
    document.getElementById('alta-alumnos').classList.remove('hidden');
    document.getElementById('funciones').classList.remove('hidden');
});

window.onload = cargarDatos;
window.onunload = guardarDatos;

