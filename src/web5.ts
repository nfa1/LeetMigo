import type { AppDataStore, Web5Agent } from '@web5/agent';
import ms from 'ms';
import { Web5UserAgent } from '@web5/user-agent';
import { VcApi } from './vc-api.js';
import { DwnApi } from './dwn-api.js';
import { DidApi } from './did-api.js';
import { getTechPreviewDwnEndpoints } from './tech-preview.js';
import { DidIonMethod } from '@web5/dids';

export type TechPreviewOptions = {
  dwnEndpoints?: string[];
}

export type Web5ConnectOptions = {
  agent?: Web5Agent;
  appData?: AppDataStore;
  connectedDid?: string;
  sync?: string;
  techPreview?: TechPreviewOptions;
}

type Web5Options = {
  agent: Web5Agent;
  connectedDid: string;
};

export class Web5 {
  agent: Web5Agent;
  did: DidApi;
  dwn: DwnApi;
  vc: VcApi;
  private connectedDid: string;

  constructor(options?: Web5Options) {
    if (!options) {
      throw new Error('Web5 options are required');
    }
    const { agent, connectedDid } = options;
    this.agent = agent;
    this.connectedDid = connectedDid;
    this.did = new DidApi({ agent, connectedDid });
    this.dwn = new DwnApi({ agent, connectedDid });
    this.vc = new VcApi({ agent, connectedDid });
  }
  
  static async connect(options: Web5ConnectOptions = {}) {
    let { agent, appData, connectedDid, sync, techPreview } = options;

    if (!agent) {
      const userAgent = await Web5UserAgent.create({ appData });
      agent = userAgent;

      await userAgent.start({ passphrase: 'insecure-static-phrase' });
    
      const notConnected = true;
      if (notConnected) {
        const identities = await userAgent.identityManager.list();
        const storedIdentities = identities.length;
        
        if (storedIdentities === 0) {
          const serviceEndpointNodes = techPreview?.dwnEndpoints ?? await getTechPreviewDwnEndpoints();
          const didOptions = await DidIonMethod.generateDwnOptions({ serviceEndpointNodes });
          const identity = await userAgent.identityManager.create({
            name      : 'Default',
            didMethod : 'ion',
            didOptions,
            kms       : 'local'
          });
          await userAgent.identityManager.import({ identity, context: userAgent.agentDid });
          connectedDid = identity.did;
        } else if (storedIdentities === 1) {
          const [ identity ] = identities;
          connectedDid = identity.did;
        } else {
          throw new Error(`connect() failed due to unexpected state: ${storedIdentities} stored identities`);
        }
      }

      if (sync !== 'off') {
        await userAgent.syncManager.registerIdentity({ did: connectedDid });
        sync ??= '2m';
        userAgent.syncManager.startSync({ interval: ms(sync) })
          .catch((error: any) => {
            console.error(`Sync failed: ${error}`);
          });
      }
    }

    const web5 = new Web5({ agent, connectedDid });

    return { web5, did: connectedDid };
  }
}