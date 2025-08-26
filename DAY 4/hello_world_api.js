// Simple API returning "HELLO,WORLD" using Node.js built-in http module
const http = require('http');
const PORT = 3000;

// Create a server that returns "HELLO,WORLD"
const server = http.createServer((req, res) => {
  // Set the response headers
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  // Send the response
  res.end('HELLO,WORLD');
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

console.log('API server is starting up...');