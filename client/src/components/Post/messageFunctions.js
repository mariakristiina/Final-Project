import axios from "axios";

const getMessages = userId => {
  return axios.get(`/messages/sent/${userId}`);
};

/*const getReceivedMessages = userId => {
  return axios.get(`/messages/received/${userId}`);
};*/

export { getMessages };
