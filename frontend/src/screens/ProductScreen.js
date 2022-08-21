import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/loader'
import Message from '../components/message'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

const ProductScreen = () => {
  const params = useParams()
  const history = useNavigate()
  const dispatch = useDispatch()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [txt, setTxt] = useState('')
  //const [reviewId, setReviewId] = useState('')

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(params.id))
  }, [dispatch, params.id, successProductReview])

  const addToCartHandler = () => {
    history(`/cart/${params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(params.id, { rating, comment }))
  }

  const replyHandler = async (reviewId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(
      `/api/products/${params.id}/reviews`,
      { reviewId, txt },
      config
    )
  }

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image
                src={product.image}
                alt={product.Title}
                fluid
                style={{
                  width: '35vw',
                  height: '70vh',
                }}
              />
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.Title}</h3>
                  <strong>Author: {product.Author}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color='darkblue'
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong style={{ color: 'maroon' }}>Price: </strong>$
                  {product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong style={{ color: 'maroon' }}>Genre: </strong>
                  {product.Genre},{' '}
                  <strong style={{ color: 'maroon' }}>Publisher: </strong>{' '}
                  {product.Publisher}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>Description: </h3>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color='darkblue' />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                    {userInfo && userInfo.isAdmin && !review.reply.replied ? (
                      <Popup
                        trigger={<button>Reply</button>}
                        position='right center'
                      >
                        <Form>
                          <Form.Group controlId='txt'>
                            <Form.Label>Reply</Form.Label>
                            <Form.Control
                              as='textarea'
                              row='3'
                              value={txt}
                              onChange={(e) => setTxt(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button
                            size='sm'
                            type='submit'
                            variant='primary'
                            onClick={() => replyHandler(review._id)}
                          >
                            Submit
                          </Button>
                        </Form>
                      </Popup>
                    ) : review.reply.replied ? (
                      <ListGroup.Item>
                        <strong style={{ color: 'blue' }}>
                          Seller Reply:{' '}
                        </strong>{' '}
                        {review.reply.txt}
                      </ListGroup.Item>
                    ) : (
                      <></>
                    )}
                  </ListGroup.Item>
                ))}
                {userInfo && !userInfo.isAdmin && (
                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {errorProductReview && (
                      <Message variant='danger'>{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <br></br>
                        <Button type='submit' variant='primary'>
                          Submit Review
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>Sign In</Link> to write a
                        review
                      </Message>
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
