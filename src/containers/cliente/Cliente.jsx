import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import add from './../add.png';
import edit from './edit.png';

export class Cliente extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: []
    };
  }
  componentDidMount() {
    let self = this;
    fetch('http://134.209.71.172:8080/app/cliente', {
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
  }
  render() {
    return (
      <div>
        <div className="container"><br />
          <div className="row justify-content-end">
            <Link className="btn btn-primary" to="/cliente/add">
              <img src={add} width="27" alt="add imagen" />
              &nbsp;&nbsp;Nuevo Cliente
                  </Link>
            <div>
            </div>
            <div className="col-11">
              <p className="text-primary">Clientes Registrados</p>
            </div>
            <div className="col-11">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Clave Cliente</th>
                    <th scope="col">Nombre</th>
                  </tr>
                </thead>
                <tbody className="">
                  {this.state.user.map(art => {
                    return (
                      <tr key={art.id + 2} >
                        <td>{art.id}</td>
                        <td>{art.nombre}</td>
                        <td>
                          <Link to={{
                            pathname: '/cliente/edit',
                            state: {
                              id: art.id
                            }
                          }}>
                            <img src={edit} width="25" alt="add imagen" />
                          </Link>
                        </td>
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

export default Cliente
