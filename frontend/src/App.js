import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen.js'
import CartScreen from './screens/CartScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'
import ShippingScreen from './screens/ShippingScreen.js'
import PaymentScreen from './screens/PaymentScreen.js'
import PlaceOrderScreen from './screens/PlaceOrderScreen.js'
import OrderScreen from './screens/OrderScreen.js'
import UserListScreen from './screens/UserListScreen.js'
import UserStatusScreen from './screens/UserStatusScreen.js'
import ProductListScreen from './screens/ProductListScreen.js'
import ProductEditScreen from './screens/ProductEditScreen.js'
import OrderListScreen from './screens/OrderListScreen.js'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' exact element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/login/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/admin/userList' element={<UserListScreen />} />
            <Route path='/admin/orderList' element={<OrderListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserStatusScreen />} />
            <Route
              path='/admin/product/:id/edit'
              element={<ProductEditScreen />}
            />
            <Route path='/admin/productList' element={<ProductListScreen />} />
            <Route path='/cart' element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
