import bitcore from 'bitcore-lib-cash';

export type Network = 'kaspa' | 'kaspadev' | 'kaspareg' | 'kaspatest' | 'kaspasim';

export type WalletSave = {
  seedPhrase: string;
  privKey: string;
};

type PendingTransactions = {
  amount: number;
  transactions: Record<
    string,
    {
      utxoIds: string[];
      rawTx: string;
      amount: number;
    }
  >;
  add(id: string, tx: { utxoIds: string[]; rawTx: string; amount: number }): void;
};

export interface TxSend {
  toAddr: string;
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

  interface BlockResponse {
    blockHash: string;
    parentBlockHashes: string[];
    version: number;
    hashMerkleRoot: string;
    acceptedIdMerkleRoot: string;
    utxoCommitment: string;
    timestamp: number;
    bits: number;
    nonce: number;
    acceptingBlockHash: string;
    blueScore: number;
    isChainBlock: boolean;
    mass: number;
  }

  interface TransactionInput {
    previousTransactionId: string;
    previousTransactionOutputIndex: string;
    scriptSig: string;
    sequence: string;
    address: string;
  }
  interface TransactionOutput {
    value: number;
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

  interface TransactionsResponse {
    transactions: Transaction[];
  }
  type SendTxResponse = boolean;
}
