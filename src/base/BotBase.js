import { Client, Collection } from'discord.js'
import figlet from 'figlet'
import chalk from 'chalk'
import path from 'path'
import { PrismaClient } from '@prisma/client'

import Command from './Command'
import Event from './Event'

import config from '../config'
import helpers from '../helpers'
import strings from '../strings'

const prisma = new PrismaClient()

class BotBase extends Client {
  constructor(options) {
    super(options)

    this.config = config
    this.commands = new Collection()
    this.events = new Collection()
    this.aliases = new Collection()
    this.strings = strings
    this.start = this.start
  }

  loadCommand (command) {
    try {
      helpers.logger.log(`Loading Command: ${command.help.name} from module ${command.help.category}`, 'log')

      if (
        this.commands.has(command.help.name) ||
        this.aliases.has(command.help.name)
      ) {
        helpers.logger.log(`Can't load command, the name '${command.help.name}' is already used as a command name or alias`, 'log')

        return
      }

      this.commands.set(command.help.name, command);

      command.conf.aliases.forEach((alias) => {
        if (this.commands.has(alias) || this.aliases.has(alias)) {
          this.logger.log('warn', `Can't load command, the alias '${alias}' is already used as a command name or alias`,);
          return;
        }

        this.aliases.set(alias, command.help.name);
      });
    } catch (err) {
      return `Unable to load command ${command.help.name}`;
    }
  }

  loadEvent (event) {
    helpers.logger.log(`Loading Event: ${event.conf.name}.`, 'log');

    this.events.set(event.conf.on, event);

    this.on(event.conf.on, (...args) => event.run(...args));
  }

  async load () {
    const dirCommands = path.join(__dirname, '..', 'commands')
    const dirEvents = path.join(__dirname, '..', 'events')

    const nodes = helpers.readdirSyncRecursive(dirCommands)
      .filter((file) => file.endsWith('.js'))
      .map(require);

    helpers.readdirSyncRecursive(dirEvents)
      .filter((file) => file.endsWith('.js'))
      .map(require)
      .forEach((event) => {
        nodes.push(event);
      });

    nodes.forEach((Node) => {
      const object = Node.default || Node

      if (Node.prototype instanceof Command) {
        const loaded = Array.from(this.commands.values()).some(
          (command) => command instanceof Node
        );

        if (!loaded) {
          this.loadCommand(new Node(this));
        }
      }

      if (object.prototype instanceof Event) {
        const loaded = Array.from(this.events.values()).some(
          (command) => command instanceof object
        );

        if (!loaded) {
          this.loadEvent(new object(this));
        }
      }
    });
  }

  printNameOnConsole () {
    const toBePrinted = `${config.botName} - ${config.version}`
    const figletText = figlet.textSync(toBePrinted, { horizontalLayout: 'fitted', verticalLayout: 'default' })
    const chalkText = chalk.yellow(figletText)
    
    console.log(chalkText)
  }

  async prismaMain () {
    console.log({ prisma })
    this.prisma = prisma
  }

  async start () {   
    this.printNameOnConsole()

    await this.prismaMain()
      .catch((e) => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      })

    await this.load()

    this.login(config.token)
  }
}

export default BotBase
