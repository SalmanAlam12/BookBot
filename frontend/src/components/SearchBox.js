import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

const SearchBox = () => {
  const history = useNavigate()
  const location = useLocation()

  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      if (location.pathname === '/') {
        history(`/search/homefilter/${keyword}`)
      } else if (location.pathname.slice(0, 18) === '/search/homefilter') {
        history(`/search/homefilter/${keyword}`)
      } else {
        history(`/search/adminfilter/${keyword}`)
      }
    } else {
      if (location.pathname.slice(0, 18) === '/search/homefilter') {
        history('/')
      } else if (location.pathname === '/') {
        history('/')
      } else {
        history('/admin/productList')
      }
    }
  }

  return (
    <Form onSubmit={submitHandler}>
      <Row className='align-items-left'>
        <Col xs='auto'>
          <Form.Control
            type='text'
            name='q'
            size='sm'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search Products...'
            className='mr-sm-2 ml-sm-5'
          ></Form.Control>
        </Col>
        <Col xs='auto'>
          <Button type='submit' variant='outline-success' className='btn-sm'>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchBox
