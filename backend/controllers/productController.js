import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword ? req.query.keyword : ''
  const products = await Product.find({})

  if (keyword === 'descending') {
    const result = products.sort((a, b) => b.price - a.price)
    res.json(result)
  } else if (keyword === 'ascending') {
    const result = products.sort((a, b) => a.price - b.price)
    res.json(result)
  } else if (keyword === 'highestRated') {
    const result = products.sort((a, b) => b.rating - a.rating)
    res.json(result)
  } else if (keyword === 'InStock') {
    const result = products.filter((product) => product.countInStock > 0)
    res.json(result)
  } else if (keyword === 'OutStock') {
    const result = products.filter((product) => product.countInStock === 0)
    res.json(result)
  } else {
    const result = products.filter(
      (product) =>
        product.Title.toLowerCase().includes(keyword.toLowerCase()) ||
        product.Author.toLowerCase().includes(keyword.toLowerCase()) ||
        product.Genre.toLowerCase().includes(keyword.toLowerCase()) ||
        product._id.toString().includes(keyword)
    )
    res.json(result)
  }
})

const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product Removed' })
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    Title: 'Sample title',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    Genre: 'Sample Genre',
    Author: 'Sample Author',
    Publisher: 'Sample Publisher',
    description: 'Sample Description',
    rating: 0,
    numReviews: 0,
    countInStock: 0,
  })

  const createdProduct = await product.save()
  res.status(201).json(product)
})

const updateProduct = asyncHandler(async (req, res) => {
  const {
    Title,
    price,
    image,
    Genre,
    Author,
    Publisher,
    description,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.Title = Title
    product.price = price
    product.image = image
    product.Genre = Genre
    product.Author = Author
    product.Publisher = Publisher
    product.description = description
    product.countInStock = countInStock

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product Already Reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review Added' })
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

const updateProductReview = asyncHandler(async (req, res) => {
  const { reviewId, txt } = req.body
  const product = await Product.findById(req.params.id)
  product.reviews.map(async (review) => {
    // console.log(`${typeof review._id}`)
    // console.log(`${typeof reviewId}`)
    // console.log(`${review._id.toString() === reviewId}`)
    if (review._id.toString() === reviewId) {
      //saveReview = review
      //console.log(`${review.reply.replied}`)
      review.reply.replied = true
      review.reply.txt = txt
      await product.save()
      res.status(201).json({ message: 'Reply Added' })
    }
  })
  //console.log(`${saveReview}`)
  // product.saveReview.replied = true
  // product.saveReview.txt = txt
  // await product.save()
  // res.status(201).json({ message: 'Reply Added' })
})

export {
  getProducts,
  getProductsById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  updateProductReview,
}
