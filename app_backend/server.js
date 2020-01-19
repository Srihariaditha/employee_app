require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection
db.on('error', (error) => console.log(error));
db.once('open',  () => console.log('connected to database'))

app.use(cors());
app.use(express.json());

const router = require('./routes/router');
app.use('/',router);

const PORT = 3000;
app.listen(PORT, () => console.log('app running on port '+  PORT));
