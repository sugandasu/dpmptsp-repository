declare namespace NodeJS {
  interface ProcessEnv {
    TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    COOKIE_NAME: string;
    DATABASE_URL: string;
    PORT: string;
    BACKEND_URL: string;
    DOMAIN_NAME: string;
    NODE_ENV: string;
  }
}