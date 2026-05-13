INSERT INTO desarrollador (id_desarrollador, nombre, anio_fundacion, pais) 
VALUES
    (1, 'Nintendo', 1889, 'Japón'),
    (2, 'FromSoftware', 1986, 'Japón'),
    (3, 'CD Projekt Red', 1994, 'Polonia'),
    (4, 'Naughty Dog', 1984, 'Estados Unidos'),
    (5, 'Rockstar Games', 1998, 'Estados Unidos');

INSERT INTO saga (id_saga, nombre, anio_inicio) 
VALUES
    (1, 'The Legend of Zelda', 1986),
    (2, 'Dark Souls', 2011),
    (3, 'The Witcher', 2007),
    (4, 'The Last of Us', 2013),
    (5, 'Grand Theft Auto', 1997);

INSERT INTO plataforma (id_plataforma, nombre, fabricante) 
VALUES
    (1, 'PlayStation 5', 'Sony'),
    (2, 'PlayStation 4', 'Sony'),
    (3, 'Nintendo Switch', 'Nintendo'),
    (4, 'PC (Steam)', 'Valve'),
    (5, 'Xbox Series X', 'Microsoft');

INSERT INTO genero (id_genero, nombre) 
VALUES
    (1, 'Acción'),
    (2, 'Aventura'),
    (3, 'RPG'),
    (4, 'Mundo Abierto'),
    (5, 'Terror');


INSERT INTO videojuego (id_videojuego, titulo, anio_lanzamiento, precio, id_desarrollador, id_saga) 
VALUES
    (1, 'Zelda: Breath of the Wild', 2017, 59.99, 1, 1),
    (2, 'Zelda: Tears of the Kingdom', 2023, 69.99, 1, 1),
    (3, 'Elden Ring', 2022, 59.99, 2, 2),
    (4, 'Dark Souls III', 2016, 39.99, 2, 2),
    (5, 'The Witcher 3', 2015, 39.99, 3, 3),
    (6, 'The Last of Us Part II', 2020, 49.99, 4, 4),
    (7, 'GTA V', 2013, 29.99, 5, 5);

-- Alejo recuerda comentar las el videojuego al que pertenece 
-- cada id y la plataforma para identificarlo mejor.

INSERT INTO videojuego_plataforma (id_videojuego, id_plataforma, fecha_lanzamiento_plataforma) 
VALUES
    (1, 3, 2017),   -- Zelda BotW -> Switch
    (2, 3, 2023),   -- Zelda TotK -> Switch
    (3, 1, 2022),   -- Elden Ring -> PS5
    (3, 4, 2022),   -- Elden Ring -> PC
    (4, 2, 2016),   -- Dark Souls III -> PS4
    (4, 4, 2016),   -- Dark Souls III -> PC
    (5, 1, 2022),   -- Witcher 3 -> PS5
    (5, 4, 2015),   -- Witcher 3 -> PC
    (6, 2, 2020),   -- TLOU2 -> PS4
    (6, 1, 2024),   -- TLOU2 -> PS5
    (7, 1, 2022),   -- GTA V -> PS5
    (7, 4, 2015);   -- GTA V -> PC

INSERT INTO videojuego_genero (id_videojuego, id_genero) 
VALUES
    (1, 1), (1, 2), (1, 4),   -- Zelda BotW: Acción, Aventura, Mundo Abierto
    (2, 1), (2, 2), (2, 4),   -- Zelda TotK: Acción, Aventura, Mundo Abierto
    (3, 1), (3, 3),            -- Elden Ring: Acción, RPG
    (4, 1), (4, 3),            -- Dark Souls III: Acción, RPG
    (5, 3), (5, 4),            -- Witcher 3: RPG, Mundo Abierto
    (6, 1), (6, 5),            -- TLOU2: Acción, Terror
    (7, 1), (7, 4);            -- GTA V: Acción, Mundo Abierto