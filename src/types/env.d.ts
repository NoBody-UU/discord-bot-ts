

namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    MongoURI: string;
    DBName: string;
    TOKEN: string;
  }
}