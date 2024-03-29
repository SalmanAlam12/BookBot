import express from 'express'
const router = express.Router()
import {
  deleteProduct,
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  createProductReview,
  updateProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.get('/top', getTopProducts)
router.route('/:id/reviews').post(protect, createProductReview)
router.route('/:id/reviews').put(protect, updateProductReview)
router
  .route('/:id')
  .get(getProductsById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
