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
                let vectorTemporal = [];
                for (const [e1, e2] of Object.entries(doc)) {
                    for (let x = 0; x < e2.resultados.length; x++) {
                        for (let y = 0; y < e2.resultados[x].jornadas.length; y++) {
                            for (let z = 0; z < e2.resultados[x].jornadas[y].predicciones.length; z++) {
                                let Carga = {
                                    NOMBRE: e2.nombre,
                                    APELLIDO: e2.apellido,
                                    PASSWORD: e2.password,
                                    USERNAME: e2.username,
                                    TEMPORADA: e2.resultados[x].temporada,
                                    TIER: e2.resultados[x].tier,
                                    JORNADA: e2.resultados[x].jornadas[y].jornada,
                                    DEPORTE: e2.resultados[x].jornadas[y].predicciones[z].deporte,
                                    FECHA: e2.resultados[x].jornadas[y].predicciones[z].fecha,
                                    EQUIPO_V: e2.resultados[x].jornadas[y].predicciones[z].visitante,
                                    EQUIPO_L: e2.resultados[x].jornadas[y].predicciones[z].local,
                                    PREDICCION_V: e2.resultados[x].jornadas[y].predicciones[z].prediccion.visitante,
                                    PREDICCION_L: e2.resultados[x].jornadas[y].predicciones[z].prediccion.local,
                                    RESULTADO_V: e2.resultados[x].jornadas[y].predicciones[z].resultado.visitante,
                                    RESULTADO_L: e2.resultados[x].jornadas[y].predicciones[z].resultado.local
                                }
                                vectorTemporal.push(Carga);
                            }
                        }
                    }
                }
                this.sendPost(vectorTemporal);
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
    
 /*    sendDeportes = async () => {
        await axios
        .post("http://localhost:7000/CargaMasiva")
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => console.error(`Error: ${err}`));
       
    };
 */
    render() {
        this.props.setTitle("CARGA");
        return (
            <div className="CARD">
                <FilePicker extensions={["yaml"]} onChange={this.handleFileChange} onError={errMsg => console.log(errMsg)}>
                    <button className='btn btn-dark'>Seleccionar archivo</button>
                </FilePicker>

                {/* <form on onSubmit={this.sendDeportes}>
                    <button type="submit" className="btn btn-light">CARGAR ARCHIVO</button>
                </form> */}
            </div>
        )
    }

}
export default CargaMasiva;