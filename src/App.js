
import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import Moment from 'react-moment';
import Ventas from './containers/Venta'
import Add from './containers/Add';
const date = new Date();

const NavB = () => (
  <div>
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Nav className="mr-auto">
  <NavDropdown title="Inicio" id="basic-nav-dropdown">
    <Link className="dropdown-item" to="/ventas/">Ventas</Link>
    <NavDropdown.Divider />
    <Link className="dropdown-item" to="/Clientes/">Clientes</Link>
    <Link className="dropdown-item" to="/Articulos/">Articulos</Link>
    <Link className="dropdown-item" to="/Configuración/">Configuración</Link>
  </NavDropdown>
  </Nav>
      <p className="text-white">
      fecha: 
  <Moment format="DD/MM/YYYY">
       {date}
  </Moment>
      </p>
  </Navbar>
  </div>
)


const Clientes = () => <h1 className="container">Clientes</h1>
const Articulos = () => <h1 className="container">Articulos</h1>
const Configuración = () => <h1 className="container">Configuración</h1>


const App = () => (
  <div>
    <NavB />
    <Switch>
      <Route exact path="/Ventas/" component={Ventas} />
      <Route exact path="/Ventas/Add" component={Add} />
      <Route exact path="/Clientes/" component={Clientes} />
      <Route exact path="/Articulos/" component={Articulos} />
      <Route exact path="/Configuración/" component={Configuración} />
      <Redirect exact from="/" to="/Ventas/" />
    </Switch>
  </div>
)


export default App