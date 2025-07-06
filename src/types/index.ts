declare global {
  interface Window {
    ZOHO: {
      CRM: {
        API: {
          getRecord: (config: any) => Promise<any>;
          updateRecord: (config: any) => Promise<any>;
          insertRecord: (config: any) => Promise<any>;
          searchRecord: (config: any) => Promise<any>;
        };
      };
      embeddedApp: {
        on: (event: string, callback: Function) => void;
        init: () => void;
      };
    };
  }
}
