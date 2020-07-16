import { Api } from 'custom-types';
import { API_ENDPOINT } from '../../config.json';

export const getUtxos = async (
  address: string,
  apiEndpoint: string = API_ENDPOINT
): Promise<Api.ApiResponse<Api.UtxoResponse>> => {
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
  apiEndpoint: string = API_ENDPOINT
): Promise<Api.ApiResponse<Api.SendTxResponse>> => {
  const response = await fetch(`${apiEndpoint}/transaction`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      ContentType: 'application/json',
    },
    body: JSON.stringify({ rawTransaction }),
  });
  if (response.ok && response.headers.get('Content-Length') === '0')
    return {
      data: true,
      error: undefined,
    };
  const json = (await response.json()) as unknown;
  return {
    data: '',
    error: json,
  };
};
