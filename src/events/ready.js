import Event from '../base/Event'
import config from '../config'
import helpers from '../helpers'

const { logger } = helpers

class Ready extends Event {
  constructor(client) {
    super(client, {
      on: 'ready',
      name: 'ServerReady'
    })

    this.client = client
  }

  async run () {
    const { client } = this

    logger.log(`Loaded total of ${client.commands.size} command(s).`, 'debug');
    logger.log(`Loaded a total of ${client.events.size} event(s).`, 'debug');
    logger.log(`${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, 'debug');

    const { status, version } = config

    setInterval(() => {
      const statusToShow = status[Math.floor(Math.random()*status.length)]
      const toDisplay = `${statusToShow.name.replace('{serversCount}', client.guilds.cache.size)} | v${version}`

      client.user.setActivity(toDisplay, { type: statusToShow.type });
    }, 20000)
  }
}

export default Ready
