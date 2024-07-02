module.exports = {
  server: {
    port: process.env.PORT || 3000,
  },
  jwt: {
    secret: process.env.SECRET || 'jwt-secret-phrase',
    expiresIn: process.env.JWT_EXP || '8h',
  },
  db: {
    user: process.env.DB_MONGO_USERNAME,
    pass: process.env.DB_MONGO_PASS,
    host: process.env.DB_MONGO_HOST,
    dbName: process.env.DB_MONGO_NAME,
  },
  isProduction: process.env.NODE_ENV === 'production',
};
