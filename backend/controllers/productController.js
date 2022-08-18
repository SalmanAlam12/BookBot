import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
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
export {
  getProducts,
  getProductsById,
  deleteProduct,
  createProduct,
  updateProduct,
}
