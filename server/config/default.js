module.exports = {
  host: 'localhost',
  port: 8080,
  public: '../public/',
  paginate: {
    default: 10,
    max: 50,
  },
  tests: {
    environmentsAllowingSeedData: ['test'],
  },
  authentication: {
    entity: 'user',
    service: 'users',
    secret: 'JEcnz4HMzgCEIj6Z13mcyDFt+YI=',
    authStrategies: ['jwt', 'local'],
    jwtOptions: {
      header: {
        typ: 'access',
      },
      audience: 'https://yourdomain.com',
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d',
    },
    local: {
      usernameField: 'email',
      passwordField: 'password',
    },
    oauth: {
      redirect: '/',
      google: {
        key: '<google oauth key>',
        secret: '<google oauth secret>',
        scope: ['email', 'profile', 'openid'],
      },
    },
  },
  mongodb: 'mongodb://localhost:27017/wap',
  nodemailer: {
    address: {
      admin: 'anthony@wearepeers.com',
    },
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'anthony@wearepeers.com',
        pass: '',
      },
    },
    options: {
      from: '"WAP" <anthony@wearepeers.com>',
    },
  },
  docs: {
    title: 'WAP API',
    description: 'REST API from feathers',
  },
}
