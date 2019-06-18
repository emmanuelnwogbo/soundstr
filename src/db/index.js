const artists = [
  {
    id: '1',
    artist_name: 'Purity Ring',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557464483/10_Stillness_in_Woe_lbp6me.mp3',
    artist_songname: 'Stillness in Woe',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692816/3b49799c2592f48ad4477d4baefb2101.1000x1000x1_wgs2ok.jpg'
  },
  {
    id: '2',
    artist_name: 'Red',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557464863/11.Gravity_Lies_qedq0x.mp3',
    artist_songname: 'Gravity Lies',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692813/88f7eee607b3d65200cdf110509def37_gyuyj1.jpg'
  },
  {
    id: '3', 
    artist_name: 'Metric',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557463736/03_Speed_the_Collapse_ye7wze.mp3',
    artist_songname: 'Speed the Collapse',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692947/Metric_Cover_low_kxhpyz.jpg'
  },
  {
    id: '4',
    artist_name: 'David Guetta ft Sia',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557463115/David_Guetta_ft_Sia-shewolf_p1mous.mp3',
    artist_songname: 'She Wolf',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692921/sia___this_is_acting__cover_album__2015_by_jeanbox77_d9ahnd6-pre_dz0eqm.jpg'
  },
  {
    id: '5',
    artist_name: 'Phantogram',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557464302/09_Destroyer_haksfb.mp3',
    artist_songname: 'Destroyer',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692907/Voices_album_cover_l92n8i.jpg'
  },
  {
    id: '6',
    artist_name: 'Aurora',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557463730/03_Running_With_The_Wolves_hmjk4c.mp3',
    artist_songname: 'Running with the Wolves',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692862/ec6fc3578baad541720f3a31387a0e27_qqo3za.jpg'
  },
  {
    id: '7',
    artist_name: 'Lorde',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557464853/04._The_Louvre_zz43b5.mp3',
    artist_songname: 'The Louvre',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692854/lorde-melodrama-album-review_tsmzbc.jpg'
  },
  {
    id: '8',
    artist_name: 'Vaults',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557464396/Vaults_Premonitions_YG_gezpuv.mp3',
    artist_songname: 'Premonitions',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692836/images_vrovzs.jpg'
  },
  {
    id: '9',
    artist_name: 'Florence and the Machine',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557465784/10._St_Jude_juar10.mp3',
    artist_songname: 'St Jude',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692836/download_unj7gt.jpg'
  },
  {
    id: '10',
    artist_name: 'Of Monsters and Men',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557464591/09.Thousand.Eyes-TDG_b7ejzq.mp3',
    artist_songname: 'Thousand Eyes',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692911/R-7180278-1509366768-5931.jpeg_gaianf.jpg'
  },
  {
    id: '11',
    artist_name: 'The Devil Wears Prada',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1544966929/08_-_To_The_Key_Of_Evergreen_l1awib.mp3',
    artist_songname: 'To the Key of Evergreen',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557695756/300x300_qtfsnc.jpg'
  },
  {
    id: '12',
    artist_name: 'Periphery',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557464307/11._Lune_hgrqzb.mp3',
    artist_songname: 'Lune',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692858/Periphery_usybti.jpg'
  },
  {
    id: '13',
    artist_name: 'Sent By Ravens',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557464286/01_-_New_Fire_vsjeoa.mp3',
    artist_songname: 'A new Fire',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692876/f107051919c74821b2b61383e5374b93_pn3ia8.png'
  },
  {
    id: '14',
    artist_name: 'Wolves at the Gate',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557696663/02_-_Understanding_in_a_Car_Crash_Thursday_Cover_kvgrpg.mp3',
    artist_songname: 'Understanding in a Car Crash',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692826/Captors_zysjl7.jpg'
  },
  {
    id: '15',
    artist_name: 'Of Monsters and Men',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557464303/02._King_And_Lionheart_mus8fr.mp3',
    artist_songname: 'King and Lionheart',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692926/song-cover-symbolsartboard-4_rrh9yn.png'
  },
  {
    id: '16',
    artist_name: 'Lana del Ray',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1544835080/Radio_nbyrkb.mp3',
    artist_songname: 'Radio',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1545772572/images_zjglmv.jpg'
  },
  {
    id: '17',
    artist_name: 'Keiichi Okabe',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557464217/A_Beautiful_Song_mpxy6c.mp3',
    artist_songname: 'A Beautiful Song',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692907/SQEX-10589_acy0fg.jpg'
  },
  {
    id: '18',
    artist_name: 'Fleetwood Mac',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1557463652/04_The_Chain_ytr88q.m4a',
    artist_songname: 'The Chain',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1557692894/1200x1200bb_yjhrk6.jpg'
  },
  {
    id: '19',
    artist_name: 'Make Them Suffer',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1544966604/04_Elegies_ybj9hf.mp3',
    artist_songname: 'Elegies',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1545772389/flyer_image-default-1_kyu7lq.jpg'
  },
  {
    id: '20',
    artist_name: 'The Neighbourhood',
    artist_songlink: 'https://res.cloudinary.com/dxlhzerlq/video/upload/q_auto:low/v1544966384/04._Sweater_Weather_vyxeay.mp3',
    artist_songname: 'Sweater Weather',
    artist_albumart_link: 'https://res.cloudinary.com/dxlhzerlq/image/upload/q_auto:low/v1545772412/the-neighbourhood_jlhqbm.jpg'
  }
];

export default artists;