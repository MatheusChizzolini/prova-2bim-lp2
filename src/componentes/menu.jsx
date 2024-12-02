import React from 'react';
import { Container, Button, Col, Row, Alert, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Menu() {
    return (
        <Container>
            <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#" as={Link} to="/">Menu</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                            {/* <NavDropdown.Item href="#" as={Link} to="/mensagem">Mensagem</NavDropdown.Item> */}
                            <NavDropdown.Item href="#" as={Link} to="/usuarios">Usuário</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </Container>
    );
};
