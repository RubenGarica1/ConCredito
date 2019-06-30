import React, { Component } from 'react'
import { Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';


import Autocomplete from "./Autocomplete";
const style = {
  "background": "#007bff"
}
export class Add2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      articulos:[],
      articulosAll: [],
      Cantidad:1,
      newdato:'',
      value:'as',
      ArticulosSel: [],
      longitud:'',
      newItem:'',
      list:[],
      Enganche:'',
      BonificacionEnganche:''
    };
  }
  addItem() {
    // create a new item with unique id
    let art = localStorage.getItem('art')
    let artAll = this.state.articulosAll;
    var ArticulosSel = artAll.find(function(element) {
      return element.descripcion === art;
    });
    const newItem = {
      id: 1 + Math.random(),
      descripcion: ArticulosSel.descripcion,
      modelo: ArticulosSel.modelo,
      precio: ArticulosSel.precio,
      existencia: ArticulosSel.existencia
 
    };

    // copy current list of items
    const list = [...this.state.list];
    var Enganche = 0
    var total = 0;
    // add the new item to the list
    list.push(newItem);
    
    list.forEach(e =>{
      Enganche = parseInt(Enganche) + parseInt(e.precio)
    })
    var EngancheCal = .20 * parseInt(Enganche)
    console.log(EngancheCal)
    
    var BonificacionEnganche = parseInt(EngancheCal) *((2.8*12/100))
    total = parseInt(Enganche) - parseInt(EngancheCal) - parseInt(BonificacionEnganche)
    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: "",
      Enganche:EngancheCal,
      BonificacionEnganche,
      total
    });
  }

  addArticulo(event){
    localStorage.setItem("count", event.target.value);
    console.log(event.target.value)
  }

  calculaImporte(precio){
    let can = localStorage.getItem("count")
    console.log(can*precio)
    return precio * can;
  }
  log(){
      console.log("algo")
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
        let user = [];
        resJson.forEach(element => {
          user.push(element.nombre);
        });
        //console.log(user)
        self.setState({
          user
        })
        return user
      })
    fetch('http://134.209.71.172:8080/app/articulo', {
      method: 'GET',
      headers: new Headers({
        "Access-Control-Allow-Origin": "*"
      })
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {

        //console.log(resJson)
        let articulos = [];
        resJson.forEach(element => {
          articulos.push(element.descripcion);
        });
        //console.log(articulos)
        self.setState({
          articulos
        })
        self.setState({
          articulosAll: resJson
        })
        return articulos
      })
      fetch('http://134.209.71.172:8080/app/venta', {
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
            longitud:resJson.length+1
          })
        })
  };

  render() {
    console.log(this.state.list)

    return (
      <div className="container">
        <br />
        <Card>
          <Card.Header className="primary text-white" border="primary" style={style}>Registro de Ventas</Card.Header>
          <Card.Body>
            <div className="float-right">Folio: 00{this.state.longitud}</div><br></br>
            <div className="row">
              <div className="col-1">
                <span className="badge badge-primary">Cliente</span>
              </div>
              <div className="col-3">
                <Autocomplete
                  suggestions={
                    this.state.user
                  }
                />
              </div>
            </div><br />
            <div className="row">
              <div className="col-1">
                <span className="badge badge-primary">Articulo</span>
              </div>
              <div className="col-3">
                <Autocomplete
                  suggestions={
                    this.state.articulos
                  }
                  value={this.value}
                />
              </div>
              <div className="col-1"></div>
              <div className="col-2">
              <button
                className="add-btn btn-floating"
                onClick={() => this.addItem()}
                
              >
                <i className="material-icons"> + </i>
              </button>
              </div>
            </div><br/>
        <h1>{this.state.value}</h1>


            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Descripcion Articulo</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Importe</th>
                </tr>
              </thead>
              <tbody>
              {this.state.list.map(art => {
              return (
                <tr key={art.id +1}>
                  <td>{art.descripcion}</td>
                  <td>{art.modelo}</td>
                  <td>{1}</td>
                  <td>{art.precio}</td>
                  <td>{art.precio}</td>
                </tr>
              );
            })}

              </tbody>
            </table>
            <ul className="list-group col-6 float-right">
              <li className="list-group-item">Enganche <div className="float-right">
              {this.state.Enganche}
              </div></li>
              <li className="list-group-item">Bonificacion Enganche <div className="float-right">{this.state.BonificacionEnganche}</div></li>
              <li className="list-group-item">total <div className="float-right">{120}</div></li>
            </ul>
            <br/>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th colSpan="5" className="center">Abonos Mensuales</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>3 ABONOS DE</td>
                  <td>{120}</td>
                  <td>TOTAL A PAGAR {120}</td>
                  <td>SE AHORRA {120}</td>
                  <td><input type="radio" id='regular' onKeyPress={this.log()} name="optradio"/></td>
                </tr>
                <tr>
                  <td>6 ABONOS DE</td>
                  <td>{120}</td>
                  <td>TOTAL A PAGAR {120}</td>
                  <td>SE AHORRA {120}</td>
                  <td><input type="radio" id='regular' name="optradio"/></td>
                </tr>
                <tr>
                  <td>9 ABONOS DE</td>
                  <td>{120}</td>
                  <td>TOTAL A PAGAR {120}</td>
                  <td>SE AHORRA {120}</td>
                  <td><input type="radio" id='regular' name="optradio"/></td>
                </tr>
                <tr>
                  <td>12 ABONOS DE</td>
                  <td>{120}</td>
                  <td>TOTAL A PAGAR {120}</td>
                  <td>SE AHORRA {120}</td>
                  <td><input type="radio" id='regular' name="optradio"/></td>
                </tr>
              </tbody>
            </Table>


          </Card.Body>
        </Card>
        <div className="row float-right">
        <Link to="/ventas" className="col-5 float-right btn btn-success">Cancelar</Link>
        <div className="col-1"></div>
        <Link className="col-5 float-right btn btn-success">Guardar</Link>
        </div>
      </div>
    )
  }
}

export default Add2

