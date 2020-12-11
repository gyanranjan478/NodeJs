// Module to work with file system
const fs = require('fs');

const requestHandler = (req, res) => {

    const url  = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title> Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];

        // Any incoming data is just a stream of data and is request is read in chunks
        // on() allows to listen to certain events, data-event - listens for chunk of data
        req.on('data', (chunk) => {
            body.push(chunk); // push new chunk (we can not re-assign the value to const, with push we only change the data of the object )
        });

        // fires once it finishes receiving incoming data
        return req.on('end', () => {
            const paresedBody = Buffer.concat(body).toString();
            const message = paresedBody.split('=')[1];

            // Write to file system
            fs.writeFile('message.txt', message, err => {

                // StatusCode 302 : We sent the request to server and was re-directed 
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end()
            });            
        });
    }

    res.write('<html>');
    res.write('<head><title> Enter Message</title><head>');
    res.write('<body><h1>Hello from nodejs server</h1></body>');
    res.write('</html>');
    res.end();

}

module.exports = requestHandler;

// In order to export multiple items, we need to make exports as an object
/*
module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
}

or

module.exports.handler = requestHandler;
module.exports.someText = "Some hard coded text";
*/
