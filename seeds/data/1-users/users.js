const mongoose = require('mongoose');
const bio = `Eu excepteur velit cillum dolor enim amet dolore magna. Voluptate 
enim ipsum pariatur est ut proident reprehenderit non et aliquip magna est velit. 
Consectetur in enim nostrud labore nulla veniam laborum eiusmod quis ex aliqua nisi dolor.
Aliquip Lorem dolore nulla Lorem exercitation ad tempor cillum consectetur. 
Ad cillum occaecat aliqua amet pariatur.`;
const users = [
  {
    _id: mongoose.Types.ObjectId('5e8125dc54660672fd69987f'),
    followedUsers: [
      mongoose.Types.ObjectId('5e84b966681ae439edfc1d6f'),
      mongoose.Types.ObjectId('5e82a48054660672fd699883'),
      mongoose.Types.ObjectId('5e812a3454660672fd699880')
    ],
    email: 'generalmohamed1999@gmail.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Muhammad Ahmad Hesham',
    dateOfBirth: new Date('1999-05-12T00:00:00.000+00:00'),
    gender: 'male',
    type: 'user',
    premium: false,
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
    followedTracks: [mongoose.Types.ObjectId('5e7d2dc03429e24340ff1396')],
    ownedPlaylists: [
      mongoose.Types.ObjectId('5e7969965146d92e98ac3ef7'),
      mongoose.Types.ObjectId('5e7ac3c7d43a2c49909c549c'),
      mongoose.Types.ObjectId('5e805a8a3711912168602afa'),
      mongoose.Types.ObjectId('5e875c15ba6ebe663fdbb2c1')
    ],
    googleId: 'googleId',
    imageGoogleUrl:
      'https://lh3.googleusercontent.com/a-/AOh14Gga4UgHOVM-hgdnV5Sv8OusgKzhsfmiYv5wEgSwxA',
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/default.png',
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
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'user1',
    dateOfBirth: new Date('1999-06-25T00:00:00.000+00:00'),
    gender: 'female',
    type: 'user',
    premium: false,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/default.png',
    followedAlbums: [mongoose.Types.ObjectId('5e794163c01c024ecc3c31d3')]
  },
  {
    _id: mongoose.Types.ObjectId('5e812db054660672fd699881'),
    followedUsers: [],
    email: 'test2@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'user2',
    dateOfBirth: new Date('1986-06-25T00:00:00.000+00:00'),
    gender: 'male',
    type: 'user',
    premium: false,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/default.png',
    followedAlbums: [
      mongoose.Types.ObjectId('5e89f33375bcc40cc4b5a736'),
      mongoose.Types.ObjectId('5e701fdf2672a63a60573a06')
    ]
  },

  {
    _id: mongoose.Types.ObjectId('5e8137aa54660672fd699882'),
    followedUsers: [],
    email: 'test3@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Tame Impala',
    dateOfBirth: new Date('1978-06-25T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
    tracks: [
      mongoose.Types.ObjectId('5e7d2dc03429e24340ff1396'),
      mongoose.Types.ObjectId('5e7d2ddd3429e24340ff1397'),
      mongoose.Types.ObjectId('5e7d2e023429e24340ff1398')
    ],
    imageUrl:
      'https://thesymphonia.ddns.net/api/v1/images/users/Tame-Impala.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e82a48054660672fd699883'),
    followedUsers: [],
    email: 'test4@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Interpol',
    dateOfBirth: new Date('1979-12-25T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
    tracks: [
      mongoose.Types.ObjectId('5e7d334860cd930408a5f995'),
      mongoose.Types.ObjectId('5e8a1e0f7937ec4d40c6deba'),
      mongoose.Types.ObjectId('5e8a1e727937ec4d40c6debb')
    ],
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/Interpol.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e84b966681ae439edfc1d6f'),
    followedUsers: [],
    email: 'test5@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Minuit Machine',
    dateOfBirth: new Date('1995-06-25T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
    tracks: [
      mongoose.Types.ObjectId('5e8a1e767937ec4d40c6debc'),
      mongoose.Types.ObjectId('5e8a1e937937ec4d40c6debd'),
      mongoose.Types.ObjectId('5e8a1e727937ec4d40c6debb')
    ],
    imageUrl:
      'https://thesymphonia.ddns.net/api/v1/images/users/Minuit-Machine.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8b6d866253cb184eaac150'),
    followedUsers: [],
    email: 'test6@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'TR/ST',
    dateOfBirth: new Date('1985-12-05T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/tr-st.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8b6c246253cb184eaac14f'),
    followedUsers: [],
    email: 'test7@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Mohamed Alaa',
    dateOfBirth: new Date('1999-09-09T00:00:00.000+00:00'),
    gender: 'male',
    type: 'user',
    premium: true,
    queue: {
      queueTracks: [
        'https://thesymphonia.ddns.net/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
        'https://thesymphonia.ddns.net/api/v1/me/player/tracks/5e7d2ddd3429e24340ff1397',
        'https://thesymphonia.ddns.net/api/v1/me/player/tracks/5e7d2e023429e24340ff1398'
      ],
      currentlyPlaying: {
        currentTrack:
          'https://thesymphonia.ddns.net/api/v1/me/player/tracks/5e7d2ddd3429e24340ff1397',
        device: {
          _id: mongoose.Types.ObjectId('5e8ba7b243427f32bcb6e75d')
        }
      },
      previousTrack:
        'https://thesymphonia.ddns.net/api/v1/me/player/tracks/5e7d2dc03429e24340ff1396',
      nextTrack:
        'https://thesymphonia.ddns.net/api/v1/me/player/tracks/5e7d2e023429e24340ff1398',
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/default.png',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c73d82a0e4614b88a4ed0'),
    followedUsers: [],
    email: 'test8@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Austra',
    dateOfBirth: new Date('1980-09-09T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/Austra.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7572e37ac11ac4f01356'),
    followedUsers: [],
    email: 'test9@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Boy Harsher',
    dateOfBirth: new Date('1988-05-09T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Boy-Harsher.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c75c4e37ac11ac4f01357'),
    followedUsers: [],
    email: 'test10@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Chairlift',
    dateOfBirth: new Date('1987-05-10T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/Chairlift.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7612e37ac11ac4f01358'),
    followedUsers: [],
    email: 'test11@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Cigarettes After Sex',
    dateOfBirth: new Date('1997-05-16T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Cigarettes-After-Sex.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7669e37ac11ac4f01359'),
    followedUsers: [],
    email: 'test12@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Clario',
    dateOfBirth: new Date('1997-05-16T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/Clario.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c769ce37ac11ac4f0135a'),
    followedUsers: [],
    email: 'test13@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Crystal Castles',
    dateOfBirth: new Date('1997-05-16T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Crystal-Castles.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c76d5e37ac11ac4f0135b'),
    followedUsers: [],
    email: 'test14@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Current Joys',
    dateOfBirth: new Date('1987-07-16T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Current-Joys.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c770de37ac11ac4f0135c'),
    followedUsers: [],
    email: 'test15@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Drab Majesty',
    dateOfBirth: new Date('1987-07-16T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Drab-Majesty.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7746e37ac11ac4f0135d'),
    followedUsers: [],
    email: 'test16@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Frank Ocean',
    dateOfBirth: new Date('1991-07-16T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Frank-Ocean.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7786e37ac11ac4f0135e'),
    followedUsers: [],
    email: 'test17@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Joji',
    dateOfBirth: new Date('1995-07-16T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/Joji.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    followedUsers: [],
    email: 'test18@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Lana Del Rey',
    dateOfBirth: new Date('1985-08-16T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Lana-Del-Rey.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c780ae37ac11ac4f01360'),
    followedUsers: [],
    email: 'test19@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Lebanon Hanover',
    dateOfBirth: new Date('1995-08-16T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Lebanon-Hanover.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7843e37ac11ac4f01361'),
    followedUsers: [],
    email: 'test20@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Lil Peep',
    dateOfBirth: new Date('1998-08-16T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/Lil-Peep.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c787de37ac11ac4f01362'),
    followedUsers: [],
    email: 'test21@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Man Without Country',
    dateOfBirth: new Date('1986-04-11T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Man-Without-Country.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c78c9e37ac11ac4f01363'),
    followedUsers: [],
    email: 'test22@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Men I Trust',
    dateOfBirth: new Date('1991-04-01T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Men-I-Trust.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7914e37ac11ac4f01364'),
    followedUsers: [],
    email: 'test23@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Pastel Ghost',
    dateOfBirth: new Date('1995-04-01T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Pastel-Ghost.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7969e37ac11ac4f01365'),
    followedUsers: [],
    email: 'test24@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Purity Ring',
    dateOfBirth: new Date('1997-04-01T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Purity-Ring.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7994e37ac11ac4f01366'),
    followedUsers: [],
    email: 'test25@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Sleep Party People',
    dateOfBirth: new Date('1989-07-01T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Sleep-Party-People.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c79e6e37ac11ac4f01367'),
    followedUsers: [],
    email: 'test26@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Soap and Skin',
    dateOfBirth: new Date('1981-07-01T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Soap-And-Skin.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7a3ee37ac11ac4f01368'),
    followedUsers: [],
    email: 'test27@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Son Lux',
    dateOfBirth: new Date('1988-07-01T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/Son-Lux.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7a7893ec63187898e826'),
    followedUsers: [],
    email: 'test28@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Vansire',
    dateOfBirth: new Date('1976-12-15T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/Vansire.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7ab693ec63187898e827'),
    followedUsers: [],
    email: 'test29@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Void Vision',
    dateOfBirth: new Date('1976-12-15T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Void-Vision.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7aee93ec63187898e828'),
    followedUsers: [],
    email: 'test30@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Washed Out',
    dateOfBirth: new Date('1978-12-15T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Washed-Out.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7b2293ec63187898e829'),
    followedUsers: [],
    email: 'test31@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'XXXTENTACION',
    dateOfBirth: new Date('1998-12-15T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/XXXTENTACION.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7c030fab001100e883fc'),
    followedUsers: [],
    email: 'test32@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Daft Punk',
    dateOfBirth: new Date('1987-12-15T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/Daft-Punk.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7c540fab001100e883fd'),
    followedUsers: [],
    email: 'test33@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Ladytron',
    dateOfBirth: new Date('1987-12-15T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/Ladytron.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7c890fab001100e883fe'),
    followedUsers: [],
    email: 'test34@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'The Knife',
    dateOfBirth: new Date('1987-12-15T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/The-Knife.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7de75b5a8504fcd33a61'),
    followedUsers: [],
    email: 'test36@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Adult',
    dateOfBirth: new Date('1987-12-15T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/Adult.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7e245b5a8504fcd33a62'),
    followedUsers: [],
    email: 'test37@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Light Asylum',
    dateOfBirth: new Date('1997-12-15T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
      'https://thesymphonia.ddns.net/api/v1/images/users/Light-Asylum.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5e8c7e585b5a8504fcd33a63'),
    followedUsers: [],
    email: 'test38@test.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Fever Ray',
    dateOfBirth: new Date('1997-12-15T00:00:00.000+00:00'),
    gender: 'female',
    type: 'artist',
    premium: true,
    bio,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/Fever-Ray.jpg',
    followedAlbums: []
  },
  {
    _id: mongoose.Types.ObjectId('5ee20ea035912c130718f42a'),
    followedUsers: [],
    email: 'mohsayed27@gmail.com',
    password: '$2b$12$lo0I9FS0ifKqY7rE2ovZHeMxJDAsdoQKKFhCg7aXZNiOhLHrthFxi',
    name: 'Muhammad Sayed',
    dateOfBirth: new Date('1999-12-15T00:00:00.000+00:00'),
    gender: 'male',
    type: 'artist',
    premium: true,
    bio,
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
    imageUrl: 'https://thesymphonia.ddns.net/api/v1/images/users/default.png',
    followedAlbums: []
  }
];

module.exports = users;
