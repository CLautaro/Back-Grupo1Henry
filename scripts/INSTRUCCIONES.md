# Importar esquema de base de datos

Correr los scripts en orden numérico para crear y modificar la estructura de la base de datos así para también ingresar registros.

## Usar un schema distinto

Para usar un schema distinto a `public` cambiar en los archivos SQL las sentencias siguientes:

```sql
-- Utilizar schema public por defecto

CREATE schema public;

SET schema 'public';

-- Utilizar nuevo schema llamado carlos_db
-- Respetar si se usa o no se usa las comillas!

CREATE schema carlos_db;

SET schema 'carlos_db'
```
