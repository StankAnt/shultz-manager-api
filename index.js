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
      type: String,
      unique: true
    }
  },
  { versionKey: false }
);

const ShultzSchema = new mongoose.Schema(
  {
    _userId: mongoose.Schema.Types.ObjectId
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
    if (err.code === 11000) {
      ctx.body = { message: 'This user name already exists.' };
      ctx.status = httpStatus.BAD_REQUEST;
    } else {
      ctx.status = httpStatus.INTERNAL_SERVER_ERROR;
    }
  }
});
router.post('/shultz', async ctx => {
  try {
    const shultz = new Shultz({ _userId: new mongoose.Types.ObjectId(ctx.request.body.userId) });
    await shultz.save();
    ctx.status = httpStatus.CREATED;
  } catch (err) {
    ctx.status = httpStatus.BAD_REQUEST;
  }
});

router.get('/shultz-list', async ctx => {
  try {
    const shultzes = await Shultz.aggregate([
      {
        $lookup: {
          as: 'user',
          foreignField: '_id',
          from: 'users',
          localField: '_userId'
        }
      },
      { $unwind: '$user' },
      {
        $group: {
          _id: '$_id',
          user: { $first: '$user.name' }
        }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $limit: 10
      }
    ]);

    ctx.body = {
      shultzes
    };
    ctx.status = httpStatus.OK;
  } catch (err) {
    ctx.status = httpStatus.INTERNAL_SERVER_ERROR;
  }
});

app.use(bodyParser());
app.use(router.routes());

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
