import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import add from './../add.png';

export class Articulo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articulo: []
    };
  }
  componentDidMount() {
    let self = this;
    fetch('https://spring.rubencode.com/app/articulo', {
      method: 'GET',
      headers: new Headers({
        "Access-Control-Allow-Origin": "*"
      })
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        let articulo = resJson;
        
        //console.log(user)
        self.setState({
          articulo
        })
        return articulo
      })
  }
  render() {
    return (
      <div>
        <div className="container"><br />
          <div className="row justify-content-end">
            <Link className="btn btn-primary" to="/articulos/Add">
              <img src={add} width="27" alt="add imagen" />
              &nbsp;&nbsp;Nuevo Articulo
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
                    <th scope="col">Clave Cliente</th>
                    <th scope="col">Descripcion</th>
                  </tr>
                </thead>
                <tbody className="">
                  {this.state.articulo.map(art => {
                    return (
                      <tr key={art.id + 2} >
                        <td>{art.id}</td>
                        <td >{art.descripcion}</td>
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

export default Articulo
