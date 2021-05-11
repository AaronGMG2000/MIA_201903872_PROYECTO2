/*

CREACION DE LA TABLA DEPORTES 
*/
CREATE TABLE Deporte (
    id_Deporte         INT NOT NULL ,
    Nombre_Deporte    VARCHAR2(300),
    Color_Deporte  VARCHAR2(300),
    Imagen_Deoirte VARCHAR2(800)
);

ALTER TABLE Deporte ADD CONSTRAINT deporte_pk PRIMARY KEY ( id_Deporte );

CREATE SEQUENCE deporte_pk START WITH 1;
------------------------------------------------------------------------------------------------------------------------------------------------------------xd
/*

CREACION DE LA TABLA TEMPORADA
**/
CREATE TABLE Temporada (
    id_Temporada         INT NOT NULL ,
   Temporada    VARCHAR2(300),
    Inicio_Temporada  DATE,
    Fin_Temporada DATE,
    Estado_Temporada VARCHAR(200),
    DEPORTE INT NOT NULL
);

ALTER TABLE Temporada ADD CONSTRAINT temporada_pk PRIMARY KEY ( id_Temporada );

CREATE SEQUENCE temporada_pk START WITH 1;


ALTER TABLE Temporada
    ADD CONSTRAINT  deporte_id_pk FOREIGN KEY ( DEPORTE )
   REFERENCES deporte ( id_Deporte );



--CREACION DE TABLA JORNADA 
/**-----------------------------------------------------------------------------------------------------------------------------------------------*/
CREATE TABLE Jornada (
    id_Jornada         INT NOT NULL ,
    Nombre_Jornada    VARCHAR2(300),
    Inicio_Jornada  DATE,
Fin_Jornada DATE,
TEMPORADA INT NOT NULL
);



ALTER TABLE Jornada ADD CONSTRAINT jornada_pk PRIMARY KEY ( id_Jornada );

CREATE SEQUENCE jornada_pk START WITH 1;


ALTER TABLE Jornada
    ADD CONSTRAINT  Temporada_id_pk FOREIGN KEY (TEMPORADA )
   REFERENCES Temporada ( id_Temporada );


/**------------------------------------------------------------------------------------------------------*/

--CREACION TABLA EVENTOS

CREATE TABLE Eventos (
    id_evento         INT NOT NULL ,
    Nombre_Evento   VARCHAR2(300),
    LOCAL_  VARCHAR2(200),
    VISITANTE_ VARCHAR2(200),    
JORNADA INT NOT NULL,
ID_TEMPORADA_E INT NOT NULL
);



ALTER TABLE Eventos ADD CONSTRAINT evento_pk PRIMARY KEY ( id_evento );

CREATE SEQUENCE evento_pk START WITH 1;


ALTER TABLE Eventos
    ADD CONSTRAINT  Jornada_id_pk FOREIGN KEY (JORNADA )
   REFERENCES JORNADA ( id_Jornada );
   
   
ALTER TABLE Eventos
    ADD CONSTRAINT  Temporada_id_pke FOREIGN KEY (ID_TEMPORADA_E )
   REFERENCES Temporada ( id_Temporada );
   

   /*
   
   -----------------------------------------------------------------------------------------------------------------------------


   
   */

   --TABLE RESULT

   CREATE TABLE RESULT_ (
    id_RESULT         INT NOT NULL ,
   R_LOCAL   INT NOT NULL,
   R_VISITANTE  INT NOT NULL,
    EVENTO INT NOT NULL  

);

ALTER TABLE RESULT_ ADD CONSTRAINT result_pk PRIMARY KEY ( id_RESULT );

CREATE SEQUENCE result_pk START WITH 1;


ALTER TABLE RESULT_
    ADD CONSTRAINT  EVENTO_pkr FOREIGN KEY (EVENTO )
   REFERENCES EVENTOS ( id_evento );
   
   
/**

---------------------------------------------------------------------------------------------------------------------------------------------------*/
--TABLA TIER

CREATE TABLE TIER_ (
    id_TIER         INT NOT NULL ,
      TIER_ INT NOT NULL,
      PRECIO INT NOT NULL
);

ALTER TABLE TIER_ ADD CONSTRAINT tier_pk PRIMARY KEY ( id_TIER );

CREATE SEQUENCE tier_pk START WITH 1;



/*-*
---------------------------------------------------------------------------------------------------------------------------------------------
TABLA CLIENTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE

*/




CREATE TABLE CLIENTE (
    id_CLIENTE         INT NOT NULL ,
    Nombre_Cliente   VARCHAR2(300),
    Apellido_Usuario  VARCHAR2(300),
    USER_  VARCHAR2(300),
    Correo   VARCHAR2(300),
    NACIMIENTO DATE,
    REGISTRO DATE,
   Foto   VARCHAR2(300),
    TIER_ID  INT NOT NULL
       
);

ALTER TABLE CLIENTE ADD CONSTRAINT cliente_pk PRIMARY KEY ( id_CLIENTE);

CREATE SEQUENCE cliente_pk START WITH 1;





ALTER TABLE  CLIENTE
    ADD CONSTRAINT  TIER_ID_pk FOREIGN KEY (TIER_ID)
   REFERENCES TIER_ ( id_tier );



   /**
   
   --------------------------------------------------------------------------------------------------------------------------------------


    tabla pago 
   */



CREATE TABLE PAGO (
    id_PAGO         INT NOT NULL ,
    ID_CLIENTE  INT NOT NULL,
    TIER_CLIENTE  INT NOT NULL
   
       
);

ALTER TABLE PAGO ADD CONSTRAINT pago_pk PRIMARY KEY ( id_PAGO);

