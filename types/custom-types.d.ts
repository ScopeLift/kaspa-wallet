import bitcore from 'bitcore-lib-cash';

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

export namespace Api {
  type Utxo = {
    transactionId: string;
    value: number;
    scriptPubKey: string;
    acceptingBlockHash: string;
    acceptingBlockBlueScore: number;
    index: number;
    isSpent: boolean;
    isCoinbase: boolean;
    isSpendable: boolean;
    confirmations: number;
  };
  type ErrorResponse = {
    errorCode: number;
    errorMessage: string;
  };
  export type UtxoResponse = Utxo[] | ErrorResponse;

  export type SendTxResponse = ErrorResponse | undefined;
}

export interface TxSend {
  to: string;
  amount: number;
  fee?: number;
}

export type AddressDict = Record<string, bitcore.PrivateKey>;
