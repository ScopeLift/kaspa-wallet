import bitcore from 'bitcore-lib-cash';

export type Network = 'kaspa' | 'kaspadev' | 'kaspareg' | 'kaspatest' | 'kaspasim';

export type WalletSave = {
  seedPhrase: string;
  privKey: string;
};

export type AddressDict = Record<string, bitcore.PrivateKey>;
export interface TxSend {
  to: string;
  amount: number;
  fee?: number;
}

export interface TransactionInput {
  previousTransactionId: string;
  previousTransactionOutputIndex: string;
  scriptSig: string;
  sequence: string;
}
export namespace Api {
  interface ApiResponse<T> {
    data: T;
    error: ErrorResponse;
  }
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
  type UtxoResponse = Utxo[] | ErrorResponse;

  type SendTxResponse = boolean;
  interface TransactionOutput {
    value: string;
    scriptPubKey: string;
    address: string;
  }

  interface Transaction {
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
}
