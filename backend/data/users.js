import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Jack Hill',
    email: 'jack67@gmail.com',
    password: bcrypt.hashSync('1256', 10),
    role: true,
    // profilePic:"",
    // address:"",
    // contatcInfo:"",
  },
  {
    name: 'Kelly Loren',
    email: 'kelly89@yahoo.com',
    password: bcrypt.hashSync('abcg', 10),
    role: false,
    // profilePic:"",
    // address:"",
    // contatcInfo:"",
  },
  {
    name: 'Pol Shelby',
    email: 'pol98@hotmaail.com',
    password: bcrypt.hashSync('kleey', 10),
    role: false,
    // profilePic:"",
    // address:"",
    // contatcInfo:"",
  },
]

export default users
