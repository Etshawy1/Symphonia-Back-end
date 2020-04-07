const mongoose = require('mongoose');
const users = [
  {
    _id: mongoose.Types.ObjectId('5e8125dc54660672fd69987f'),
    followedUsers: [
      mongoose.Types.ObjectId('5e84b966681ae439edfc1d6f'),
      mongoose.Types.ObjectId('5e82a48054660672fd699883'),
      mongoose.Types.ObjectId('5e812a3454660672fd699880')
    ],
    email: 'generalmohamed1999@gmail.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Muhammad Ahmad Hesham',
    dateOfBirth: '1999-05-12T00:00:00.000+00:00',
    gender: 'male',
    type: 'user',
    last_login: '2020-04-06T10:21:58.141+00:00',
    passwordChangedAt: '2020-04-01T15:38:48.450+00:00',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8a5a78b2859207bf1fc2e8'),
          devicesName: 'chrome'
        }
      ],
      play: false,
      queueTracks: [],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [
      mongoose.Types.ObjectId('5e7969965146d92e98ac3ef7'),
      mongoose.Types.ObjectId('5e7ac3c7d43a2c49909c549c'),
      mongoose.Types.ObjectId('5e805a8a3711912168602afa'),
      mongoose.Types.ObjectId('5e875c15ba6ebe663fdbb2c1')
    ],
    googleId: 'googleId',
    imageGoogleUrl:
      'https://lh3.googleusercontent.com/a-/AOh14Gga4UgHOVM-hgdnV5Sv8OusgKzhsfmiYv5wEgSwxA',
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/default.png',
    followedAlbums: [
      mongoose.Types.ObjectId('5e701f4d2672a63a60573a02'),
      mongoose.Types.ObjectId('5e701fdf2672a63a60573a06')
    ]
  },
  {
    _id: mongoose.Types.ObjectId('5e812a3454660672fd699880'),
    followedUsers: [
      mongoose.Types.ObjectId('5e82a48054660672fd699883'),
      mongoose.Types.ObjectId('5e8b6d866253cb184eaac150')
    ],
    email: 'test1@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'user1',
    dateOfBirth: '1999-06-25T00:00:00.000+00:00',
    gender: 'female',
    type: 'user',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8a5b0db2859207bf1fc2e9'),
          devicesName: 'chrome'
        }
      ],
      play: false,
      queueTracks: [],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [
      mongoose.Types.ObjectId('5e806865ef653f5a541e0b1d'),
      mongoose.Types.ObjectId('5e8069722fcb0d35900c4d64'),
      mongoose.Types.ObjectId('5e8078b0dbaafc18605cb029'),
      mongoose.Types.ObjectId('5e8828df838d9835d207016d')
    ],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/default.png',
    followedAlbums: [mongoose.Types.ObjectId('5e794163c01c024ecc3c31d3')]
  },
  {
    _id: mongoose.Types.ObjectId('5e812db054660672fd699881'),
    followedUsers: [],
    email: 'test2@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'user2',
    dateOfBirth: '1986-06-25T00:00:00.000+00:00',
    gender: 'male',
    type: 'user',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8a5b0db2859207bf1fc2e9'),
          devicesName: 'chrome'
        }
      ],
      play: false,
      queueTracks: [],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [
      mongoose.Types.ObjectId('5e8088fa79844f135496ec7f'),
      mongoose.Types.ObjectId('5e875b1cba6ebe663fdbb2bc'),
      mongoose.Types.ObjectId('5e875bd6ba6ebe663fdbb2c0'),
      mongoose.Types.ObjectId('5e882913838d9835d207016e')
    ],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/default.png',
    followedAlbums: [
      mongoose.Types.ObjectId('5e89f33375bcc40cc4b5a736'),
      mongoose.Types.ObjectId('5e701fdf2672a63a60573a06')
    ]
  },

  {
    _id: mongoose.Types.ObjectId('5e8137aa54660672fd699882'),
    followedUsers: [],
    email: 'test3@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Tame Impala',
    dateOfBirth: '1978-06-25T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8a5b0db2859207bf1fc2e9'),
          devicesName: 'chrome'
        }
      ],
      play: false,
      queueTracks: [],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Tame-Impala.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e82a48054660672fd699883'),
    followedUsers: [],
    email: 'test4@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Interpol',
    dateOfBirth: '1979-12-25T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8a5b0db2859207bf1fc2e9'),
          devicesName: 'chrome'
        }
      ],
      play: false,
      queueTracks: [],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/Interpol.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e84b966681ae439edfc1d6f'),
    followedUsers: [],
    email: 'test5@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Minuit Machine',
    dateOfBirth: '1995-06-25T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8a5b0db2859207bf1fc2e9'),
          devicesName: 'chrome'
        }
      ],
      play: false,
      queueTracks: [],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Minuit-Machine.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8b6d866253cb184eaac150'),
    followedUsers: [],
    email: 'test6@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'TR/ST',
    dateOfBirth: '1985-12-05T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8a5b0db2859207bf1fc2e9'),
          devicesName: 'chrome'
        }
      ],
      play: false,
      queueTracks: [],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    tracks: [
      mongoose.Types.ObjectId('5e8a1ea07937ec4d40c6debf'),
      mongoose.Types.ObjectId('5e8a37d0d56ea252c3860a1a'),
      mongoose.Types.ObjectId('5e8a39f24e11cd46c8bde654')
    ],
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/tr-st.jpg',
    followedAlbums: []
  }
];

module.exports = users;
