module.exports = ({ router }) => {
  // getting the home route
  router.get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  });
 
  router.get('/test', (ctx, next) => {
    ctx.body = 'Hello test!';
  });

  router.get('/test/:name', (ctx, next) => {
    ctx.body = `Hello ${ctx.params.name} `;
  });


};
