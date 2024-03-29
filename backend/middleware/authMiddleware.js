import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')
      next()
      return
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not Authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, No token')
  }
  next()
})

const admin = (req, res, next) => {
  if (req.user && req.user.role) {
    next()
  } else {
    res.status(401)
    throw new Error('Not Authorized as an Admin')
  }
}

export { protect, admin }
