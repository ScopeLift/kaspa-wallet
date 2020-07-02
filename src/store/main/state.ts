// Source for Transaction, TransactionInputs, and TransactionOutput models
// https://docs.kas.pa/kaspa/components/kasparov-api-server/api/methods#transaction-id-txid

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
}

export interface MainStateInterface {
  hasWallet: boolean;
  mnemonic: string;
  balance: string;
  transactions: Array<Transaction>;
}

const state: MainStateInterface = {
  hasWallet: true,
  mnemonic: '',
  balance: '0',
  transactions: [],
};

export default state;
