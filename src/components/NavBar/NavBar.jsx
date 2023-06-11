import React from "react";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';//import para boostrap react de sus componenetes
import 'bootstrap/dist/css/bootstrap.min.css';


import Logo from '../../components/NavBar/assets/img/logo.png'
import CartWidget from "../CartWidget/CartWidget";



function NavBar() {
    return (
      <Navbar bg="light" expand="lg">
        <Container fluid>
        <Navbar.Brand href="#" className="imgLogo">
          <img src={Logo} alt="Logo" className="d-inline-block align-text-top" />
          ClothingStore
        </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Novedades</Nav.Link>
              <NavDropdown title="Catergorias" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Vestir</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Casual
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Deportiva
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                En construccion
              </Nav.Link>
            </Nav>

            <CartWidget/>

            <Form className="d-flex">

            
              
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default NavBar;