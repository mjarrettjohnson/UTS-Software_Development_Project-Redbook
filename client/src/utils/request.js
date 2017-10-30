import axios from 'axios';
import { getToken } from './authentication';

export const fetchNoAuth = (url, reqType = 'GET', body = {}) => {
  const config = {
    url,
    method: reqType,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  };

  return axios(config);
};

export const fetchAuth = (url, reqType = 'GET', body = {}) => {
  return axios(url, {
    method: reqType,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${getToken()}`,
    },
    data: body,
  });
};
