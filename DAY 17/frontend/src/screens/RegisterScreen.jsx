import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { register, reset } from '../slices/authSlice';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { username, email, password, confirmPassword } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect if logged in
    if (isSuccess || userInfo) {
      navigate('/chat');
    }

    dispatch(reset());
  }, [isError, isSuccess, userInfo, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      dispatch(register({ username, email, password }));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          disabled={isLoading}
        >
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;