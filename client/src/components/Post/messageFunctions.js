import axios from "axios";

const getSentMessages = userId => {
  return axios.get(`/messages/sent/${userId}`);
};

const getReceivedMessages = userId => {
  return axios.get(`/messages/received/${userId}`);
};

export { getSentMessages, getReceivedMessages };
