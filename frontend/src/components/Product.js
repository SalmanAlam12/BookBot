import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import '../index.css'

const Product = ({ product }) => {
  return (
    <Card
      className='my-3 p-3 rounded card'
      style={{ height: '95%' }}
      border='dark'
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          style={{
            width: '17vw',
            height: '35vh',
            margin: '5px',
          }}
        />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          style={{ 'text-decoration': 'none' }}
        >
          <Card.Title as='div'>
            <h3>{product.Title}</h3>
          </Card.Title>
        </Link>
        <Card.Text as='strong'>
          {product.Author} || {product.Genre}
        </Card.Text>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color='blue'
          />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
