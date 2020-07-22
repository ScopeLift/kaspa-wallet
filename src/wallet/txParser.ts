import { Api } from 'custom-types';

export const txParser = (
  transactionStorage: Record<string, Api.Transaction[]>,
  addressArray: string[],
  blockTimestamps: Record<string, number>
): Api.Transaction[] => {
  const keyedTx = Object.values(transactionStorage)
    .flat()
    .reduce((map, val) => {
      val.summary = {
        timestamp: blockTimestamps[val.acceptingBlockHash],
      };
      map[val.transactionId] = val;
      return map;
    }, {});
  const dedupedTx: (Api.Transaction & {
    summary: { direction: string; value: number; timestamp: number; address: string };
  })[] = Object.values(keyedTx);
  const result = dedupedTx.map((tx) => {
    const hasNoInputs = tx.inputs.length === 0;
    const controlsAllInputs = tx.inputs
      .map((input) => input.address)
      .every((address) => addressArray.includes(address));
    if (hasNoInputs) {
      tx.summary = {
        direction: 'in',
        value: tx.outputs.reduce((prev, cur) => prev + cur.value, 0),
        address: 'mined',
        ...tx.summary,
      };
    } else if (controlsAllInputs) {
      tx.summary = {
        direction: 'out',
        value: tx.outputs.reduce((prev, cur) => {
          const value = addressArray.includes(cur.address) ? 0 : cur.value;
          return prev + value;
        }, 0),
        address: tx.outputs[0].address,
        ...tx.summary,
      };
    } else if (!controlsAllInputs) {
      tx.summary = {
        direction: 'in',
        value: tx.outputs.reduce((prev, cur) => {
          const value = addressArray.includes(cur.address) ? cur.value : 0;
          return prev + value;
        }, 0),
        address: tx.inputs[0].address,
        ...tx.summary,
      };
    } else {
      throw new Error(`Can't determine transaction metadata:\n${JSON.stringify(tx)}`);
    }
    return tx;
  });
  debugger;
  return result;
};
