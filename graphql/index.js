const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const PORT = 4000;
const app = express();
const { connect } = require('./db');

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

connect().then(
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
