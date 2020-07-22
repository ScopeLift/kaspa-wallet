import { Api } from 'custom-types';
import { API_ENDPOINT } from '../../config.json';

class ApiError extends Error {
  constructor(...args: any[]) {
    super(...args);
    this.name = 'ApiError';
    Error.captureStackTrace(this, ApiError);
  }
}

export const getBlock = async (
  blockHash: string,
  apiEndpoint: string = API_ENDPOINT
): Promise<Api.BlockResponse> => {
  const response = await fetch(`${apiEndpoint}/block/${blockHash}`, {
    mode: 'cors',
    cache: 'no-cache',
  }).catch((e) => {
    throw new ApiError(`API connection error. ${e}`);
  });
  const json = (await response.json()) as unknown;
  if (json.errorMessage) {
    const err = json as Api.ErrorResponse;
    throw new ApiError(`API error ${err.errorCode}: ${err.errorMessage}`);
  }
  return json as Api.BlockResponse;
};

// TODO: handle pagination
export const getTransactions = async (
  address: string,
  apiEndpoint: string = API_ENDPOINT
): Promise<Api.TransactionsResponse> => {
  const response = await fetch(`${apiEndpoint}/transactions/address/${address}`, {
    mode: 'cors',
    cache: 'no-cache',
  }).catch((e) => {
    throw new ApiError(`API connection error. ${e}`);
  });
  const json = (await response.json()) as unknown;
  if (json.errorMessage) {
    const err = json as Api.ErrorResponse;
    throw new ApiError(`API error ${err.errorCode}: ${err.errorMessage}`);
  }
  return { transactions: json } as Api.TransactionsResponse;
};

export const getUtxos = async (
  address: string,
  apiEndpoint: string = API_ENDPOINT
): Promise<Api.UtxoResponse> => {
  const response = await fetch(`${apiEndpoint}/utxos/address/${address}`, {
    mode: 'cors',
    cache: 'no-cache',
  }).catch((e) => {
    throw new ApiError(`API connection error. ${e}`);
  });
  const json = (await response.json()) as unknown;
  if (json.errorMessage) {
    const err = json as Api.ErrorResponse;
    throw new ApiError(`API error ${err.errorCode}: ${err.errorMessage}`);
  }
  return {
    utxos: json,
  } as Api.UtxoResponse;
};

export const postTx = async (
  rawTransaction: string,
  apiEndpoint: string = API_ENDPOINT
): Promise<Api.SendTxResponse> => {
  const response = await fetch(`${apiEndpoint}/transaction`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      ContentType: 'application/json',
    },
    body: JSON.stringify({ rawTransaction }),
  }).catch((e) => {
    throw new ApiError(`API connection error. ${e}`);
  });
  if (response.ok && response.headers.get('Content-Length') === '0') return true;
  const err = (await response.json()) as Api.ErrorResponse;
  throw new ApiError(`API error ${err.errorCode}: ${err.errorMessage}`);
};
