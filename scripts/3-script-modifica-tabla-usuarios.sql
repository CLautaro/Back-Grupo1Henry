SET schema 'public';

ALTER TABLE usuarios DROP CONSTRAINT usuarios_un_dni;
ALTER TABLE usuarios DROP COLUMN dni;
ALTER TABLE usuarios DROP COLUMN contrasena;
ALTER TABLE usuarios ALTER COLUMN id_rol SET DEFAULT 1;
ALTER TABLE usuarios DROP COLUMN registrado;
ALTER TABLE usuarios ALTER COLUMN habilitado SET DEFAULT true;
