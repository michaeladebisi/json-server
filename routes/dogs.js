const request = require('superagent');

module.exports = ({ dogRouter }) => {
  // getting the dogs route
  dogRouter.get('/', async (ctx, next) => {
    await request
      .get('https://dog.ceo/api/breeds/list/all')
      .then(res => {
        ctx.body = res.body;
      })
      .catch(err => {
        console.log(err);
      });
  });
 const makeRequest = async (ctx) => {
    const value1 = await request.get('https://dog.ceo/api/breeds/list');
    const value2 = await request.get('https://dog.ceo/api/breeds/list/all');
    let value1Text = value1.text;
    let value2Text = value2.text
    ctx.body = {
        value1: value1Text,
        value2: value2Text
     }
    console.log(value1Text,'\n\n',  value2Text);
    return [value1Text, value2Text];
  }

  dogRouter.get('/:dogs', makeRequest);
};
 
