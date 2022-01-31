/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_API_URL;

axiosClient.defaults.headers = { 'Content-Type': 'application/json' };

// All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

const getRequest = (URL) =>
  axiosClient
    .get(`${URL}`)
    .then((response) => ({ ...response, success: true }))
    .catch((error) => ({ ...error, success: false }));

const postRequest = (URL, payload, config) =>
  axiosClient
    .post(`${URL}`, payload, config)
    .then((response) => ({ ...response, success: true }))
    .catch((error) => ({ ...error, success: false }));

const patchRequest = (URL, payload) =>
  axiosClient
    .patch(`${URL}`, payload)
    .then((response) => ({ ...response, success: true }))
    .catch((error) => ({ ...error, success: false }));

const deleteRequest = (URL) =>
  axiosClient
    .delete(`${URL}`)
    .then((response) => ({ ...response, success: true }))
    .catch((error) => ({ ...error, success: false }));

export { getRequest, postRequest, patchRequest, deleteRequest };
