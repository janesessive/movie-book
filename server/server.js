const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./controllers'));

const { mongoose, mongooseUri } = require('./db/mongoose');

mongoose.connect(mongooseUri, { useNewUrlParser: true }).then(
  () => {
    console.log('Database connection ready');
    const server = app.listen(process.env.PORT || PORT, function() {
      const port = server.address().port;
      console.log('App now running on port ' + port);
    });
  },
  err => {
    console.log(err);
    process.exit(1);
  }
);
