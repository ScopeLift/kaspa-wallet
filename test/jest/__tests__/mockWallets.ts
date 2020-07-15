import Wallet from '../../../src/wallet/Wallet';

export const walletTestSerialize = {
  from: {
    address: 'kaspatest:qqy6tc7tcgpn9esl522uy6gq7ykscsrhkurdtn5xt2',
    privKey: '2835efc695e59096441595fd36f32c4fe52d09c5e02fdcb6d2effeb3448a1999',
    wallet: Wallet.fromMnemonic(
      'ceiling retreat slogan deny kick museum fruit purchase fire zoo hire poem'
    ),
  },
  to: {
    address: 'kaspatest:qpp9jgyjjy7qg2s2ye4h8ge8l9t0hgksxgf9xpc6zc',
    privKey: '4f0367389d9f1b6ea361abcd44b44b9d0d5e25dbd32f6ca24bc4f040d820cc84',
    wallet: Wallet.fromMnemonic(
      'eyebrow stereo stone uniform settle moon cheese cause gain harvest radar before'
    ),
  },
};

export const apiTest = {
  from: {
    address: 'kaspatest:qq0d6h0prjm5mpdld5pncst3adu0yam6xch4tr69k2',
    wallet: Wallet.fromMnemonic(
      'width behave shuffle since inspire ladder predict end pool walnut chapter credit'
    ),
  },
  to: {
    address: 'kaspatest:qzfr0qtg7kq6f0j64fj3jazclrhwnjk7ryjphymf5n',
    wallet: Wallet.fromMnemonic(
      'mind rich choice obtain fruit over sketch evoke execute under furnace alien'
    ),
  },
};
