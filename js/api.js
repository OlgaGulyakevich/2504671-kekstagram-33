import {
  BASE_URL,
  Route,
  Method,
  ErrorText } from './constants.js';


async function load (route, errorText, method = Method.GET, body = null) {
  try {
    const response = await fetch(`${BASE_URL}${route}`, {method, body});

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return await response.json();

  } catch {
    throw new Error (errorText);
  }
}

const getData = () => load(
  Route.GET_DATA,
  ErrorText.GET_DATA);

const sendData = (body) => load(
  Route.SEND_DATA,
  ErrorText.SEND_DATA,
  Method.POST, body);

const sendComments = (body) => load(
  Route.SEND_COMMENTS,
  ErrorText.SEND_COMMENTS,
  Method.POST, body);

export {getData, sendData, sendComments};
