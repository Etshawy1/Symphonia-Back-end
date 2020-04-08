const mongoose = require('mongoose');
const albums = [
  {
    _id: mongoose.Types.ObjectId('5e701f4d2672a63a60573a02'),
    name: 'El Pintor',
    year: 2014,
    image: 'https://thesymphonia.ddns.net/api/v1/images/albums/El-Pintor.jpg',
    artist: mongoose.Types.ObjectId('5e82a48054660672fd699883'),
    tracks: [
      mongoose.Types.ObjectId('5e7d334860cd930408a5f995'),
      mongoose.Types.ObjectId('5e8a1e0f7937ec4d40c6deba'),
      mongoose.Types.ObjectId('5e8a1e727937ec4d40c6debb')
    ]
  },
  {
    _id: mongoose.Types.ObjectId('5e701fdf2672a63a60573a06'),
    name: 'The Slow Rush',
    year: 2020,
    image:
      'https://thesymphonia.ddns.net/api/v1/images/albums/The-Slow-Rush.jpg',
    artist: mongoose.Types.ObjectId('5e8137aa54660672fd699882'),
    tracks: [
      mongoose.Types.ObjectId('5e7d2dc03429e24340ff1396'),
      mongoose.Types.ObjectId('5e7d2ddd3429e24340ff1397'),
      mongoose.Types.ObjectId('5e7d2e023429e24340ff1398')
    ]
  },
  {
    _id: mongoose.Types.ObjectId('5e794163c01c024ecc3c31d3'),
    name: 'Violent Rains',
    year: 2015,
    image:
      'https://thesymphonia.ddns.net/api/v1/images/albums/Violent-Rains.jpg',
    artist: mongoose.Types.ObjectId('5e84b966681ae439edfc1d6f'),
    tracks: [
      mongoose.Types.ObjectId('5e8a1e767937ec4d40c6debc'),
      mongoose.Types.ObjectId('5e8a1e937937ec4d40c6debd'),
      mongoose.Types.ObjectId('5e8a1e9a7937ec4d40c6debe')
    ]
  },
  {
    _id: mongoose.Types.ObjectId('5e89f33375bcc40cc4b5a736'),
    name: 'TRST',
    year: 2012,
    image: 'https://thesymphonia.ddns.net/api/v1/images/albums/TRST.jpg',
    artist: mongoose.Types.ObjectId('5e8b6d866253cb184eaac150'),
    tracks: [
      mongoose.Types.ObjectId('5e8a1ea07937ec4d40c6debf'),
      mongoose.Types.ObjectId('5e8a37d0d56ea252c3860a1a'),
      mongoose.Types.ObjectId('5e8a39f24e11cd46c8bde654')
    ]
  }
];

module.exports = albums;
