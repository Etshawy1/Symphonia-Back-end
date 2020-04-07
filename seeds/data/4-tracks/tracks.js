const mongoose = require('mongoose');
const tracks = [
  {
    _id: mongoose.Types.ObjectId('5e7d2dc03429e24340ff1396'),
    category: [mongoose.Types.ObjectId('5e8072e5e478cf39b47bd1ef')],
    album: mongoose.Types.ObjectId('5e701fdf2672a63a60573a06'),
    name: 'Instant Destiny',
    durationMs: 30000,
    artist: mongoose.Types.ObjectId('5e8137aa54660672fd699882'),
    trackPath: 'assets/tracks/Instant-Destiny.mp3',
    explicit: false,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e7d2ddd3429e24340ff1397'),
    category: [mongoose.Types.ObjectId('5e8072e5e478cf39b47bd1ef')],
    album: mongoose.Types.ObjectId('5e701fdf2672a63a60573a06'),
    name: 'Borderline',
    durationMs: 30000,
    artist: mongoose.Types.ObjectId('5e8137aa54660672fd699882'),
    trackPath: 'assets/tracks/Borderline.mp3',
    explicit: false,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e7d2e023429e24340ff1398'),
    category: [mongoose.Types.ObjectId('5e8072e5e478cf39b47bd1ef')],
    album: mongoose.Types.ObjectId('5e701fdf2672a63a60573a06'),
    name: 'Posthumous Forgiveness',
    durationMs: 30000,
    artist: mongoose.Types.ObjectId('5e8137aa54660672fd699882'),
    trackPath: 'assets/tracks/Posthumous-Forgiveness.mp3',
    explicit: false,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e7d334860cd930408a5f995'),
    category: [mongoose.Types.ObjectId('5e807517e478cf39b47bd1f0')],
    album: mongoose.Types.ObjectId('5e701f4d2672a63a60573a02'),
    name: 'Everything Is Wrong',
    durationMs: 30000,
    artist: mongoose.Types.ObjectId('5e82a48054660672fd699883'),
    trackPath: 'assets/tracks/Everything-Is-Wrong.mp3',
    explicit: false,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a1e0f7937ec4d40c6deba'),
    category: [mongoose.Types.ObjectId('5e807517e478cf39b47bd1f0')],
    album: mongoose.Types.ObjectId('5e701f4d2672a63a60573a02'),
    name: 'My Desire',
    durationMs: 30000,
    artist: mongoose.Types.ObjectId('5e82a48054660672fd699883'),
    trackPath: 'assets/tracks/My-Desire.mp3',
    explicit: false,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a1e727937ec4d40c6debb'),
    category: [mongoose.Types.ObjectId('5e807517e478cf39b47bd1f0')],
    album: mongoose.Types.ObjectId('5e701f4d2672a63a60573a02'),
    name: 'All The Rage Back Home',
    durationMs: 30000,
    artist: mongoose.Types.ObjectId('5e82a48054660672fd699883'),
    trackPath: 'assets/tracks/All-The-Rage-Back-Home.mp3',
    explicit: false,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a1e767937ec4d40c6debc'),
    category: [mongoose.Types.ObjectId('5e8076e6a9902a4328cc285c')],
    album: mongoose.Types.ObjectId('5e794163c01c024ecc3c31d3'),
    name: 'Honey',
    durationMs: 35000,
    artist: mongoose.Types.ObjectId('5e84b966681ae439edfc1d6f'),
    trackPath: 'assets/tracks/Honey.mp3',
    explicit: true,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a1e937937ec4d40c6debd'),
    category: [mongoose.Types.ObjectId('5e8076e6a9902a4328cc285c')],
    album: mongoose.Types.ObjectId('5e794163c01c024ecc3c31d3'),
    name: 'BATTLES',
    durationMs: 30000,
    artist: mongoose.Types.ObjectId('5e84b966681ae439edfc1d6f'),
    trackPath: 'assets/tracks/BATTLES.mp3',
    explicit: true,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a1e9a7937ec4d40c6debe'),
    category: [mongoose.Types.ObjectId('5e8076e6a9902a4328cc285c')],
    album: mongoose.Types.ObjectId('5e794163c01c024ecc3c31d3'),
    name: 'Black is my anger',
    durationMs: 31000,
    artist: mongoose.Types.ObjectId('5e84b966681ae439edfc1d6f'),
    trackPath: 'assets/tracks/Black-is-my-anger.mp3',
    explicit: true,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a1ea07937ec4d40c6debf'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    album: mongoose.Types.ObjectId('5e89f33375bcc40cc4b5a736'),
    name: 'Bulbform',
    durationMs: 30000,
    artist: mongoose.Types.ObjectId('5e8b6d866253cb184eaac150'),
    trackPath: 'assets/tracks/Bulbform.mp3',
    explicit: true,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a37d0d56ea252c3860a1a'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    album: mongoose.Types.ObjectId('5e89f33375bcc40cc4b5a736'),
    name: 'Dressed For Space',
    durationMs: 30000,
    artist: mongoose.Types.ObjectId('5e8b6d866253cb184eaac150'),
    trackPath: 'assets/tracks/Dressed-For-Space.mp3',
    explicit: true,
    type: 'track'
  },
  {
    _id: mongoose.Types.ObjectId('5e8a39f24e11cd46c8bde654'),
    category: [mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')],
    album: mongoose.Types.ObjectId('5e89f33375bcc40cc4b5a736'),
    name: 'Sulk',
    durationMs: 30000,
    artist: mongoose.Types.ObjectId('5e8b6d866253cb184eaac150'),
    trackPath: 'assets/tracks/Sulk.mp3',
    explicit: true,
    type: 'track'
  }
];

module.exports = tracks;
