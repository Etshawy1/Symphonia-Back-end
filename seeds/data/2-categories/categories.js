const mongoose = require('mongoose');
const categories = [
  {
    _id: mongoose.Types.ObjectId('5e8072e5e478cf39b47bd1ef'),
    icons: [
      {
        url:
          'https://thesymphonia.ddns.net/api/v1/browse/categories/images/Psychedelic-pop.jpg',
        width: 300,
        height: 300
      }
    ],
    name: 'Psychedelic pop',
    id: 'Psychedelic-pop',
    type: 'category'
  },
  {
    _id: mongoose.Types.ObjectId('5e807517e478cf39b47bd1f0'),
    icons: [
      {
        url:
          'https://thesymphonia.ddns.net/api/v1/browse/categories/images/Indie-rock.jpg',
        width: 300,
        height: 300
      }
    ],
    name: 'Indie rock',
    id: 'Indie-rock',
    type: 'category'
  },
  {
    _id: mongoose.Types.ObjectId('5e8076e6a9902a4328cc285c'),
    icons: [
      {
        url:
          'https://thesymphonia.ddns.net/api/v1/browse/categories/images/Alternative.jpg',
        width: 300,
        height: 300
      }
    ],
    name: 'Alternative',
    id: 'Alternative',
    type: 'category'
  },
  {
    _id: mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8'),
    icons: [
      {
        url:
          'https://thesymphonia.ddns.net/api/v1/browse/categories/images/Electronic.jpg',
        width: 300,
        height: 300
      }
    ],
    name: 'Electronic',
    id: 'Electronic',
    type: 'category'
  }
];

module.exports = categories;
