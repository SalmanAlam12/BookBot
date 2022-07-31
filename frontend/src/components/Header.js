import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>BookBot</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Nav>
            <Nav.Link href='#deets'>
              <i className='fas fa-shopping-cart'></i> Products
            </Nav.Link>
            <Nav.Link href='#deets'>
              <i className='fas fa-user'></i> Signin
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
