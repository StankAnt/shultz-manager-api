const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
require('dotenv').config();

const app = new Koa();
const router = new Router();

const { initUser } = require('./controllers/user');
const { takeShultz, shultzList } = require('./controllers/shultz');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB);

router.post('/init', initUser);
router.post('/shultz', takeShultz);
router.get('/shultz-list', shultzList);

app.use(bodyParser());
app.use(router.routes());

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
