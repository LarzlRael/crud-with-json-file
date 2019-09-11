import express from 'express';
import path from 'path';

import morgan from 'morgan';
const app = express();
//importando el enrutador

import routes from './routes/indexRoutes'
//settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middelwares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//routes
app.use(routes);

//static
app.use(express.static(path.join(__dirname, 'public')));

//404 error handler

app.use((req, res, next) => {
    res.send('not found').status(404);
})




export default app;