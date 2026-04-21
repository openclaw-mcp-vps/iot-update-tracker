declare module "node-nmap" {
  export class NmapScan {
    constructor(range: string, flags: string);
    on(event: "complete", callback: (result: unknown[]) => void): void;
    on(event: "error", callback: (error: unknown) => void): void;
    startScan(): void;
  }

  const nodeNmap: {
    NmapScan: typeof NmapScan;
  };

  export default nodeNmap;
}
