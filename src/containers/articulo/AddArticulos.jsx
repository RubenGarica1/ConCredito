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
      articulos: [],
      id: '',
      descripcion:'',
      modelo:'',
      precio:'',
      existencia:''
    };
  }
  componentDidMount() {
    let self = this;
    fetch('http://134.209.71.172:8080/app/articulo/count', {
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

  setField (e) {
    this.setState({[e.target.name]: e.target.value})
   }
  post(){
    fetch(`http://134.209.71.172:8080/app/articulo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descripcion: this.state.descripcion,
        modelo: this.state.modelo,
        precio: this.state.precio,
        existencia: this.state.existencia
      })
    })
  }
  guardar() {
    if(!(this.state.descripcion==='')){
      if(!(this.state.modelo==='')){
        if(!(this.state.precio==='')){
          if(!(this.state.existencia==='')){
            this.post();
            setTimeout(() => {
              this.props.history.push("/articulos");
              
            }, 300);
          } else {NotificationManager.info('no es posible continuar, debe ingresar existencia es obligatorio')}
        }else {NotificationManager.info('no es posible continuar, debe ingresar precio es obligatorio')}
      }else {NotificationManager.info('no es posible continuar, debe ingresar modelo es obligatorio')}
    }else {NotificationManager.info('no es posible continuar, debe ingresar descripcion es obligatorio')}
  }
  render() {
    return (
      <div className="container">
        <br /><br />
        <Card>
          <Card.Header className="primary text-white" border="primary" style={style}>Registro de Articulos</Card.Header>
          <Card.Body>
            <div className="float-right">Folio: 00{this.state.id+1}</div><br></br>
            <div className="row">
              <div className="col-2 float-right">
                <span className="float-right">Descripcion:</span>
              </div>
              <div className="col-3">
                <input
                  type='text'
                  name='descripcion'
                  onChange={(e)=>this.setField(e)}
                />
              </div>
            </div><br />
            <div className="row">
              <div className="col-2">
                <span className="float-right">Modelo:</span>
              </div>
              <div className="col-3">
                <input
                  type='text'
                  name='modelo'
                  onChange={(e)=>this.setField(e)}
                />
              </div>
            </div><br />
            <div className="row">
              <div className="col-2 float-right">
                <span className="float-right">Precio:</span>
              </div>
              <div className="col-3">
                <input
                  type='number'
                  name='precio'
                  onChange={(e)=>this.setField(e)}
                />
              </div>
            </div><br />
            <div className="row">
              <div className="col-2">
                <span className="float-right">Existencia:</span>
              </div>
              <div className="col-1">
                <input
                  type='number'
                  name='existencia'
                  onChange={(e)=>this.setField(e)}
                />
              </div>
            </div><br />
          </Card.Body>
        </Card>
        <br />
        <div className="row float-right">
          <Link to="/articulos" className="col-5 float-right btn btn-success">Cancelar</Link>
          <div className="col-1"></div>
          <button onClick={() => this.guardar()} className="col-5 float-right btn btn-success">Guardar</button>
        </div>
        <NotificationContainer/>
      </div>
    )
  }
}

export default AddCliente
