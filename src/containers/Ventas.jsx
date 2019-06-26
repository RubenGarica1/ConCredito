import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import add from './add.png';

export class Ventas extends Component {
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
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>Folio de Venta</th>
                    <th>Clave Cliente</th>
                    <th>Nombre</th>
                    <th>Total</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
              </Table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Ventas
