import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contactInfo: user.contactInfo,
      profilePic: user.profilePic,
      isAdmin: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, contactInfo, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('user already exists')
  }

  const user = await User.create({
    name,
    email,
    contactInfo,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contactInfo: user.contactInfo,
      isAdmin: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user')
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contactInfo: user.contactInfo,
      profilePic: user.profilePic,
      isAdmin: user.role,
    })
  } else {
    res.status(404)
    throw new Error('User not Found')
  }
})

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.contactInfo = req.body.contactInfo || user.contactInfo
    user.profilePic = req.body.profilePic || user.profilePic
    if (req.user.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      contactInfo: user.contactInfo,
      profilePic: updatedUser.profilePic,
      isAdmin: updatedUser.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(404)
    throw new Error('User not Found')
  }
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User Removed' })
  } else {
    res.status(404)
    throw new Error('User not Found')
  }
})

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not Found')
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id)

  if (user) {
    user.role = req.body.isAdmin || user.role

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      isAdmin: updatedUser.role,
    })
  } else {
    res.status(404)
    throw new Error('User not Found')
  }
})

export {
  authUser,
  registerUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
}
