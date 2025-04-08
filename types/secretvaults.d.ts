declare module 'secretvaults' {
    export class SecretVaultWrapper {
      constructor(
        nodes: Array<{ url: string; did: string }>,
        orgCredentials: { secretKey: string; orgDid: string },
        schemaId: string
      );
  
      init(): Promise<void>;
  
      writeToNodes(
        data: Array<Record<string, any>>
      ): Promise<Array<Record<string, any>>>;
  
      readFromNodes(
        query: Record<string, any>
      ): Promise<Array<Record<string, any>>>;
    }
  }
  