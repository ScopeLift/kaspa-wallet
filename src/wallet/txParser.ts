import { Api } from 'custom-types';
// eslint-disable-next-line
interface NiceTx extends Api.Transaction {
  summary?: {
    timestamp?: number;
    direction?: 'in' | 'out';
    address?: string;
    value?: number;
  };
}

export const txParser = (
  transactionStorage: Record<string, Api.Transaction[]>,
  addressArray: string[],
  blockTimestamps: Record<string, number>
): NiceTx[] => {
  const keyedTx = Object.values(transactionStorage)
    .flat()
    .reduce((map: Record<string, NiceTx>, val: NiceTx) => {
      val.summary = {
        timestamp: blockTimestamps[val.acceptingBlockHash],
      };
      map[val.transactionId] = val;
      return map;
    }, {});
  const dedupedTx: NiceTx[] = Object.values(keyedTx);
  const result = dedupedTx.map((tx) => {
    const hasNoInputs = tx.inputs.length === 0;
    const controlsAllInputs = tx.inputs
      .map((input) => input.address)
      .every((address) => addressArray.includes(address));
    if (hasNoInputs) {
      tx.summary = {
        ...tx.summary,
        direction: 'in',
        value: tx.outputs.reduce((prev, cur) => prev + cur.value, 0),
        address: 'mined',
      };
    } else if (controlsAllInputs) {
      tx.summary = {
        ...tx.summary,
        direction: 'out',
        value: tx.outputs.reduce((prev, cur) => {
          const value = addressArray.includes(cur.address) ? 0 : cur.value;
          return prev + value;
        }, 0),
        address: tx.outputs[0].address,
      };
    } else if (!controlsAllInputs) {
      tx.summary = {
        ...tx.summary,
        direction: 'in',
        value: tx.outputs.reduce((prev, cur) => {
          const value = addressArray.includes(cur.address) ? cur.value : 0;
          return prev + value;
        }, 0),
        address: tx.inputs[0].address,
      };
    } else {
      throw new Error(`Can't determine transaction metadata:\n${JSON.stringify(tx)}`);
    }
    return tx;
  });
  return result;
};
