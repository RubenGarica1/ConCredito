import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap'
import 'react-notifications/lib/notifications.css';
import { NotificationManager, NotificationContainer } from 'react-notifications';
const style = {
  "background": "#007bff"
}
export class AddCliente extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longitud: '',
      id: '',
      nombre: '',
      ApellidoPaterno: '',
      ApellidoMaterno: '',
      rfc: ''
    };
  }
  componentDidMount() {
    let self = this;
    if (this.props.location.pathname === '/cliente/edit') {
      fetch(`http://134.209.71.172:8080/app/cliente/${this.props.location.state.id}`, {
        method: 'GET',
        headers: new Headers({
          "Access-Control-Allow-Origin": "*"
        })
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (resJson) {
          let user = resJson;

          self.setState({
            user,
            id: user.id,
            nombre: user.nombre,
            ApellidoMaterno: user.apmaterno,
            ApellidoPaterno: user.appaterno,
            rfc: user.rfc
          })
          return user
        })
    }
    fetch('http://134.209.71.172:8080/app/cliente/count', {
      method: 'GET',
      headers: new Headers({
        "Access-Control-Allow-Origin": "*"
      })
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        self.setState({
          id: resJson
        })
      })
  }
  post() {
    if (this.props.location.pathname === '/cliente/edit') {
      fetch(`http://134.209.71.172:8080/app/cliente/${this.props.location.state.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: this.state.nombre,
          appaterno: this.state.ApellidoPaterno,
          apmaterno: this.state.ApellidoMaterno,
          rfc: this.state.rfc
        })
      })
    } else {
      fetch(`http://134.209.71.172:8080/app/cliente`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: this.state.nombre,
          appaterno: this.state.ApellidoPaterno,
          apmaterno: this.state.ApellidoMaterno,
          rfc: this.state.rfc
        })
      })
    }
  }
  guardar() {
    if(!(this.state.nombre==='')){
      if(!(this.state.ApellidoMaterno==='')){
        if(!(this.state.ApellidoPaterno==='')){
          if(!(this.state.rfc==='')){
            this.post()
            setTimeout(() => {
              this.props.history.push("/cliente");
              
            }, 300);
          } else {NotificationManager.info('no es posible continuar, debe ingresar rfc es obligatorio')}
        }else {NotificationManager.info('no es posible continuar, debe ingresar Apellido Paterno es obligatorio')}
      }else {NotificationManager.info('no es posible continuar, debe ingresar Apellido Materno es obligatorio')}
    }else {NotificationManager.info('no es posible continuar, debe ingresar Nombre es obligatorio')}
  }
  setField (e) {
    this.setState({[e.target.name]: e.target.value})
   }

  render() {
    return (
      <div className="container">
        <br /><br />
        <Card>
          <Card.Header className="primary text-white" border="primary" style={style}>Registro de Clientes</Card.Header>
          <Card.Body>
            <div className="float-right">Folio: 00{this.state.id+1}</div><br></br>
            <div className="row">
              <div className="col-2 float-right">
                <span className="float-right">Nombre:</span>
              </div>
              <div className="col-3">
                <input type="text" placeholder={this.state.nombre} name="nombre" onChange={(e) => this.setField(e)}></input>
              </div>
            </div><br />
            <div className="row">
              <div className="col-2">
                <span className="float-right">Apellido Paterno:</span>
              </div>
              <div className="col-3">
                <input type="text"
                  name="ApellidoPaterno"
                  placeholder={this.state.ApellidoPaterno}
                  onChange={(e) => this.setField(e)}></input>
              </div>
            </div><br />
            <div className="row">
              <div className="col-2 float-right">
                <span className="float-right">Apellido Materno:</span>
              </div>
              <div className="col-3">
                <input type="text"
                  name="ApellidoMaterno"
                  placeholder={this.state.ApellidoMaterno}
                  onChange={(e) => this.setField(e)}></input>
              </div>
            </div><br />
            <div className="row">
              <div className="col-2">
                <span className="float-right">RFC:</span>
              </div>
              <div className="col-1">
                <input type="text"
                  name="rfc"
                  placeholder={this.state.rfc}
                  onChange={(e) => this.setField(e)}></input>
              </div>
            </div><br />
          </Card.Body>
        </Card>
        <br />
        <div className="row float-right">
          <Link to="/cliente" className="col-5 float-right btn btn-success">Cancelar</Link>
          <div className="col-1"></div>
          <button onClick={() => this.guardar()} className="col-5 float-right btn btn-success">Guardar</button>
        </div>
        <NotificationContainer/>
      </div>
    )
  }
}

export default AddCliente
