const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' ? 3001 : 3000);

// middlewares
app.use(express.json());
// app.use(cors());

app.use('/contacts', require('./routes/contact.routes.js'));
app.use('/', (req, res) => { res.redirect('/contacts'); });

// set port, listen for requests
const server = app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});


module.exports = server;
