import React from "react";
import yaml from "js-yaml";
import { FilePicker } from "react-file-picker";
import axios from 'axios';
class CargaMasiva extends React.Component {
    load = {};


    handleFileChange = file => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = e => {
            try {
                const doc = yaml.load(e.target.result);
                this.load = JSON.stringify(doc, null, 2);
                // console.log(doc);

                for (const [e1, e2] of Object.entries(doc)) {
/*                    console.log("cargando el archivo.... que entra")
                    console.log(e1);
                    console.log("nombreee:" + e2.nombre)

                    console.log("apellido  de usuario:" + e2.apellido)

                    console.log("password de usuario:" + e2.password)

                    console.log("user___:" + e2.username)


*/
                    for (let rec1 = 0; rec1 < e2.resultados.length; rec1++) {
/*

                        console.log("-------resultados:**------------")
                        console.log(e2.resultados[rec1].temporada)
                        console.log(e2.resultados[rec1].tier)
*/
                        for (let rec2 = 0; rec2 < e2.resultados[rec1].jornadas.length; rec2++) {
  /*                          console.log("------------Jornadas--------")
                            console.log(e2.resultados[rec1].jornadas[rec2].jornada)
*/


                            for (let rec3 = 0; rec3 < e2.resultados[rec1].jornadas[rec2].predicciones.length; rec3++) {
/*                                console.log("----predicciones---")
                                console.log(e2.resultados[rec1].jornadas[rec2].predicciones[rec3].deporte)

                                console.log(e2.resultados[rec1].jornadas[rec2].predicciones[rec3].fecha)

                                console.log(e2.resultados[rec1].jornadas[rec2].predicciones[rec3].visitante)

                                console.log(e2.resultados[rec1].jornadas[rec2].predicciones[rec3].local)
                                console.log("prediccion Usuario:")
                                console.log(e2.resultados[rec1].jornadas[rec2].predicciones[rec3].prediccion.visitante)
                                console.log(e2.resultados[rec1].jornadas[rec2].predicciones[rec3].prediccion.local)
                                console.log("resultado:Usuario")
                                console.log(e2.resultados[rec1].jornadas[rec2].predicciones[rec3].resultado.visitante)
                                console.log(e2.resultados[rec1].jornadas[rec2].predicciones[rec3].resultado.local)

*/

                                let Carga = {

                                    NOMBRE: e2.nombre,
                                    APELLIDO: e2.apellido,
                                    PASSWORD: e2.password,
                                    USERNAME: e2.username,
                                    TEMPORADA: e2.resultados[rec1].temporada,
                                    TIER: e2.resultados[rec1].tier,
                                    JORNADA: e2.resultados[rec1].jornadas[rec2].jornada,
                                    DEPORTE: e2.resultados[rec1].jornadas[rec2].predicciones[rec3].deporte,
                                    FECHA: e2.resultados[rec1].jornadas[rec2].predicciones[rec3].fecha,
                                    E_VISITANTE: e2.resultados[rec1].jornadas[rec2].predicciones[rec3].visitante,
                                    E_LOCAL: e2.resultados[rec1].jornadas[rec2].predicciones[rec3].local,
                                    P_LOCAL: e2.resultados[rec1].jornadas[rec2].predicciones[rec3].prediccion.local,

                                    P_VISITANTE: e2.resultados[rec1].jornadas[rec2].predicciones[rec3].prediccion.visitante,


                                    R_VISITANTE: e2.resultados[rec1].jornadas[rec2].predicciones[rec3].resultado.visitante,

                                    R_LOCAL: e2.resultados[rec1].jornadas[rec2].predicciones[rec3].resultado.local,



                                }
                                 
                                this.sendPost(Carga);




                            }

                        }
                        //for
                        //for
                        // ESTE PRIMER LET VA ASER PARA EL PADRE QUE CONTIENE LOS A2

                    }

                }
                /**/
                //  console.log(this.load);
               
            } catch (e) {
                console.log(e);
            }
        };

        this.setState({ title: file.name });
    };


    sendPost = async (carga) => {
        await axios
        .post("http://localhost:7000/CargaMasiva",carga)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => console.error(`Error: ${err}`));
       
    };
    sendDeportes = async () => {
        await axios
        .post("http://localhost:7000/CargarDeportes")
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => console.error(`Error: ${err}`));
       
    };

    render() {
        this.props.setTitle("CARGA");
        return (
            ""
        )
    }

}
export default CargaMasiva;