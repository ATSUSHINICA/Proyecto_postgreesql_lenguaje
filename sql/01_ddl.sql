-- Tabla desarrollador
CREATE TABLE desarrollador (
    id_desarrollador SERIAL PRIMARY KEY,
    nombre           VARCHAR(100) NOT NULL,
    anio_fundacion   INT,
    pais             VARCHAR(60)
);

-- Tabla saga
CREATE TABLE saga (
    id_saga     SERIAL PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL,
    anio_inicio INT
);

-- Tabla plataforma
CREATE TABLE plataforma (
    id_plataforma SERIAL PRIMARY KEY,
    nombre        VARCHAR(100) NOT NULL,
    fabricante    VARCHAR(100) NOT NULL
);

-- tabla genero
CREATE TABLE genero (
    id_genero SERIAL PRIMARY KEY,
    nombre    VARCHAR(60) NOT NULL UNIQUE
);

-- tabla videojuego
CREATE TABLE videojuego (
    id_videojuego    SERIAL PRIMARY KEY,
    titulo           VARCHAR(150) NOT NULL,
    anio_lanzamiento INT, -- elegimos int en vez de date porque nuestra idea no es colocar fecha, solamente el año
    precio           NUMERIC(6,2) CHECK (precio >= 0),
    id_desarrollador INT NOT NULL,
    id_saga          INT,

-- claves foraneas de otras tablas
    CONSTRAINT fk_videojuego_desarrollador
        FOREIGN KEY (id_desarrollador) REFERENCES desarrollador(id_desarrollador),

    CONSTRAINT fk_videojuego_saga
        FOREIGN KEY (id_saga) REFERENCES saga(id_saga)
);

-- tabla compuesta entre videojuego-plataforma

CREATE TABLE videojuego_plataforma (
    id_videojuego INT NOT NULL,
    id_plataforma INT NOT NULL,
    fecha_lanzamiento_plataforma INT,   -- puede lanzarse en fechas distintas por plataforma

    PRIMARY KEY (id_videojuego, id_plataforma),

    CONSTRAINT fk_videojuego
        FOREIGN KEY (id_videojuego) REFERENCES videojuego(id_videojuego),

    CONSTRAINT fk_plataforma
        FOREIGN KEY (id_plataforma) REFERENCES plataforma(id_plataforma)
);

-- tabla compuesta entre videojuego-genero

CREATE TABLE videojuego_genero (
    id_videojuego INT NOT NULL,
    id_genero     INT NOT NULL,

    PRIMARY KEY (id_videojuego, id_genero),

    CONSTRAINT fk_videojuego
        FOREIGN KEY (id_videojuego) REFERENCES videojuego(id_videojuego),

    CONSTRAINT fk_genero
        FOREIGN KEY (id_genero) REFERENCES genero(id_genero)
);