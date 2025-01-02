interface ImportMetaEnv {
    VITE_API_KEY: string;
    VITE_AUTH_DOMAIN: string;
    VITE_PROJECTID: string;
    VITE_STORAGEBUCKET: string;
    VITE_MESSAGINGSENDERID: string;
    VITE_APPID: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  