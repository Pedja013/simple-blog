import React, {useContext} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import AuthContext from "../store/auth-context";

function Header(props) {
    const ctx = useContext(AuthContext);
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
                            {ctx.isLoggedIn && <button className="btn btn-light me-2" onClick={props.handleShow}>Add new post</button>}
                            {ctx.isLoggedIn && <Nav.Link href="#action2" onClick={ctx.onLogout}>Logout</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    );
}

export default Header;