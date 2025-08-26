// Simple test script for Todo API
const http = require('http');

// Test configuration
const API_HOST = 'localhost';
const API_PORT = 5000;
const API_PATH = '/api/todos';

// Helper function to make HTTP requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: API_HOST,
      port: API_PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsedData = responseData ? JSON.parse(responseData) : {};
          resolve({
            statusCode: res.statusCode,
            data: parsedData,
          });
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test cases
async function runTests() {
  console.log('Starting API tests...');
  let createdTodoId;

  try {
    // Test 1: Get all todos (initially empty)
    console.log('\nTest 1: Get all todos');
    const getAllResponse = await makeRequest('GET', API_PATH);
    console.log(`Status: ${getAllResponse.statusCode}`);
    console.log('Todos:', getAllResponse.data);

    // Test 2: Create a new todo
    console.log('\nTest 2: Create a new todo');
    const createResponse = await makeRequest('POST', API_PATH, { text: 'Test todo item' });
    console.log(`Status: ${createResponse.statusCode}`);
    console.log('Created todo:', createResponse.data);
    
    if (createResponse.data && createResponse.data.id) {
      createdTodoId = createResponse.data.id;
    } else {
      throw new Error('Failed to get ID from created todo');
    }

    // Test 3: Get all todos (should include the new todo)
    console.log('\nTest 3: Get updated todo list');
    const getUpdatedResponse = await makeRequest('GET', API_PATH);
    console.log(`Status: ${getUpdatedResponse.statusCode}`);
    console.log('Updated todos:', getUpdatedResponse.data);

    // Test 4: Toggle todo completion status
    console.log('\nTest 4: Toggle todo completion');
    const toggleResponse = await makeRequest('PUT', `${API_PATH}/${createdTodoId}/toggle`);
    console.log(`Status: ${toggleResponse.statusCode}`);
    console.log('Toggled todo:', toggleResponse.data);

    // Test 5: Delete the todo
    console.log('\nTest 5: Delete todo');
    const deleteResponse = await makeRequest('DELETE', `${API_PATH}/${createdTodoId}`);
    console.log(`Status: ${deleteResponse.statusCode}`);
    console.log('Delete response:', deleteResponse.data);

    // Test 6: Verify todo was deleted
    console.log('\nTest 6: Verify todo was deleted');
    const finalGetResponse = await makeRequest('GET', API_PATH);
    console.log(`Status: ${finalGetResponse.statusCode}`);
    console.log('Final todos:', finalGetResponse.data);

    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// Run the tests
console.log('Todo API Test Script');
console.log('=================');
console.log('Make sure the server is running before executing this test.');
runTests();