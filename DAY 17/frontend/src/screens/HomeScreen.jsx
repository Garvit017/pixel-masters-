import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaComments, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // If user is already logged in, redirect to chat
    if (userInfo) {
      navigate('/chat');
    }
  }, [userInfo, navigate]);

  return (
    <Container>
      <Row className="justify-content-md-center text-center py-5">
        <Col md={8}>
          <h1 className="display-4 mb-4">
            <FaComments className="me-2" /> Real-time Chat Application
          </h1>
          <p className="lead mb-5">
            Connect with friends and colleagues instantly with our secure,
            real-time chat application. Experience seamless communication with
            features like message history, typing indicators, and online status.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/login">
              <Button variant="primary" size="lg">
                <FaSignInAlt className="me-2" /> Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline-primary" size="lg">
                <FaUserPlus className="me-2" /> Sign Up
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      <Row className="py-5">
        <Col md={4} className="mb-4">
          <div className="card h-100 text-center p-4">
            <h3>Real-time Messaging</h3>
            <p>
              Send and receive messages instantly with our Socket.io powered
              real-time communication system.
            </p>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="card h-100 text-center p-4">
            <h3>User Status</h3>
            <p>
              See when your friends are online, offline, or away with our
              real-time user status indicators.
            </p>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="card h-100 text-center p-4">
            <h3>Private Messaging</h3>
            <p>
              Have private conversations with individual users or join the global
              chat to talk with everyone.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;