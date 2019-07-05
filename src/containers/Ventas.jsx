import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import add from './add.png';

export class Ventas extends Component {

  constructor(props) {
    super(props);

    this.state = {
      venta:[],
      user: []
    };
  }
  clave(clave){
    //console.log(clave)
    let userAll = this.state.user;
    let algo = []
    userAll.find((element) => {
      if ( element.nombre === clave){
        algo.push(element.id)
        console.log(true)
      }
      return 0;
    });
    //console.log(ArticulosSel)
    console.log(algo[0])

    return algo[0];
  }
  componentDidMount() {
    
    let self = this;
    fetch('https://spring.rubencode.com/app/venta', {
      method: 'GET',
      headers: new Headers({
        "Access-Control-Allow-Origin": "*"
      })
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        let venta = resJson;
        
        //console.log(venta)
        //console.log(user)
        self.setState({
          venta
        })
        return venta
      })
      fetch('https://spring.rubencode.com/app/cliente', {
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
          
          //console.log(user)
          self.setState({
            user
          })
          return user
        })
        fetch('https://api.rubencode.com/Vsuma', {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({"key":"Vendimia"})
        })
        .then(function (res) {
          return res.json();
        })
  }
  render() {
    return (
      <div>
        <div className="container"><br/>
          <div className="row justify-content-end">
              <Link className="btn btn-primary" to="/Ventas/Add">
                <img src={add} width="27" alt="add imagen"/>
                &nbsp;&nbsp;Nueva Venta
              </Link>
          <div>
            </div>
            <div className="col-11">
            <p className="text-primary">Ventas Activas</p>
            </div>
            <div className="col-11">
                <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Folio Venta</th>
                    <th scope="col">Clave Cliente</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Total</th>
                    <th scope="col">Fecha</th>
                  </tr>
                </thead>
                <tbody>
            {this.state.venta.map(art => {
              return (
                <tr key={art.id+2}>
                  <td>{art.id}</td>
                  <td>{this.clave(art.nombre)}</td>
                  <td>{art.nombre}</td>
                  <td>${art.total}</td>
                  <td>{art.fecha}</td>
                </tr>
                  );
                  })}

              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Ventas
