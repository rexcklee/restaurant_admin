declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      SERVER_URL: string;
      // add more environment variables and their types here
    }
  }
}
