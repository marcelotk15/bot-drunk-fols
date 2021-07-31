import { MessageEmbed } from 'discord.js'
import Command from "../../base/Command"

class Jokes extends Command {
  constructor(client) {
    super(client, {
      name: 'joker',
      description: 'Do a trash joke!',
      usage: 'joker',
      aliases: ['piada'],
      dirname: __dirname,
      guildOnly: false
    })
  }

  async run (message) {
    const { prisma, config } = this.client
    const [ joke ] = await prisma.$queryRaw('SELECT * FROM charadas ORDER BY RANDOM() LIMIT 1')

    console.log({ joke })

    const messageEmbed = new MessageEmbed()
      .setTitle(joke.pergunta)
      .setThumbnail(config.joker.thumbnail[Math.floor(Math.random() * config.joker.thumbnail.length)])
      .setFooter(config.embed.footer, config.logo)
      .setColor(config.embed.color)
    
    const channelMessage = await message.channel.send(messageEmbed)

    setTimeout(() => {
      messageEmbed.addField('\u200B', joke.resposta)

      channelMessage.edit(messageEmbed)
    }, 3000)
  }
}

module.exports = Jokes
