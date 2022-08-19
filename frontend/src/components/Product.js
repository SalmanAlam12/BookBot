import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded' style={{ height: '100%' }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          style={{ width: '17vw', height: '35vh' }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.Title}</strong>
          </Card.Title>
        </Link>
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
