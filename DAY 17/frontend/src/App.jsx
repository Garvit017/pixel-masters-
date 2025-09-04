import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/chat" element={<ChatScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;