const mongoose = require('mongoose');
const histories = [
  {
    _id: mongoose.Types.ObjectId('5e8298c93c8b02a9402482bc'),
    track: mongoose.Types.ObjectId('5e7d2ddd3429e24340ff1397'),
    played_at: '2020-03-31T01:11:37.361+00:00',
    contextUrl:
      'https://zasymphonia.ddns.net/api/v1/playlists/5e8a6d96d4be480ab1d91c95/tracks',
    context: {
      collaborative: false,
      images: [
        'https://zasymphonia.ddns.net/api/v1/images/playlists/playlist13.jpg'
      ],
      public: true,
      tracks: [
        '5e7d2dc03429e24340ff1396',
        '5e7d2ddd3429e24340ff1397',
        '5e7d2e023429e24340ff1398'
      ],
      followers: [],
      _id: '5e8a6d96d4be480ab1d91c95',
      name: 'Sleep Sounds: Waterscapes',
      owner: '5e8125dc54660672fd69987f',
      description:
        'White Noise to Drown Out the Sounds of Police Sirens, Honking Trucks, and Overnight Construction Work Because I Live Right Next to the Brooklyn-Queens Expressway Because This Is the Only Studio Apartment I Can Afford',
      category: '5e8072e5e478cf39b47bd1ef'
    },
    contextType: 'playlist'
  }
];
module.exports = histories;
