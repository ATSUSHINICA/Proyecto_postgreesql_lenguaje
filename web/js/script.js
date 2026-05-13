// Aquí guardo los datos del JSON que se cargue
let datosCargados = [];

// Esta variable me sirve para saber qué consulta estoy mostrando
let tipoConsulta = 0;

// Cojo los elementos del HTML que voy a usar
const botones = document.querySelectorAll("nav button");
const contenedor = document.getElementById("contenido");
const buscador = document.getElementById("buscador");
const ordenarPrecio = document.getElementById("ordenarPrecio");
const detalle = document.getElementById("detalle");

// Cuando pulso un botón, cargo el JSON correspondiente
botones.forEach((boton, index) => {
    boton.addEventListener("click", () => {
        const archivo = boton.getAttribute("data-json");
        tipoConsulta = index + 1; // Esto me dice qué consulta es

        // Aquí uso fetch para leer el archivo JSON de la carpeta json
        fetch("../json/" + archivo)
            .then(res => res.json())
            .then(datos => {
                datosCargados = datos; // Guardo los datos para poder filtrarlos luego
                mostrarDatos(datosCargados); // Los muestro en pantalla
            });
    });
});

// Esta función muestra la lista de elementos según el JSON cargado
function mostrarDatos(lista) {
    contenedor.innerHTML = ""; // Limpio lo que había antes

    lista.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("item");

        // Dependiendo del JSON, algunos tienen título, otros desarrollador, otros saga, etc.
        if (item.titulo) div.textContent = item.titulo;
        else if (item.desarrollador) div.textContent = item.desarrollador;
        else if (item.saga) div.textContent = item.saga;
        else div.textContent = "Elemento";

        // Cuando hago clic en un elemento, muestro su detalle
        div.addEventListener("click", () => mostrarDetalle(item));

        contenedor.appendChild(div);
    });
}

// Filtro por título (solo funciona si el JSON tiene campo "titulo")
buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();

    const filtrados = datosCargados.filter(j =>
        (j.titulo || "").toLowerCase().includes(texto)
    );

    mostrarDatos(filtrados);
});

// Ordenar por precio (si el JSON tiene precio)
ordenarPrecio.addEventListener("click", () => {
    const ordenados = [...datosCargados].sort((a, b) => (a.precio || 0) - (b.precio || 0));
    mostrarDatos(ordenados);
});

// Esta función muestra los detalles dependiendo de la consulta que esté cargada
function mostrarDetalle(item) {
    detalle.classList.remove("oculto");

    // Consulta 1: videojuegos completos
    if (tipoConsulta === 1) {
        detalle.innerHTML = `
            <h3>${item.titulo}</h3> 
            <p><strong>Año:</strong> ${item.anio_lanzamiento}</p>
            <p><strong>Precio:</strong> ${item.precio} €</p>
            <p><strong>Desarrollador:</strong> ${item.desarrollador}</p>
            <p><strong>Saga:</strong> ${item.saga}</p>
        `;
    }

    // Consulta 2: videojuegos con géneros
    if (tipoConsulta === 2) {
        detalle.innerHTML = `
            <h3>${item.titulo}</h3>
            <p><strong>Precio:</strong> ${item.precio} €</p>
            <p><strong>Géneros:</strong> ${item.generos.map(g => g.genero).join(", ")}</p>
        `;
    }

    // Consulta 3: desarrolladores
    if (tipoConsulta === 3) {
        detalle.innerHTML = `
            <h3>${item.desarrollador}</h3>
            <p><strong>País:</strong> ${item.pais}</p>
            <p><strong>Total juegos:</strong> ${item.total_juegos}</p>
            <p><strong>Precio medio:</strong> ${item.precio_medio} €</p>
        `;
    }

    // Consulta 4: juegos en PC
    if (tipoConsulta === 4) {
        detalle.innerHTML = `
            <h3>${item.titulo}</h3>
            <p><strong>Año:</strong> ${item.anio_lanzamiento}</p>
            <p><strong>Precio:</strong> ${item.precio} €</p>
            <p><strong>Plataforma:</strong> ${item.plataforma}</p>
        `;
    }

    // Consulta 5: sagas (aquí hay una lista de juegos)
    if (tipoConsulta === 5) {
        detalle.innerHTML = `
            <h3>${item.saga}</h3>
            <p><strong>Año inicio:</strong> ${item.anio_inicio}</p>
            <p><strong>Total juegos:</strong> ${item.total_juegos}</p>
            <p><strong>Precio total:</strong> ${item.precio_total} €</p>
            <p><strong>Juegos:</strong></p>
            <ul>
                ${item.juegos.map(j => `<li>${j.titulo} (${j.anio})</li>`).join("")}
            </ul>
        `;
    }
}
