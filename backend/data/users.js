import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Jack Hill',
    email: 'jack67@gmail.com',
    password: bcrypt.hashSync('1256', 10),
    role: true,
    contactInfo: '0184667322',
  },
  {
    name: 'Kelly Loren',
    email: 'kelly89@yahoo.com',
    password: bcrypt.hashSync('abcg', 10),
    role: false,
    contactInfo: '3928971822',
  },
  {
    name: 'Pol Shelby',
    email: 'pol98@hotmaail.com',
    password: bcrypt.hashSync('kleey', 10),
    role: false,
    contactInfo: '0031234823',
  },
  {
    name: 'Joe Biden',
    email: 'joe44@hotmaail.com',
    password: bcrypt.hashSync('usa', 10),
    role: true,
    contactInfo: '9936281174',
  },
  {
    name: 'Tommy Shelby',
    email: 'tommy78@hotmaail.com',
    password: bcrypt.hashSync('tom77', 10),
    role: false,
    contactInfo: '9735183622',
  },
  {
    name: 'Arthur Shelby',
    email: 'aurther_shelby@hotmaail.com',
    password: bcrypt.hashSync('aurther55', 10),
    role: false,
    contactInfo: '3719265437',
  },
]

export default users
