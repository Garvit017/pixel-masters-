import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaComments } from 'react-icons/fa';
import { logout } from '../slices/authSlice';
import { resetChat } from '../slices/chatSlice';
import { disconnectSocket } from '../services/socketService';

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    // Disconnect socket
    disconnectSocket();
    
    // Dispatch logout action
    dispatch(logout());
    
    // Reset chat state
    dispatch(resetChat());
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <FaComments className="me-2" /> Real-time Chat
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <LinkContainer to="/chat">
                    <Nav.Link>
                      <FaComments className="me-1" /> Chat
                    </Nav.Link>
                  </LinkContainer>
                  <NavDropdown title={userInfo.user.username} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <FaUser className="me-2" /> Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      <FaSignOutAlt className="me-2" /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaUser className="me-1" /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaUser className="me-1" /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;