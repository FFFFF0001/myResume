const pkg = require('./package');
const config = require('./config/db');
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const index = require('./server/index');
const resume = require('./server/resume');
mongoose.connect(config.mongodb);
mongoose.Promise = global.Promise;

const app = express();
const port = process.env.PORT || 3000;

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(__dirname + '/src/assets/favicon.ico'));
app.use(express.static('dist'));
app.use('/', index);
app.use('/api', resume);

app.listen(port, () => {
  console.log(`${pkg.name} listening on port ${port}`)
});

module.exports = app;
