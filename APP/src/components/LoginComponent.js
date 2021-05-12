import React from "react";
import { confirmDialog } from 'primereact/confirmdialog';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';

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
            FOTOPERFIL:''
        };
    }

    showError() {
        this.toast.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
    }
    
    RegistrarUsuario () {
        let s = this.state.FECHA.getDate()+"/"+this.state.FECHA.getMonth()+"/"+this.state.FECHA.getFullYear();
        this.setState({Fecha_Nacimiento: s});
        let data = {
            USERNAME: this.state.Usuario,         
            PASS: this.state.Contrasena,
            NOMBRE: this.state.Nombre_Cliente,          
            APELLIDO: this.state.Apellido_Cliente,         
            ID_TIER: 1,         
            FECHA_NACIMIENTO: this.state.Fecha_Nacimiento,
            CORREO: this.state.Correo_Cliente,           
            FOTOPERFIL: this.state.FOTOPERFIL,     
        }
        console.log(s);
        axios.post('http://localhost:7000/VerificarUsuario', data)
          .then(response => {
            if (response) {
                this.showError();
            }else{
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
        if (this.state.Usuario && this.state.Nombre_Cliente && this.state.Apellido_Cliente && this.state.FECHA && 
            this.state.Correo_Cliente && this.state.Contrasena && this.state.PASS
            && this.state.Contrasena === this.state.PASS && this.state.Contrasena.length>=6) {
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
                                    <input type="text" className="form-control" id="Nombre" aria-describedby="nombreHelp" placeholder="Nombre"
                                    value={this.state.Nombre_Cliente} onChange={(e) => {this.setState({Nombre_Cliente: e.target.value});}} onKeyUp={()=>this.analizar()}/>
                                </div>
                                <div className="form-group">
                                    <label for="Apellido" className="m-2">Apellido</label>
                                    <input type="text" className="form-control" id="Apellido" aria-describedby="apellidoHelp" placeholder="Apellido"
                                    value={this.state.Apellido_Cliente} onChange={(e) => {this.setState({Apellido_Cliente: e.target.value});}} onKeyUp={()=>this.analizar()}/>
                                </div>
                                <div className="form-group">
                                    <label for="email" className="m-2">Fecha Nacimiento</label>
                                    <Calendar id="icon" className="w-100" value={this.state.FECHA} onChange={(e) => this.setState({ FECHA: e.value })} showIcon 
                                    onKeyUp={()=>this.analizar()}/>
                                </div>
                                <div className="form-group">
                                    <label for="email" className="m-2">Correo Electronico</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="email"
                                    value={this.state.Correo_Cliente} onChange={(e) => {this.setState({Correo_Cliente: e.target.value});}} onKeyUp={()=>this.analizar()}/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlFile1" className="w-100 mb-2">FOTO</label>
                                    <input type="file" className="form-control-file w-100" id="exampleFormControlFile1"/>
                                </div>
                                <div className="form-group">
                                    <label for="Contraseña" className="m-2">Contraseña</label>
                                    <input type="password" className="form-control" id="Contraseña" aria-describedby="passwordHelp" placeholder="Contraseña"
                                    value={this.state.Contrasena} onChange={(e) => {this.setState({Contrasena: e.target.value});}} onKeyUp={()=>this.analizar()}/>
                                </div>
                                <div className="form-group">
                                    <label for="repassword" className="m-2">Confirmar contraseña</label>
                                    <input type="password" className="form-control" id="repassword" aria-describedby="repasswordHelp" placeholder="Contraseña"
                                    value={this.state.PASS} onChange={(e) => {this.setState({PASS: e.target.value});}} onKeyUp={()=>this.analizar()} />
                                </div>
                                <div className="form-group">
                                <div className="row align-content-center justify-content-center">
                                    <div className="col-12 col-md-6 text-center mt-2">
                                        <button type="button" onClick={this.confirm} className={`btn btn-block btn-dark w-100 ${this.state.COM?"":"disabled"}`} 
                                        >REGISTRAR</button>
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