const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/api/timestamp/:datestring?', (req, res) => {
  const getTimestamp = (date) => {
    return {
      utc: date.toUTCString(),
      unix: date.getTime()
    }
  }
  let timestamp;
 
  const datestring = req.params.datestring

    if (datestring === '' || datestring === undefined || datestring.trim() === '') {
      timestamp = getTimestamp(new Date())
    } else {
      const date = new Date(datestring);

      if (!isNaN(date.getTime())) {
        timestamp = getTimestamp(date);
      } else {
        timestamp = {
          error: "invalid date"
        };
      } 
    }
    res.json(timestamp)
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/views/error.html');
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 8000, function () {
  console.log(`Your app is listening on port ' + ${listener.address().port}`);
});