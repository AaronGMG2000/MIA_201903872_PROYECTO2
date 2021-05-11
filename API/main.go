package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/gorilla/mux"
	_ "github.com/mattn/go-oci8"
)

var base *sql.DB

/*STRUCTS*/
func inicio(w http.ResponseWriter, r *http.Request) {

	fmt.Fprint(w, "gola")
}

/**
STRUCT DE LA CARGA MASIVA
ESTA SERA DE UTILIDAD PARA PODER LLENAR UNA TEMPORAL
QUE POSTERIORMETE SERA UTILIZA PARA PODER LLENAR NUESTRO MODELO

*/

/*

-------------------------------------------------------------------------------------------------------------------------------
*/
type CargaMasiva struct {
	NOMBRE string `json:"NOMBRE"`

	APELLIDO string `json:"APELLIDO"`

	PASSWORD string `json:"PASSWORD"`

	USERNAME string `json:"USERNAME"`

	TEMPORADA string `json:"TEMPORADA"`

	TIER int `json:"TIER"`

	JORNADA string `json:"JORNADA"`

	DEPORTE string `json:"DEPORTE"`

	FECHA string `json:"FECHA"`

	E_LOCAL     string `json:"E_LOCAL"`
	E_VISITANTE string `json:"E_VISTIANTE"`

	P_LOCAL int `json:"P_LOCAL"`

	P_VISITANTE int `json:"P_VISITANTE"`

	R_VISITANTE int `json:"R_VISITANTE"`

	R_LOCAL int `json:"R_LOCAL"`
}

func insert_CargaMasiva(w http.ResponseWriter, r *http.Request) {

	fmt.Print(r)
	var pruebita CargaMasiva
	//var loginprueba login
	// we will need to extract the `id` of the article we
	// wish to delete
	reqBody, _ := ioutil.ReadAll(r.Body)
	res2 := strings.Split(pruebita.TEMPORADA, "-")
	//---el body lo vuelvo un struct para acceder a sus atributos

	println(pruebita.NOMBRE)
	println(pruebita.APELLIDO)
	println(pruebita.PASSWORD)
	println(pruebita.USERNAME)
	println(pruebita.TEMPORADA)
	println(pruebita.TIER)
	println(pruebita.JORNADA)
	println(pruebita.DEPORTE)
	println(pruebita.FECHA)
	println(pruebita.E_VISITANTE)
	println(pruebita.E_LOCAL)
	println(pruebita.P_LOCAL)
	println(pruebita.P_VISITANTE)
	println(pruebita.R_LOCAL)
	println(pruebita.R_VISITANTE)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(pruebita)

	db, err := sql.Open("oci8", "AARON/Marroquin1@localhost:1521/ORCL18")
	//Oracle 18c
	// db, err := sql.Open("godror", "user/password@localhost:1521/ORCL18.localdomain")
	if err != nil {
		fmt.Println(err)
		return
	}

	defer db.Close()

	base = db
	json.Unmarshal(reqBody, &pruebita)

	res, err := db.Exec("BEGIN procedimiento_temporal(:1, :2, :3,:4,:5,:6,:7,:8,:9,:10,:11,:12,:13,:14,:15,:16);end;", pruebita.NOMBRE, pruebita.APELLIDO, pruebita.PASSWORD, pruebita.USERNAME, res2[0], res2[1], pruebita.TIER, pruebita.JORNADA, pruebita.DEPORTE, pruebita.FECHA, pruebita.E_VISITANTE, pruebita.E_LOCAL, pruebita.P_LOCAL, pruebita.P_VISITANTE, pruebita.R_VISITANTE, pruebita.R_LOCAL)
	fmt.Print(res)
	if err != nil {
		fmt.Println(err)
		return
	}

}

type USUARIO struct {
	Nombre_Cliente   string `json:"Nombre_Cliente"`
	Apellido_Cliente string `json:"Apellido_Cliente"`
	Fecha_Nacimiento string `json:"Fecha_Nacimiento"`
	Correo_Cliente   string `json:"Correo_Cliente"`
	Contrasena       string `json:"Contraseña"`
	PASS             string `json:"PASS"`
	COM              bool   `json:"COM"`
}

type Deporte struct {
	Nombre_Deportes string `json:"Nombre_Deportes"`

	Color_Deporte string `json:"Color_Deporte"`

	Imagen_Deporte string `json:"Imagen_Deporte"`
}

//Insertar Deportes

