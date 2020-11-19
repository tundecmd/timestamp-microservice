const http = require('http');
const fs = require('fs');

const requestHandler = (req, res) => {
  if (req.url === '/') {
      fs.readFile('views/index.html', (err, html) => {
      if (err) {
        throw err
      }
        
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(html);
    })
    
  } else if (req.url.startsWith('/api/timestamp')) {
      const dateString = req.url.split('/api/timestamp/')[1];
      const getTimestamp = (date) => {
        return {
          utc: date.toUTCString(),
          unix: date.getTime()
        }
      }
      let timestamp;

      if (dateString === '' || dateString === undefined || dateString.trim() === '') {
        timestamp = getTimestamp(new Date())
      } else {
        const date = new Date(dateString);

      if (!isNaN(date.getTime())) {
        timestamp = getTimestamp(date);
      } else {
        timestamp = {
          error: "invalid date"
        };
      } 
    }

       res.writeHead(200, { "Content-Type": "application/json" });
       res.end(JSON.stringify(timestamp));
    
  } else {
    fs.readFile('views/error.html', (err, errhtml) => {
      if (err) {
        throw err
      }
        
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(errhtml);
  })}
}

const server = http.createServer(requestHandler);

server.listen(3000, (err) => {
  if (err) {
    throw err
  }
  console.log(`server running on PORT ${server.address().port}`);
})