import { UtxoResponse } from 'custom-types';

// async getUtxos(): void {
//     const req = await fetch(`${API_ENDPOINT}/utxos/address/${this.address}`);
//     const data = await (req.json() as Promise<UtxoResponse>);
//     if (data.errorMessage && data.message) {
//       throw new Error('No UTXOs');
//     }
//     if (data.utxos.length)
//       data.utxos.map((utxo) => {
//         this.utxoSet.add(utxo);
//       });
//   }

type SendTxResponse = boolean;

interface ApiResponse<T> {
  data: T;
  error: ErrorResponse;
}

export const getUtxos = async (
  address: string,
  apiEndpoint: string
): Promise<ApiResponse<UtxoResponse>> => {
  let response = await fetch(`${apiEndpoint}/utxos/address/${address}`, {
    mode: 'cors',
    cache: 'no-cache',
  });
  if (!response.ok) throw new Error('API connection error.');
  response = (await response.json()) as unknown;
  if (response.errorMessage)
    return {
      data: undefined,
      error: response,
    };
  return {
    data: response,
    error: undefined,
  };
};

export const postTx = async (
  rawTransaction: string,
  apiEndpoint: string
): Promise<ApiResponse<SendTxResponse>> => {
  let response = await fetch(`${apiEndpoint}/transaction`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      ContentType: 'application/json',
    },
    body: JSON.stringify({ rawTransaction }),
  });
  if (response.ok && response.headers['Content-Length'] === 0)
    return {
      data: true,
      error: undefined,
    };
  response = (await response.json()) as unknown;
  return {
    data: '',
    error: response,
  };
};
