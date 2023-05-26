/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TODO_LIST_API: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}