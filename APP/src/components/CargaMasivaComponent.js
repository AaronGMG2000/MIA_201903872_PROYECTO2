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
                    for (let rec1 = 0; rec1 < e2.resultados.length; rec1++) {
                        for (let rec2 = 0; rec2 < e2.resultados[rec1].jornadas.length; rec2++) {
                            for (let rec3 = 0; rec3 < e2.resultados[rec1].jornadas[rec2].predicciones.length; rec3++) {
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
                                    P_VISITANTE: e2.resultados[rec1].jornadas[rec2].predicciones[rec3].prediccion.visitante,
                                    P_LOCAL: e2.resultados[rec1].jornadas[rec2].predicciones[rec3].prediccion.local,
                                    R_VISITANTE: e2.resultados[rec1].jornadas[rec2].predicciones[rec3].resultado.visitante,
                                    R_LOCAL: e2.resultados[rec1].jornadas[rec2].predicciones[rec3].resultado.local
                                }
                                vectorTemporal.push(Carga);
                            }
                        }
                    }
                }
                console.log(vectorTemporal);
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