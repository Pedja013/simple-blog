import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

function Header(props) {
    return (
        <header>
            <Container>
                <Navbar expand="lg" className="navbar-dark mb-5">
                    <Navbar.Brand href="#">My Blog</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="my-2 my-lg-0 ms-auto"
                        >
                            <button className="btn btn-light me-2" onClick={props.handleShow}>Add new post</button>
                            <Nav.Link href="#action2">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    );
}

export default Header;