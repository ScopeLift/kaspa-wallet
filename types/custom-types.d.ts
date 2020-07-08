export type Network = 'kaspa' | 'kaspadev' | 'kaspareg' | 'kaspatest' | 'kaspasim';

export type WalletSave = {
  seedPhrase: string;
  privKey: string;
};

export interface TransactionInput {
  previousTransactionId: string;
  previousTransactionOutputIndex: string;
  scriptSig: string;
  sequence: string;
}

export interface TransactionOutput {
  value: string;
  scriptPubKey: string;
  address: string;
}

export interface Transaction {
  transactionId: string;
  transactionHash: string;
  acceptingBlockHash: string;
  acceptingBlockBlueScore: number;
  subnetworkId: string;
  lockTime: number;
  gas: number;
  payloadHash: string;
  payload: string;
  inputs: Array<TransactionInput>;
  outputs: Array<TransactionOutput>;
  mass: number;
  confirmations: number;
}
