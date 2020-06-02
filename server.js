const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const DIST = './dist/optimy-pwa-app';
const PORT = 8081;
const DIST_DIR = path.join(__dirname, DIST);

const template = fs.readFileSync(path.join(DIST_DIR, 'index.html')).toString();

app.all('/api**', (req, res) => {
  console.log(req.path);
  console.log(req.method);
  console.log(req.body);
  // const path = req.path.substr(4);
  const base_url = 'https://staging-core-optimy.com';

  axios({
    method: req.method.toLowerCase(),
    url: `${base_url}${req.path}`,
    data: req.body,
    header: {
      apptoken: 'r0MrA268ORAobX53qkoaohaA7g9ek3JJ',
      "Content-Type" : "application/x-www-form-urlencoded"
    }
  })
    .then(function (response) {
      console.log('response', response);
      res.send(response.data);
    }).catch(function (error){
      res.status(error.response.status).send(error.response.data);
  });
})

app.get('*.*', express.static(DIST_DIR, { maxAge: '1y' }));
app.get('*', (req, res) => {
    res.send(template);
});

app.listen(PORT, () => {
    console.log(`Listing on http://127.0.0.1:${PORT}`);
});
