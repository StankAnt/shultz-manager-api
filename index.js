const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
require('dotenv').config();

const app = new Koa();
const router = new Router();

const { initUser, authUser, verifyUser } = require('./controllers/user');
const { takeShultz, shultzList, shultzListByCenter } = require('./controllers/shultz');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB)
  .then(() => console.log('Db connected'))
  .catch(err => console.log('Db connection error'));

router.post('/init', initUser);
router.post('/signin', authUser);
router.post('/shultz', verifyUser, takeShultz);
router.post('/shultz-list', verifyUser, shultzList);
router.post('/shultz-list-bycenter', verifyUser, shultzListByCenter);

app.use(logger());
app.use(bodyParser());
app.use(router.routes());

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
