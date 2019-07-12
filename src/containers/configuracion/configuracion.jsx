import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export class Configuracion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configuracion: [],
      TazaFin:'',
      Enganche:'',
      PlazoMax:''
    }
  }
  componentDidMount() {
    let self = this;
    fetch('https://spring.rubencode.com/app/configuracion', {
      method: 'GET',
      headers: new Headers({
        "Access-Control-Allow-Origin": "*"
      })
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (resJson) {
      let configuracion = resJson;
      self.setState({
          configuracion:configuracion[0],
          TazaFin:configuracion[0].tazafin,
          Enganche:configuracion[0].engache,
          PlazoMax:configuracion[0].plazoMaximo,
      })
      return configuracion
    })
  }
  setField (e) {
    this.setState({[e.target.name]: e.target.value})
   }
 
  guardar() {
    fetch('https://spring.rubencode.com/app/configuracion/1', {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        tazafin: this.state.TazaFin,
        engache: this.state.Enganche,
        plazoMaximo: this.state.PlazoMax
      })
    })
  }
  render() {
    return (
<div className="container">
        <br /><br />
        <Card>
          <Card.Body>
            <div className="row">
              <div className="col-2 float-right">
                <span className="float-right">Taza Financiamiento:</span>
              </div>
              <div className="col-3">
              <input
                type='text'
                name='TazaFin'
                placeholder={this.state.configuracion.tazafin}
                onChange={(e)=>this.setField(e)}
              />
              </div>
            </div><br />
            <div className="row">
              <div className="col-2">
                <span className="float-right">% Enganche:</span>
              </div>
              <div className="col-3">
              <input
                type='number'
                name='Enganche'
                placeholder={this.state.configuracion.engache}
                onChange={(e)=>this.setField(e)}
              />
              </div>
            </div><br />
            <div className="row">
              <div className="col-2 float-right">
                <span className="float-right">Plazo Maximo:</span>
              </div>
              <div className="col-3">
              <input
                type='number'
                name='PlazoMax'
                placeholder={this.state.configuracion.plazoMaximo}
                onChange={(e)=>this.setField(e)}
              />
              </div>
            </div><br />
          </Card.Body>
        </Card>
        <br />
        <div className="row float-right">
          <Link to="/" className="col-5 float-right btn btn-success">Cancelar</Link>
          <div className="col-1"></div>
          <Link to="/" onClick={()=>this.guardar()} className="col-5 float-right btn btn-success">Guardar</Link>
        </div>
      </div>
    )
  }
}

export default Configuracion
