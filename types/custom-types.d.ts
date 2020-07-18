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

export namespace Api {
  interface Utxo {
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
  }
  interface UtxoResponse {
    utxos: Utxo[];
  }
  interface ErrorResponse {
    errorCode: number;
    errorMessage: string;
  }

  interface TransactionInput {
    previousTransactionId: string;
    previousTransactionOutputIndex: string;
    scriptSig: string;
    sequence: string;
  }
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

  interface TransactionsResponse {
    transactions: Transaction[];
  }
  type SendTxResponse = boolean;
}