/*
Con una peticion POST DE REACT se llenara

*/
func CrearDeportes(w http.ResponseWriter, r *http.Request) {

	var pruebita Deporte

	reqBody, _ := ioutil.ReadAll(r.Body)
	fmt.Print(pruebita)
	json.Unmarshal(reqBody, &pruebita)

	println("se esta creando un deporte de nombre--" + pruebita.Nombre_Deportes)

	println("color de deporte---" + pruebita.Color_Deporte)

	println("FOto  de deporte---" + pruebita.Imagen_Deporte)

	db, err := sql.Open("godror", "AARON/Marroquin1@localhost:1521/ORCL18")
	//Oracle 18c
	// db, err := sql.Open("godror", "user/password@localhost:1521/ORCL18.localdomain")
	if err != nil {
		fmt.Println(err)
		return
	}

	defer db.Close()

	//var prueba =pruebita.Color_Deporte;
	//var prueba2=pruebita.Imagen_Deporte
	base = db
	json.Unmarshal(reqBody, &pruebita)
	querry_cargar_deportes := "INSERT INTO DEPORTE (nombre_deporte)  VALUES(" + pruebita.Nombre_Deportes + ")"

	res, err := base.Exec(querry_cargar_deportes)

	fmt.Print(res)
	if err != nil {
		fmt.Println(err)
		return
	}

	/*	res1 := strings.SplitAfter(pruebita.Imagen_Deporte, "fakepath")
		     fmt.Print(res1)

		    var FotoDeporte string;
			FotoDeporte="C:"+"/path";
		 fmt.Print(FotoDeporte)
	*/

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(pruebita)

}

func insert_CargaMasivaDeporte(w http.ResponseWriter, r *http.Request) {

	fmt.Print(r)
	var pruebita CargaMasiva
	//var loginprueba login
	// we will need to extract the `id` of the article we
	// wish to delete
	reqBody, _ := ioutil.ReadAll(r.Body)

	//---el body lo vuelvo un struct para acceder a sus atributos

	db, err := sql.Open("godror", "AARON/Marroquin1@localhost:1521/ORCL18")
	//Oracle 18c
	// db, err := sql.Open("godror", "user/password@localhost:1521/ORCL18.localdomain")
	if err != nil {
		fmt.Println(err)
		return
	}

	defer db.Close()

	base = db
	json.Unmarshal(reqBody, &pruebita)
	querry_cargar_deportes := `INSERT INTO DEPORTE ( nombre_deporte) 
			
			select distinct DEPORTE FROM TEMPORAL`

	res, err := db.Exec(querry_cargar_deportes)

	fmt.Print("suuuuuuuuuuuuu")
	fmt.Print(res)
	if err != nil {
		fmt.Println(err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(pruebita)

}

var Usuarios []USUARIO

func getUsers(w http.ResponseWriter, r *http.Request) {

	json.NewEncoder(w).Encode(Usuarios)

}

func VerificarUsuario(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.NewEncoder(w).Encode(reqBody)
	var user USUARIO

	json.Unmarshal(reqBody, &user)
	db, err := sql.Open("oci8", "AARON/Marroquin1@localhost:1521/ORCL18")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer db.Close()
	base = db
	comprobar := "SELECT Nombre_Cliente, Apellido_Cliente, Correo_Cliente, Contrasena, Fecha_Nacimiento FROM CLIENTE WHERE Correo_Cliente = '" + user.Correo_Cliente + "'"
	rows, _ := base.Query(comprobar)
	println(comprobar)
	people := make([]USUARIO, 0)
	for rows.Next() {
		p := new(USUARIO)
		rows.Scan(&p.Nombre_Cliente, &p.Apellido_Cliente, &p.Correo_Cliente, &p.Contrasena, &p.Fecha_Nacimiento)
		people = append(people, *p)
	}
	if len(people) > 0 {
		json.NewEncoder(w).Encode(false)
		return
	}
	registrar := "INSERT INTO CLIENTE VALUES ('" + user.Nombre_Cliente + "','" + user.Apellido_Cliente + "','" + user.Correo_Cliente + "','" + user.Contrasena + "','" + user.Fecha_Nacimiento + "',NULL,NULL,NULL)"
	println(registrar)
	base.Query(registrar)
	json.NewEncoder(w).Encode(true)
	return
}

func insert_USERS(w http.ResponseWriter, r *http.Request) {

	var pruebita USUARIO
	//var loginprueba login
	// we will need to extract the `id` of the article we
	// wish to delete
	reqBody, _ := ioutil.ReadAll(r.Body)

	//---el body lo vuelvo un struct para acceder a sus atributos
	json.Unmarshal(reqBody, &pruebita)

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(pruebita)
}

/*

carga masiva deporteeeeeee



*/

/**-



---------------------------------------------------------------------

*/

func main() {
	//Oracle 12c
	router := mux.NewRouter().StrictSlash(true)
	headers := handlers.AllowedHeaders([]string{"X-Request-Headers", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"*"})

	router.HandleFunc("/", inicio)
	router.HandleFunc("/Usuario", getUsers)
	router.HandleFunc("/CargaMasiva", insert_CargaMasiva).Methods("POST")
	router.HandleFunc("/VerificarUsuario", VerificarUsuario).Methods("POST")

	//peticion carga masiva de los deportes
	router.HandleFunc("/CargarDeportes", insert_CargaMasivaDeporte).Methods("POST")

	//peticion para crear deportes
	router.HandleFunc("/CrearDeportes", CrearDeportes).Methods("POST")
	//peticion para editar deportes

	//peticion para eliminar deportes
	// creando las peticiones que entran  de react

	//puertooooooo
	fmt.Println("servidor sonando en el puerto 7000")

	log.Fatal(http.ListenAndServe(":7000", handlers.CORS(headers, methods, origins)(router)))

}

// este select lo tengo ahorita de pruebaw
