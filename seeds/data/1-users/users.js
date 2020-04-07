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
  },
  {
    _id: mongoose.Types.ObjectId('5e8b6c246253cb184eaac14f'),
    followedUsers: [],
    email: 'test7@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Mohamed Alaa',
    dateOfBirth: '1999-09-09T00:00:00.000+00:00',
    gender: 'male',
    type: 'user',
    queue: {
      queueTracks: [
        'https://zasymphonia.ddns.net/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
        'https://zasymphonia.ddns.net/api/v1/me/player/tracks/5e7d2ddd3429e24340ff1397',
        'https://zasymphonia.ddns.net/api/v1/me/player/tracks/5e7d2e023429e24340ff1398'
      ],
      currentlyPlaying: {
        currentTrack:
          'https://zasymphonia.ddns.net/api/v1/me/player/tracks/5e7d2ddd3429e24340ff1397',
        device: {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d')
        }
      },
      previousTrack:
        'https://zasymphonia.ddns.net/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
      nextTrack:
        'https://zasymphonia.ddns.net/api/v1/me/player/tracks/5e7d2e023429e24340ff1398',
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/default.png',
    followedAlbums: [],
    history: mongoose.Types.ObjectId('5e8298c93c8b02a9402482bc')
  },
  {
    _id: mongoose.Types.ObjectId('5e8c73d82a0e4614b88a4ed0'),
    followedUsers: [],
    email: 'test8@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Austra',
    dateOfBirth: '1980-09-09T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/Austra.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7572e37ac11ac4f01356'),
    followedUsers: [],
    email: 'test9@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Boy Harsher',
    dateOfBirth: '1988-05-09T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Boy-Harsher.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c75c4e37ac11ac4f01357'),
    followedUsers: [],
    email: 'test10@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Chairlift',
    dateOfBirth: '1987-05-10T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/Chairlift.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7612e37ac11ac4f01358'),
    followedUsers: [],
    email: 'test11@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Cigarettes After Sex',
    dateOfBirth: '1997-05-16T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Cigarettes-After-Sex.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7669e37ac11ac4f01359'),
    followedUsers: [],
    email: 'test12@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Clario',
    dateOfBirth: '1997-05-16T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/Clario.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c769ce37ac11ac4f0135a'),
    followedUsers: [],
    email: 'test13@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Crystal Castles',
    dateOfBirth: '1997-05-16T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Crystal-Castles.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c76d5e37ac11ac4f0135b'),
    followedUsers: [],
    email: 'test14@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Current Joys',
    dateOfBirth: '1987-07-16T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Current-Joys.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c770de37ac11ac4f0135c'),
    followedUsers: [],
    email: 'test15@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Drab Majesty',
    dateOfBirth: '1987-07-16T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Drab-Majesty.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7746e37ac11ac4f0135d'),
    followedUsers: [],
    email: 'test16@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Frank Ocean',
    dateOfBirth: '1991-07-16T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Frank-Ocean.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7786e37ac11ac4f0135e'),
    followedUsers: [],
    email: 'test17@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Joji',
    dateOfBirth: '1995-07-16T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/Joji.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    followedUsers: [],
    email: 'test18@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Lana Del Rey',
    dateOfBirth: '1985-08-16T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Lana-Del-Rey.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c780ae37ac11ac4f01360'),
    followedUsers: [],
    email: 'test19@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Lebanon Hanover',
    dateOfBirth: '1995-08-16T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Lebanon-Hanover.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7843e37ac11ac4f01361'),
    followedUsers: [],
    email: 'test20@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Lil Peep',
    dateOfBirth: '1998-08-16T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/Lil-Peep.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c787de37ac11ac4f01362'),
    followedUsers: [],
    email: 'test21@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Man Without Country',
    dateOfBirth: '1986-04-11T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Man-Without-Country.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c78c9e37ac11ac4f01363'),
    followedUsers: [],
    email: 'test22@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Men I Trust',
    dateOfBirth: '1991-04-01T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Men-I-Trust.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7914e37ac11ac4f01364'),
    followedUsers: [],
    email: 'test23@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Pastel Ghost',
    dateOfBirth: '1995-04-01T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Pastel-Ghost.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7969e37ac11ac4f01365'),
    followedUsers: [],
    email: 'test24@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Purity Ring',
    dateOfBirth: '1997-04-01T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Purity-Ring.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7994e37ac11ac4f01366'),
    followedUsers: [],
    email: 'test25@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Sleep Party People',
    dateOfBirth: '1989-07-01T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Sleep-Party-People.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c79e6e37ac11ac4f01367'),
    followedUsers: [],
    email: 'test26@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Soap and Skin',
    dateOfBirth: '1981-07-01T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Soap-And-Skin.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7a3ee37ac11ac4f01368'),
    followedUsers: [],
    email: 'test27@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Son Lux',
    dateOfBirth: '1988-07-01T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/Son-Lux.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7a7893ec63187898e826'),
    followedUsers: [],
    email: 'test28@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Vansire',
    dateOfBirth: '1976-12-15T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/Vansire.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7ab693ec63187898e827'),
    followedUsers: [],
    email: 'test29@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Void Vision',
    dateOfBirth: '1976-12-15T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Void-Vision.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7aee93ec63187898e828'),
    followedUsers: [],
    email: 'test30@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Washed Out',
    dateOfBirth: '1978-12-15T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/Washed-Out.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7b2293ec63187898e829'),
    followedUsers: [],
    email: 'test31@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'XXXTENTACION',
    dateOfBirth: '1998-12-15T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/XXXTENTACION.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7c030fab001100e883fc'),
    followedUsers: [],
    email: 'test32@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Daft Punk',
    dateOfBirth: '1987-12-15T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/Daft-Punk.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7c540fab001100e883fd'),
    followedUsers: [],
    email: 'test33@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Ladytron',
    dateOfBirth: '1987-12-15T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/Ladytron.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7c890fab001100e883fe'),
    followedUsers: [],
    email: 'test34@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'The Knife',
    dateOfBirth: '1987-12-15T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/The-Knife.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7de75b5a8504fcd33a61'),
    followedUsers: [],
    email: 'test36@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Adult',
    dateOfBirth: '1987-12-15T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/Adult.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7e245b5a8504fcd33a62'),
    followedUsers: [],
    email: 'test37@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Light Asylum',
    dateOfBirth: '1997-12-15T00:00:00.000+00:00',
    gender: 'male',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl:
      'https://zasymphonia.ddns.net/api/v1/images/users/Light-Asylum.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7e585b5a8504fcd33a63'),
    followedUsers: [],
    email: 'test38@test.com',
    password: '$2b$12$GDzaxr1IqINkhDi7v67F3OLfD..QeYS7PUsLkIxUg8O4NO8lkP0cS',
    name: 'Fever Ray',
    dateOfBirth: '1997-12-15T00:00:00.000+00:00',
    gender: 'female',
    type: 'artist',
    queue: {
      devices: [
        {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d'),
          devicesName: 'chrome'
        }
      ],
      repeat: false,
      repeatOnce: false,
      shuffle: false
    },
    ownedPlaylists: [],
    imageUrl: 'https://zasymphonia.ddns.net/api/v1/images/users/Fever-Ray.jpg',
    followedAlbums: []
  }
];

module.exports = users;
