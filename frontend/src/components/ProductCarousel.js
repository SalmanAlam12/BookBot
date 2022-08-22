import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './loader'
import Message from './message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      <Carousel.Item>
        <Image
          className='d-block w-100'
          src='/uploads\promo-sale-banner-library-bookshop-260nw-1790872166.jpg'
          alt='first Slide'
          fluid
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className='d-block w-100'
          src='/uploads\John-Locke-Quote-Reading-furnishes-the-mind-only-with-materials-of.jpg'
          alt='second Slide'
          fluid
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className='d-block w-100'
          src='/uploads\photo-1507842217343-583bb7270b66.jpeg'
          alt='third Slide'
          fluid
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className='d-block w-100'
          src='/uploads\poster.jpg'
          alt='fourth Slide'
          fluid
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className='d-block w-100'
          src='/uploads\b4UFkt.webp'
          alt='fifth Slide'
          fluid
        />
      </Carousel.Item>
    </Carousel>
  )
}

export default ProductCarousel
