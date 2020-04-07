const mongoose = require('mongoose');
const albums = [
  {
    _id: mongoose.Types.ObjectId('5e701f4d2672a63a60573a02'),
    name: 'El Pintor',
    year: 2014,
    image: 'https://zasymphonia.ddns.net/api/v1/images/albums/El-Pintor.jpg',
    artist: mongoose.Types.ObjectId('5e82a48054660672fd699883'),
    tracks: []
  },
  {
    _id: mongoose.Types.ObjectId('5e701fdf2672a63a60573a06'),
    name: 'The Slow Rush',
    year: 2020,
    image:
      'https://zasymphonia.ddns.net/api/v1/images/albums/The-Slow-Rush.jpg',
    artist: mongoose.Types.ObjectId('5e8137aa54660672fd699882'),
    tracks: []
  },
  {
    _id: mongoose.Types.ObjectId('5e794163c01c024ecc3c31d3'),
    name: 'Violent Rains',
    year: 2015,
    image:
      'https://zasymphonia.ddns.net/api/v1/images/albums/Violent-Rains.jpg',
    artist: mongoose.Types.ObjectId('5e84b966681ae439edfc1d6f'),
    tracks: []
  },
  {
    _id: mongoose.Types.ObjectId('5e89f33375bcc40cc4b5a736'),
    name: 'TRST',
    year: 2012,
    image: 'https://zasymphonia.ddns.net/api/v1/images/albums/TRST.jpg',
    artist: mongoose.Types.ObjectId('5e8b6d866253cb184eaac150'),
    tracks: []
  }
];

module.exports = albums;
