interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string,
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'joaopfg.2002@zohomail.eu',
      name: 'João Gomes do GoBarber'
    },
  }
} as IMailConfig;