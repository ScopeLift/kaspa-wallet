import { Api } from 'custom-types';

export const txParser = (
  transactionStorage: Record<string, Api.Transaction[]>,
  addressArray: string[],
  blockTimestamps: Record<string, number>
) => {
  debugger;
  console.log('hi');
};

// const augmented = Object.entries(transactionStorage).map((record) => {
//     const address = record[0];
//     const augTx = record[1].map((tx) => {
//       const inputsWithAppearance = tx.inputs.filter((input) => address === input.address);
//       const outputsWithAppearance = tx.outputs.filter((output) => address === output.address);
//       if (inputsWithAppearance.length) {
//         tx.direction = 'out';
//         tx.value = 0;
//       } else {
//         tx.direction = 'in';
//         tx.value = outputsWithAppearance.reduce((prev, cur) => prev + Number(cur.value), 0);
//       }
//       return tx;
//     });
//     return augTx;
//   });
//   return augmented.flat(1).sort(
//     (a, b) => a.acceptingBlockHash > b.acceptingBlockHash // TODO: get block by hash and look up timestamp
//   );
