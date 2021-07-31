import { version } from '../package.json'

const config = {
  production: true,
  token: '', /* The token of your Discord Bot */
  mongoDB: '', // The URl of the mongodb database
  prefix: '/beer', // The default prefix for the bot
  logo: 'https://i.imgur.com/TlSWaAA.png',
  autoDeleteModCommands: true,

  /* For the embeds (embeded messages) */
  get embed () {
    return {
      color: '#ccad73', // The default color for the embeds
      footer: `${this.botName} | Sistema feito por ${this.owner.name}`
    }
  },
      
  botName: 'DrunkFols', // The name of the bot
  version, // Version getting in package.json

  /* Bot's creator informations */
  owner: {
    id: '667543310079885343', // The ID of the bot's creator
    name: 'teka#7575' // And the name of the bot's creator
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
  ]
}

export default config
