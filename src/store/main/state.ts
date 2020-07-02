// Source for Transaction, TransactionInputs, and TransactionOutput models
// https://docs.kas.pa/kaspa/components/kasparov-api-server/api/methods#transaction-id-txid
import Wallet from 'src/wallet/Wallet';

export interface MainStateInterface {
  hasWallet: boolean;
  wallet: Wallet | undefined;
}

const state: MainStateInterface = {
  hasWallet: true,
  wallet: undefined,
};

export default state;
