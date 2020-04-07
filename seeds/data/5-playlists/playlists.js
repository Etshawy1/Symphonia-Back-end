const mongoose = require('mongoose');
const playlists = [
  {
    _id: mongoose.Types.ObjectId('5e7969965146d92e98ac3ef7'),
    name: 'Songs to Sing in the Shower',
    owner: mongoose.Types.ObjectId('5e8125dc54660672fd69987f'),
    collaborative: false,
    description: 'My Favorite Public Place to Pretend is My Living Room Mix',
    public: true,
    followers: [],
    images: [
      'http://zasymphonia.ddns.net/api/v1/images/playlists/playlist1.jpg'
    ],
    tracks: [
      mongoose.Types.ObjectId('5e7d2dc03429e24340ff1396'),
      mongoose.Types.ObjectId('5e8a1e767937ec4d40c6debc'),
      mongoose.Types.ObjectId('5e8a1e9a7937ec4d40c6debe')
    ],
    category: mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')
  },
  {
    _id: mongoose.Types.ObjectId('5e7ac3c7d43a2c49909c549c'),
    name: 'Young, Wild and Free',
    owner: mongoose.Types.ObjectId('5e8125dc54660672fd69987f'),
    collaborative: false,
    description: 'Soundtrack to My Whimsical, Quirky Life as an Unpaid Intern',
    public: true,
    followers: [],
    images: [
      'http://zasymphonia.ddns.net/api/v1/images/playlists/playlist2.jpg'
    ],
    tracks: [
      mongoose.Types.ObjectId('5e7d2ddd3429e24340ff1397'),
      mongoose.Types.ObjectId('5e7d2e023429e24340ff1398'),
      mongoose.Types.ObjectId('5e7d334860cd930408a5f995'),
      mongoose.Types.ObjectId('5e8a1e0f7937ec4d40c6deba')
    ],
    category: mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')
  },
  {
    _id: mongoose.Types.ObjectId('5e805a8a3711912168602afa'),
    name: 'Soak Up the Sun',
    owner: mongoose.Types.ObjectId('5e8125dc54660672fd69987f'),
    collaborative: true,
    description:
      'My Parents Pay for my Premium Account, My Rent, and Literally Everything Else',
    public: true,
    followers: [],
    images: [
      'http://zasymphonia.ddns.net/api/v1/images/playlists/playlist3.jpg'
    ],
    tracks: [mongoose.Types.ObjectId('5e8a1ea07937ec4d40c6debf')],
    category: mongoose.Types.ObjectId('5e8076e6a9902a4328cc285c')
  },
  {
    _id: mongoose.Types.ObjectId('5e806865ef653f5a541e0b1d'),
    name: 'The Ultimate Indie Playlist',
    owner: mongoose.Types.ObjectId('5e812a3454660672fd699880'),
    collaborative: true,
    description:
      'My Parents Pay for my Premium Account, My Rent, and Literally Everything Else',
    public: true,
    followers: [],
    images: [
      'http://zasymphonia.ddns.net/api/v1/images/playlists/playlist4.jpg'
    ],
    tracks: [
      mongoose.Types.ObjectId('5e7d334860cd930408a5f995'),
      mongoose.Types.ObjectId('5e8a1e0f7937ec4d40c6deba'),
      mongoose.Types.ObjectId('5e8a1e727937ec4d40c6debb')
    ],
    category: mongoose.Types.ObjectId('5e807517e478cf39b47bd1f0')
  },
  {
    _id: mongoose.Types.ObjectId('5e8069722fcb0d35900c4d64'),
    name: 'At Work',
    owner: mongoose.Types.ObjectId('5e812a3454660672fd699880'),
    collaborative: false,
    description:
      'My Earthly Vessel May Be Trapped in a Windowless, Fluorescent Hellscape but My Soul is Still Pantsless at My Apartment Listening to These Songs',
    public: true,
    followers: [],
    images: [
      'http://zasymphonia.ddns.net/api/v1/images/playlists/playlist5.jpg'
    ],
    tracks: [
      mongoose.Types.ObjectId('5e8a39f24e11cd46c8bde654'),
      mongoose.Types.ObjectId('5e8a37d0d56ea252c3860a1a'),
      mongoose.Types.ObjectId('5e8a1ea07937ec4d40c6debf'),
      mongoose.Types.ObjectId('5e8a1e9a7937ec4d40c6debe')
    ],
    category: mongoose.Types.ObjectId('5e807517e478cf39b47bd1f0')
  },
  {
    _id: mongoose.Types.ObjectId('5e8078b0dbaafc18605cb029'),
    name: 'Power Workout',
    owner: mongoose.Types.ObjectId('5e812a3454660672fd699880'),
    collaborative: false,
    description:
      'Pump Up Jams for Carrying Groceries Up to My Sixth Floor Walk-Up',
    public: true,
    followers: [],
    images: [
      'http://zasymphonia.ddns.net/api/v1/images/playlists/playlist6.jpg'
    ],
    tracks: [
      mongoose.Types.ObjectId('5e8a39f24e11cd46c8bde654'),
      mongoose.Types.ObjectId('5e8a37d0d56ea252c3860a1a'),
      mongoose.Types.ObjectId('5e8a1ea07937ec4d40c6debf'),
      mongoose.Types.ObjectId('5e8a1e9a7937ec4d40c6debe'),
      mongoose.Types.ObjectId('5e8a1e937937ec4d40c6debd'),
      mongoose.Types.ObjectId('5e8a1e767937ec4d40c6debc')
    ],
    category: mongoose.Types.ObjectId('5e8076e6a9902a4328cc285c')
  },
  {
    _id: mongoose.Types.ObjectId('5e8088fa79844f135496ec7f'),
    name: 'Breakup Songs',
    owner: mongoose.Types.ObjectId('5e812db054660672fd699881'),
    collaborative: false,
    description:
      'I Have Terrible News for You and I’ll Tell You What Right After This 30 Second Ad for Sam Adams Summer Ale Ends and The Cure Starts Playing',
    public: true,
    followers: [],
    images: [
      'http://zasymphonia.ddns.net/api/v1/images/playlists/playlist7.jpg'
    ],
    tracks: [
      mongoose.Types.ObjectId('5e8a1e767937ec4d40c6debc'),
      mongoose.Types.ObjectId('5e8a1e937937ec4d40c6debd'),
      mongoose.Types.ObjectId('5e8a1e9a7937ec4d40c6debe')
    ],
    category: mongoose.Types.ObjectId('5e8076e6a9902a4328cc285c')
  },
  {
    _id: mongoose.Types.ObjectId('5e875b1cba6ebe663fdbb2bc'),
    name: 'For Those About to Rock',
    owner: mongoose.Types.ObjectId('5e812db054660672fd699881'),
    collaborative: false,
    description:
      'For Those About to Try to Relate to Their Teenagers... Good Luck',
    public: true,
    followers: [],
    images: [
      'http://zasymphonia.ddns.net/api/v1/images/playlists/playlist8.jpg'
    ],
    tracks: [
      mongoose.Types.ObjectId('5e7d2dc03429e24340ff1396'),
      mongoose.Types.ObjectId('5e7d2ddd3429e24340ff1397'),
      mongoose.Types.ObjectId('5e7d2e023429e24340ff1398')
    ],
    category: mongoose.Types.ObjectId('5e8072e5e478cf39b47bd1ef')
  },
  {
    _id: mongoose.Types.ObjectId('5e875bd6ba6ebe663fdbb2c0'),
    name: 'Songs for Coping with Loss',
    owner: mongoose.Types.ObjectId('5e812db054660672fd699881'),
    collaborative: false,
    description:
      'Songs for Coping with the Loss of My Debit Card, My Mailbox Key, and My Bike, Which I Tipsily Locked up Somewhere Two Weeks Ago',
    public: true,
    followers: [],
    images: [
      'http://zasymphonia.ddns.net/api/v1/images/playlists/playlist9.jpg'
    ],
    tracks: [mongoose.Types.ObjectId('5e8a39f24e11cd46c8bde654')],
    category: mongoose.Types.ObjectId('5e883e48c808fd1aa40ad1f8')
  },
  {
    _id: mongoose.Types.ObjectId('5e875c15ba6ebe663fdbb2c1'),
    name: 'All the Feels',
    owner: mongoose.Types.ObjectId('5e8125dc54660672fd69987f'),
    collaborative: false,
    description:
      'I Just Double Texted and Now I Totally Get What Joan Didion Went Through',
    public: true,
    followers: [],
    images: [
      'http://zasymphonia.ddns.net/api/v1/images/playlists/playlist10.jpg'
    ],
    tracks: [
      mongoose.Types.ObjectId('5e8a39f24e11cd46c8bde654'),
      mongoose.Types.ObjectId('5e8a37d0d56ea252c3860a1a'),
      mongoose.Types.ObjectId('5e8a1ea07937ec4d40c6debf'),
      mongoose.Types.ObjectId('5e8a1e9a7937ec4d40c6debe'),
      mongoose.Types.ObjectId('5e8a1e937937ec4d40c6debd'),
      mongoose.Types.ObjectId('5e8a1e767937ec4d40c6debc'),
      mongoose.Types.ObjectId('5e8a1e727937ec4d40c6debb')
    ],
    category: mongoose.Types.ObjectId('5e8072e5e478cf39b47bd1ef')
  },
  {
    _id: mongoose.Types.ObjectId('5e8828df838d9835d207016d'),
    name: 'The Writer’s Playlist',
    owner: mongoose.Types.ObjectId('5e812a3454660672fd699880'),
    collaborative: false,
    description:
      'I Spent All Day Writing a Bad Review for My Uber Driver Who Wouldn’t Let Me DJ My Trip with These Songs',
    public: true,
    followers: [],
    images: [
      'http://zasymphonia.ddns.net/api/v1/images/playlists/playlist11.jpg'
    ],
    tracks: [
      mongoose.Types.ObjectId('5e8a1e9a7937ec4d40c6debe'),
      mongoose.Types.ObjectId('5e8a39f24e11cd46c8bde654'),
      mongoose.Types.ObjectId('5e8a1e767937ec4d40c6debc'),
      mongoose.Types.ObjectId('5e8a1ea07937ec4d40c6debf'),
      mongoose.Types.ObjectId('5e8a1e937937ec4d40c6debd'),
      mongoose.Types.ObjectId('5e8a1e727937ec4d40c6debb'),
      mongoose.Types.ObjectId('5e8a37d0d56ea252c3860a1a')
    ],
    category: mongoose.Types.ObjectId('5e8072e5e478cf39b47bd1ef')
  },
  {
    _id: mongoose.Types.ObjectId('5e882913838d9835d207016e'),
    name: 'Top Party Jams',
    owner: mongoose.Types.ObjectId('5e812db054660672fd699881'),
    collaborative: false,
    description:
      'Songs I Put on to Look “With It” When I’d Rather Be Listening to Yanni on a Windy Moor',
    public: true,
    followers: [],
    images: [
      'http://zasymphonia.ddns.net/api/v1/images/playlists/playlist12.jpg'
    ],
    tracks: [
      mongoose.Types.ObjectId('5e8a1e727937ec4d40c6debb'),
      mongoose.Types.ObjectId('5e8a37d0d56ea252c3860a1a')
    ],
    category: mongoose.Types.ObjectId('5e8072e5e478cf39b47bd1ef')
  }
];

module.exports = playlists;
