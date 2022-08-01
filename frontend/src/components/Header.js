import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavLink } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>BookBot</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Nav>
            <LinkContainer to='/cart'>
              <NavLink>
                <i className='fas fa-shopping-cart'></i> Products
              </NavLink>
            </LinkContainer>
            <LinkContainer to='/login'>
              <NavLink>
                <i className='fas fa-user'></i> Signin
              </NavLink>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