CREATE SEQUENCE pago_pk START WITH 1;
ALTER TABLE  PAGO
    ADD CONSTRAINT USER_pk FOREIGN KEY (ID_CLIENTE)
   REFERENCES CLIENTE(ID_CLIENTE);


/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

--tabla recompensa



CREATE TABLE RECOMPENSA(
    id_Recompensa         INT NOT NULL ,
    ID_CLIENTE_R  INT NOT NULL,
    CANTIDAD  INT NOT NULL,
    
   INCREMENT_  INT NOT NULL,
   ultima  INT NOT NULL
       
);

ALTER TABLE recompensa ADD CONSTRAINT recompensa_pk PRIMARY KEY ( id_Recompensa);

CREATE SEQUENCE recompensa_pk START WITH 1;
ALTER TABLE  RECOMPENSA
    ADD CONSTRAINT USER_pkr FOREIGN KEY (ID_CLIENTE_R)
   REFERENCES CLIENTE(ID_CLIENTE);


   /*-
   -----------------------------------------------------------------------------------------------------------------------------------
   **/

   --TABLA PREDICCION



CREATE TABLE Prediccion(
    id_Prediccion        INT NOT NULL ,
    ID_CLIENTE_P INT NOT NULL,
    FECHA_PREDICCION  DATe

);

ALTER TABLE Prediccion ADD CONSTRAINT prediccion_pk PRIMARY KEY ( id_Prediccion);

CREATE SEQUENCE prediccion_pk START WITH 1;

ALTER TABLE  RECOMPENSA
    ADD CONSTRAINT USER_pkr FOREIGN KEY (ID_CLIENTE_R)
   REFERENCES CLIENTE(ID_CLIENTE);


   /*----------------------------------------------------------------------*/

   --TABLA  desc PREDICCION




CREATE TABLE Desc_Prediccion(
    id_DESc_Prediccion        INT NOT NULL ,
    id_Prediccion        INT NOT NULL ,
 
    ID_TEMPORADA INT NOT NULL,
    ID_EVENTO INT NOT NULL,
    ID_JORNADA INT NOT NULL,
    EQUIPO_LOCAL INT NOT NULL,
    EQUIPO_VISITANTE INT NOT NULL,
    R_LOCAL INT NOT NULL,
    R_VISITANTE INT NOT NULL

);

ALTER TABLE Desc_Prediccion ADD CONSTRAINT desc_prediccion_pk PRIMARY KEY ( id_Desc_Prediccion);

CREATE SEQUENCE desc_prediccion_pk START WITH 1;

ALTER TABLE  desc_prediccion
    ADD CONSTRAINT jornada_pkdesc FOREIGN KEY (ID_JORNADA)
   REFERENCES JORNADA(ID_JORNADA);
    
    ALTER TABLE  desc_prediccion
    ADD CONSTRAINT TEMPORADA_pkdesc FOREIGN KEY (ID_TEMPORADA)
   REFERENCES TEMPORADA(ID_TEMPORADA);

   ALTER TABLE  desc_prediccion
    ADD CONSTRAINT EVENTO_pkdesc FOREIGN KEY (ID_EVENTO)
   REFERENCES EVENTOS(ID_EVENTO);
    
    ALTER TABLE  desc_prediccion
    ADD CONSTRAINT jornada_pkdesc FOREIGN KEY (ID_JORNADA)
   REFERENCES JORNADA(ID_JORNADA);


   /**
   Creacion de una tabla temporal 
   

    se creo esta tabla  para poder entrar todo lo que viene ene el archivo yamL
   */




   CREATE TABLE TEMPORAL(
NOMBRE VARCHAR2(32),
APELLIDO VARCHAR(32),
PASSWORD VARCHAR (32),
USERNAME VARCHAR (32),
TEMPORADA VARCHAR (32),
TIER  int not null,
JORNADA VARCHAR2(32),
DEPORTE VARCHAR2(32),
FECHA VARCHAR2(20),
E_VISITANTE VARCHAR2(32),
E_LOCAL VARCHAR2(32),
P_LOCAL INT NOT NULL,
P_VISITANTE INT NOT NULL,
R_VISITANTE INT NOT NULL,
R_LOCAL INT NOT NULL


);
/*

tabla temporal se creo estab tabla por todo el archivo yaml que viene en el archivo de entrada



*/



CREATE OR REPLACE PROCEDURE   PROCEDIMIENTO_TEMPORAL  (
NOMBRE_  in VARCHAR2,
APELLIDO_  in VARCHAR2,
PASSWORD_  in VARCHAR2,
USERNAME_ in VARCHAR2,
TEMPORADA_ in VARCHAR2,
TIER in INT,
JORNADA in VARCHAR2,
DEPORTE in VARCHAR2,
FECHA in VARCHAR2,
E_VISITANTE in VARCHAR2,
E_LOCAL in VARCHAR2,
P_LOCAL  in INT,
P_VISITANTE in INT,

R_VISITANTE in INT,
R_LOCAL in INT



)AS 
BEGIN
INSERT INTO TEMPORAL VALUES (NOMBRE_,APELLIDO_,PASSWORD_,USERNAME_,TEMPORADA_,TIER,JORNADA,DEPORTE
,FECHA,E_VISITANTE,E_LOCAL,P_LOCAL,P_VISITANTE,R_VISITANTE,R_LOCAL) ;
END;

EXECUTE procedimiento_temporal (         'juan' ,'Alvarado', '1234','username','temporada1',22,'jornada1',
'deporte mixto','22/15/2018','xinabajul','cremas',1,2,3,4) ;

*/