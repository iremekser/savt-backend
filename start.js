const mongoose = require('mongoose');

// import all of our models
require('./app/models/Customer');
require('./app/models/ExtraService');
require('./app/models/Inventory');
require('./app/models/Reservation');
require('./app/models/Room');
require('./app/models/RoomType');

// Start our app!
const app = require('./app');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection.on('error', err => {
  console.error(`Error → ${err.message}`);
});

app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → localhost:${server.address().port}`);
});
