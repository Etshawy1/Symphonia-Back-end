const mongoose = require('mongoose');
const tracks = [
  {
    _id: mongoose.Types.ObjectId('5e7d2dc03429e24340ff1396'),
    category: [mongoose.Types.ObjectId('5e8072e5e478cf39b47bd1ef')],
    album: mongoose.Types.ObjectId('5e701fdf2672a63a60573a06'),
    name: 'Instant Destiny',
    durationMs: 193000,
    artist: mongoose.Types.ObjectId('5e8137aa54660672fd699882'),
    trackPath: 'assets/tracks/Instant-Destiny.mp3',
    explicit: false,
    premium: false,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e7d2ddd3429e24340ff1397'),
    category: [mongoose.Types.ObjectId('5e8072e5e478cf39b47bd1ef')],
    album: mongoose.Types.ObjectId('5e701fdf2672a63a60573a06'),
    name: 'Borderline',
    durationMs: 237000,
    artist: mongoose.Types.ObjectId('5e8137aa54660672fd699882'),
    trackPath: 'assets/tracks/Borderline.mp3',
    explicit: false,
    premium: false,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e7d2e023429e24340ff1398'),
    category: [mongoose.Types.ObjectId('5e8072e5e478cf39b47bd1ef')],
    album: mongoose.Types.ObjectId('5e701fdf2672a63a60573a06'),
    name: 'Posthumous Forgiveness',
    durationMs: 366000,
    artist: mongoose.Types.ObjectId('5e8137aa54660672fd699882'),
    trackPath: 'assets/tracks/Posthumous-Forgiveness.mp3',
    explicit: false,
    premium: true,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e7d334860cd930408a5f995'),
    category: [mongoose.Types.ObjectId('5e807517e478cf39b47bd1f0')],
    album: mongoose.Types.ObjectId('5e701f4d2672a63a60573a02'),
    name: 'Everything Is Wrong',
    durationMs: 222000,
    artist: mongoose.Types.ObjectId('5e82a48054660672fd699883'),
    trackPath: 'assets/tracks/Everything-Is-Wrong.mp3',
    explicit: false,
    premium: false,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a1e0f7937ec4d40c6deba'),
    category: [mongoose.Types.ObjectId('5e807517e478cf39b47bd1f0')],
    album: mongoose.Types.ObjectId('5e701f4d2672a63a60573a02'),
    name: 'My Desire',
    durationMs: 252000,
    artist: mongoose.Types.ObjectId('5e82a48054660672fd699883'),
    trackPath: 'assets/tracks/My-Desire.mp3',
    explicit: false,
    premium: true,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a1e727937ec4d40c6debb'),
    category: [mongoose.Types.ObjectId('5e807517e478cf39b47bd1f0')],
    album: mongoose.Types.ObjectId('5e701f4d2672a63a60573a02'),
    name: 'All The Rage Back Home',
    durationMs: 263000,
    artist: mongoose.Types.ObjectId('5e82a48054660672fd699883'),
    trackPath: 'assets/tracks/All-The-Rage-Back-Home.mp3',
    explicit: false,
    premium: false,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a1e767937ec4d40c6debc'),
    category: [mongoose.Types.ObjectId('5e8076e6a9902a4328cc285c')],
    album: mongoose.Types.ObjectId('5e794163c01c024ecc3c31d3'),
    name: 'Honey',
    durationMs: 213000,
    artist: mongoose.Types.ObjectId('5e84b966681ae439edfc1d6f'),
    trackPath: 'assets/tracks/Honey.mp3',
    explicit: true,
    premium: true,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a1e937937ec4d40c6debd'),
    category: [mongoose.Types.ObjectId('5e8076e6a9902a4328cc285c')],
    album: mongoose.Types.ObjectId('5e794163c01c024ecc3c31d3'),
    name: 'BATTLES',
    durationMs: 234000,
    artist: mongoose.Types.ObjectId('5e84b966681ae439edfc1d6f'),
    trackPath: 'assets/tracks/BATTLES.mp3',
    explicit: true,
    premium: false,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a1e9a7937ec4d40c6debe'),
    category: [mongoose.Types.ObjectId('5e8076e6a9902a4328cc285c')],
    album: mongoose.Types.ObjectId('5e794163c01c024ecc3c31d3'),
    name: 'Black is my anger',
    durationMs: 264000,
    artist: mongoose.Types.ObjectId('5e84b966681ae439edfc1d6f'),
    trackPath: 'assets/tracks/Black-is-my-anger.mp3',
    explicit: true,
    premium: false,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a1ea07937ec4d40c6debf'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    album: mongoose.Types.ObjectId('5e89f33375bcc40cc4b5a736'),
    name: 'Bulbform',
    durationMs: 314000,
    artist: mongoose.Types.ObjectId('5e8b6d866253cb184eaac150'),
    trackPath: 'assets/tracks/Bulbform.mp3',
    explicit: true,
    premium: false,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a37d0d56ea252c3860a1a'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    album: mongoose.Types.ObjectId('5e89f33375bcc40cc4b5a736'),
    name: 'Dressed For Space',
    durationMs: 217000,
    artist: mongoose.Types.ObjectId('5e8b6d866253cb184eaac150'),
    trackPath: 'assets/tracks/Dressed-For-Space.mp3',
    explicit: true,
    premium: false,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a39f24e11cd46c8bde654'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    album: mongoose.Types.ObjectId('5e89f33375bcc40cc4b5a736'),
    name: 'Sulk',
    durationMs: 377000,
    artist: mongoose.Types.ObjectId('5e8b6d866253cb184eaac150'),
    trackPath: 'assets/tracks/Sulk.mp3',
    explicit: true,
    premium: true,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf60d72aa9b365682e4746'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    explicit: false,
    name: 'Off To The Races',
    album: mongoose.Types.ObjectId('5edf5a442aa9b365682e46f9'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/55bd706917f2172050f3-1591697623870.mp3',
    durationMs: 30067,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf60e82aa9b365682e4747'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    explicit: false,
    name: 'Carmen',
    album: mongoose.Types.ObjectId('5edf5a442aa9b365682e46f9'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/23b8f7ca3cbde2c3adc4-1591697640818.mp3',
    durationMs: 30067,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf60f62aa9b365682e474c'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    explicit: false,
    name: 'Radio',
    album: mongoose.Types.ObjectId('5edf5a442aa9b365682e46f9'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/765f19af9d8e5dd1eaf5-1591697654949.mp3',
    durationMs: 30067,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf5fe72aa9b365682e4729'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    explicit: false,
    name: 'Love',
    album: mongoose.Types.ObjectId('5edf5b112aa9b365682e4704'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/c723d86c56c3cb2d06f3-1591697383954.mp3',
    durationMs: 30067,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf5ffe2aa9b365682e472a'),
    category: [
      mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8'),
      mongoose.Types.ObjectId('5e807517e478cf39b47bd1f0'),
      mongoose.Types.ObjectId('5e8076e6a9902a4328cc285c')
    ],
    explicit: true,
    name: 'Groupie Love',
    album: mongoose.Types.ObjectId('5edf5b112aa9b365682e4704'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/dd9f36ef9ca08a561219-1591697405996.mp3',
    durationMs: 30067,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf60102aa9b365682e4731'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    explicit: false,
    name: 'Tomorrow Never Came',
    album: mongoose.Types.ObjectId('5edf5b112aa9b365682e4704'),
    premium: true,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/e306f75bc31c2f4b20ff-1591697424980.mp3',
    durationMs: 29568,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf602d2aa9b365682e473a'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    explicit: false,
    name: 'Yayo',
    album: mongoose.Types.ObjectId('5edf5b742aa9b365682e4705'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/ba2cafc6d1bf3133f86b-1591697453700.mp3',
    durationMs: 30067,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf603f2aa9b365682e473b'),
    category: [
      mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8'),
      mongoose.Types.ObjectId('5e807517e478cf39b47bd1f0')
    ],
    explicit: false,
    name: 'Blue Velvet',
    album: mongoose.Types.ObjectId('5edf5b742aa9b365682e4705'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/37639b565cc755f96b89-1591697471363.mp3',
    durationMs: 30067,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf60582aa9b365682e473c'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    explicit: true,
    name: 'Ride',
    album: mongoose.Types.ObjectId('5edf5b742aa9b365682e4705'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/32baa5efb857b982b2e0-1591697496557.mp3',
    durationMs: 30067,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf5f952aa9b365682e4726'),
    category: [
      mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8'),
      mongoose.Types.ObjectId('5e8072e5e478cf39b47bd1ef')
    ],
    explicit: false,
    name: 'High By The Beach',
    album: mongoose.Types.ObjectId('5edf5bb92aa9b365682e4706'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/de4546bb6f4ddfcc4f9a-1591697301436.mp3',
    durationMs: 30067,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf5fac2aa9b365682e4727'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    explicit: false,
    name: 'Art Deco',
    album: mongoose.Types.ObjectId('5edf5bb92aa9b365682e4706'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/74457a267605d3ec252d-1591697324618.mp3',
    durationMs: 30067,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf5fbc2aa9b365682e4728'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    explicit: false,
    name: 'Salvatore',
    album: mongoose.Types.ObjectId('5edf5bb92aa9b365682e4706'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/c30eded8853a65ae7db0-1591697340503.mp3',
    durationMs: 20715,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf608c2aa9b365682e473d'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    explicit: false,
    name: 'The Other Woman',
    album: mongoose.Types.ObjectId('5edf5bfb2aa9b365682e4707'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/9ed965b70a7b50d702e8-1591697548379.mp3',
    durationMs: 30067,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf609d2aa9b365682e473e'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    explicit: false,
    name: 'Guns And Roses',
    album: mongoose.Types.ObjectId('5edf5bfb2aa9b365682e4707'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/5ed24482f72817c66a77-1591697565106.mp3',
    durationMs: 29568,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf60b52aa9b365682e4741'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    explicit: false,
    name: 'Florida Kilos',
    album: mongoose.Types.ObjectId('5edf5bfb2aa9b365682e4707'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/dae0dcbd12e68980ae1b-1591697589669.mp3',
    durationMs: 30067,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf62882aa9b365682e4769'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    explicit: false,
    name: 'Blue Velvet',
    album: mongoose.Types.ObjectId('5edf62692aa9b365682e4760'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/07241e1bf092758ade48-1591698056236.mp3',
    durationMs: 28440,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf63922aa9b365682e4777'),
    category: [
      mongoose.Types.ObjectId('5e807517e478cf39b47bd1f0'),
      mongoose.Types.ObjectId('5e8076e6a9902a4328cc285c')
    ],
    explicit: false,
    name: 'Dark Paradise',
    album: mongoose.Types.ObjectId('5edf63122aa9b365682e4776'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/4504773ce87d9514f517-1591698322152.mp3',
    durationMs: 32832,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5edf666d2aa9b365682e4784'),
    category: [
      mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8'),
      mongoose.Types.ObjectId('5e807517e478cf39b47bd1f0')
    ],
    explicit: false,
    name: 'Brooklyn Baby',
    album: mongoose.Types.ObjectId('5edf63f22aa9b365682e477c'),
    premium: false,
    trackPath:
      'assets/tracks/5e8c77c1e37ac11ac4f0135f/bf7946e7b39d818f0dcf-1591699053878.mp3',
    durationMs: 27141,
    artist: mongoose.Types.ObjectId('5e8c77c1e37ac11ac4f0135f'),
    type: 'track'
  }
];

module.exports = tracks;
