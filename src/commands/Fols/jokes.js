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
    console.log('asasas')
    await message.channel.send('teste')
  }
}

module.exports = Jokes
