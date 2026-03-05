export interface backendInterface {
  ping: () => Promise<string>;
}

export declare const idlFactory: unknown;
export declare const canisterId: string;
export declare const createActor: (canisterId: string, options?: object) => backendInterface;
