import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap'
const style = {
  "background": "#007bff"
}
export class AddCliente extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articulos: [],
      longitud: ''
    };
  }
  render() {
    return (
      <div className="container">
        <br /><br />
        <Card>
          <Card.Header className="primary text-white" border="primary" style={style}>Registro de Clientes</Card.Header>
          <Card.Body>
            <div className="float-right">Folio: 00{this.state.longitud}</div><br></br>
            <div className="row">
              <div className="col-2 float-right">
                <span className="float-right">Nombre:</span>
              </div>
              <div className="col-3">
                <input type="text"></input>
              </div>
            </div><br />
            <div className="row">
              <div className="col-2">
                <span className="float-right">Apellido Paterno:</span>
              </div>
              <div className="col-3">
                <input type="text"></input>
              </div>
            </div><br />
            <div className="row">
              <div className="col-2 float-right">
                <span className="float-right">Apellido Materno:</span>
              </div>
              <div className="col-3">
                <input type="text"></input>
              </div>
            </div><br />
            <div className="row">
              <div className="col-2">
                <span className="float-right">RFC:</span>
              </div>
              <div className="col-1">
                <input type="text"></input>
              </div>
            </div><br />
          </Card.Body>
        </Card>
        <br />
        <div className="row float-right">
          <Link to="/ventas" className="col-5 float-right btn btn-success">Cancelar</Link>
          <div className="col-1"></div>
          <Link to="/ventas" onClick={this.guardar} className="col-5 float-right btn btn-success">Guardar</Link>
        </div>
      </div>
    )
  }
}

export default AddCliente
