const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const json = require('koa-json');
const app = new Koa();

// log all events to the terminal
app.use(logger());
app.use(json());

// error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

// instantiate our new Router
const router = new Router();
const dogRouter = new Router({
  prefix: '/dogs'
});
// require our external routes and pass in the router
require('./routes/basic')({ router });
require('./routes/dogs')({ dogRouter });

// tells the router to use all the routes that are on the object
app.use(router.routes());
app.use(router.allowedMethods());

app.use(dogRouter.routes());
app.use(dogRouter.allowedMethods());

// tell the server to listen to events on a specific port
const port = process.env.PORT || 5000;
const server = app.listen(port);;
module.exports = server;
