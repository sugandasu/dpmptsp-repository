declare namespace NodeJS {
  interface ProcessEnv {
    SESSION_SECRET: string;
    DATABASE_URL: string;
    PORT: string;
    BACKEND_URL: string;
    DOMAIN_NAME: string;
    NODE_ENV: string;
  }
}