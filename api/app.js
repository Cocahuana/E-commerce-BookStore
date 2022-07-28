var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

require('./Auth/passport');

var indexRouter = require('./routes/index');

/* Deploy back start */
//Here we require cors, otherwise it will not work properly

const app = express();
const cors = require('cors');

app.name = 'API';

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
	//Si en la instruccion de abajo sacamos * y ponemos la url de la pagina sirve para produccion
	res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, DELETE'
	);
	next();
});

app.use('/', indexRouter);
//app.use('/users', usersRouter);

module.exports = app;
