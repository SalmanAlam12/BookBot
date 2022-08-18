import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = () => {
  const [Title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [Genre, setGenre] = useState('')
  const [Author, setAuthor] = useState('')
  const [Publisher, setPublisher] = useState('')
  const [description, setDescription] = useState('')
  const [countInStock, setCountInStock] = useState(0)

  const history = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const productId = params.id

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history(`/admin/productList`)
    } else {
      if (!product.Title || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setTitle(product.Title)
        setPrice(product.price)
        setImage(product.image)
        setGenre(product.Genre)
        setAuthor(product.Author)
        setPublisher(product.Publisher)
        setDescription(product.description)
        setCountInStock(product.countInStock)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        Title,
        price,
        image,
        Genre,
        Author,
        Publisher,
        description,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productList' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='Title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='Title'
                placeholder='Enter Title'
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='price'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='image'
                placeholder='Enter Image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='Genre'>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type='Genre'
                placeholder='Enter Genre'
                value={Genre}
                onChange={(e) => setGenre(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='Author'>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type='Author'
                placeholder='Enter Author'
                value={Author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='Publisher'>
              <Form.Label>Publisher</Form.Label>
              <Form.Control
                type='Publisher'
                placeholder='Enter Publisher'
                value={Publisher}
                onChange={(e) => setPublisher(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>description</Form.Label>
              <Form.Control
                type='description'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>No: in Stock</Form.Label>
              <Form.Control
                type='countInStock'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
