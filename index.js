const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
require('dotenv').config();

const app = new Koa();
const router = new Router();

const { initUser } = require('./controllers/user');
const { takeShultz, shultzList } = require('./controllers/shultz');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB)
  .then(() => console.log('Db connected'))
  .catch(err => console.log('Db connection error'));

router.post('/init', initUser);
router.post('/shultz', takeShultz);
router.get('/shultz-list', shultzList);

app.use(logger());
app.use(bodyParser());
app.use(router.routes());

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
