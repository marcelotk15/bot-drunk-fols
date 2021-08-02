import { version } from '../package.json'

require('dotenv').config()

const {
  PRODUCTION,
  BOT_TOKEN,
  BOT_PREFIX
} = process.env

const config = {
  production: PRODUCTION || false,
  mongoDB: '', // The URl of the mongodb database
  token: BOT_TOKEN || '', /* The token of your Discord Bot */
  prefix: BOT_PREFIX || '/', // The default prefix for the bot
  logo: 'https://images.emojiterra.com/twitter/v13.0/512px/1f37b.png',
  autoDeleteModCommands: true,

  /* For the embeds (embeded messages) */
  get embed () {
    return {
      color: '#023e8a', // The default color for the embeds
      footer: `${this.botName} | Sistema feito por ${this.owner.name}`
    }
  },
      
  botName: 'DrunkFols', // The name of the bot
  version, // Version getting in package.json

  /* Bot's owner informations */
  owner: {
    id: '667543310079885343', // The ID of the bot's owner
    name: 'teka#3059' // And the name of the bot's owner
  },
    
  /* The others utils links */
  others: {
    github: '', // Founder's github account
    donate: '' // Donate link
  },
    
  /* The Bot status */
  get status () {
    return [
      {
        name: `@${this.botName} drinking and doing trash jokes on {serversCount} servers`,
        type: 'LISTENING'
      },
      {
        name: 'Drinking a IPA beer. 🍺',
        type: 'PLAYING'
      },
      {
        name: 'Drinking a RIS beer. 🍻',
        type: 'PLAYING'
      },
      {
        name: `Criado por ${this.owner.name}`,
        type: 'PLAYING'
      }
    ]
  },

  emojis: {
    error: '<:error:713596754599346216>', //https://cdn.discordapp.com/emojis/713596754599346216.gif?v=1
    warning: '<:warning:713603800342200320>',
  },

  protectfChannels : [
    '713551121024811019',
    '713801224863875103'
  ],

  joke: {
    thumbnail: [
      'https://thumbs.gfycat.com/MellowWeirdAmericanquarterhorse-max-1mb.gif',
      'https://thumbs.gfycat.com/CaringAdmiredAustralianfreshwatercrocodile-max-1mb.gif',
      'https://thumbs.gfycat.com/BouncyHotFoal-max-1mb.gif',
      'https://thumbs.gfycat.com/SelfreliantPowerlessIrishterrier-max-1mb.gif',
      'https://thumbs.gfycat.com/MadeupDismalBlackmamba-max-1mb.gif',
      'https://thumbs.gfycat.com/ReasonableSmartCatfish-max-1mb.gif'
    ]
  }
}

export default config
