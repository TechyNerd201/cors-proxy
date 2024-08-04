const express = require("express");
const cors = require("cors");
const request = require("request");
const app = express();

app.use(cors());

app.use("/", (req, res) => {
  const targetURL = req.query.url;
  if (!targetURL) {
    return res.send("No URL provided");
  }
  request(
    { url: targetURL, method: req.method, json: req.body, headers: req.headers },
    (error, response, body) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(response.statusCode).send(body);
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`CORS proxy server listening on port ${port}`);
});
