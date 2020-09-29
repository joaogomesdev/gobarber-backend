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
      email: 'joaopfg.2002@gmail.com',
      name: 'João Gomes do GoBarber'
    },
  }
} as IMailConfig;