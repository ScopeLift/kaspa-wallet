import { ActionTree } from 'vuex';
import { StoreInterface } from '../index';
import { MainStateInterface, Transaction } from './state';

// Dummy transaction data
const transactions: Array<Transaction> = [
  {
    transactionId: '41d00aa0f4661b86e084de508a459dd8991dac9ac123ad3fe5d5c98d64820d55',
    transactionHash: '3d484feb3cb924bc665aece6cbeeb4091cd340a27ff8db44eddb72f5b0fed6ee',
    acceptingBlockHash: '000015c46d901e6e1cecc94be2c5c4a43b10e325700a838005d942538696b83d',
    acceptingBlockBlueScore: 141621,
    subnetworkId: '0000000000000000000000000000000000000001',
    lockTime: 1593702802586,
    gas: 0,
    payloadHash: 'c8373cff0f5e98000791395a71cf6256a09fb5812c699aad5ff12026319c1a54',
    payload: '1976a914711b8d56dcf9a93f0375558d8c815881b203654488ac3c1554c5b3b458392f6b61737061642f',
    inputs: [],
    outputs: [
      {
        address: 'kaspatest:qpc3hr2kmnu6j0crw42cmryptzqmyqm9gstqp5r863',
        scriptPubKey: '76a914711b8d56dcf9a93f0375558d8c815881b203654488ac',
        value: '5000000000',
      },
      {
        address: 'kaspatest:qpc3hr2kmnu6j0crw42cmryptzqmyqm9gstqp5r863',
        scriptPubKey: '76a914711b8d56dcf9a93f0375558d8c815881b203654488ac',
        value: '5000000000',
      },
      {
        address: 'kaspatest:qpc3hr2kmnu6j0crw42cmryptzqmyqm9gstqp5r863',
        scriptPubKey: '76a914711b8d56dcf9a93f0375558d8c815881b203654488ac',
        value: '5000000000',
      },
      {
        address: 'kaspatest:qpc3hr2kmnu6j0crw42cmryptzqmyqm9gstqp5r863',
        scriptPubKey: '76a914711b8d56dcf9a93f0375558d8c815881b203654488ac',
        value: '5000000000',
      },
    ],
    mass: 433,
    confirmations: 200,
  },
];

const actions: ActionTree<MainStateInterface, StoreInterface> = {
  getWalletInfo({ commit }, mnemonic: string) {
    const walletInfo: MainStateInterface = {
      hasWallet: true,
      mnemonic,
      address: 'kaspatest:qpc3hr2kmnu6j0crw42cmryptzqmyqm9gstqp5r863',
      balance: '123456.78901237',
      transactions,
    };
    commit('setWalletInfo', walletInfo);
  },
};

export default actions;
