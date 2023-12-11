CREATE schema public;

SET schema 'public';

-- categorias definition

-- Drop table

-- DROP TABLE categorias;

CREATE TABLE categorias (
	id_categoria serial4 NOT NULL,
	nombre varchar NOT NULL,
	CONSTRAINT categorias_pk PRIMARY KEY (id_categoria),
	CONSTRAINT categorias_un UNIQUE (nombre)
);

-- roles definition

-- Drop table

-- DROP TABLE roles;

CREATE TABLE roles (
	id_rol serial4 NOT NULL,
	nombre varchar NOT NULL,
	CONSTRAINT roles_pk PRIMARY KEY (id_rol),
	CONSTRAINT roles_un UNIQUE (nombre)
);

-- usuarios definition

-- Drop table

-- DROP TABLE usuarios;

CREATE TABLE usuarios (
	id_usuario serial4 NOT NULL,
	nombre_completo varchar NOT NULL,
	correo varchar NOT NULL,
	nombre_usuario varchar NOT NULL,
	contrasena varchar NOT NULL,
	dni varchar NOT NULL,
	id_rol int4 NOT NULL,
	habilitado bool NOT NULL DEFAULT false,
	registrado bool NOT NULL DEFAULT false,
	CONSTRAINT usuarios_pk PRIMARY KEY (id_usuario),
	CONSTRAINT usuarios_un_correo UNIQUE (correo),
	CONSTRAINT usuarios_un_dni UNIQUE (dni),
	CONSTRAINT usuarios_un_nombre_usuario UNIQUE (nombre_usuario),
	CONSTRAINT usuarios_fk FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- usuarios_direcciones definition

-- Drop table

-- DROP TABLE usuarios_direcciones;

CREATE TABLE usuarios_direcciones (
	id_direccion serial4 NOT NULL,
	id_usuario int4 NOT NULL,
	direccion varchar NOT NULL,
	CONSTRAINT usuarios_direcciones_pk PRIMARY KEY (id_direccion),
	CONSTRAINT usuarios_direcciones_fk FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- tipos_de_pago definition

-- Drop table

-- DROP TABLE tipos_de_pago;

CREATE TABLE tipos_de_pago (
	id_tipo_de_pago serial4 NOT NULL,
	nombre varchar NOT NULL,
	CONSTRAINT tipos_de_pagos_pk PRIMARY KEY (id_tipo_de_pago),
	CONSTRAINT tipos_de_pagos_un UNIQUE (nombre)
);

-- emisoras_de_tarjetas definition

-- Drop table

-- DROP TABLE emisoras_de_tarjetas;

CREATE TABLE emisoras_de_tarjetas (
	id_emisora_de_tarjeta serial4 NOT NULL,
	nombre varchar NOT NULL,
	CONSTRAINT emisoras_de_tarjetas_pk PRIMARY KEY (id_emisora_de_tarjeta),
	CONSTRAINT emisoras_de_tarjetas_un UNIQUE (nombre)
);

-- entidades_financieras definition

-- Drop table

-- DROP TABLE entidades_financieras;

CREATE TABLE entidades_financieras (
	id_entidad_financiera serial4 NOT NULL,
	nombre varchar NOT NULL,
	CONSTRAINT entidades_financieras_pk PRIMARY KEY (id_entidad_financiera),
	CONSTRAINT entidades_financieras_un UNIQUE (nombre)
);

-- sub_categorias definition

-- Drop table

-- DROP TABLE sub_categorias;

CREATE TABLE sub_categorias (
	id_sub_categoria serial4 NOT NULL,
	id_categoria int4 NOT NULL,
	nombre varchar NOT NULL,
	CONSTRAINT sub_categorias_pk PRIMARY KEY (id_sub_categoria),
	CONSTRAINT sub_categorias_fk FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- formas_de_pago definition

-- Drop table

-- DROP TABLE formas_de_pago;

CREATE TABLE formas_de_pago (
	id_forma_de_pago serial4 NOT NULL,
	id_tipo_de_pago int4 NOT NULL,
	id_entidad_financiera int4 NULL,
	id_emisora_de_tarjeta int4 NULL,
	habilitado bool NOT NULL DEFAULT false,
	CONSTRAINT formas_de_pago_pk PRIMARY KEY (id_forma_de_pago),
	CONSTRAINT formas_de_pago_fk FOREIGN KEY (id_tipo_de_pago) REFERENCES tipos_de_pago(id_tipo_de_pago) ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT formas_de_pago_fk_1 FOREIGN KEY (id_entidad_financiera) REFERENCES entidades_financieras(id_entidad_financiera) ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT formas_de_pago_fk_2 FOREIGN KEY (id_emisora_de_tarjeta) REFERENCES emisoras_de_tarjetas(id_emisora_de_tarjeta) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- productos definition

-- Drop table

-- DROP TABLE productos;

CREATE TABLE productos (
	id_producto serial4 NOT NULL,
	id_sub_categoria int4 NOT NULL,
	sku varchar NOT NULL,
	nombre varchar NOT NULL,
	descripcion varchar NOT NULL,
	precio int4 NOT NULL,
	stock int4 NOT NULL DEFAULT 0,
	CONSTRAINT productos_check CHECK ((stock >= 0)),
	CONSTRAINT productos_pk PRIMARY KEY (id_producto),
	CONSTRAINT productos_un UNIQUE (sku),
	CONSTRAINT productos_fk FOREIGN KEY (id_sub_categoria) REFERENCES sub_categorias(id_sub_categoria) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- ordenes definition

-- Drop table

-- DROP TABLE ordenes;

CREATE TABLE ordenes (
	id_orden serial4 NOT NULL,
	id_usuario int4 NOT NULL,
	id_forma_de_pago int4 NOT NULL,
	fecha_orden timestamp NOT NULL,
	fecha_entrega timestamp NULL,
	direccion_acordada varchar NOT NULL,
	tipo_factura varchar NOT NULL,
	pagado bool NOT NULL DEFAULT false,
	CONSTRAINT ordenes_pk PRIMARY KEY (id_orden),
	CONSTRAINT ordenes_fk FOREIGN KEY (id_forma_de_pago) REFERENCES formas_de_pago(id_forma_de_pago) ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT ordenes_fk_1 FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- ordenes_productos definition

-- Drop table

-- DROP TABLE ordenes_productos;

CREATE TABLE ordenes_productos (
	id_orden_producto serial4 NOT NULL,
	id_orden int4 NOT NULL,
	id_producto int4 NOT NULL,
	precio_acordado int4 NOT NULL,
	cantidad int4 NOT NULL,
	CONSTRAINT ordenes_productos_check CHECK ((cantidad > 0)),
	CONSTRAINT ordenes_productos_pk PRIMARY KEY (id_orden_producto),
	CONSTRAINT ordenes_productos_fk FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden) ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT ordenes_productos_fk_1 FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE RESTRICT ON UPDATE CASCADE
);