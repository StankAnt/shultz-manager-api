const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const httpStatus = require('http-status-codes');
require('dotenv').config();

const app = new Koa();
const router = new Router();

mongoose.connect(process.env.DB);
mongoose.set('debug', true);

const UserSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String
    }
  },
  { versionKey: false }
);

const ShultzSchema = new mongoose.Schema(
  {
    userId: {
      required: true,
      type: String
    }
  },
  { versionKey: false }
);

const User = mongoose.model('User', UserSchema);
const Shultz = mongoose.model('Shultz', ShultzSchema);

router.post('/init', async ctx => {
  try {
    const user = new User({ name: ctx.request.body.name });
    ctx.body = await user.save();
    ctx.status = httpStatus.CREATED;
  } catch (err) {
    ctx.status = httpStatus.BAD_REQUEST;
  }
});

router.post('/shultz', async ctx => {
  try {
    const shultz = new Shultz({ userId: ctx.request.body.userId });
    await shultz.save();
    ctx.status = httpStatus.CREATED;
  } catch (err) {
    ctx.status = httpStatus.BAD_REQUEST;
  }
});

router.get('/shultz-list', async ctx => {
  try {
    ctx.body = {
      shultzes: Shultz.find()
        .limit(10)
        .sort(-1)
    };
    ctx.status = httpStatus.OK;
  } catch (err) {
    ctx.status = httpStatus.INTERNAL_SERVER_ERROR;
  }
});

app.use(bodyParser());
app.use(router.routes());

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
