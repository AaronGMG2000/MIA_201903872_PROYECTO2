package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/mattn/go-oci8"
)

var base *sql.DB

/*STRUCTS*/
func inicio(w http.ResponseWriter, r *http.Request) {

	fmt.Fprint(w, "gola")
}

type CargaMasiva struct {
	NOMBRE string `json:"NOMBRE"`

	APELLIDO string `json:"APELLIDO"`

	PASSWORD string `json:"PASSWORD"`

	USERNAME string `json:"USERNAME"`

	TEMPORADA string `json:"TEMPORADA"`

	TIER string `json:"TIER"`

	JORNADA string `json:"JORNADA"`

	DEPORTE string `json:"DEPORTE"`

	FECHA string `json:"FECHA"`

	EQUIPO_V string `json:"EQUIPO_V"`

	EQUIPO_L string `json:"EQUIPO_L"`

	PREDICCION_L int `json:"PREDICCION_L"`

	PREDICCION_V int `json:"PREDICCION_V"`

	RESULTADO_V int `json:"RESULTADO_V"`

	RESULTADO_L int `json:"RESULTADO_L"`
}

func insert_CargaMasiva(w http.ResponseWriter, r *http.Request) {
	fmt.Print(r)
	temps := make([]CargaMasiva, 0)
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &temps)
	db, err := sql.Open("oci8", "AARON/Marroquin1@localhost:1521/ORCL18")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer db.Close()
	base = db
	for _, valor := range temps {
		s := strings.Split(valor.TEMPORADA, "-Q")
		temp, _ := strconv.ParseInt(s[1], 10, 64)
		temp2, _ := strconv.ParseInt(s[0], 10, 64)
		_, err := db.Exec("BEGIN procedimiento_temporal (:1, :2, :3,:4,:5,:6,:7,:8,:9,:10,:11,:12,:13,:14,:15,:16,:17);end;", valor.NOMBRE, valor.APELLIDO, valor.PASSWORD, valor.USERNAME, valor.TEMPORADA, temp, temp2, valor.TIER, valor.JORNADA, valor.DEPORTE, valor.FECHA, valor.EQUIPO_V, valor.EQUIPO_L, valor.PREDICCION_L, valor.PREDICCION_V, valor.RESULTADO_V, valor.RESULTADO_L)
		if err != nil {
			fmt.Println(err)
			return
		}
	}
	println()
	println()
	println("***********CARGA TERMINADA**********")
}

type USUARIO struct {
	USERNAME         string `json:"USERNAME"`
	PASS             string `json:"PASS"`
	NOMBRE           string `json:"NOMBRE"`
	APELLIDO         string `json:"APELLIDO"`
	ID_TIER          int    `json:"ID_TIER"`
	FECHA_NACIMIENTO string `json:"FECHA_NACIMIENTO"`
	CORREO           string `json:"CORREO"`
	FOTOPERFIL       string `json:"FOTOPERFIL"`
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
	fmt.Println(user)
	var respuesta int
	_, err = db.Exec("BEGIN NEWUSER (:1, :2, :3,:4,:5,:6,:7,:8);end;", user.USERNAME, user.PASS, user.NOMBRE, user.APELLIDO, user.FECHA_NACIMIENTO, user.CORREO, user.FOTOPERFIL, sql.Out{Dest: &respuesta})
	if err != nil {
		fmt.Println(err)
		return
	}
	print(respuesta)
	json.NewEncoder(w).Encode(respuesta)
}

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

	fmt.Println("servidor sonando en el puerto 7000")

	log.Fatal(http.ListenAndServe(":7000", handlers.CORS(headers, methods, origins)(router)))

}
