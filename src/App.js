import React from 'react';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FaHome } from 'react-icons/fa';
import Home from './components/Home';
import Cursos from './components/Cursos';
import Periodo from './components/Periodo';
import Horarios from './components/Horarios';
import Desafios from './components/Desafios';
import Professores from './components/Professores';
import Salas from './components/Salas';

const NavigationLink = ({ to, children }) => {
  return (
    <Nav.Link as={Link} to={to}>
      {children}
    </Nav.Link>
  );
};

const Navigation = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="mr-auto">
          <NavigationLink to="/">
            <FaHome /> 
          </NavigationLink>
          <NavigationLink to="/cursos">Cursos</NavigationLink>
          <NavigationLink to="/periodo">Período</NavigationLink>
          <NavigationLink to="/horarios">Horários</NavigationLink>
          <NavigationLink to="/desafios">Desafios</NavigationLink>
          <NavigationLink to="/professores">Professores</NavigationLink>
          <NavigationLink to="/salas">Salas</NavigationLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          
          <Navigation />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/periodo" element={<Periodo />} />
            <Route path="/horarios" element={<Horarios />} />
            <Route path="/desafios" element={<Desafios />} />
            <Route path="/professores" element={<Professores />} />
            <Route path="/salas" element={<Salas />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;