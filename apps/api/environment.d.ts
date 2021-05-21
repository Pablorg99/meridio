declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_DB_URI: string;
    MONGO_EVENT_STORE_URI: string;
  }
}
