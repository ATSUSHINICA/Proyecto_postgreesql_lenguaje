// ============================================================
//  DATOS JSON (exportados desde PostgreSQL con json_agg)
//  Reflejo de consulta1.json a consulta5.json
// ============================================================

const consulta1 = [
    { id_videojuego: 2, titulo: "Zelda: Tears of the Kingdom", anio_lanzamiento: 2023, precio: 69.99, desarrollador: "Nintendo",       saga: "The Legend of Zelda" },
    { id_videojuego: 3, titulo: "Elden Ring",                   anio_lanzamiento: 2022, precio: 59.99, desarrollador: "FromSoftware",   saga: "Dark Souls" },
    { id_videojuego: 6, titulo: "The Last of Us Part II",       anio_lanzamiento: 2020, precio: 49.99, desarrollador: "Naughty Dog",    saga: "The Last of Us" },
    { id_videojuego: 5, titulo: "The Witcher 3",                anio_lanzamiento: 2015, precio: 39.99, desarrollador: "CD Projekt Red", saga: "The Witcher" },
    { id_videojuego: 4, titulo: "Dark Souls III",               anio_lanzamiento: 2016, precio: 39.99, desarrollador: "FromSoftware",   saga: "Dark Souls" },
    { id_videojuego: 1, titulo: "Zelda: Breath of the Wild",    anio_lanzamiento: 2017, precio: 59.99, desarrollador: "Nintendo",       saga: "The Legend of Zelda" },
    { id_videojuego: 7, titulo: "GTA V",                        anio_lanzamiento: 2013, precio: 29.99, desarrollador: "Rockstar Games", saga: "Grand Theft Auto" }
];

const consulta2 = [
    { titulo: "Dark Souls III",              precio: 39.99, generos: [{genero:"Acción"},{genero:"RPG"}] },
    { titulo: "Elden Ring",                  precio: 59.99, generos: [{genero:"Acción"},{genero:"RPG"}] },
    { titulo: "GTA V",                       precio: 29.99, generos: [{genero:"Acción"},{genero:"Mundo Abierto"}] },
    { titulo: "The Last of Us Part II",      precio: 49.99, generos: [{genero:"Acción"},{genero:"Terror"}] },
    { titulo: "The Witcher 3",               precio: 39.99, generos: [{genero:"RPG"},{genero:"Mundo Abierto"}] },
    { titulo: "Zelda: Breath of the Wild",   precio: 59.99, generos: [{genero:"Acción"},{genero:"Aventura"},{genero:"Mundo Abierto"}] },
    { titulo: "Zelda: Tears of the Kingdom", precio: 69.99, generos: [{genero:"Acción"},{genero:"Aventura"},{genero:"Mundo Abierto"}] }
];

const consulta3 = [
    { desarrollador: "Nintendo",       pais: "Japón",          total_juegos: 2, precio_medio: 64.99 },
    { desarrollador: "FromSoftware",   pais: "Japón",          total_juegos: 2, precio_medio: 49.99 },
    { desarrollador: "CD Projekt Red", pais: "Polonia",        total_juegos: 1, precio_medio: 39.99 },
    { desarrollador: "Naughty Dog",    pais: "Estados Unidos", total_juegos: 1, precio_medio: 49.99 },
    { desarrollador: "Rockstar Games", pais: "Estados Unidos", total_juegos: 1, precio_medio: 29.99 }
];

const consulta4 = [
    { titulo: "Dark Souls III",            anio_lanzamiento: 2016, precio: 39.99, plataforma: "PC (Steam)" },
    { titulo: "Elden Ring",                anio_lanzamiento: 2022, precio: 59.99, plataforma: "PC (Steam)" },
    { titulo: "GTA V",                     anio_lanzamiento: 2015, precio: 29.99, plataforma: "PC (Steam)" },
    { titulo: "The Witcher 3",             anio_lanzamiento: 2015, precio: 39.99, plataforma: "PC (Steam)" }
];

const consulta5 = [
    { saga: "Grand Theft Auto",  anio_inicio: 1997, total_juegos: 1, precio_total: 29.99,  juegos: [{titulo:"GTA V", anio:2013}] },
    { saga: "The Legend of Zelda", anio_inicio: 1986, total_juegos: 2, precio_total: 129.98, juegos: [{titulo:"Zelda: Breath of the Wild", anio:2017},{titulo:"Zelda: Tears of the Kingdom", anio:2023}] },
    { saga: "Dark Souls",        anio_inicio: 2011, total_juegos: 2, precio_total: 99.98,  juegos: [{titulo:"Dark Souls III", anio:2016},{titulo:"Elden Ring", anio:2022}] },
    { saga: "The Witcher",       anio_inicio: 2007, total_juegos: 1, precio_total: 39.99,  juegos: [{titulo:"The Witcher 3", anio:2015}] },
    { saga: "The Last of Us",    anio_inicio: 2013, total_juegos: 1, precio_total: 49.99,  juegos: [{titulo:"The Last of Us Part II", anio:2020}] }
];

