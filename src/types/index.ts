export interface State<T> {
  loading: boolean
  data?: T
  error?: string
}

export interface PassportStamp {
  version: string
  credential: {
    type: string[]
    proof: {
      jws: string
      type: string
      created: string
      proofPurpose: string
      verificationMethod: string
    }
    issuer: string
    '@context': string[]
    issuanceDate: string
    expirationDate: string
    credentialSubject: {
      id: string
      hash: string
      '@context': [
        {
          hash: string
          provider: string
        }
      ]
      provider: string
    }
  }
  metadata?: {
    description: string
    group: string
    hash: string
    name: string
    platform: {
      id: string
      icon: string
      name: string
      description: string
      connectMessage: string
    }
  }
}

export class DaoDetailsData {
  constructor(
    public period: BigInt,
    public price: BigInt,
    public isBalanceLocked: boolean,
    public paymentType: any,
    public paymentContract: string,
    public vault: string,
    public registrationStatus: any
  ) {}
}

export class DealDetailsData {
  constructor(public repair_treshold: BigInt, public renew_treshold: BigInt, public num_copies: BigInt) {}
}

export class FrontendDetailsData {
  constructor(public name: string, public description: string, public logoUrl: string, public communication: string, public dao: string) {}
}
export class ProposalDetailsData {
  constructor(public contributer: string, public cid: string, public description: string, public status: any) {}
}

export enum PaymentType {
  Token = 'Token',
  Ether = 'Ether',
  Contribution = 'Contribution',
  Other = 'Other',
}

export enum RegistrationStatus {
  Open = 'Open',
  Closed = 'Closed',
  Permissioned = 'Permissioned',
  Other = 'Other',
}
