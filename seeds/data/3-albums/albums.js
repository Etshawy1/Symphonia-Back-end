const mongoose = require('mongoose');
const copyrights = {
  text: `Eu excepteur velit cillum dolor enim amet dolore magna. Voluptate enim ipsum pariatur est ut proident reprehenderit non et aliquip magna est velit. Consectetur in enim nostrud labore nulla veniam laborum eiusmod quis ex aliqua nisi dolor.Aliquip Lorem dolore nulla Lorem exercitation ad tempor cillum consectetur. Ad cillum occaecat aliqua amet pariatur.`,
  type: 'C'
};
const albums = [
  {
    _id: mongoose.Types.ObjectId('5e701f4d2672a63a60573a02'),
    name: 'El Pintor',
    releaseDate: new Date('2014-09-08T00:00:00.000+00:00'),
    image: 'https://thesymphonia.ddns.net/api/v1/images/albums/El-Pintor.jpg',
    artist: mongoose.Types.ObjectId('5e82a48054660672fd699883'),
    tracks: [
      mongoose.Types.ObjectId('5e7d334860cd930408a5f995'),
      mongoose.Types.ObjectId('5e8a1e0f7937ec4d40c6deba'),
      mongoose.Types.ObjectId('5e8a1e727937ec4d40c6debb')
    ],
    type: 'album',
    albumType: 'album',
    copyrights
  },
  {
    _id: mongoose.Types.ObjectId('5e701fdf2672a63a60573a06'),
    name: 'The Slow Rush',
    releaseDate: new Date('2020-02-14T00:00:00.000+00:00'),
    image:
      'https://thesymphonia.ddns.net/api/v1/images/albums/The-Slow-Rush.jpg',
    artist: mongoose.Types.ObjectId('5e8137aa54660672fd699882'),
    tracks: [
      mongoose.Types.ObjectId('5e7d2dc03429e24340ff1396'),
      mongoose.Types.ObjectId('5e7d2ddd3429e24340ff1397'),
      mongoose.Types.ObjectId('5e7d2e023429e24340ff1398')
    ],
    type: 'album',
    albumType: 'album',
    copyrights
  },
  {
    _id: mongoose.Types.ObjectId('5e794163c01c024ecc3c31d3'),
    name: 'Violent Rains',
    releaseDate: new Date('2015-10-09T00:00:00.000+00:00'),
    image:
      'https://thesymphonia.ddns.net/api/v1/images/albums/Violent-Rains.jpg',
    artist: mongoose.Types.ObjectId('5e84b966681ae439edfc1d6f'),
    tracks: [
      mongoose.Types.ObjectId('5e8a1e767937ec4d40c6debc'),
      mongoose.Types.ObjectId('5e8a1e937937ec4d40c6debd'),
      mongoose.Types.ObjectId('5e8a1e9a7937ec4d40c6debe')
    ],
    type: 'album',
    albumType: 'album',
    copyrights
  },
  {
    _id: mongoose.Types.ObjectId('5e89f33375bcc40cc4b5a736'),
    name: 'TRST',
    releaseDate: new Date('2012-02-28T00:00:00.000+00:00'),
    image: 'https://thesymphonia.ddns.net/api/v1/images/albums/TRST.jpg',
    artist: mongoose.Types.ObjectId('5e8b6d866253cb184eaac150'),
    tracks: [
      mongoose.Types.ObjectId('5e8a1ea07937ec4d40c6debf'),
      mongoose.Types.ObjectId('5e8a37d0d56ea252c3860a1a'),
      mongoose.Types.ObjectId('5e8a39f24e11cd46c8bde654')
    ],
    type: 'album',
    albumType: 'album',
    copyrights
  },
  {
    _id: mongoose.Types.ObjectId('5edf5a442aa9b365682e46f9'),
    name: 'Born To Die',
    releaseDate: new Date('2020-01-01T00:00:00.000+00:00'),
    image:
      'https://thesymphonia.ddns.net/api/v1/images/albums/5e8c77c1e37ac11ac4f0135f/1904eb2d71d68b03da21-1591695940637.jpg',
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    tracks: [
      mongoose.Types.ObjectId('5edf60d72aa9b365682e4746'),
      mongoose.Types.ObjectId('5edf60e82aa9b365682e4747'),
      mongoose.Types.ObjectId('5edf60f62aa9b365682e474c')
    ],
    type: 'album',
    albumType: 'album',
    copyrights
  },
  {
    _id: mongoose.Types.ObjectId('5edf5b112aa9b365682e4704'),
    name: 'Lust For Life',
    releaseDate: new Date('2017-01-03T00:00:00.000+00:00'),
    image:
      'https://thesymphonia.ddns.net/api/v1/images/albums/5e8c77c1e37ac11ac4f0135f/dca5e2fc7010bdb8da59-1591696145131.jpg',
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    tracks: [
      mongoose.Types.ObjectId('5edf5fe72aa9b365682e4729'),
      mongoose.Types.ObjectId('5edf5ffe2aa9b365682e472a'),
      mongoose.Types.ObjectId('5edf60102aa9b365682e4731')
    ],
    type: 'album',
    albumType: 'album',
    copyrights
  },
  {
    _id: mongoose.Types.ObjectId('5edf5b742aa9b365682e4705'),
    name: 'Paradise',
    releaseDate: new Date('2012-09-06T00:00:00.000+00:00'),
    image:
      'https://thesymphonia.ddns.net/api/v1/images/albums/5e8c77c1e37ac11ac4f0135f/24de38f2b1ffe0f06f06-1591696244687.jpg',
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    tracks: [
      mongoose.Types.ObjectId('5edf602d2aa9b365682e473a'),
      mongoose.Types.ObjectId('5edf603f2aa9b365682e473b'),
      mongoose.Types.ObjectId('5edf60582aa9b365682e473c')
    ],
    type: 'album',
    albumType: 'album',
    copyrights
  },
  {
    _id: mongoose.Types.ObjectId('5edf5bb92aa9b365682e4706'),
    name: 'Honeymoon',
    releaseDate: new Date('2015-02-03T00:00:00.000+00:00'),
    image:
      'https://thesymphonia.ddns.net/api/v1/images/albums/5e8c77c1e37ac11ac4f0135f/c8b32eabe8f3992f0b35-1591696313511.jpg',
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    tracks: [
      mongoose.Types.ObjectId('5edf5f952aa9b365682e4726'),
      mongoose.Types.ObjectId('5edf5fac2aa9b365682e4727'),
      mongoose.Types.ObjectId('5edf5fbc2aa9b365682e4728')
    ],
    type: 'album',
    albumType: 'album',
    copyrights
  },
  {
    _id: mongoose.Types.ObjectId('5edf5bfb2aa9b365682e4707'),
    name: 'Ultraviolence',
    releaseDate: new Date('2014-10-09T00:00:00.000+00:00'),
    image:
      'https://thesymphonia.ddns.net/api/v1/images/albums/5e8c77c1e37ac11ac4f0135f/74d0422d342f3efe4fed-1591696379797.jpg',
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    tracks: [
      mongoose.Types.ObjectId('5edf608c2aa9b365682e473d'),
      mongoose.Types.ObjectId('5edf609d2aa9b365682e473e'),
      mongoose.Types.ObjectId('5edf60b52aa9b365682e4741')
    ],
    type: 'album',
    albumType: 'album',
    copyrights
  },
  {
    _id: mongoose.Types.ObjectId('5edf62692aa9b365682e4760'),
    name: 'Blue Velvet',
    releaseDate: new Date('2012-02-08T00:00:00.000+00:00'),
    image:
      'https://thesymphonia.ddns.net/api/v1/images/albums/5e8c77c1e37ac11ac4f0135f/5623f4e837d690770082-1591698025929.jpg',
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    tracks: [mongoose.Types.ObjectId('5edf62882aa9b365682e4769')],
    type: 'album',
    albumType: 'single',
    copyrights
  },
  {
    _id: mongoose.Types.ObjectId('5edf63122aa9b365682e4776'),
    name: 'Dark Paradise',
    releaseDate: new Date('2013-02-06T00:00:00.000+00:00'),
    image:
      'https://thesymphonia.ddns.net/api/v1/images/albums/5e8c77c1e37ac11ac4f0135f/68680e7f1d5c695c129c-1591698194213.jpg',
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    tracks: [mongoose.Types.ObjectId('5edf63922aa9b365682e4777')],
    type: 'album',
    albumType: 'single',
    copyrights
  },
  {
    _id: mongoose.Types.ObjectId('5edf63f22aa9b365682e477c'),
    name: 'Brooklyn Baby',
    releaseDate: new Date('2014-02-04T00:00:00.000+00:00'),
    image:
      'https://thesymphonia.ddns.net/api/v1/images/albums/5e8c77c1e37ac11ac4f0135f/0494c444166b2b9c95d6-1591698418594.jpg',
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    tracks: [mongoose.Types.ObjectId('5edf666d2aa9b365682e4784')],
    type: 'album',
    albumType: 'single',
    copyrights
  }
];

module.exports = albums;
