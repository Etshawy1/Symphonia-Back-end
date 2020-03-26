Category = require('./categoryModel');
Album = require('./albumModel');
Album.create({
  name: 'alb1',
  artist: 'hamasa'
})
  .then(data => {
    console.log('success');
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
