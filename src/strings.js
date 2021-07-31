import config from './config';

const { emojis } = config

const get = (term, ...args) => {
  const value = this.strings[term]

  switch (typeof value) {
    case 'function': return value(...args)
    default: return value;
  }
}

const strings = {
  //Utils
  PREFIX_INFO: (prefix) => `o prefixo do servidor é \`${prefix}\``,
  UTILS: {
    YES: 'Sim',
    NO: 'Não',
  },

  VOTE_THANKS: (user) => `:arrow_up: Olá ${user.toString()}, obrigador por ter votado!`,

  //General
  TIMES_UP: `${emojis.warning} | O tempo para responder acabou, tente novamente.`,

  //Delete Chanel command
  DELETE_CHANEL_QUESTION: 'Você tem certeza que deseja deletar esta sala? Responda com `sim` ou `não`!',
  
  //Announcement
  ANNOUNCEMENT_ERROR_WT: 'Você precisa digitar um texto que será anunciado!',
  ANNOUNCEMENT_ERROR_1030: 'Por favor digite um texto com até ou menos que 1030 caracteres!',
  ANNOUNCEMENT_MENTION: () => `Você deseja adicionar uma menção na mensagem? Responda com: \`${get('UTILS').YES.toLowerCase()}\` ou \`${get('UTILS').NO.toLowerCase()}\`!`,
  ANNOUNCEMENT_WHAT_MENTION: 'Digite uma das seguintes respostas: `every` (para uma menção @ everyone) or `here` (para uma menção @ here)!',
  ANNOUNCEMENT_HEAD: '📢 ANÚNCIO: ',
}

export default strings
