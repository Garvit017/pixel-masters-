// This is a simple test script to demonstrate how to use the authentication API
// You can run this with Node.js after starting the server

const axios = require('axios');

// API base URL
const API_URL = 'http://localhost:5000/api/auth';

// Test user data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

// Store the JWT token
let token;

// Function to register a new user
async function registerUser() {
  try {
    console.log('\n--- Testing User Registration ---');
    console.log(`Registering user: ${testUser.email}`);
    
    const response = await axios.post(`${API_URL}/register`, testUser);
    
    console.log('Registration successful!');
    console.log('Response:', response.data);
    
    // Save the token for later use
    token = response.data.token;
    
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response ? error.response.data : error.message);
  }
}

// Function to login a user
async function loginUser() {
  try {
    console.log('\n--- Testing User Login ---');
    console.log(`Logging in user: ${testUser.email}`);
    
    const response = await axios.post(`${API_URL}/login`, {
      email: testUser.email,
      password: testUser.password
    });
    
    console.log('Login successful!');
    console.log('Response:', response.data);
    
    // Save the token for later use
    token = response.data.token;
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
  }
}

// Function to get the current user profile
async function getCurrentUser() {
  try {
    console.log('\n--- Testing Protected Route ---');
    console.log('Getting current user profile...');
    
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('Got user profile successfully!');
    console.log('User data:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Failed to get user profile:', error.response ? error.response.data : error.message);
  }
}

// Function to test unauthorized access
async function testUnauthorizedAccess() {
  try {
    console.log('\n--- Testing Unauthorized Access ---');
    console.log('Attempting to access protected route without token...');
    
    await axios.get(`${API_URL}/me`);
    
    // This should not execute if the server properly rejects the request
    console.log('ERROR: Unauthorized access was allowed!');
  } catch (error) {
    console.log('Correctly rejected unauthorized access!');
    console.log('Error response:', error.response.data);
  }
}

// Run all tests sequentially
async function runTests() {
  console.log('=== AUTHENTICATION API TESTS ===');
  
  // First try to register
  await registerUser();
  
  // Then try to login
  await loginUser();
  
  // Test unauthorized access
  await testUnauthorizedAccess();
  
  // Test accessing protected route with token
  await getCurrentUser();
  
  console.log('\n=== TESTS COMPLETED ===');
}

// Run the tests
runTests().catch(err => {
  console.error('Test execution failed:', err);
});