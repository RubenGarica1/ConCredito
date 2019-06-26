import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
const style = {
  "background-color":"#007bff"
}
export class Add extends Component {
  render() {
    return (
      <div className="container">
        <br/>
        <Card>
          <Card.Header className="primary" border="primary" style={style}>Registro de Ventas</Card.Header>
          <Card.Body>
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
