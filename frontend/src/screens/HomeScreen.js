import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/message'
import Loader from '../components/loader'
import { listProducts } from '../actions/productActions'

const HomeScreen = () => {
  const params = useParams()
  const keyword = params.keyword

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
      <Row>
        <Col sm={10}>
          <h1>Latest Products</h1>
        </Col>
        <Col sm={2}>
          <div className='mb-2' style={{ margin: '16px' }}>
            <Dropdown>
              <Dropdown.Toggle
                variant='outline-primary'
                id='dropdown-basic'
                size='sm'
              >
                Sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href='/search/homefilter/descending'>
                  Price [High to Low]
                </Dropdown.Item>
                <Dropdown.Item href='/search/homefilter/ascending'>
                  Price [Low to High]
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href='/search/homefilter/highestRated'>
                  Highest Rated
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
