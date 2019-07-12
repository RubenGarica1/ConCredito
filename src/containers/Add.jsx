import React, { Component } from 'react'
import { Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import moment from 'moment'
import 'react-notifications/lib/notifications.css';
import { NotificationManager, NotificationContainer } from 'react-notifications';

import Autocomplete from "./Autocomplete";
import Autocomplete2 from "./Autocomplete2";
const style = {
  "background": "#007bff"
}
export class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      articulos: [],
      articulosAll: [],
      Cantidad: 1,
      newdato: '',
      value: '',
      ArticulosSel: [],
      longitud: '',
      newItem: '',
      list: [],
      Enganche: '',
      tazafin:'',
      selectMess:'',
      BonificacionEnganche: '',
      engacheC:'',
      total: '',
      contado: '',
      folio: '1',
      configuracion:[],
      plazoMaximo:''
    };
  }
  addItem() {
    // create a new item with unique id

    let art = localStorage.getItem('art')
    let artAll = this.state.articulosAll;
    let list1 = this.state.list;
    var exite =''
    var exiteArt = ''
    artAll.map(element => {
      //console.log(element.descripcion===art)
      if(element.descripcion==art){
        return exite = true
      }
    })
    list1.map(element => {
      //console.log(element.descripcion===art)
      if(element.descripcion==art){
        return exiteArt = true
      }
    })

    //console.log(exiteArt)
    if(exite) {

      //console.log(artAll)
      var ArticulosSel = artAll.find(function (element) {
        return element.descripcion === art;
      });
      
      //console.log(exite)
      const newItem = {
        id: ArticulosSel.id,
        descripcion: ArticulosSel.descripcion,
        modelo: ArticulosSel.modelo,
        precio: ArticulosSel.precio,
        existencia: ArticulosSel.existencia
        
      };
      //console.log(ArticulosSel.existencia)
      if (ArticulosSel.existencia > 1) {
        
        // copy current list of items
        const list = [...this.state.list];
        const list3 = list;
        var Enganche = 0
        var total = 0;
        // add the new item to the list
        if(!exiteArt){

          list.push(newItem);
        }
        
        
        list.forEach(e => {
          Enganche = parseInt(Enganche) + parseInt(e.precio)
        })
        
        var contado = Enganche
        var EngancheCal = (this.state.engacheC/100) * parseInt(Enganche)
        //console.log(EngancheCal)
        
        var BonificacionEnganche = parseInt(this.state.engacheC) * ((this.state.tazafin * this.state.plazoMaximo / 100))
        total = parseInt(Enganche) - parseInt(EngancheCal) - parseInt(BonificacionEnganche)
        // update state with new list, reset the new item input
        //console.log(total)
        //console.log(contado)
        localStorage.setItem("total", total)
        this.setState({
          list,
          newItem: "",
          Enganche: EngancheCal,
          BonificacionEnganche,
          total,
          contado,
          [newItem.descripcion]:newItem.existencia
        });
      } else {
        NotificationManager.info('El artículo seleccionado no cuenta con existencia, favor de verificar.')
      }
    }else {
      NotificationManager.info('El artículo seleccionado no cuenta con existencia, favor de verificar.')
    }
  }
    
    addArticulo(event) {
    localStorage.setItem("count", event.target.value);
    //console.log(event.target.value)
  }

  calculaImporte(precio) {
    return precio * this.state.Cantidad;
  }
  calculaAhorro(pre) {
    if (this.state.contado - this.state.contado * (1 + (2.8 * pre) / 100) > 0) {
      return this.state.contado - this.state.contado * (1 + (2.8 * pre) / 100)
    }
    return this.state.contado - this.state.contado * (1 + (2.8 * pre) / 100) > 0
  }

  guardar() {
    var totalp= Math.round(((this.state.total/(1+(this.state.tazafin*12)/100)) * (1 +(this.state.tazafin * this.state.selectMess) / 100)) * 100) / 100

    const user = this.state.user;
    //console.log(this.state.selectMess)
    if(!totalp==0){

      if(this.state.selectMess>0){
        
        var totalpay= Math.round(((this.state.total/(1+(this.state.tazafin*12)/100)) * (1 +(this.state.tazafin * this.state.selectMess) / 100)) * 100) / 100
        
        //console.log(totalpay=='')
        var userbool = ''
        user.find(element => {
          //console.log(element.descripcion===art)
          if(element==localStorage.getItem("name")){
            return userbool = true
          }
        })
        if(userbool){
          
          fetch('https://spring.rubencode.com/app/venta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              clavecliente: "2",
              nombre: String(localStorage.getItem("name")),
              total: String(totalpay),
              fecha: String(moment().format('L'))
            })
          })
          setTimeout(() => {
            //this.props.history.push("/ventas");
            
          }, 300);
          var artAll = this.state.list;
          var dat = []
          var exis = this.state.articulosAll
          exis.map(e =>{
            
          });
          var da = artAll.map(e =>{
            dat.push({
              existencia:e.existencia
            })
            var dato;
            var numero = this.state.articulosAll
            numero.map(el =>{
              if(e.id==el.id){
                dato=el.existencia
                
              }
            })
            console.log('-------------------')
            console.log(dato)
            console.log(e)
            console.log(this.state['E'+e.descripcion])
            fetch(`https://spring.rubencode.com/app/articulo/existencia/${e.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                existencia: dato-1
              })
            })
            console.log(e.existencia)
          })
          console.log(dat)
          
          /*fetch(`http://134.209.71.172:8080/app/articulo/existencia/1${this.props.location.state.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              existencia: "1"
            })
          })*/
          
          console.log('ok')
        }else {NotificationManager.info('usuario invalido.')}
        localStorage.removeItem('name')
      } else{NotificationManager.info('seleccione Abonos Mensuales.')}
    }else{NotificationManager.info('Lista vacia.')}
  }
    
    setField(e) {
    this.setState({ ['E'+e.target.name]: e.target.value })
  }
  componentDidMount() {
    let self = this;
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
        self.setState({
          longitud: resJson.length + 1
        })
      })
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
        self.setState({
          longitud: resJson.length + 1
        })
      })

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
        self.setState({
          engacheC: resJson[0].engache,
          plazoMaximo: resJson[0].plazoMaximo,
          tazafin: resJson[0].tazafin
        })
      })

  };

  setGender(event) {
    let self = this;
    self.setState({
      selectMess:event.target.value
    })
  }
  render() {
    console.log(this.state)

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
                <Autocomplete2
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
            </div><br />
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
                    <tr key={art.id}>
                      <td>{art.descripcion}</td>
                      <td>{art.modelo}</td>
                      <td>
                        <input type="number"
                          name={art.descripcion}
                          defaultValue={1}
                          onChange={(e) => this.setField(e)}
                          min={1}
                          max={art.existencia}
                        ></input>
                      </td>
                      <td>{art.precio}</td>
                      <td>{art.precio * this.state[art.descripcion] }</td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
            <ul className="list-group col-6 float-right">
              <li className="list-group-item">Enganche <div className="float-right">
                {Math.round(this.state.Enganche * 100) / 100}
              </div></li>
              <li className="list-group-item">Bonificacion Enganche <div className="float-right">{Math.round(this.state.BonificacionEnganche * 100) / 100}</div></li>
              <li className="list-group-item">total <div className="float-right">{Math.round(this.state.total * 100) / 100}</div></li>
            </ul>
            <br />

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th colSpan="5" className="center">Abonos Mensuales</th>
                </tr>
              </thead>
              <tbody onChange={this.setGender.bind(this)}>
                <tr>
                  <td>3 ABONOS DE</td>
                  <td>{Math.round(((this.state.total/(1+(this.state.tazafin*12)/100)) * (1 +(this.state.tazafin * 9) / 100)/3) * 100) / 100}</td>
                  <td>TOTAL A PAGAR {Math.round(((this.state.total/(1+(this.state.tazafin*12)/100)) * (1 +(this.state.tazafin * 3) / 100)) * 100) / 100}</td>
                  <td>SE AHORRA {Math.round(this.state.total-(((this.state.total/(1+(this.state.tazafin*12)/100)) / (1 +(this.state.tazafin * 3) / 100)) * 100) / 100)}</td>
                  <td><input type="radio" id='regular' value={3}  name="optradio" /></td>
                </tr>
                <tr>
                  <td>6 ABONOS DE</td>
                  <td>{Math.round(((this.state.total/(1+(this.state.tazafin*12)/100)) * (1 +(this.state.tazafin * 9) / 100)/6) * 100) / 100}</td>
                  <td>TOTAL A PAGAR {Math.round(((this.state.total/(1+(this.state.tazafin*12)/100)) * (1 +(this.state.tazafin * 6) / 100)) * 100) / 100}</td>
                  <td>SE AHORRA {Math.round(this.state.total-(((this.state.total/(1+(this.state.tazafin*12)/100)) / (1 +(this.state.tazafin * 6) / 100)) * 100) / 100)}</td>
                  <td><input type="radio" id='regular' value={6} name="optradio" /></td>
                </tr>
                <tr>
                  <td>9 ABONOS DE</td>
                  <td>{Math.round(((this.state.total/(1+(this.state.tazafin*12)/100)) * (1 +(this.state.tazafin * 9) / 100)/9) * 100) / 100}</td>
                  <td>TOTAL A PAGAR {Math.round(((this.state.total/(1+(this.state.tazafin*12)/100)) * (1 +(this.state.tazafin * 9) / 100)) * 100) / 100}</td>
                  <td>SE AHORRA {Math.round(this.state.total-(((this.state.total/(1+(this.state.tazafin*12)/100)) / (1 +(this.state.tazafin * 9) / 100)) * 100) / 100)}</td>
                  <td><input type="radio" id='regular' value={9} name="optradio"/></td>
                </tr>
                <tr>
                  <td>12 ABONOS DE</td>
                  <td>{Math.round(((this.state.total/(1+(this.state.tazafin*12)/100)) * (1 +(this.state.tazafin * 9) / 100)/12) * 100) / 100}</td>
                  <td>TOTAL A PAGAR {Math.round(((this.state.total/(1+(this.state.tazafin*12)/100)) * (1 +(this.state.tazafin * 12) / 100)) * 100) / 100}</td>
                  <td>SE AHORRA {Math.round(this.state.total-(((this.state.total/(1+(this.state.tazafin*12)/100)) / (1 +(this.state.tazafin * 12) / 100)) * 100) / 100)}</td>
                  <td><input type="radio" id='regular' value={12} name="optradio" /></td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <br />
        <div className="row float-right">
          <Link to="/ventas" className="col-5 float-right btn btn-success">Cancelar</Link>
          <div className="col-1"></div>
          <button onClick={(e) => this.guardar()} className="col-5 float-right btn btn-success">Guardar</button>
        </div>
        <br/><br/><br/>
        <NotificationContainer />
      </div>
    )
  }
}

export default Add
