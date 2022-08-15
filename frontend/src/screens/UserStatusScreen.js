import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserStatusScreen = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const history = useNavigate()

  const userId = params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const userDetails = useSelector((state) => state.userDetails)
  const { user, loading, error } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const { success, loading: loadingUpdate, error: errorUpdate } = userUpdate

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_UPDATE_RESET })
      history('/admin/userList')
    } else {
      if (user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.role)
      }
    }
  }, [dispatch, userId, user, success, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, isAdmin }))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Update User Status</h1>
      <Link to='/admin/userList' className='btn btn-light my-3'>
        Go Back
      </Link>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>User Details</h2>
              {loadingUpdate && <Loader />}
              {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
              <p>
                <strong>Name: </strong> {name}
              </p>
              <p>
                <strong>Email: </strong> {email}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form>
                <Form.Group controlId='isadmin'>
                  <Form.Check
                    type='checkbox'
                    label='isadmin'
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  ></Form.Check>
                </Form.Group>
                <p></p>
                <Button type='submit' variant='primary' onClick={submitHandler}>
                  Update
                </Button>
              </Form>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default UserStatusScreen
