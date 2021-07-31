import path from 'path';

class Command {
  constructor (
    client,

    {
      name,
      description = 'No description provided',
      usage = 'No usage provided',
      examples = 'No example provided',
      dirname = false,
      enabled = true,
      guildOnly = false,
      aliases = [],
      botPermissions = [],
      memberPermissions = [],
      nsfw = false,
      ownerOnly = false,
      cooldown = 3000,
    })
  {
    const category = dirname?.split(path.sep)[Number.parseInt(dirname.split(path.sep).length - 1, 10)] || 'Other'

    this.client = client

    this.conf = {
      enabled,
      guildOnly,
      aliases,
      memberPermissions,
      botPermissions,
      nsfw,
      ownerOnly,
      cooldown,
    }

    this.help = { name, description, category, usage, examples }
  }

  run () {
    throw new Error(`Command '${this.help.name}' is missing run method`)
  }
}

export default Command