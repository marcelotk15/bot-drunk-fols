import { cli } from 'winston/lib/winston/config';
import Event from '../base/Event'
import helpers from '../helpers'

const { logger } = helpers

let cmdCooldown = {};

class Message extends Event {
  constructor(client) {
    super(client, {
      on: 'message',
      name: 'Mensagens'
    });

    this.client = client;
  }

  async run (message) {
    const { client } = this
    const { config, commands, aliases } = client
    const data = {}

    //canais protegidos
    // if(
    //   client.config.protectfChannels.includes(message.channel.id) && //canais
    //   !message.content.includes(`${client.config.prefix}whitelist`) && !message.content.includes(`${client.config.prefix}wl`) && //whitelist command
    //   !message.author.bot && //não é bot
    //   !message.member.hasPermission('ADMINISTRATOR') /* admin */ ){

    //   let alert;
      
    //   switch (message.channel.id) {
    //   case client.config.whitelist.channelId:
    //     alert = await message.channel.send('***Este canal não foi feito para bate papo, apenas para a whitelist!*** \nUse `!whitelits` para realizar a sua whitelist!');
    //     break;
    //   default:
    //     alert = await message.channel.send('***Este canal não foi feito para bate papo!***');
    //   }

    //   message.delete({ timeout: 5000 });
    //   alert.delete({ timeout: 15000 });

    //   return false;
    // }

    // If the messagr author is a bot
    if (message.author.bot) return

    // If the member on a guild is invisible or not cached, fetch them.
    if (message.guild && !message.member) await message.guild.members.fetch(message.author.id)

    // if(this.client.config.proMode && message.guild){
    //     if((!this.client.config.proUsers.includes(message.guild.ownerID) || this.guilds.filter((g) => g.ownerID === message.guild.ownerID) > 1) && message.guild.ownerID !== this.client.config.owner.id){
    //         return message.guild.leave();
    //     }
    // }

    // data.config = client.config;

    // if(message.guild){
    //     // Gets guild data
    //     let guild = await client.findOrCreateGuild({ id: message.guild.id });
    //     data.guild = guild;
    // }

    // Check if the bot was mentionned
    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)))
      return message.reply(`the prefix of this server is \`${config.prefix}\``)

    // Check message is a command
    if (!message.content.startsWith(config.prefix)) return

    const args = message.content.slice(config.prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()
    
    const commandFunction = commands.get(command) || commands.get(aliases.get(command))

    if (!commandFunction) return

    if (commandFunction.conf.guildOnly && !message.guild)
      return message.channel.send('This command is only available on a server!')

    if (message.guild) {
      let needPermision = [];

      //bot permisions
      if (!commandFunction.conf.botPermissions.includes('EMBED_LINKS'))
      commandFunction.conf.botPermissions.push('EMBED_LINKS')

      commandFunction.conf.botPermissions.forEach((perm) => {
        if (!message.channel.permissionsFor(message.guild.me).has(perm))
          needPermision.push(perm);
      })

      if (needPermision.length > 0)
        return message.channel
          .send((`I need the following permissions to perform this command: \`${needPermision.map((p) => `${p}`).join(', ')}\``))

      needPermision.length = 0;

      //member permisions
      commandFunction.conf.memberPermissions.forEach((perm) => {
        if (!message.channel.permissionsFor(message.member).has(perm))
          needPermision.push(perm)
      })

      if (needPermision.length > 0)
        return message.channel
          .send((`You do not have the necessary permissions to perform this command: \`${needPermision.map((p) => `${p}`).join(', ')}\``))

      // if(data.guild.ignoredChannels.includes(message.channel.id) && !message.member.hasPermission("MANAGE_MESSAGES")){
      //     return (message.delete()) && (message.author.send(`Commands are forbidden in ${message.channel} !`));
      // }

      if (
        !message.channel.permissionsFor(message.member).has('MENTION_EVERYONE')
        && (message.content.includes('@everyone') || message.content.includes('@here'))
      )
        return message.channel.send('You are not allowed to mention everyone or here in the commands.')

      if (!message.channel.nsfw && commandFunction.conf.nsfw)
        return message.channel.send('You must go to in a channel that allows the NSFW to type this command!')
    } //end if is guild

    if(!commandFunction.conf.enabled)
      return message.channel.send('This command is currently disabled!')

    if(commandFunction.conf.ownerOnly && message.author.id !== config.owner.id)
      return message.channel.send(`Only @${config.owner.name} can do these commands!`)

    let uCooldown = cmdCooldown[message.author.id]

    if (!uCooldown) {
      cmdCooldown[message.author.id] = {}

      uCooldown = cmdCooldown[message.author.id]
    }

    let time = uCooldown[commandFunction.help.name] || 0

    if (time && (time > Date.now()))
      return message.channel
        .send(`You must wait **${Math.ceil((time-Date.now())/1000)}** second(s) to be able to run this command again!`);

    cmdCooldown[message.author.id][commandFunction.help.name] = Date.now() + commandFunction.conf.cooldown;

    logger.log(`${message.author.username} (${message.author.id}) ran command ${commandFunction.help.name}`, 'log');

    // let log = new this.client.logs({
    //   commandName: commandFunction.help.name,
    //   author: { username: message.author.username, discriminator: message.author.discriminator, id: message.author.id },
    //   guild: { name: message.guild ? message.guild.name : 'dm', id: message.guild ? message.guild.id : 'dm' }
    // });
    // log.save();

    try {
      commandFunction.run(message, args, data)

      if (commandFunction.help.category === 'Moderation' && config.autoDeleteModCommands)
        message.delete()
    } catch (err) {
      console.error(err)

      return message.channel.send('An error has occurred, please try again in a few minutes.')
    }
  }
}

export default Message
