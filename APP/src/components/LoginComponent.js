import React from "react";
import { confirmDialog } from 'primereact/confirmdialog';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { BrowserRouter, Route } from 'react-router-dom'
class LOGIN extends React.Component {
    
    load = {};
    constructor(props) {
        super(props);
        this.showError = this.showError.bind(this);
        this.state = {
            Usuario: '',
            Nombre_Cliente: '',
            Apellido_Cliente: '',
            Fecha_Nacimiento: null,
            Correo_Cliente: '',
            Contrasena: '',
            PASS: '',
            COM: false,
            FECHA: null,
            FOTOPERFIL:'',
            File_active: null
        };
    }


    showError() {
        this.toast.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
    }
    

    RegistrarUsuario () {
        let data = {
            USERNAME: this.state.Usuario,         
            PASS: this.state.Contrasena,
            NOMBRE: '',          
            APELLIDO: '',         
            ID_TIER: 1,         
            FECHA_NACIMIENTO: this.state.Fecha_Nacimiento,
            CORREO: '',           
            FOTOPERFIL: '',     
        }
        axios.post('http://localhost:7000/Logear', data)
          .then(response => {
            if (response.RESPUESTA) {
                this.showError();
            }else{
                if (response.RESPUESTA1) {
                    
                }else{
                    console.log(this.state.USERNAME);
                    window.localStorage.setItem('ID', this.state.Usuario);
                    return <Redirect to='/CargaMasiva'/>
                }
            }
          });
      }
    
    confirm = () => {
        confirmDialog({
            message: '¿Confirma los datos ingresados?',
            header: 'CONFIRMAR USUARIO',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.RegistrarUsuario(),
            reject: () => console.log("cancelado")
        });
    }

    

    analizar (){
        if (this.state.Usuario && this.state.Contrasena.length>=6) {
            this.setState({COM: true});
        }else{
            this.setState({COM:false});

        }
    }
    render() {
        this.props.setTitle("LOGIN");
        return (
            <div className="row p-0 m-0 justify-content-center align-content-center vh100 h100">
                <div className="col-12 col-md-8 col-xl-4">
                
                <Toast ref={(el) => this.toast = el} />
                    <div className="card scroll_register">
                        <div className="text-center card-header bg-danger text-white font-weight-bold">
                            <h4>REGISTRO</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label for="Nombre" className="m-2">Usuario</label>
                                    <input type="text" className="form-control" id="Usuario" aria-describedby="nombreHelp" placeholder="Nombre"
                                    value={this.state.Usuario} onChange={(e) => {this.setState({Usuario: e.target.value});}} onKeyUp={()=>this.analizar()}/>
                                </div>
                                <div className="form-group">
                                    <label for="Nombre" className="m-2">Nombre</label>
                                    <input type="password" className="form-control" id="Nombre" aria-describedby="nombreHelp" placeholder="Nombre"
                                    value={this.state.Contrasena} onChange={(e) => {this.setState({Contrasena: e.target.value});}} onKeyUp={()=>this.analizar()}/>
                                </div>
                                <div className="form-group">
                                    <div className="row align-content-center justify-content-center">
                                        <div className="col-12 col-md-6 text-center mt-2">
                                            <button type="button" onClick={this.confirm} className={`btn btn-block btn-dark w-100 ${this.state.COM?"":"disabled"}`} 
                                            >LOGEAR</button>
                                        </div>
                                        <div className="col-12 col-md-6 text-center mt-2">
                                            <button type="reset" className="btn btn-block btn-secondary w-100">CANCELAR</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default LOGIN;