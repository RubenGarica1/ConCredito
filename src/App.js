
import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { Navbar, NavDropdown } from 'react-bootstrap';
import Moment from 'react-moment';
import Ventas from './containers/Ventas'
import Add from './containers/Add';
import Add2 from './containers/Add2';
import Todo from './containers/todo';
const date = new Date();

const NavB = () => (
  <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <div className="container-fluid">

          <NavDropdown title="Inicio" id="basic-nav-dropdown">
            <Link className="dropdown-item" to="/ventas/">Ventas</Link>
            <NavDropdown.Divider />
            <Link className="dropdown-item" to="/Clientes/">Clientes</Link>
            <Link className="dropdown-item" to="/Articulos/">Articulos</Link>
            <Link className="dropdown-item" to="/Configuración/">Configuración</Link>
          </NavDropdown>

          <p className="text-white">
            fecha:
            <Moment format="DD/MM/YYYY">
              {date}
            </Moment>
          </p>
      </div>
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
      <Route exact path="/Ventas/add2" component={Add2} />
      <Route exact path="/Ventas/Todo" component={Todo} />
      <Redirect exact from="/" to="/Ventas/" />
    </Switch>
  </div>
)


export default App