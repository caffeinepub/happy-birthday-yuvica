import { Actor, HttpAgent } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";

export interface backendInterface {
  ping: () => Promise<string>;
}

export type CreateActorOptions = {
  agentOptions?: ConstructorParameters<typeof HttpAgent>[0];
  agent?: HttpAgent;
  processError?: (e: unknown) => never;
};

export class ExternalBlob {
  contentType: string;
  data: Uint8Array;
  onProgress?: (percentage: number) => void;

  constructor(
    contentType: string,
    data: Uint8Array,
    onProgress?: (percentage: number) => void,
  ) {
    this.contentType = contentType;
    this.data = data;
    this.onProgress = onProgress;
  }

  async getBytes(): Promise<Uint8Array> {
    return this.data;
  }

  static async fromURL(url: string): Promise<ExternalBlob> {
    const response = await fetch(url);
    const contentType =
      response.headers.get("content-type") || "application/octet-stream";
    const arrayBuffer = await response.arrayBuffer();
    return new ExternalBlob(contentType, new Uint8Array(arrayBuffer));
  }
}

const idlFactory = ({ IDL: idl }: { IDL: typeof IDL }) => {
  return idl.Service({
    ping: idl.Func([], [idl.Text], ["query"]),
  });
};

export const canisterId: string = "";

export const createActor = (
  canister: string,
  _uploadFile?: (file: ExternalBlob) => Promise<Uint8Array>,
  _downloadFile?: (bytes: Uint8Array) => Promise<ExternalBlob>,
  options?: CreateActorOptions,
): backendInterface => {
  const agent =
    options?.agent ??
    new HttpAgent({ ...options?.agentOptions });
  return Actor.createActor(
    idlFactory as unknown as IDL.InterfaceFactory,
    {
      agent,
      canisterId: canister,
    },
  ) as unknown as backendInterface;
};
