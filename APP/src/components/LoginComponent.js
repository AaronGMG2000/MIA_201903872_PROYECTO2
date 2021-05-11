import React from "react";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { Calendar } from 'primereact/calendar';
import axios from 'axios';
class LOGIN extends React.Component {
    
    load = {};
    constructor(props) {
        super(props);
        this.state = {
            Nombre_Cliente: '',
            Apellido_Cliente: '',
            Fecha_Nacimiento: null,
            Correo_Cliente: '',
            Contrasena: '',
            PASS: '',
            COM: false,
            FECHA: null
        };
    }

    submitHandler = e => {
        e.preventDefault()
        let s = this.state.FECHA.getDate()+"-"+this.state.FECHA.getMonth()+"-"+this.state.FECHA.getFullYear()+" "+this.state.FECHA.getHours()+":"+this.state.FECHA.getMinutes();
        this.setState({Fecha_Nacimiento: s});
        axios.post('http://localhost:7000/VerificarUsuario', this.state)
          .then(response => {
            console.log(response)
          });
      }
    
    confirm = () => {
        confirmDialog({
            message: '¿Confirma los datos ingresados?',
            header: 'CONFIRMAR USUARIO',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.submitHandler(),
            reject: () => this.submitHandler()
        });
    }

    

    analizar (){
        if (this.state.Nombre_Cliente && this.state.Apellido_Cliente && this.state.FECHA && 
            this.state.Correo_Cliente && this.state.Contrasena && this.state.PASS
            && this.state.Contrasena === this.state.PASS && this.state.Contrasena.length>6) {
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
                    <div className="card scroll_register">
                        <div className="text-center card-header bg-danger text-white font-weight-bold">
                            <h4>REGISTRO</h4>
                        </div>
                        <div className="card-body">
                            <form on onSubmit={this.submitHandler}>
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
                                        <button type="submit" className={`btn btn-block btn-dark w-100 ${this.state.COM?"":"disabled"}`} 
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