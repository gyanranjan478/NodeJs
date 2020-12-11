// require() takes a path of the file or core module. Path starts with ./ ( relative path ) or / (absolute path)
// without / it takes core module names
// Module to work with http request and response
const http = require('http');

// If we import someting as an object than we need to fetch it using dot (.)
const routes = require('./routes')

// createServer() is to create server which takes parameter requestListener which is a function that will execute
// with each incoming request which takes two arguments a) request b) response which nodejs automatically provide us
//
// function reqeuestListener(req, res) {}

// createServer return a server object
const server = http.createServer(routes);

// NodeJs will keep running and listening to the provided port ( as we do not unregister it and event loop keeps running )
server.listen(3000);

// Note : NodeJs uses pattern to run on single threaded javascript. 
// Event loop handle by managing multi threaded feature of OS for multiple request

/*

// Using annonymous function
http.createServer(function(req,res) {

});

// Using fat arrow function
http.createServer((req, res) => {

})

 */

