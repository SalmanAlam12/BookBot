import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavLink, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()
  const history = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    history('/')
  }

  return (
    <header>
      <Navbar bg='dark' expand='lg' variant='dark'>
        <Container fluid>
          <LinkContainer to='/'>
            <Navbar.Brand>BookBot</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='me-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <LinkContainer to='/cart'>
                <NavLink>
                  <i className='fas fa-shopping-cart'></i> Cart
                </NavLink>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <NavLink>
                    <i className='fas fa-user'></i> Signin
                  </NavLink>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userList'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productList'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderList'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
            <SearchBox />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
