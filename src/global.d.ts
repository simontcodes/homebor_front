export {};
declare global {
    interface Global {
      ngServerContext?: {
        tenantSlug?: string;
      };
    }
  
    // For `globalThis.ngServerContext` typing
    var ngServerContext: {
      tenantSlug?: string;
    };
  }
  