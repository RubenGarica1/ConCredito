
import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { Navbar, NavDropdown } from 'react-bootstrap';
import Moment from 'react-moment';
const date = new Date()
const Nav = () => (
  <div>
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
    <Link className="dropdown-item" to="/ventas/">Ventas</Link>
    <NavDropdown.Divider />
    <Link className="dropdown-item" to="/Clientes/">Clientes</Link>
    <Link className="dropdown-item" to="/Articulos/">Articulos</Link>
    <Link className="dropdown-item" to="/Configuración/">Configuración</Link>
  </NavDropdown>
  <Moment format="DD/MM/YYYY">
      <div className="text-white">{date}</div>
  </Moment>
  </Navbar>
  </div>
)


const Ventas = () => <h1 className="container">Ventas</h1>
const Clientes = () => <h1 className="container">Clientes</h1>
const Articulos = () => <h1 className="container">Articulos</h1>
const Configuración = () => <h1 className="container">Configuración</h1>


const App = () => (
  <div>
    <Nav />
    <Switch>
      <Route exact path="/Ventas/" component={Ventas} />
      <Route exact path="/Clientes/" component={Clientes} />
      <Route exact path="/Articulos/" component={Articulos} />
      <Route exact path="/Configuración/" component={Configuración} />
      <Redirect exact from="/" to="/Ventas/" />
    </Switch>
  </div>
)


export default App