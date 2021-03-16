const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const shortenerRoutes = require('./routes/shortenerRoutes')


const app = express();

const PORT = process.env.PORT || 4000;



app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(express.static('./public'));
app.use(shortenerRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});