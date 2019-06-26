import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
const style = {
  "background-color":"#007bff"
}
const folio = "001";
export class Add extends Component {
  constructor() {
    super();
    this.state = { items: [] };
  }
  componentDidMount() {
    fetch('https://jfhe88-rfc-generator-mexico.p.rapidapi.com/rest1/rfc/get?apellido_materno=ACOSTA&apellido_paterno=GARCIA&fecha=1996-07-02&nombre=RUBEN ADALBERTO', { 
      method: 'GET', 
      headers: new Headers({
        'X-RapidAPI-Host': 'jfhe88-rfc-generator-mexico.p.rapidapi.com', 
        'X-RapidAPI-Key': '6dea1021d5mshc2ae2dbe11cda35p187a18jsn438810f2b7d8'
      })
    })
    .then(function(res) {
      return res.json();
    })
    .then(function(resJson) {
      console.log(resJson.response.data.rfc)
      return resJson.response.data.rfc;
    })
  };
  render() {
    return (
      <div className="container">
        <br/>
        <Card>
          <Card.Header className="primary text-white" border="primary" style={{style}}>Registro de Ventas</Card.Header>
          <Card.Body>
          <div className="float-right">Folio: {folio}</div><br></br>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional content.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Add