// ============================================================
//  UTILIDADES
// ============================================================

function $id(id) {
    return document.getElementById(id);
}

// ============================================================
//  NAVEGACIÓN ENTRE PESTAÑAS
// ============================================================

function activarVista(id) {
    // quitar clase activa de todos
    document.querySelectorAll('.vista').forEach(v => v.classList.remove('activa'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('activo'));

    // activar la seleccionada
    document.getElementById(id).classList.add('activa');
    document.querySelector(`[data-vista="${id}"]`).classList.add('activo');
}

// ============================================================
//  CONSULTA 1 — Todos los videojuegos
// ============================================================

function renderConsulta1(datos) {
    const tbody = $id('tabla1-body');
    tbody.innerHTML = '';

    if (datos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="sin-resultados">No se encontraron resultados</td></tr>';
        return;
    }

    datos.forEach(j => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${j.titulo}</td>
            <td>${j.anio_lanzamiento}</td>
            <td>${j.precio} €</td>
            <td>${j.desarrollador}</td>
            <td>${j.saga || '—'}</td>
        `;
        tbody.appendChild(tr);
    });
}

function filtrarConsulta1() {
    const texto = $id('filtro1').value.toLowerCase();
    const filtrados = consulta1.filter(j =>
        j.titulo.toLowerCase().includes(texto) ||
        j.desarrollador.toLowerCase().includes(texto) ||
        (j.saga && j.saga.toLowerCase().includes(texto))
    );
    renderConsulta1(filtrados);
}

// ============================================================
//  CONSULTA 2 — Videojuegos con géneros
// ============================================================

function renderConsulta2(datos) {
    const tbody = $id('tabla2-body');
    tbody.innerHTML = '';

    if (datos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="sin-resultados">No se encontraron resultados</td></tr>';
        return;
    }

    datos.forEach(j => {
        const badges = j.generos.map(g =>
            `<span class="badge badge-genero">${g.genero}</span>`
        ).join('');

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${j.titulo}</td>
            <td>${j.precio} €</td>
            <td>${badges}</td>
        `;
        tbody.appendChild(tr);
    });
}

function filtrarConsulta2() {
    const genero = $id('filtro2-genero').value;
    const filtrados = genero
        ? consulta2.filter(j => j.generos.some(g => g.genero === genero))
        : consulta2;
    renderConsulta2(filtrados);
}

// ============================================================
//  CONSULTA 3 — Desarrolladores
// ============================================================

function renderConsulta3() {
    const contenedor = $id('grid-devs');
    contenedor.innerHTML = '';

    consulta3.forEach(d => {
        const div = document.createElement('div');
        div.className = 'tarjeta';
        div.innerHTML = `
            <h3>${d.desarrollador}</h3>
            <div class="dato">📍 ${d.pais}</div>
            <span class="numero">${d.total_juegos}</span>
            <div class="etiqueta">juego(s) en el catálogo</div>
            <div class="dato" style="margin-top:10px">Precio medio: <strong>${d.precio_medio} €</strong></div>
        `;
        contenedor.appendChild(div);
    });
}

// ============================================================
//  CONSULTA 4 — Juegos en PC (Steam)
// ============================================================

function renderConsulta4() {
    const tbody = $id('tabla4-body');
    tbody.innerHTML = '';

    consulta4.forEach(j => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${j.titulo}</td>
            <td>${j.anio_lanzamiento}</td>
            <td>${j.precio} €</td>
            <td><span class="badge badge-plataforma">${j.plataforma}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// ============================================================
//  CONSULTA 5 — Sagas
// ============================================================

function renderConsulta5() {
    const contenedor = $id('lista-sagas');
    contenedor.innerHTML = '';

    consulta5.forEach(s => {
        const juegosBadges = s.juegos.map(j =>
            `<span class="badge badge-genero">${j.titulo} (${j.anio})</span>`
        ).join('');

        const div = document.createElement('div');
        div.className = 'saga-bloque';
        div.innerHTML = `
            <h3>${s.saga}</h3>
            <div class="meta">
                Inicio: ${s.anio_inicio} &nbsp;|&nbsp;
                ${s.total_juegos} juego(s) &nbsp;|&nbsp;
                Total: ${s.precio_total.toFixed(2)} €
            </div>
            <div class="juegos-lista">${juegosBadges}</div>
        `;
        contenedor.appendChild(div);
    });
}

// ============================================================
//  ARRANQUE
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    // botones de navegación
    document.querySelectorAll('nav button').forEach(btn => {
        btn.addEventListener('click', function () {
            activarVista(this.dataset.vista);
        });
    });

    // filtros
    $id('filtro1').addEventListener('input', filtrarConsulta1);
    $id('filtro2-genero').addEventListener('change', filtrarConsulta2);

    // render inicial de todas las secciones
    renderConsulta1(consulta1);
    renderConsulta2(consulta2);
    renderConsulta3();
    renderConsulta4();
    renderConsulta5();

    // vista por defecto
    activarVista('vista1');
});