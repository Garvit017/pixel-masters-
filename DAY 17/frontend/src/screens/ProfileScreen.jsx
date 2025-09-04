import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { updateProfile, reset } from '../slices/authSlice';

const ProfileScreen = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { username, email, password, confirmPassword } = formData;

  const dispatch = useDispatch();

  const { userInfo, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (userInfo) {
      setFormData({
        username: userInfo.username || '',
        email: userInfo.email || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('Profile updated successfully');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        username,
        email,
      };

      if (password) {
        userData.password = password;
      }

      dispatch(updateProfile(userData));
    }
  };

  return (
    <FormContainer>
      <h1>User Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={onChange}
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
          />
          <Form.Text className="text-muted">
            Leave blank to keep current password
          </Form.Text>
        </Form.Group>

        <Form.Group className="my-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;