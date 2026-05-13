
-- CONSULTA 1 
-- Listado de todos los videojuegos con su desarrollador y saga

SELECT json_agg(resultado) AS datos_json
FROM (
    SELECT
        v.id_videojuego,
        v.titulo,
        v.anio_lanzamiento,
        v.precio,
        d.nombre AS desarrollador,
        s.nombre AS saga
    FROM videojuego v
    JOIN desarrollador d 
    ON v.id_desarrollador = d.id_desarrollador
    LEFT JOIN saga s 
    ON v.id_saga = s.id_saga
    ORDER BY v.anio_lanzamiento DESC
) resultado;


-- CONSULTA 2 
-- Detalle de cada videojuego con sus géneros agrupados

SELECT json_agg(resultado) AS datos_json
FROM (
    SELECT
        v.titulo,
        v.precio,
        json_agg(json_build_object('genero', g.nombre)) AS generos
    FROM videojuego v
    JOIN videojuego_genero vg 
    ON v.id_videojuego = vg.id_videojuego
    JOIN genero g             
    ON vg.id_genero = g.id_genero
    GROUP BY v.titulo, v.precio
    ORDER BY v.titulo
) resultado;


-- CONSULTA 3
-- número de juegos por desarrollador

SELECT json_agg(resultado) AS datos_json
FROM (
    SELECT
        d.nombre AS desarrollador,
        d.pais,
        COUNT(v.id_videojuego)  AS total_juegos,
        ROUND(AVG(v.precio), 2) AS precio_medio
    FROM desarrollador d
    LEFT JOIN videojuego v ON d.id_desarrollador = v.id_desarrollador
    GROUP BY d.nombre, d.pais
    ORDER BY total_juegos DESC
) resultado;


-- CONSULTA 4 
-- Búsqueda de videojuegos disponibles en PC (Steam)

SELECT json_agg(resultado) AS datos_json
FROM (
    SELECT
        v.titulo,
        v.anio_lanzamiento,
        v.precio,
        p.nombre AS plataforma
    FROM videojuego v
    JOIN videojuego_plataforma vp 
    ON v.id_videojuego = vp.id_videojuego
    JOIN plataforma p             
    ON vp.id_plataforma = p.id_plataforma
    WHERE p.nombre = 'PC (Steam)'
    ORDER BY v.titulo
) resultado;


-- CONSULTA 5 
-- Agrupación: videojuegos por saga con sus plataformas

SELECT json_agg(resultado) AS datos_json
FROM (
    SELECT
        s.nombre AS saga,
        s.anio_inicio,
        COUNT(v.id_videojuego) AS total_juegos,
        SUM(v.precio) AS precio_total,
        (
            SELECT json_agg(json_build_object(
                'titulo', v2.titulo,
                'anio',   v2.anio_lanzamiento
            ))
            FROM videojuego v2
            WHERE v2.id_saga = s.id_saga    -- esto es para meterlos dentro de un array propio con sus respectivos datos 
        ) AS juegos
    FROM saga s
    JOIN videojuego v ON s.id_saga = v.id_saga
    GROUP BY s.nombre, s.anio_inicio, s.id_saga
    ORDER BY s.anio_inicio
) resultado;