const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const shortenerRoutes = require('./routes/shortenerRoutes');
const userRoutes = require('./routes/userRoutes');
const initializePassport = require('./passport-config');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const pool = require('./db');
const checkAuthenticated = require('./middlewares/checkAuthenticated');



pool.query('select * from users').then(users => {
  initializePassport(
    passport,
    async email => users.rows.find(user => user.email === email),
    async u_id => users.rows.find(user => user.u_id === u_id)
  );
})


if (process.env.NODE_ENV !== 'production')
  require('dotenv').config()

const app = express();
const PORT = process.env.PORT;

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'))

app.use(userRoutes);
app.use(shortenerRoutes);


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
