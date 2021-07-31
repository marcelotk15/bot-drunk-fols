import { stripIndents } from'common-tags'

import Command from '../../base/Command'

class Ping extends Command {
  constructor (client) {
    super(client, {
      name: 'ping',
      dirname: __dirname,
      guildOnly: true,
    });
  }

  async run (message) {
    const msg = await message.channel.send('Pinging...');

    const ping = Math.round(msg.createdTimestamp - message.createdTimestamp);

    if (ping <= 0) {
      return msg.edit('Please try again...');
    }

    return msg.edit(
      stripIndents`🏓 P${'o'.repeat(Math.ceil(ping / 100))}ng: \`${ping}ms\`
            💓 Heartbeat: \`${Math.round(message.client.ping)}ms\``,
    );
  }
}

module.exports = Ping
