declare namespace NodeJS {
  interface ProcessEnv {
    TOKEN_SECRET: string;
    SESSION_SECRET: string;
    DATABASE_URL: string;
    PORT: string;
    BACKEND_URL: string;
    DOMAIN_NAME: string;
    NODE_ENV: string;
  }
}