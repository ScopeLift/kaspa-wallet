module.exports = {
  utxos: {
    'kaspatest:qrvn9pq9eujfhy6nkr5mvncdg395tlvdagc2z64n6q': [
      {
        transactionId: 'c3b7a720158b0808ec8909576c7f0bf1e36bc6f9613965fa16d920b0693c1735',
        value: 99997000,
        scriptPubKey: '76a914d9328405cf249b9353b0e9b64f0d444b45fd8dea88ac',
        acceptingBlockHash: '00004791f13f113c69450702226e6eb0904bab7241b6748f1dd305d129b2cb1a',
        acceptingBlockBlueScore: 38777,
        index: 1,
        isSpent: false,
        isCoinbase: false,
        isSpendable: true,
        confirmations: 606,
      },
    ],
  },
  transactions: {
    'kaspatest:qrvn9pq9eujfhy6nkr5mvncdg395tlvdagc2z64n6q': [
      {
        transactionHash: '2aa8b763bacb2d3ef9ba8c1ca03c87928935459433e72e936c4137011b2203cb',
        transactionId: 'c3b7a720158b0808ec8909576c7f0bf1e36bc6f9613965fa16d920b0693c1735',
        acceptingBlockHash: '00004791f13f113c69450702226e6eb0904bab7241b6748f1dd305d129b2cb1a',
        acceptingBlockBlueScore: 38777,
        subnetworkId: '0000000000000000000000000000000000000000',
        lockTime: 0,
        payloadHash: '                                                                ',
        inputs: [
          {
            previousTransactionId:
              '9a4ab5896b16ed89968d8b441e0dde1add9fe019379f8cc5886647723c60377c',
            previousTransactionOutputIndex: 1,
            signatureScript:
              '41df552e9cddf06a433c2a16d8c24e33c0305eb064d413a71982bc6837b7d07bf45ea0d18af4ab24a472ecd8ebe12ce5c2f108f23e45e46862b33c723d60005e89012102c6eb29b459c1425344467bcc99f2e3e5cc2d878bcfbbfe312627b32d87eaf233',
            sequence: 18446744073709551615,
            address: 'kaspatest:qp2zggljkdlsp5lcdeq45dnvyzdy4pr6wysdeffkzx',
          },
        ],
        outputs: [
          {
            value: 100000000,
            scriptPubKey: '76a914b152961909cbb112b35a563fa88c76a6dff2cf9788ac',
            address: 'kaspatest:qzc499sep89mzy4ntftrl2yvw6ndluk0ju273mhsld',
            index: 0,
            isSpent: false,
          },
          {
            value: 99997000,
            scriptPubKey: '76a914d9328405cf249b9353b0e9b64f0d444b45fd8dea88ac',
            address: 'kaspatest:qrvn9pq9eujfhy6nkr5mvncdg395tlvdagc2z64n6q',
            index: 1,
            isSpent: false,
          },
        ],
        mass: 747,
        version: 1,
        raw:
          '01000000017c37603c72476688c58c9f3719e09fdd1ade0d1e448b8d9689ed166b89b54a9a010000006441df552e9cddf06a433c2a16d8c24e33c0305eb064d413a71982bc6837b7d07bf45ea0d18af4ab24a472ecd8ebe12ce5c2f108f23e45e46862b33c723d60005e89012102c6eb29b459c1425344467bcc99f2e3e5cc2d878bcfbbfe312627b32d87eaf233ffffffffffffffff0200e1f505000000001976a914b152961909cbb112b35a563fa88c76a6dff2cf9788ac48d5f505000000001976a914d9328405cf249b9353b0e9b64f0d444b45fd8dea88ac00000000000000000000000000000000000000000000000000000000',
        confirmations: 606,
      },
    ],
    'kaspatest:qp0qs9fndnu274a98aqxhmluh9xj3w6vscnay8uqdt': [
      {
        transactionHash: '17a51178354d57b79fe377ee31adc914f8c9098b9a170560133d049415e1b8b7',
        transactionId: 'b62ec76110a3737f79e62cc003bf7e14d461edc6ede21715a207550587c102ef',
        acceptingBlockHash: '000026de9ed31af289debe4ffe9df0a33c04bfabcd60fc4c19f05ec9605a38ad',
        acceptingBlockBlueScore: 37540,
        subnetworkId: '0000000000000000000000000000000000000000',
        lockTime: 0,
        payloadHash: '                                                                ',
        inputs: [
          {
            previousTransactionId:
              '34a422d31f3d7a4ed3862c75e9f2ca3239dfc57bff8fb4fd8525f5b0fbd2242a',
            previousTransactionOutputIndex: 1,
            signatureScript:
              '412388faf89114e0c155c942ab77c8f9a55a1daf2183f1b99656865278db834a356f5d06e0640a83ab3347c9084abb5a4b9df87cc37830213366fec772f6b9008d01210269a1e81162aec33dbf83a0b5ec96c037ff41bf711a2185af21e84980ea0655dd',
            sequence: 18446744073709551615,
            address: 'kaspatest:qq0d6h0prjm5mpdld5pncst3adu0yam6xch4tr69k2',
          },
        ],
        outputs: [
          {
            value: 500000000,
            scriptPubKey: '76a9145e0815336cf8af57a53f406beffcb94d28bb4c8688ac',
            address: 'kaspatest:qp0qs9fndnu274a98aqxhmluh9xj3w6vscnay8uqdt',
            index: 0,
            isSpent: true,
          },
          {
            value: 4499999000,
            scriptPubKey: '76a9142002c41d76f8d444df505591266bb6769340cb4388ac',
            address: 'kaspatest:qqsq93qawmudg3xl2p2ezfntkemfxsxtgv9mjg9s6j',
            index: 1,
            isSpent: false,
          },
        ],
        mass: 747,
        version: 1,
        raw:
          '01000000012a24d2fbb0f52585fdb48fff7bc5df3932caf2e9752c86d34e7a3d1fd322a4340100000064412388faf89114e0c155c942ab77c8f9a55a1daf2183f1b99656865278db834a356f5d06e0640a83ab3347c9084abb5a4b9df87cc37830213366fec772f6b9008d01210269a1e81162aec33dbf83a0b5ec96c037ff41bf711a2185af21e84980ea0655ddffffffffffffffff020065cd1d000000001976a9145e0815336cf8af57a53f406beffcb94d28bb4c8688ac1889380c010000001976a9142002c41d76f8d444df505591266bb6769340cb4388ac00000000000000000000000000000000000000000000000000000000',
        confirmations: 1227,
      },
      {
        transactionHash: '910d6feaf5a13409bdce71ffac0c58ebe9bf622d4fcfdac112c188d65b745c99',
        transactionId: 'e3f1514cc0d5ccf2226302ef6c34f6b57c42b9f4af6d1ecac41d7bfceef6a899',
        acceptingBlockHash: '0000236989dbeb0d99fa33d6a9ed85618364194a5a0b6cc5d45f8aa2b43fde69',
        acceptingBlockBlueScore: 38317,
        subnetworkId: '0000000000000000000000000000000000000000',
        lockTime: 0,
        payloadHash: '                                                                ',
        inputs: [
          {
            previousTransactionId:
              'b62ec76110a3737f79e62cc003bf7e14d461edc6ede21715a207550587c102ef',
            previousTransactionOutputIndex: 0,
            signatureScript:
              '41c2c9df792f5b637535bbe72d00c85b08f21151a67259e9b418d49476a8498590d17bb1eec49a9b6fd7d2f7fb7dee1cf9d75faae0361687f2400742d93f6e362301210266c6ca217039fb4cc55e25da6764c8548f708a27a36cd87ad372ec1643a2cbc4',
            sequence: 18446744073709551615,
            address: 'kaspatest:qp0qs9fndnu274a98aqxhmluh9xj3w6vscnay8uqdt',
          },
        ],
        outputs: [
          {
            value: 100000000,
            scriptPubKey: '76a91492378168f581a4be5aaa65197458f8eee9cade1988ac',
            address: 'kaspatest:qzfr0qtg7kq6f0j64fj3jazclrhwnjk7ryjphymf5n',
            index: 0,
            isSpent: false,
          },
          {
            value: 399999000,
            scriptPubKey: '76a9141d2ec00e2c3d37a55cdc765a507c6fc4bd3a379188ac',
            address: 'kaspatest:qqwjasqw9s7n0f2um3m955rudlzt6w3hjyhmyvd65n',
            index: 1,
            isSpent: true,
          },
        ],
        mass: 10747,
        version: 1,
        raw:
          '0100000001ef02c187055507a21517e2edc6ed61d4147ebf03c02ce6797f73a31061c72eb6000000006441c2c9df792f5b637535bbe72d00c85b08f21151a67259e9b418d49476a8498590d17bb1eec49a9b6fd7d2f7fb7dee1cf9d75faae0361687f2400742d93f6e362301210266c6ca217039fb4cc55e25da6764c8548f708a27a36cd87ad372ec1643a2cbc4ffffffffffffffff0200e1f505000000001976a91492378168f581a4be5aaa65197458f8eee9cade1988ac1880d717000000001976a9141d2ec00e2c3d37a55cdc765a507c6fc4bd3a379188ac00000000000000000000000000000000000000000000000000000000',
        confirmations: 450,
      },
    ],
    'kaspatest:qqwjasqw9s7n0f2um3m955rudlzt6w3hjyhmyvd65n': [
      {
        transactionHash: '910d6feaf5a13409bdce71ffac0c58ebe9bf622d4fcfdac112c188d65b745c99',
        transactionId: 'e3f1514cc0d5ccf2226302ef6c34f6b57c42b9f4af6d1ecac41d7bfceef6a899',
        acceptingBlockHash: '0000236989dbeb0d99fa33d6a9ed85618364194a5a0b6cc5d45f8aa2b43fde69',
        acceptingBlockBlueScore: 38317,
        subnetworkId: '0000000000000000000000000000000000000000',
        lockTime: 0,
        payloadHash: '                                                                ',
        inputs: [
          {
            previousTransactionId:
              'b62ec76110a3737f79e62cc003bf7e14d461edc6ede21715a207550587c102ef',
            previousTransactionOutputIndex: 0,
            signatureScript:
              '41c2c9df792f5b637535bbe72d00c85b08f21151a67259e9b418d49476a8498590d17bb1eec49a9b6fd7d2f7fb7dee1cf9d75faae0361687f2400742d93f6e362301210266c6ca217039fb4cc55e25da6764c8548f708a27a36cd87ad372ec1643a2cbc4',
            sequence: 18446744073709551615,
            address: 'kaspatest:qp0qs9fndnu274a98aqxhmluh9xj3w6vscnay8uqdt',
          },
        ],
        outputs: [
          {
            value: 100000000,
            scriptPubKey: '76a91492378168f581a4be5aaa65197458f8eee9cade1988ac',
            address: 'kaspatest:qzfr0qtg7kq6f0j64fj3jazclrhwnjk7ryjphymf5n',
            index: 0,
            isSpent: false,
          },
          {
            value: 399999000,
            scriptPubKey: '76a9141d2ec00e2c3d37a55cdc765a507c6fc4bd3a379188ac',
            address: 'kaspatest:qqwjasqw9s7n0f2um3m955rudlzt6w3hjyhmyvd65n',
            index: 1,
            isSpent: true,
          },
        ],
        mass: 10747,
        version: 1,
        raw:
          '0100000001ef02c187055507a21517e2edc6ed61d4147ebf03c02ce6797f73a31061c72eb6000000006441c2c9df792f5b637535bbe72d00c85b08f21151a67259e9b418d49476a8498590d17bb1eec49a9b6fd7d2f7fb7dee1cf9d75faae0361687f2400742d93f6e362301210266c6ca217039fb4cc55e25da6764c8548f708a27a36cd87ad372ec1643a2cbc4ffffffffffffffff0200e1f505000000001976a91492378168f581a4be5aaa65197458f8eee9cade1988ac1880d717000000001976a9141d2ec00e2c3d37a55cdc765a507c6fc4bd3a379188ac00000000000000000000000000000000000000000000000000000000',
        confirmations: 450,
      },
      {
        transactionHash: '863c1c58d25ecae9a45df6414db0283df4676e6a89be3349cb46f800796186a8',
        transactionId: '9a4ab5896b16ed89968d8b441e0dde1add9fe019379f8cc5886647723c60377c',
        acceptingBlockHash: '0000174d07548af18e2fee83720f4274e45af083c9f10d29db5e32121c552d31',
        acceptingBlockBlueScore: 38596,
        subnetworkId: '0000000000000000000000000000000000000000',
        lockTime: 0,
        payloadHash: '                                                                ',
        inputs: [
          {
            previousTransactionId:
              'e3f1514cc0d5ccf2226302ef6c34f6b57c42b9f4af6d1ecac41d7bfceef6a899',
            previousTransactionOutputIndex: 1,
            signatureScript:
              '4173a8833f885f107b78e8b16606bac8bd946204e6049b4f50b3efe1ef1940630079af69e35ac02e175645e1e637316342179e0447abe83ace90a4906c1623101a012102e9cf5150c66c7d445bbaf201e70d31fd929f368329f242957061ed6ca92419cc',
            sequence: 18446744073709551615,
            address: 'kaspatest:qqwjasqw9s7n0f2um3m955rudlzt6w3hjyhmyvd65n',
          },
        ],
        outputs: [
          {
            value: 200000000,
            scriptPubKey: '76a91492378168f581a4be5aaa65197458f8eee9cade1988ac',
            address: 'kaspatest:qzfr0qtg7kq6f0j64fj3jazclrhwnjk7ryjphymf5n',
            index: 0,
            isSpent: false,
          },
          {
            value: 199998000,
            scriptPubKey: '76a914542423f2b37f00d3f86e415a366c209a4a847a7188ac',
            address: 'kaspatest:qp2zggljkdlsp5lcdeq45dnvyzdy4pr6wysdeffkzx',
            index: 1,
            isSpent: false,
          },
        ],
        mass: 747,
        version: 1,
        raw:
          '010000000199a8f6eefc7b1dc4ca1e6daff4b9427cb5f6346cef026322f2ccd5c04c51f1e301000000644173a8833f885f107b78e8b16606bac8bd946204e6049b4f50b3efe1ef1940630079af69e35ac02e175645e1e637316342179e0447abe83ace90a4906c1623101a012102e9cf5150c66c7d445bbaf201e70d31fd929f368329f242957061ed6ca92419ccffffffffffffffff0200c2eb0b000000001976a91492378168f581a4be5aaa65197458f8eee9cade1988ac30baeb0b000000001976a914542423f2b37f00d3f86e415a366c209a4a847a7188ac00000000000000000000000000000000000000000000000000000000',
        confirmations: 171,
      },
    ],
    'kaspatest:qp2zggljkdlsp5lcdeq45dnvyzdy4pr6wysdeffkzx': [
      {
        transactionHash: '863c1c58d25ecae9a45df6414db0283df4676e6a89be3349cb46f800796186a8',
        transactionId: '9a4ab5896b16ed89968d8b441e0dde1add9fe019379f8cc5886647723c60377c',
        acceptingBlockHash: '0000174d07548af18e2fee83720f4274e45af083c9f10d29db5e32121c552d31',
        acceptingBlockBlueScore: 38596,
        subnetworkId: '0000000000000000000000000000000000000000',
        lockTime: 0,
        payloadHash: '                                                                ',
        inputs: [
          {
            previousTransactionId:
              'e3f1514cc0d5ccf2226302ef6c34f6b57c42b9f4af6d1ecac41d7bfceef6a899',
            previousTransactionOutputIndex: 1,
            signatureScript:
              '4173a8833f885f107b78e8b16606bac8bd946204e6049b4f50b3efe1ef1940630079af69e35ac02e175645e1e637316342179e0447abe83ace90a4906c1623101a012102e9cf5150c66c7d445bbaf201e70d31fd929f368329f242957061ed6ca92419cc',
            sequence: 18446744073709551615,
            address: 'kaspatest:qqwjasqw9s7n0f2um3m955rudlzt6w3hjyhmyvd65n',
          },
        ],
        outputs: [
          {
            value: 200000000,
            scriptPubKey: '76a91492378168f581a4be5aaa65197458f8eee9cade1988ac',
            address: 'kaspatest:qzfr0qtg7kq6f0j64fj3jazclrhwnjk7ryjphymf5n',
            index: 0,
            isSpent: false,
          },
          {
            value: 199998000,
            scriptPubKey: '76a914542423f2b37f00d3f86e415a366c209a4a847a7188ac',
            address: 'kaspatest:qp2zggljkdlsp5lcdeq45dnvyzdy4pr6wysdeffkzx',
            index: 1,
            isSpent: false,
          },
        ],
        mass: 747,
        version: 1,
        raw:
          '010000000199a8f6eefc7b1dc4ca1e6daff4b9427cb5f6346cef026322f2ccd5c04c51f1e301000000644173a8833f885f107b78e8b16606bac8bd946204e6049b4f50b3efe1ef1940630079af69e35ac02e175645e1e637316342179e0447abe83ace90a4906c1623101a012102e9cf5150c66c7d445bbaf201e70d31fd929f368329f242957061ed6ca92419ccffffffffffffffff0200c2eb0b000000001976a91492378168f581a4be5aaa65197458f8eee9cade1988ac30baeb0b000000001976a914542423f2b37f00d3f86e415a366c209a4a847a7188ac00000000000000000000000000000000000000000000000000000000',
        confirmations: 171,
      },
    ],
  },
};
