const logger = require('morgan');
const cors = require('cors');
const express = require('express');
const customerRoute = require('./app/routes/customer.js');
const roomTypeRoute = require('./app/routes/roomType.js');
const roomRoute = require('./app/routes/room.js');
const extraServiceRoute = require('./app/routes/extraService.js');
const reservationRoute = require('./app/routes/reservation.js');
const inventoryRoute = require('./app/routes/inventory.js');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/v1/customers/', customerRoute);
app.use('/v1/room-types/', roomTypeRoute);
app.use('/v1/rooms/', roomRoute);
app.use('/v1/extra-services/', extraServiceRoute);
app.use('/v1/reservations/', reservationRoute);
app.use('/v1/inventories/', inventoryRoute);

module.exports = app;
